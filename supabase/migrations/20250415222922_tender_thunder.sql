/*
  # Add post status enum type and update posts table

  1. Changes
    - Create enum type for post status
    - Update posts table to use enum type
    - Add default value for status

  2. Notes
    - Using DO block for safe type creation
    - Handling existing data conversion
    - Setting appropriate default value
*/

DO $$ 
BEGIN
  -- Create enum type if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_status') THEN
    CREATE TYPE post_status AS ENUM ('OPEN_TO_WORK', 'IN_PROGRESS', 'COMPLETED', 'CLOSED');
  END IF;
END $$;

-- Create a temporary column with the new type
ALTER TABLE posts ADD COLUMN status_new post_status;

-- Update the temporary column with converted values
UPDATE posts SET status_new = 
  CASE status
    WHEN 'OPEN TO WORK' THEN 'OPEN_TO_WORK'::post_status
    WHEN 'IN PROGRESS' THEN 'IN_PROGRESS'::post_status
    WHEN 'COMPLETED' THEN 'COMPLETED'::post_status
    WHEN 'CLOSED' THEN 'CLOSED'::post_status
    ELSE 'OPEN_TO_WORK'::post_status
  END;

-- Drop the old column and rename the new one
ALTER TABLE posts DROP COLUMN status;
ALTER TABLE posts RENAME COLUMN status_new TO status;

-- Set the default value and not null constraint
ALTER TABLE posts 
  ALTER COLUMN status SET DEFAULT 'OPEN_TO_WORK'::post_status,
  ALTER COLUMN status SET NOT NULL;