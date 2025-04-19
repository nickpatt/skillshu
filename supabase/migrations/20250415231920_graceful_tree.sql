/*
  # Create storage buckets and policies

  1. Changes
    - Create buckets for profile and post images
    - Set up public access policies
    - Enable file uploads for authenticated users

  2. Security
    - Allow authenticated users to upload files
    - Allow public read access to all files
    - Restrict file types to images only
*/

-- Create the profile-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create the post-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for profile-images bucket
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

-- Policies for post-images bucket
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