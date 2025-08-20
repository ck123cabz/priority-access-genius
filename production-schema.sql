-- Complete Database Schema for Production
-- Run this in Supabase SQL Editor

-- CreateTable: clients
CREATE TABLE IF NOT EXISTS "public"."clients" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role_title" TEXT NOT NULL,
    "notes" TEXT,
    "logo_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_by" TEXT NOT NULL,
    "activation_token" TEXT,
    "token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable: agreements
CREATE TABLE IF NOT EXISTS "public"."agreements" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "terms_version" TEXT NOT NULL,
    "pdf_url" TEXT,
    "signed_at" TIMESTAMP(3) NOT NULL,
    "signer_name" TEXT NOT NULL,
    "signer_ip" TEXT NOT NULL,
    "signature_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable: audit_events
CREATE TABLE IF NOT EXISTS "public"."audit_events" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable: webhook_endpoints
CREATE TABLE IF NOT EXISTS "public"."webhook_endpoints" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_endpoints_pkey" PRIMARY KEY ("id")
);

-- Create Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "clients_email_key" ON "public"."clients"("email");
CREATE INDEX IF NOT EXISTS "clients_created_by_idx" ON "public"."clients"("created_by");
CREATE INDEX IF NOT EXISTS "clients_status_idx" ON "public"."clients"("status");
CREATE INDEX IF NOT EXISTS "clients_activation_token_idx" ON "public"."clients"("activation_token");
CREATE INDEX IF NOT EXISTS "agreements_client_id_idx" ON "public"."agreements"("client_id");
CREATE INDEX IF NOT EXISTS "agreements_signed_at_idx" ON "public"."agreements"("signed_at");
CREATE INDEX IF NOT EXISTS "audit_events_client_id_idx" ON "public"."audit_events"("client_id");
CREATE INDEX IF NOT EXISTS "audit_events_created_at_idx" ON "public"."audit_events"("created_at");
CREATE INDEX IF NOT EXISTS "audit_events_actor_idx" ON "public"."audit_events"("actor");
CREATE INDEX IF NOT EXISTS "webhook_endpoints_enabled_idx" ON "public"."webhook_endpoints"("enabled");

-- Add Foreign Keys
ALTER TABLE "public"."agreements" 
ADD CONSTRAINT "agreements_client_id_fkey" 
FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "public"."audit_events" 
ADD CONSTRAINT "audit_events_client_id_fkey" 
FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Row Level Security Policies
ALTER TABLE "public"."clients" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."agreements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."audit_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."webhook_endpoints" ENABLE ROW LEVEL SECURITY;

-- Clients policies
CREATE POLICY "operators_own_clients" ON "public"."clients"
    FOR ALL USING ((auth.uid())::text = created_by)
    WITH CHECK ((auth.uid())::text = created_by);

CREATE POLICY "anonymous_activation_access" ON "public"."clients"
    FOR SELECT USING (
        (auth.role() = 'anon'::text) AND 
        (activation_token IS NOT NULL) AND 
        (token_expires_at IS NOT NULL) AND 
        (token_expires_at > now())
    );

-- Agreements policies
CREATE POLICY "operators_own_agreements" ON "public"."agreements"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id = agreements.client_id 
            AND clients.created_by = (auth.uid())::text
        )
    );

CREATE POLICY "anonymous_activation_agreements" ON "public"."agreements"
    FOR SELECT USING (
        (auth.role() = 'anon'::text) AND
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id = agreements.client_id 
            AND clients.activation_token IS NOT NULL 
            AND clients.token_expires_at > now()
        )
    );

-- Audit events policies
CREATE POLICY "operators_own_audit_events" ON "public"."audit_events"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id = audit_events.client_id 
            AND clients.created_by = (auth.uid())::text
        )
    );

-- Webhook endpoints policies
CREATE POLICY "service_role_webhook_endpoints" ON "public"."webhook_endpoints"
    FOR ALL USING (auth.role() = 'service_role'::text);

-- Insert some test data
INSERT INTO clients (id, company_name, contact_name, email, role_title, status, created_by, created_at, updated_at) VALUES
  ('cltest1', 'Example Corp', 'John Doe', 'john.doe@example.com', 'CTO', 'pending', 'operator1', NOW(), NOW()),
  ('cltest2', 'ACME Inc', 'Jane Smith', 'jane.smith@acme.com', 'Product Manager', 'active', 'operator1', NOW(), NOW()),
  ('cltest3', 'Startup.io', 'Bob Wilson', 'bob.wilson@startup.io', 'Founder', 'pending', 'operator1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;