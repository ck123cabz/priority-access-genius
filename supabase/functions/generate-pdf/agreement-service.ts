import { PrismaClient } from 'https://esm.sh/@prisma/client@5.15.0/edge'
import type { AgreementPDFData } from '../../../packages/types/pdf-generation.ts'

export class AgreementService {
  private prisma: PrismaClient

  constructor(databaseUrl: string) {
    this.prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    })
  }

  async getAgreementWithClient(agreementId: string): Promise<AgreementPDFData | null> {
    try {
      const agreement = await this.prisma.agreement.findUnique({
        where: { id: agreementId },
        include: {
          client: {
            select: {
              id: true,
              company_name: true,
              contact_name: true,
              email: true,
              role_title: true,
              logo_url: true,
            }
          }
        }
      })

      if (!agreement) {
        return null
      }

      return {
        id: agreement.id,
        client_id: agreement.client_id,
        terms_version: agreement.terms_version,
        signed_at: agreement.signed_at,
        signer_name: agreement.signer_name,
        signer_ip: agreement.signer_ip,
        signature_hash: agreement.signature_hash,
        client: agreement.client,
      }
    } catch (error) {
      console.error('Error fetching agreement data:', error)
      throw new Error(`Failed to fetch agreement: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async updateAgreementPdfUrl(agreementId: string, pdfUrl: string): Promise<void> {
    try {
      await this.prisma.agreement.update({
        where: { id: agreementId },
        data: { pdf_url: pdfUrl }
      })
    } catch (error) {
      console.error('Error updating agreement PDF URL:', error)
      throw new Error(`Failed to update agreement PDF URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect()
  }
}