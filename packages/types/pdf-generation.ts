export interface PDFGenerationRequest {
  agreementId: string;
}

export interface PDFGenerationResponse {
  pdfUrl: string;
}

export interface PDFGenerationError {
  error: string;
  details?: string;
}

export interface AgreementPDFData {
  id: string;
  client_id: string;
  terms_version: string;
  signed_at: Date;
  signer_name: string;
  signer_ip: string;
  signature_hash: string;
  client: {
    id: string;
    company_name: string;
    contact_name: string;
    email: string;
    role_title: string;
    logo_url: string | null;
  };
}