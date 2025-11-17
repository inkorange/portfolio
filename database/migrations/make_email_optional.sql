-- Migration: Make author_email optional in comments table
-- Run this in your Supabase SQL Editor to update existing table

-- Make author_email column nullable
ALTER TABLE comments
ALTER COLUMN author_email DROP NOT NULL;

-- Add comment to explain the column is optional
COMMENT ON COLUMN comments.author_email IS 'Optional - kept in schema for future use';
