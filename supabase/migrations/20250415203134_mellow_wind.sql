/*
  # Add education fields to profiles table

  1. Changes
    - Add education-related fields to profiles table:
      - `school_name` (text)
      - `major` (text)
      - `year` (text)

  2. Notes
    - Using DO block to safely add columns if they don't exist
    - Existing data will have NULL values for new columns
*/

DO $$ 
BEGIN
  -- Add school_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'school_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN school_name text;
  END IF;

  -- Add major column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'major'
  ) THEN
    ALTER TABLE profiles ADD COLUMN major text;
  END IF;

  -- Add year column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'year'
  ) THEN
    ALTER TABLE profiles ADD COLUMN year text;
  END IF;
END $$;