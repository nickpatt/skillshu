/*
  # Add Post Images Storage Bucket

  1. Changes
    - Create storage bucket for post images
    - Add policies for authenticated users to upload images
    - Add policies for public access to images

  2. Security
    - Only authenticated users can upload images
    - Users can only upload to their own folder
    - Images are publicly accessible
*/

DO $$ 
BEGIN
  -- Create storage bucket for post images if it doesn't exist
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('post-images', 'post-images', true)
  ON CONFLICT (id) DO NOTHING;

  -- Create storage policy to allow authenticated users to upload their own images
  CREATE POLICY "Users can upload their own post images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

  -- Create storage policy to allow public access to post images
  CREATE POLICY "Post images are publicly accessible"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'post-images');

  -- Create storage policy to allow users to delete their own images
  CREATE POLICY "Users can delete their own post images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
END $$;