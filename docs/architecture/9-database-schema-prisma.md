# **9. Database Schema (Prisma)**

```
model Client {
  id                String       @id @default(uuid())
  company_name      String
  contact_name      String
  email             String
  role_title        String
  notes             String?
  logo_url          String?
  status            String       @default("pending")
  activation_token  String?      @unique
  token_expires_at  DateTime?
  token_expiry_hours Int         @default(24)
  created_by        String
  created_at        DateTime     @default(now())
  updated_at        DateTime     @updatedAt
  agreements        Agreement[]
  audit_events      AuditEvent[]
}

model Agreement {
  id             String   @id @default(uuid())
  client_id      String
  terms_version  String
  pdf_url        String?
  signed_at      DateTime
  signer_name    String
  signer_ip      String
  signature_hash String
  created_at     DateTime @default(now())
  client         Client   @relation(fields: [client_id], references: [id], onDelete: Cascade)
}

model AuditEvent {
  id         String   @id @default(uuid())
  client_id  String
  actor      String
  action     String
  payload    Json
  created_at DateTime @default(now())
  client     Client   @relation(fields: [client_id], references: [id], onDelete: Cascade)
}

model WebhookEndpoint {
  id         String   @id @default(uuid())
  url        String
  secret     String
  enabled    Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```
