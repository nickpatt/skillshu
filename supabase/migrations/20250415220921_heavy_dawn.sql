/*
  # Add Avatar URL Field to Profiles

  1. Changes
    - Add avatar_url column to profiles table
    - Make it nullable to allow gradual adoption
    - Default to null

  2. Notes
    - Using DO block to safely add column if it doesn't exist
*/

DO $$ 
BEGIN
  -- Add avatar_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;