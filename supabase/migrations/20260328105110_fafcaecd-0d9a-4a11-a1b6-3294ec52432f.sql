CREATE POLICY "Allow anonymous select own row"
ON public.visitors
FOR SELECT
TO anon, authenticated
USING (true);