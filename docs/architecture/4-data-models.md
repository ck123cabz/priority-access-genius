# **4. Data Models**

This section defines the core data entities as specified in the PRD. We will create a TypeScript interface for each model, which can be shared between the frontend, backend, and Prisma ORM for end-to-end type safety.

## **Model: Client**

**Purpose:** Represents a client company record created by an Operator. This is the central entity to which agreements, audits, and logos are associated.

**Key Attributes:**

- **id:** string (UUID) - Unique identifier for the client.
    
- **company_name:** string - The name of the client’s company.
    
- **contact_name:** string - The primary contact person’s name.
    
- **email:** string - The primary contact’s email address.
    
- **role_title:** string - The contact’s job title or role.
    
- **notes:** string | null - Optional internal notes for the operator.
    
- **logo_url:** string | null - URL for the company logo stored in Supabase Storage.
    
- **status:** 'pending' | 'activated' - The current status of the agreement.
    
- **created_by:** string (UUID) - The ID of the operator who created the record.
    
- **created_at:** Date - Timestamp of when the record was created.
    
- **updated_at:** Date - Timestamp of the last update.
    

**TypeScript Interface:**

```
interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  role_title: string;
  notes: string | null;
  logo_url: string | null;
  status: 'pending' | 'activated';
  created_by: string;
  created_at: Date;
  updated_at: Date;
}
```

**Relationships:**

- **One-to-Many:** A Client can have many Agreements.
    
- **One-to-Many:** A Client can have many Audit Events.
    

## **Model: Agreement**

**Purpose:** Stores the record of a client’s legally binding confirmation. This includes the e-signature details, the terms version they agreed to, and a link to the final, generated PDF artifact for defensibility.

**Key Attributes:**

- **id:** string (UUID) - Unique identifier for the agreement record.
    
- **client_id:** string (UUID) - Foreign key linking to the Client.
    
- **terms_version:** string - The version of the legal terms the client agreed to.
    
- **pdf_url:** string | null - URL to the signed PDF in Supabase Storage (nullable until generated).
    
- **signed_at:** Date - The exact timestamp when the client confirmed their agreement.
    
- **signer_name:** string - The full name the client typed as their e-signature.
    
- **signer_ip:** string - The IP address of the client at the time of signing.
    
- **signature_hash:** string - A hash of key signature details to ensure data integrity.
    
- **created_at:** Date - Timestamp of when the record was created.
    

**TypeScript Interface:**

```
interface Agreement {
  id: string;
  client_id: string;
  terms_version: string;
  pdf_url: string | null;
  signed_at: Date;
  signer_name: string;
  signer_ip: string;
  signature_hash: string;
  created_at: Date;
}
```

**Relationships:**

- **Many-to-One:** Many Agreements belong to one Client.
    

## **Model: Audit Event**

**Purpose:** Tracks significant actions taken by operators or the system for a given client. This creates an immutable log for security, debugging, and compliance purposes.

**Key Attributes:**

- **id:** string (UUID)
    
- **client_id:** string (UUID)
    
- **actor:** 'operator' | 'system'
    
- **action:** string
    
- **payload:** Record<string, any>
    
- **created_at:** Date
    

**TypeScript Interface:**

```
interface AuditEvent {
  id: string;
  client_id: string;
  actor: 'operator' | 'system';
  action: string;
  payload: Record<string, any>;
  created_at: Date;
}
```

**Relationships:**

- **Many-to-One:** Many Audit Events can be associated with one Client.
    

## **Model: Webhook Endpoint**

**Purpose:** Stores operator-configured endpoints for receiving notifications about system events (e.g., agreement.signed).

**Key Attributes:**

- **id:** string (UUID)
    
- **url:** string
    
- **secret:** string
    
- **enabled:** boolean
    
- **created_at:** Date
    
- **updated_at:** Date
    

**TypeScript Interface:**

```
interface WebhookEndpoint {
  id: string;
  url: string;
  secret: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
```

**Relationships:**

- None.
    
