/*
  # Create storage bucket for profile images

  1. Changes
    - Create a new storage bucket named 'profile-images'
    - Set up public access policies for the bucket
    - Enable file uploads for authenticated users

  2. Security
    - Allow authenticated users to upload files
    - Allow public read access to all files
    - Restrict file types to images only
*/

-- Enable storage if not already enabled
create extension if not exists "storage" schema "extensions";

-- Create the storage bucket
insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true)
on conflict (id) do nothing;

-- Create policy to allow authenticated users to upload files
create policy "Allow authenticated uploads"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-images'
  and (storage.extension(name) = 'jpg'
    or storage.extension(name) = 'jpeg'
    or storage.extension(name) = 'png'
    or storage.extension(name) = 'webp'
  )
);

-- Create policy to allow public read access
create policy "Allow public read access"
on storage.objects
for select
to public
using (bucket_id = 'profile-images');

-- Create policy to allow users to update their own files
create policy "Allow users to update own files"
on storage.objects
for update
to authenticated
using (bucket_id = 'profile-images' and auth.uid()::text = (storage.foldername(name))[1])
with check (bucket_id = 'profile-images' and auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow users to delete their own files
create policy "Allow users to delete own files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'profile-images' and auth.uid()::text = (storage.foldername(name))[1]);