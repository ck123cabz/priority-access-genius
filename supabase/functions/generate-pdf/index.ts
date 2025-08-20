import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, handleCors } from '../shared/cors.ts'
import { AgreementService } from './agreement-service.ts'
import { PDFGenerator } from './pdf-generator.ts'
import { StorageService } from './storage-service.ts'

// Timeout for PDF generation operations (30 seconds)
const OPERATION_TIMEOUT = 30000
const MAX_RETRIES = 2

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
  )
  return Promise.race([promise, timeoutPromise])
}

async function withRetry<T>(operation: () => Promise<T>, maxRetries: number): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      console.warn(`Attempt ${attempt + 1} failed:`, lastError.message)
      
      if (attempt === maxRetries) break
      
      // Exponential backoff: wait 1s, 2s, 4s, etc.
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }
  
  throw lastError || new Error('All retry attempts failed')
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  let agreementService: AgreementService | null = null

  try {
    // Validate method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
    const databaseUrl = Deno.env.get('DATABASE_URL')

    if (!supabaseUrl || !supabaseKey || !databaseUrl) {
      console.error('Missing required environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get auth header
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    let requestBody: any
    try {
      requestBody = await req.json()
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { agreementId } = requestBody
    if (!agreementId || typeof agreementId !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid agreementId parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(agreementId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid agreementId format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client and verify authentication
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
      global: { headers: { Authorization: authorization } }
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.warn('Authentication failed:', authError?.message)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize services
    agreementService = new AgreementService(databaseUrl)
    const pdfGenerator = new PDFGenerator()
    const storageService = new StorageService(supabaseUrl, supabaseKey, authorization)

    // Execute PDF generation with timeout and retry logic
    const pdfUrl = await withTimeout(
      withRetry(async () => {
        // Fetch agreement data
        const agreementData = await agreementService!.getAgreementWithClient(agreementId)
        if (!agreementData) {
          throw new Error(`Agreement not found: ${agreementId}`)
        }

        // Check if agreement is in valid state for PDF generation
        if (!agreementData.signed_at || !agreementData.signer_name) {
          throw new Error('Agreement is not properly signed')
        }

        // Generate PDF
        const pdfBytes = await pdfGenerator.generateAgreementPDF(agreementData)
        if (!pdfBytes || pdfBytes.length === 0) {
          throw new Error('PDF generation produced empty result')
        }

        // Upload to storage
        const uploadedPdfUrl = await storageService.uploadPDF(agreementId, pdfBytes)
        if (!uploadedPdfUrl) {
          throw new Error('Storage upload returned empty URL')
        }

        // Update agreement record with PDF URL
        await agreementService!.updateAgreementPdfUrl(agreementId, uploadedPdfUrl)

        return uploadedPdfUrl
      }, MAX_RETRIES),
      OPERATION_TIMEOUT
    )

    console.log(`PDF generated successfully for agreement ${agreementId}`)
    return new Response(
      JSON.stringify({ pdfUrl }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('PDF generation error:', error)
    
    // Determine appropriate error response
    let status = 500
    let errorMessage = 'PDF generation failed'
    
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        status = 404
        errorMessage = 'Agreement not found'
      } else if (error.message.includes('not properly signed')) {
        status = 400
        errorMessage = 'Agreement is not in valid state for PDF generation'
      } else if (error.message.includes('timed out')) {
        status = 408
        errorMessage = 'PDF generation timed out'
      }
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage, 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } finally {
    // Cleanup database connection
    if (agreementService) {
      try {
        await agreementService.disconnect()
      } catch (disconnectError) {
        console.warn('Error disconnecting from database:', disconnectError)
      }
    }
  }
})