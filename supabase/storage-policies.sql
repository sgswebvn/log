-- Create storage bucket for images if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Allow anyone to upload images
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'images');

-- Allow anyone to view images
CREATE POLICY "Allow public access" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'images');

-- Allow anyone to delete images
CREATE POLICY "Allow public deletes" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'images');

-- Allow anyone to update images
CREATE POLICY "Allow public updates" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');
