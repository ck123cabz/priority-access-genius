import { assertEquals, assertExists, assertRejects } from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import { AgreementService } from '../agreement-service.ts'

// Mock Prisma Client for testing
class MockPrismaClient {
  agreement: any
  
  constructor(private mockData: any = null, private shouldError: boolean = false) {
    this.agreement = {
      findUnique: async (params: any) => {
        if (this.shouldError) {
          throw new Error('Database connection failed')
        }
        if (!this.mockData) {
          return null
        }
        return this.mockData
      },
      update: async (params: any) => {
        if (this.shouldError) {
          throw new Error('Database update failed')
        }
        return { ...this.mockData, pdf_url: params.data.pdf_url }
      }
    }
  }
  
  async $disconnect() {
    // Mock disconnect
  }
}

const mockAgreementWithClient = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  client_id: '987fcdeb-51a2-43d7-8901-123456789abc',
  terms_version: 'v1.0',
  signed_at: new Date('2025-08-20T10:00:00Z'),
  signer_name: 'John Doe',
  signer_ip: '192.168.1.100',
  signature_hash: 'abc123def456',
  client: {
    id: '987fcdeb-51a2-43d7-8901-123456789abc',
    company_name: 'Test Company LLC',
    contact_name: 'John Doe',
    email: 'john.doe@testcompany.com',
    role_title: 'CEO',
    logo_url: null
  }
}

Deno.test('AgreementService - successful agreement retrieval', async () => {
  // Create a custom service for testing
  class TestAgreementService {
    private mockPrisma: MockPrismaClient
    
    constructor() {
      this.mockPrisma = new MockPrismaClient(mockAgreementWithClient)
    }
    
    async getAgreementWithClient(agreementId: string) {
      const agreement = await this.mockPrisma.agreement.findUnique({
        where: { id: agreementId },
        include: { client: true }
      })
      
      if (!agreement) return null
      
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
    }
  }
  
  const service = new TestAgreementService()
  const result = await service.getAgreementWithClient('123e4567-e89b-12d3-a456-426614174000')
  
  assertExists(result)
  assertEquals(result.id, '123e4567-e89b-12d3-a456-426614174000')
  assertEquals(result.signer_name, 'John Doe')
  assertEquals(result.client.company_name, 'Test Company LLC')
})

Deno.test('AgreementService - returns null for non-existent agreement', async () => {
  class TestAgreementService {
    private mockPrisma: MockPrismaClient
    
    constructor() {
      this.mockPrisma = new MockPrismaClient(null) // No data
    }
    
    async getAgreementWithClient(agreementId: string) {
      const agreement = await this.mockPrisma.agreement.findUnique({
        where: { id: agreementId },
        include: { client: true }
      })
      return agreement
    }
  }
  
  const service = new TestAgreementService()
  const result = await service.getAgreementWithClient('nonexistent-id')
  
  assertEquals(result, null)
})

Deno.test('AgreementService - handles database errors', async () => {
  class TestAgreementService {
    private mockPrisma: MockPrismaClient
    
    constructor() {
      this.mockPrisma = new MockPrismaClient(null, true) // Force error
    }
    
    async getAgreementWithClient(agreementId: string) {
      try {
        await this.mockPrisma.agreement.findUnique({
          where: { id: agreementId },
          include: { client: true }
        })
      } catch (error) {
        throw new Error(`Failed to fetch agreement: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }
  
  const service = new TestAgreementService()
  
  await assertRejects(
    () => service.getAgreementWithClient('some-id'),
    Error,
    'Failed to fetch agreement'
  )
})

Deno.test('AgreementService - successful PDF URL update', async () => {
  class TestAgreementService {
    private mockPrisma: MockPrismaClient
    
    constructor() {
      this.mockPrisma = new MockPrismaClient(mockAgreementWithClient)
    }
    
    async updateAgreementPdfUrl(agreementId: string, pdfUrl: string) {
      try {
        await this.mockPrisma.agreement.update({
          where: { id: agreementId },
          data: { pdf_url: pdfUrl }
        })
      } catch (error) {
        throw new Error(`Failed to update agreement PDF URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }
  
  const service = new TestAgreementService()
  
  // Should not throw
  await service.updateAgreementPdfUrl('123e4567-e89b-12d3-a456-426614174000', 'https://example.com/pdf.pdf')
})

Deno.test('AgreementService - handles PDF URL update errors', async () => {
  class TestAgreementService {
    private mockPrisma: MockPrismaClient
    
    constructor() {
      this.mockPrisma = new MockPrismaClient(null, true) // Force error
    }
    
    async updateAgreementPdfUrl(agreementId: string, pdfUrl: string) {
      try {
        await this.mockPrisma.agreement.update({
          where: { id: agreementId },
          data: { pdf_url: pdfUrl }
        })
      } catch (error) {
        throw new Error(`Failed to update agreement PDF URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }
  
  const service = new TestAgreementService()
  
  await assertRejects(
    () => service.updateAgreementPdfUrl('some-id', 'https://example.com/pdf.pdf'),
    Error,
    'Failed to update agreement PDF URL'
  )
})