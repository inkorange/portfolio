-- Comments table for article/project comments
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT, -- Optional - kept in schema for future use
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- For future auth integration
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT, -- For spam prevention
  user_agent TEXT  -- For spam prevention
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_comments_project_slug ON comments(project_slug);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved comments
CREATE POLICY "Anyone can view approved comments"
  ON comments FOR SELECT
  USING (status = 'approved');

-- Policy: Anyone can insert comments (they start as pending)
CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (status = 'pending');

-- Policy: Service role can do anything (for admin operations via API)
-- This will be used by your backend API routes

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE
  ON comments FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Optional: Create a view for public comments (approved only)
CREATE OR REPLACE VIEW public_comments AS
  SELECT
    id,
    project_slug,
    author_name,
    content,
    created_at
  FROM comments
  WHERE status = 'approved'
  ORDER BY created_at DESC;
