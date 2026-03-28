-- Create visitors table
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip TEXT,
  city TEXT,
  country TEXT,
  isp TEXT,
  lat TEXT,
  lon TEXT,
  timezone TEXT,
  browser TEXT,
  os TEXT,
  platform TEXT,
  language TEXT,
  languages TEXT,
  screen_res TEXT,
  color_depth TEXT,
  device_pixel_ratio TEXT,
  is_online BOOLEAN DEFAULT true,
  cookies_enabled BOOLEAN DEFAULT true,
  do_not_track BOOLEAN DEFAULT false,
  touch_support BOOLEAN DEFAULT false,
  cores TEXT,
  memory TEXT,
  connection_type TEXT,
  referrer TEXT,
  local_time TEXT,
  battery_level TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON public.visitors
  FOR INSERT TO anon WITH CHECK (true);

-- Create storage bucket for visitor photos
INSERT INTO storage.buckets (id, name, public) VALUES ('visitor-photos', 'visitor-photos', false);

-- Allow anonymous uploads to visitor-photos bucket
CREATE POLICY "Allow anonymous uploads" ON storage.objects
  FOR INSERT TO anon WITH CHECK (bucket_id = 'visitor-photos');