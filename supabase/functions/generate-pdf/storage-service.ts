import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

export class StorageService {
  private supabase: SupabaseClient

  constructor(supabaseUrl: string, supabaseKey: string, authToken: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
      global: { headers: { Authorization: authToken } }
    })
  }

  async uploadPDF(agreementId: string, pdfBytes: Uint8Array): Promise<string> {
    try {
      // Generate unique filename with timestamp
      const timestamp = new Date().getTime()
      const fileName = `agreement-${agreementId}-${timestamp}.pdf`
      const filePath = `agreements/${fileName}`

      // Upload PDF to Supabase Storage
      const { data, error } = await this.supabase.storage
        .from('agreements')
        .upload(filePath, pdfBytes, {
          contentType: 'application/pdf',
          metadata: {
            agreementId,
            uploadedAt: new Date().toISOString()
          }
        })

      if (error) {
        console.error('Storage upload error:', error)
        throw new Error(`Storage upload failed: ${error.message}`)
      }

      if (!data?.path) {
        throw new Error('Upload succeeded but no file path returned')
      }

      // Get signed URL for the uploaded file
      const { data: signedUrlData, error: signedUrlError } = await this.supabase.storage
        .from('agreements')
        .createSignedUrl(data.path, 31536000) // 1 year expiry

      if (signedUrlError) {
        console.error('Signed URL error:', signedUrlError)
        // If signed URL fails, return the public URL as fallback
        const { data: publicUrlData } = this.supabase.storage
          .from('agreements')
          .getPublicUrl(data.path)
        
        return publicUrlData.publicUrl
      }

      return signedUrlData.signedUrl

    } catch (error) {
      console.error('Error uploading PDF to storage:', error)
      throw new Error(`Storage upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async deletePDF(filePath: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from('agreements')
        .remove([filePath])

      if (error) {
        console.error('Storage delete error:', error)
        throw new Error(`Storage delete failed: ${error.message}`)
      }
    } catch (error) {
      console.error('Error deleting PDF from storage:', error)
      throw new Error(`Storage delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}