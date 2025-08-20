-- Enable Row Level Security on all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_endpoints ENABLE ROW LEVEL SECURITY;

-- Clients table policies
-- Operators can select, insert, and update their own clients
CREATE POLICY "operators_own_clients" 
ON public.clients 
FOR ALL 
USING (auth.uid()::text = created_by)
WITH CHECK (auth.uid()::text = created_by);

-- Anonymous users can select client records by valid activation token
CREATE POLICY "anonymous_activation_access" 
ON public.clients 
FOR SELECT 
USING (
  auth.role() = 'anon' 
  AND activation_token IS NOT NULL 
  AND token_expires_at IS NOT NULL 
  AND token_expires_at > NOW()
);

-- Agreements table policies  
-- Users can only access agreements for their own clients
CREATE POLICY "operators_own_client_agreements" 
ON public.agreements 
FOR ALL 
USING (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE created_by = auth.uid()::text
  )
)
WITH CHECK (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE created_by = auth.uid()::text
  )
);

-- Audit Events table policies
-- Users can only access audit events for their own clients
CREATE POLICY "operators_own_client_audit_events" 
ON public.audit_events 
FOR ALL 
USING (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE created_by = auth.uid()::text
  )
)
WITH CHECK (
  client_id IN (
    SELECT id FROM public.clients 
    WHERE created_by = auth.uid()::text
  )
);

-- Webhook Endpoints table policies
-- Only authenticated users can manage webhook endpoints
CREATE POLICY "authenticated_webhook_access" 
ON public.webhook_endpoints 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');