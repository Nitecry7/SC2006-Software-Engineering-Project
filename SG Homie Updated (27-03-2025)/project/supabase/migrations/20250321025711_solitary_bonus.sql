/*
  # Add additional profile fields

  1. Changes
    - Add work_location (text) for storing user's workplace location
    - Add income_range (text) for storing user's income bracket
    - Add family_members (integer) for storing household size

  2. Security
    - Existing RLS policies will automatically apply to new columns
    - No additional security changes needed
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS work_location text,
ADD COLUMN IF NOT EXISTS income_range text,
ADD COLUMN IF NOT EXISTS family_members integer;