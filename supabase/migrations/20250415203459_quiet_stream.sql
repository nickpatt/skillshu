/*
  # Add Profile Insert Policy

  1. Security Changes
    - Add RLS policy to allow users to insert their own profile
    - This is necessary for the signup flow to work correctly

  2. Changes
    - Add new policy "Users can create own profile" for INSERT operations
*/

-- Add policy for profile creation
CREATE POLICY "Users can create own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);