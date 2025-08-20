-- CreateTable
CREATE TABLE "public"."clients" (
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
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agreements" (
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

-- CreateTable
CREATE TABLE "public"."audit_events" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."webhook_endpoints" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_endpoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");

-- CreateIndex
CREATE INDEX "clients_created_by_idx" ON "public"."clients"("created_by");

-- CreateIndex
CREATE INDEX "clients_status_idx" ON "public"."clients"("status");

-- CreateIndex
CREATE INDEX "clients_activation_token_idx" ON "public"."clients"("activation_token");

-- CreateIndex
CREATE INDEX "agreements_client_id_idx" ON "public"."agreements"("client_id");

-- CreateIndex
CREATE INDEX "agreements_signed_at_idx" ON "public"."agreements"("signed_at");

-- CreateIndex
CREATE INDEX "audit_events_client_id_idx" ON "public"."audit_events"("client_id");

-- CreateIndex
CREATE INDEX "audit_events_created_at_idx" ON "public"."audit_events"("created_at");

-- CreateIndex
CREATE INDEX "audit_events_actor_idx" ON "public"."audit_events"("actor");

-- CreateIndex
CREATE INDEX "webhook_endpoints_enabled_idx" ON "public"."webhook_endpoints"("enabled");

-- AddForeignKey
ALTER TABLE "public"."agreements" ADD CONSTRAINT "agreements_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_events" ADD CONSTRAINT "audit_events_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
