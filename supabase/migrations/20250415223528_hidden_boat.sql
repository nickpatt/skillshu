/*
  # Update posts table with additional fields

  1. Changes
    - Add image_urls column for post images (array of URLs)
    - Add views and applications count
    - Add skills column
    - Add timestamps for tracking

  2. Notes
    - Using array type for multiple image support
    - Adding counters for analytics
    - Skills stored as text array for better querying
*/

DO $$ 
BEGIN
  -- Add image_urls column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE posts ADD COLUMN image_urls text[];
  END IF;

  -- Add views column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'views'
  ) THEN
    ALTER TABLE posts ADD COLUMN views integer DEFAULT 0;
  END IF;

  -- Add applications column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'applications'
  ) THEN
    ALTER TABLE posts ADD COLUMN applications integer DEFAULT 0;
  END IF;

  -- Add skills column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'skills'
  ) THEN
    ALTER TABLE posts ADD COLUMN skills text[];
  END IF;
END $$;