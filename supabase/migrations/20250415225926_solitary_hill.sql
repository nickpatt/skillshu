-- Enable storage
DO $$ 
BEGIN
  -- Create storage bucket for profile images if it doesn't exist
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('profile-images', 'profile-images', true)
  ON CONFLICT (id) DO NOTHING;

  -- Create storage policy to allow authenticated users to upload their own images
  CREATE POLICY "Users can upload their own profile images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

  -- Create storage policy to allow public access to profile images
  CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'profile-images');
END $$;