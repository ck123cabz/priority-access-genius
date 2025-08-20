-- Seed data for local development
-- This file will be executed when the local Supabase instance is started

-- Insert sample clients
INSERT INTO clients (id, email, name, company, created_at, updated_at) VALUES
  ('cltest1', 'john.doe@example.com', 'John Doe', 'Example Corp', NOW(), NOW()),
  ('cltest2', 'jane.smith@acme.com', 'Jane Smith', 'ACME Inc', NOW(), NOW()),
  ('cltest3', 'bob.wilson@startup.io', 'Bob Wilson', 'Startup.io', NOW(), NOW());

-- Insert sample agreements
INSERT INTO agreements (id, client_id, title, description, status, created_at, updated_at) VALUES
  ('agtest1', 'cltest1', 'Priority Access Agreement', 'Standard priority access for Example Corp', 'active', NOW(), NOW()),
  ('agtest2', 'cltest2', 'Enterprise Priority Access', 'Enterprise-level priority access with SLA', 'active', NOW(), NOW()),
  ('agtest3', 'cltest3', 'Trial Priority Access', 'Trial agreement for startup evaluation', 'draft', NOW(), NOW());

-- Insert sample audit events
INSERT INTO audit_events (id, client_id, agreement_id, action, details, created_at) VALUES
  ('aetest1', 'cltest1', 'agtest1', 'agreement_created', '{"title": "Priority Access Agreement"}', NOW()),
  ('aetest2', 'cltest2', 'agtest2', 'agreement_activated', '{"status": "active"}', NOW()),
  ('aetest3', 'cltest3', 'agtest3', 'client_registered', '{"email": "bob.wilson@startup.io"}', NOW());

-- Insert sample webhook endpoints
INSERT INTO webhook_endpoints (id, url, secret, is_active, created_at, updated_at) VALUES
  ('whtest1', 'https://example.com/webhook', 'secret123', true, NOW(), NOW()),
  ('whtest2', 'https://acme.com/api/webhooks', 'acme_secret_456', true, NOW(), NOW());