-- Seed data for local development (updated schema)
-- Insert sample clients with correct column names
INSERT INTO clients (id, company_name, contact_name, email, role_title, notes, status, created_by, created_at, updated_at) VALUES
  ('cltest1', 'Example Corp', 'John Doe', 'john.doe@example.com', 'CTO', 'Test client for development', 'pending', 'operator1', NOW(), NOW()),
  ('cltest2', 'ACME Inc', 'Jane Smith', 'jane.smith@acme.com', 'Product Manager', 'Enterprise client', 'active', 'operator1', NOW(), NOW()),
  ('cltest3', 'Startup.io', 'Bob Wilson', 'bob.wilson@startup.io', 'Founder', 'Early stage startup client', 'pending', 'operator1', NOW(), NOW());

-- Insert sample agreements (check actual columns first)
-- INSERT INTO agreements will be added after checking the structure

-- Insert sample audit events (check actual columns first) 
-- INSERT INTO audit_events will be added after checking the structure

-- Insert sample webhook endpoints (check actual columns first)
-- INSERT INTO webhook_endpoints will be added after checking the structure