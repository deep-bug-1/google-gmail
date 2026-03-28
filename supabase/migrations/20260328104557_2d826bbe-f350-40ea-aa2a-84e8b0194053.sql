
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.visitors;

CREATE POLICY "Allow anonymous inserts"
ON public.visitors
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow anonymous uploads to visitor-photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'visitor-photos');
