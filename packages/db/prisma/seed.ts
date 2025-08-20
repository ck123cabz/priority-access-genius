import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const operatorId = 'seed-operator-001';

  const clients = [
    {
      id: 'client-001',
      company_name: 'Acme Corporation',
      contact_name: 'John Doe',
      email: 'john.doe@acme.com',
      role_title: 'CTO',
      notes: 'Early adopter, interested in premium features',
      status: 'active',
      created_by: operatorId,
      activation_token: 'token-acme-001',
      token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'client-002',
      company_name: 'TechStart Inc',
      contact_name: 'Jane Smith',
      email: 'jane@techstart.io',
      role_title: 'VP Engineering',
      notes: 'Interested in API access',
      status: 'pending',
      created_by: operatorId,
      activation_token: 'token-tech-002',
      token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'client-003',
      company_name: 'Global Solutions Ltd',
      contact_name: 'Robert Chen',
      email: 'rchen@globalsolutions.com',
      role_title: 'Head of Innovation',
      notes: null,
      status: 'pending',
      created_by: operatorId,
      activation_token: 'token-global-003',
      token_expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  ];

  console.log('Creating clients...');
  for (const client of clients) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: {},
      create: client,
    });
    console.log(`  ✓ Created client: ${client.company_name}`);
  }

  const agreements = [
    {
      id: 'agreement-001',
      client_id: 'client-001',
      terms_version: '1.0.0',
      pdf_url: 'https://example.com/agreements/acme-agreement.pdf',
      signed_at: new Date('2025-01-15T10:30:00Z'),
      signer_name: 'John Doe',
      signer_ip: '192.168.1.100',
      signature_hash: 'sha256:abc123def456',
    },
  ];

  console.log('Creating agreements...');
  for (const agreement of agreements) {
    await prisma.agreement.upsert({
      where: { id: agreement.id },
      update: {},
      create: agreement,
    });
    console.log(`  ✓ Created agreement for client: ${agreement.client_id}`);
  }

  const auditEvents = [
    {
      id: 'audit-001',
      client_id: 'client-001',
      actor: operatorId,
      action: 'client.created',
      payload: { source: 'seed_script' },
    },
    {
      id: 'audit-002',
      client_id: 'client-001',
      actor: 'client-001',
      action: 'agreement.signed',
      payload: { agreement_id: 'agreement-001' },
    },
    {
      id: 'audit-003',
      client_id: 'client-001',
      actor: operatorId,
      action: 'client.activated',
      payload: { activation_method: 'manual' },
    },
  ];

  console.log('Creating audit events...');
  for (const event of auditEvents) {
    await prisma.auditEvent.upsert({
      where: { id: event.id },
      update: {},
      create: event,
    });
    console.log(`  ✓ Created audit event: ${event.action}`);
  }

  const webhookEndpoints = [
    {
      id: 'webhook-001',
      url: 'https://api.example.com/webhooks/genius',
      secret: 'whsec_test123456789',
      description: 'Main webhook endpoint for notifications',
      events: ['client.created', 'client.activated', 'agreement.signed'],
      is_active: true,
      created_by: operatorId,
    },
  ];

  console.log('Creating webhook endpoints...');
  for (const webhook of webhookEndpoints) {
    await prisma.webhookEndpoint.upsert({
      where: { id: webhook.id },
      update: {},
      create: webhook,
    });
    console.log(`  ✓ Created webhook: ${webhook.description}`);
  }

  console.log('✅ Database seeding completed!');

  const stats = await prisma.$transaction([
    prisma.client.count(),
    prisma.agreement.count(),
    prisma.auditEvent.count(),
    prisma.webhookEndpoint.count(),
  ]);

  console.log('\n📊 Database statistics:');
  console.log(`  - Clients: ${stats[0]}`);
  console.log(`  - Agreements: ${stats[1]}`);
  console.log(`  - Audit Events: ${stats[2]}`);
  console.log(`  - Webhook Endpoints: ${stats[3]}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });