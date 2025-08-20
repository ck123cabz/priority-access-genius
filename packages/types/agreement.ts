export interface Agreement {
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

export interface CreateAgreementData {
  client_id: string;
  terms_version: string;
  signer_name: string;
  signer_ip: string;
  signature_hash: string;
  signed_at: Date;
}

export interface AgreementWithClient extends Agreement {
  client: {
    id: string;
    company_name: string;
    contact_name: string;
    email: string;
    status: string;
  };
}

export type AgreementStatus = 'pending' | 'activated' | 'expired';