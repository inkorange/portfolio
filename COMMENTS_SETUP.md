# Comments System Setup Guide

This guide will help you set up the custom comment system for your portfolio articles.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Vercel account for hosting (you already have this)

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose a name and database password
4. Wait for the project to be created (~2 minutes)

## Step 2: Set Up the Database

1. In your Supabase project dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `database/schema.sql` into the editor
4. Click "Run" to execute the SQL
5. You should see a success message - your `comments` table is now created!

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to "Project Settings" (gear icon at bottom left)
2. Click on "API" in the settings menu
3. You'll see three important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (different long string)

## Step 4: Add Environment Variables

1. Copy `.env.local.example` to `.env.local` (if you haven't already)
2. Add your Supabase values to `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** The `service_role` key should NEVER be exposed in client-side code!

## Step 5: Deploy to Vercel

1. In your Vercel project dashboard, go to "Settings" > "Environment Variables"
2. Add the three Supabase environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Click "Save"
4. Redeploy your site

## Step 6: Test Locally

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Visit any project page (e.g., http://localhost:3000/projects/your-project-slug)
3. Scroll to the bottom - you should see the comments section!
4. Try submitting a test comment

## Comment Moderation

All new comments start with a `pending` status. You need to approve them manually:

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to Supabase Dashboard > "Table Editor"
2. Click on "comments" table
3. Find the comment you want to approve
4. Click on the `status` field and change it from `pending` to `approved`
5. The comment will now appear on your site!

### Option 2: Using SQL Editor

```sql
-- Approve a comment by ID
UPDATE comments
SET status = 'approved'
WHERE id = 'comment-uuid-here';

-- Approve all pending comments (use carefully!)
UPDATE comments
SET status = 'approved'
WHERE status = 'pending';

-- Reject a comment
UPDATE comments
SET status = 'rejected'
WHERE id = 'comment-uuid-here';
```

## Future: Building an Admin Panel

You can build an admin panel to manage comments:

1. Create `/admin/comments` page
2. Use `supabaseAdmin` client to fetch all comments
3. Add approve/reject buttons
4. Implement API routes to update comment status

## Security Features

The system includes:

- ✅ Row Level Security (RLS) - only approved comments are visible
- ✅ Email validation
- ✅ Content length validation (10-2000 characters)
- ✅ IP address tracking for spam prevention
- ✅ User agent tracking
- ✅ Comments start as "pending" by default
- ✅ Prepared for user authentication (user_id field)

## Adding User Authentication (Future)

When you're ready to require users to log in:

1. Enable email authentication in Supabase:
   - Dashboard > Authentication > Providers
   - Enable "Email" provider
2. Install NextAuth.js or use Supabase Auth
3. Update the comment form to include user authentication
4. The database is already set up with a `user_id` field

## Troubleshooting

### Comments Not Appearing
- Check that comments are set to `status = 'approved'` in Supabase
- Check browser console for API errors
- Verify environment variables are set correctly

### "Failed to submit comment" Error
- Check that the service role key is set correctly
- Check Supabase logs in Dashboard > Logs

### Database Errors
- Verify the schema was created correctly
- Check RLS policies are enabled

## Cost

Supabase free tier includes:
- 500 MB database space
- 5 GB bandwidth
- 50,000 monthly active users

This should be more than enough for a portfolio site!

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
