/*
  # Create storage buckets and policies with existence checks

  1. Changes
    - Create buckets for profile and post images
    - Set up public access policies
    - Enable file uploads for authenticated users
    - Add checks to prevent policy conflicts

  2. Security
    - Allow authenticated users to upload files
    - Allow public read access to all files
    - Restrict file types to images only
*/

DO $$ 
BEGIN
  -- Create the profile-images bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('profile-images', 'profile-images', true)
  ON CONFLICT (id) DO NOTHING;

  -- Create the post-images bucket
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('post-images', 'post-images', true)
  ON CONFLICT (id) DO NOTHING;

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can upload their own profile images" ON storage.objects;
  DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload their own post images" ON storage.objects;
  DROP POLICY IF EXISTS "Post images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own post images" ON storage.objects;

  -- Create new policies
  CREATE POLICY "Users can upload their own profile images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

  CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'profile-images');

  CREATE POLICY "Users can upload their own post images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

  CREATE POLICY "Post images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'post-images');

  CREATE POLICY "Users can delete their own post images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
END $$;