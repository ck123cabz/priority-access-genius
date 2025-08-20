# **5. API Specification**

## **1. Primary Data Access: Supabase Client SDK**

- CRUD via the Supabase JavaScript Client; types generated from Prisma ensure end-to-end type safety.
    

## **2. Serverless Function API: PDF Generation**

- **Endpoint:** `POST /functions/v1/generate-pdf`
    
- **Auth:** Supabase user JWT required
    
- **Body:** `{ "agreementId": "uuid" }`
    
- **Success:** `{ "pdfUrl": "https://.../pdfs/..." }`
    
- **Error:** `{ "error": "PDF generation failed", "details": "..." }`
    

## **3. Outbound Webhooks API**

- `POST` with headers `Content-Type: application/json` and `X-Signature-Hmac-Sha256`.
    
- **Events:** `client.created`, `client.updated`, `agreement.signed`, `pdf.generated`.
    
- **Sample payload:**
    
    ```
    {
      "event": "agreement.signed",
      "timestamp": "2025-08-20T10:00:00Z",
      "payload": {
        "clientId": "uuid-...",
        "agreementId": "uuid-...",
        "signedAt": "2025-08-20T09:59:58Z",
        "signerName": "John Doe",
        "signerIp": "192.0.2.1"
      }
    }
    ```
    
