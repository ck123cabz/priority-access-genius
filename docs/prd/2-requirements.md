# **2. Requirements**

## **Functional Requirements**

1. **FR1: Operator Authentication:** Operators must authenticate via Supabase Auth using Google.
    
2. **FR2: Client Creation & Logo Upload:** An admin form must exist to create a client, validate inputs, and upload a company logo to Supabase Storage.
    
3. **FR3: Activation Link Generation:** The system must generate a unique, single-use tokenized URL for each client activation.
    
4. **FR4: Client Activation Page:** The tokenized link must lead to a page that renders the client's information and terms, and provides a form to collect a typed name and consent.
    
5. **FR5: Signature Persistence:** On submission, the system must store the signer's name, timestamp, and IP address, and update the client's status to "activated".
    
6. **FR6: PDF Generation:** A Supabase Edge Function must generate a final PDF and store it in Supabase Storage.
    
7. **FR7: Confirmation & Download:** After signing, the client must see a confirmation page and be able to download the generated PDF via a secure, time-bound signed URL.
    
8. **FR8: Real-time Operator Dashboard:** Operators must have a dashboard that displays a list of clients and their statuses in real-time.
    
9. **FR9: Audit Trail:** The system must record key admin and system actions.
    
10. **FR10: Outbound Webhooks (Optional):** The system must be able to send HMAC-signed webhook notifications for key events.
    

## **Non-Functional Requirements**

1. **NFR1: Performance:** The client-facing pages must have a First Contentful Paint (FCP) of less than 2 seconds. The median PDF generation time must be under 3 seconds.
    
2. **NFR2: Security:** Row Level Security must be enforced on all relevant database tables. All secrets must be managed via environment variables and a secure secret management solution.
    
3. **NFR3: Defensibility:** The system must store the signer's name, IP address, and a precise timestamp.
    
4. **NFR4: Reliability:** PDF generation and webhook delivery must include auto-retry logic and a dead-letter queue.
    
5. **NFR5: Scalability:** The system must be designed to handle up to 1,000 activations per day and 100 concurrent operators.
    
6. **NFR6: Accessibility:** All user-facing forms and controls must meet WCAG 2.1 Level AA standards.
    
