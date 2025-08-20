import { PDFDocument, rgb, StandardFonts } from 'https://esm.sh/pdf-lib@1.17.1'
import type { AgreementPDFData } from '../../../packages/types/pdf-generation.ts'

export class PDFGenerator {
  async generateAgreementPDF(agreementData: AgreementPDFData): Promise<Uint8Array> {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792]) // 8.5" x 11" in points

      // Get fonts
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

      // Define colors
      const blackColor = rgb(0, 0, 0)
      const grayColor = rgb(0.5, 0.5, 0.5)

      // Page dimensions
      const { width, height } = page.getSize()
      const margin = 72 // 1 inch margins

      let yPosition = height - margin

      // Header
      page.drawText('PRIORITY ACCESS AGREEMENT', {
        x: margin,
        y: yPosition,
        size: 20,
        font: timesBoldFont,
        color: blackColor,
      })

      yPosition -= 40

      // Company Information
      page.drawText(`Company: ${agreementData.client.company_name}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesBoldFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`Contact: ${agreementData.client.contact_name}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`Title: ${agreementData.client.role_title}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`Email: ${agreementData.client.email}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 40

      // Agreement Details
      page.drawText('AGREEMENT DETAILS', {
        x: margin,
        y: yPosition,
        size: 14,
        font: timesBoldFont,
        color: blackColor,
      })

      yPosition -= 25

      page.drawText(`Terms Version: ${agreementData.terms_version}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`Agreement ID: ${agreementData.id}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: grayColor,
      })

      yPosition -= 40

      // Terms Content (placeholder)
      page.drawText('TERMS AND CONDITIONS', {
        x: margin,
        y: yPosition,
        size: 14,
        font: timesBoldFont,
        color: blackColor,
      })

      yPosition -= 25

      const termsText = [
        'By electronically signing this agreement, the client acknowledges and agrees to:',
        '',
        '1. Grant priority access to their systems and resources as outlined in the',
        '   service agreement.',
        '',
        '2. Comply with all security requirements and protocols established for',
        '   priority access privileges.',
        '',
        '3. Accept responsibility for all activities conducted under this priority',
        '   access arrangement.',
        '',
        '4. Notify the service provider immediately of any security concerns or',
        '   unauthorized access attempts.',
      ]

      termsText.forEach((line) => {
        if (yPosition < margin + 150) { // Leave space for signature section
          return
        }
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: 11,
          font: timesRomanFont,
          color: blackColor,
        })
        yPosition -= 15
      })

      // Move to signature section
      yPosition = margin + 120

      // Signature Section
      page.drawText('ELECTRONIC SIGNATURE', {
        x: margin,
        y: yPosition,
        size: 14,
        font: timesBoldFont,
        color: blackColor,
      })

      yPosition -= 25

      page.drawText(`Signed by: ${agreementData.signer_name}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`Date: ${agreementData.signed_at.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: blackColor,
      })

      yPosition -= 20

      page.drawText(`IP Address: ${agreementData.signer_ip}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: timesRomanFont,
        color: grayColor,
      })

      yPosition -= 20

      page.drawText(`Signature Hash: ${agreementData.signature_hash.substring(0, 32)}...`, {
        x: margin,
        y: yPosition,
        size: 10,
        font: timesRomanFont,
        color: grayColor,
      })

      // Generate PDF bytes
      const pdfBytes = await pdfDoc.save()
      return pdfBytes

    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}