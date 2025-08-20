import { assertEquals, assertExists } from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import { PDFGenerator } from '../pdf-generator.ts'
import type { AgreementPDFData } from '../../../../packages/types/pdf-generation.ts'

const mockAgreementData: AgreementPDFData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  client_id: '987fcdeb-51a2-43d7-8901-123456789abc',
  terms_version: 'v1.0',
  signed_at: new Date('2025-08-20T10:00:00Z'),
  signer_name: 'John Doe',
  signer_ip: '192.168.1.100',
  signature_hash: 'abc123def456789ghi012jkl345mno678pqr901stu234vwx567yz890',
  client: {
    id: '987fcdeb-51a2-43d7-8901-123456789abc',
    company_name: 'Test Company LLC',
    contact_name: 'John Doe',
    email: 'john.doe@testcompany.com',
    role_title: 'CEO',
    logo_url: null
  }
}

Deno.test('PDFGenerator - successful PDF generation with valid data', async () => {
  const generator = new PDFGenerator()
  
  const pdfBytes = await generator.generateAgreementPDF(mockAgreementData)
  
  // Verify PDF was generated
  assertExists(pdfBytes)
  assertEquals(pdfBytes instanceof Uint8Array, true)
  assertEquals(pdfBytes.length > 0, true)
  
  // Verify PDF starts with PDF header
  const pdfHeader = new TextDecoder().decode(pdfBytes.slice(0, 4))
  assertEquals(pdfHeader, '%PDF')
})

Deno.test('PDFGenerator - handles missing client data gracefully', async () => {
  const generator = new PDFGenerator()
  const incompleteData = {
    ...mockAgreementData,
    client: {
      ...mockAgreementData.client,
      company_name: '',
      contact_name: ''
    }
  }
  
  // Should still generate PDF but with empty fields
  const pdfBytes = await generator.generateAgreementPDF(incompleteData)
  
  assertExists(pdfBytes)
  assertEquals(pdfBytes instanceof Uint8Array, true)
  assertEquals(pdfBytes.length > 0, true)
})

Deno.test('PDFGenerator - includes all required signature details', async () => {
  const generator = new PDFGenerator()
  
  const pdfBytes = await generator.generateAgreementPDF(mockAgreementData)
  
  // Convert PDF to string for content verification (basic check)
  const pdfContent = new TextDecoder().decode(pdfBytes)
  
  // These strings should appear in the PDF content
  assertEquals(pdfContent.includes('John Doe'), true)
  assertEquals(pdfContent.includes('192.168.1.100'), true)
  assertEquals(pdfContent.includes('Test Company LLC'), true)
  assertEquals(pdfContent.includes('v1.0'), true)
})

Deno.test('PDFGenerator - generates different PDFs for different data', async () => {
  const generator = new PDFGenerator()
  
  const pdf1 = await generator.generateAgreementPDF(mockAgreementData)
  
  const differentData = {
    ...mockAgreementData,
    signer_name: 'Jane Smith',
    client: {
      ...mockAgreementData.client,
      company_name: 'Different Company'
    }
  }
  
  const pdf2 = await generator.generateAgreementPDF(differentData)
  
  // PDFs should be different
  assertEquals(pdf1.length !== pdf2.length || !pdf1.every((byte, i) => byte === pdf2[i]), true)
})