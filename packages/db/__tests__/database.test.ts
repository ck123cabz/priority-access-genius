import { PrismaClient } from '../generated/client'

describe('Database Models and Prisma Client', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres'
        }
      }
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    // Clean up test data
    await prisma.auditEvent.deleteMany()
    await prisma.agreement.deleteMany()
    await prisma.client.deleteMany()
    await prisma.webhookEndpoint.deleteMany()
  })

  describe('Prisma Client Configuration', () => {
    test('should connect to database successfully', async () => {
      await expect(prisma.$queryRaw`SELECT 1 as test`).resolves.toEqual([{ test: 1 }])
    })

    test('should have all required models available', () => {
      expect(prisma.client).toBeDefined()
      expect(prisma.agreement).toBeDefined()
      expect(prisma.auditEvent).toBeDefined()
      expect(prisma.webhookEndpoint).toBeDefined()
    })
  })

  describe('Client Model', () => {
    test('should create a client with all required fields', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'john@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id',
          notes: 'Test notes',
          logo_url: 'https://example.com/logo.png'
        }
      })

      expect(client.id).toBeDefined()
      expect(client.company_name).toBe('Test Company')
      expect(client.contact_name).toBe('John Doe')
      expect(client.email).toBe('john@testcompany.com')
      expect(client.role_title).toBe('CEO')
      expect(client.status).toBe('pending')
      expect(client.created_by).toBe('test-operator-id')
      expect(client.activation_token).toBeNull()
      expect(client.token_expires_at).toBeNull()
      expect(client.created_at).toBeDefined()
      expect(client.updated_at).toBeDefined()
    })

    test('should enforce email uniqueness', async () => {
      const clientData = {
        company_name: 'Test Company',
        contact_name: 'John Doe',
        email: 'duplicate@testcompany.com',
        role_title: 'CEO',
        created_by: 'test-operator-id'
      }

      await prisma.client.create({ data: clientData })

      await expect(
        prisma.client.create({ data: clientData })
      ).rejects.toThrow()
    })

    test('should allow activation token fields', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'token@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id',
          activation_token: 'test-token-123',
          token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        }
      })

      expect(client.activation_token).toBe('test-token-123')
      expect(client.token_expires_at).toBeDefined()
    })
  })

  describe('Agreement Model', () => {
    test('should create an agreement linked to a client', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'agreement@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id'
        }
      })

      const agreement = await prisma.agreement.create({
        data: {
          client_id: client.id,
          terms_version: 'v1.0',
          signed_at: new Date(),
          signer_name: 'John Doe',
          signer_ip: '192.168.1.1',
          signature_hash: 'abc123hash'
        }
      })

      expect(agreement.id).toBeDefined()
      expect(agreement.client_id).toBe(client.id)
      expect(agreement.terms_version).toBe('v1.0')
      expect(agreement.pdf_url).toBeNull()
      expect(agreement.signature_hash).toBe('abc123hash')
    })

    test('should cascade delete when client is deleted', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'cascade@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id'
        }
      })

      await prisma.agreement.create({
        data: {
          client_id: client.id,
          terms_version: 'v1.0',
          signed_at: new Date(),
          signer_name: 'John Doe',
          signer_ip: '192.168.1.1',
          signature_hash: 'abc123hash'
        }
      })

      await prisma.client.delete({ where: { id: client.id } })

      const agreements = await prisma.agreement.findMany({
        where: { client_id: client.id }
      })
      expect(agreements).toHaveLength(0)
    })
  })

  describe('AuditEvent Model', () => {
    test('should create an audit event linked to a client', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'audit@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id'
        }
      })

      const auditEvent = await prisma.auditEvent.create({
        data: {
          client_id: client.id,
          actor: 'operator',
          action: 'client_created',
          payload: { details: 'Client created successfully' }
        }
      })

      expect(auditEvent.id).toBeDefined()
      expect(auditEvent.client_id).toBe(client.id)
      expect(auditEvent.actor).toBe('operator')
      expect(auditEvent.action).toBe('client_created')
      expect(auditEvent.payload).toEqual({ details: 'Client created successfully' })
      expect(auditEvent.created_at).toBeDefined()
    })
  })

  describe('WebhookEndpoint Model', () => {
    test('should create a webhook endpoint', async () => {
      const webhook = await prisma.webhookEndpoint.create({
        data: {
          url: 'https://example.com/webhook',
          secret: 'webhook-secret-123',
          enabled: true
        }
      })

      expect(webhook.id).toBeDefined()
      expect(webhook.url).toBe('https://example.com/webhook')
      expect(webhook.secret).toBe('webhook-secret-123')
      expect(webhook.enabled).toBe(true)
      expect(webhook.created_at).toBeDefined()
      expect(webhook.updated_at).toBeDefined()
    })

    test('should default enabled to true', async () => {
      const webhook = await prisma.webhookEndpoint.create({
        data: {
          url: 'https://example.com/webhook',
          secret: 'webhook-secret-123'
        }
      })

      expect(webhook.enabled).toBe(true)
    })
  })

  describe('Model Relationships', () => {
    test('should load client with related agreements and audit events', async () => {
      const client = await prisma.client.create({
        data: {
          company_name: 'Test Company',
          contact_name: 'John Doe',
          email: 'relations@testcompany.com',
          role_title: 'CEO',
          created_by: 'test-operator-id'
        }
      })

      await prisma.agreement.create({
        data: {
          client_id: client.id,
          terms_version: 'v1.0',
          signed_at: new Date(),
          signer_name: 'John Doe',
          signer_ip: '192.168.1.1',
          signature_hash: 'abc123hash'
        }
      })

      await prisma.auditEvent.create({
        data: {
          client_id: client.id,
          actor: 'operator',
          action: 'client_created',
          payload: { details: 'Client created successfully' }
        }
      })

      const clientWithRelations = await prisma.client.findUnique({
        where: { id: client.id },
        include: {
          agreements: true,
          audit_events: true
        }
      })

      expect(clientWithRelations?.agreements).toHaveLength(1)
      expect(clientWithRelations?.audit_events).toHaveLength(1)
    })
  })
})