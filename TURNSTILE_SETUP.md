# Cloudflare Turnstile Setup Guide

This guide will help you set up Cloudflare Turnstile for spam protection on your comment forms.

## What is Cloudflare Turnstile?

Cloudflare Turnstile is a privacy-friendly CAPTCHA alternative that verifies users are human without requiring them to solve puzzles. It runs invisibly in the background and is free to use.

## Setup Instructions

### 1. Get Your Turnstile Keys

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** (or visit: https://dash.cloudflare.com/?to=/:account/turnstile)
3. Click **"Add Site"** or **"Create"**
4. Fill in the form:
   - **Site name**: Your portfolio name (e.g., "Chris West Portfolio")
   - **Domain**: Your domain (e.g., `chriswest.tech`)
     - For local development, you can use `localhost`
   - **Widget mode**: Select **"Managed"** (automatically chooses between invisible and non-interactive)
5. Click **"Create"**
6. Copy your **Site Key** and **Secret Key**

### 2. Add Environment Variables

Add the following to your `.env.local` file:

```bash
# Cloudflare Turnstile (for comment spam protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

**Important**:
- Replace `your_site_key_here` and `your_secret_key_here` with your actual keys
- The `NEXT_PUBLIC_` prefix makes the site key available to the client
- The secret key is server-side only and should NEVER be exposed to the client

### 3. Deployment

When deploying to production (Vercel, Netlify, etc.), make sure to add these environment variables to your hosting platform:

**Vercel:**
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
4. Redeploy your site

**Netlify:**
1. Go to Site settings → Build & deploy → Environment
2. Add both environment variables
3. Trigger a new deployment

### 4. Testing

1. Start your development server: `npm run dev`
2. Navigate to any article with comments
3. Try submitting a comment
4. You should see the Turnstile widget appear before submission
5. The form will only submit after verification completes

### 5. Optional: Disable for Development

If you want to disable Turnstile during development, simply don't set the environment variables in your `.env.local` file. The comment form will work without verification.

## How It Works

1. **Frontend**: The Turnstile widget appears in the comment form and runs verification automatically
2. **Verification**: When a user submits a comment, Turnstile generates a token
3. **Backend**: The API verifies the token with Cloudflare's servers before accepting the comment
4. **Graceful Fallback**: If Turnstile is not configured, comments still work (no verification)

## Widget Modes

Turnstile offers different widget modes:

- **Managed** (Recommended): Automatically chooses between invisible and non-interactive based on the visitor
- **Non-Interactive**: Always shows a checkbox but doesn't require user interaction
- **Invisible**: Completely invisible to users

To change the mode, update it in the Cloudflare Dashboard under your site settings.

## Customization

The Turnstile widget is configured in `/src/components/comments/CommentForm.tsx`:

```tsx
<Turnstile
  siteKey={siteKey}
  onSuccess={(token) => setTurnstileToken(token)}
  onError={() => setTurnstileToken(null)}
  onExpire={() => setTurnstileToken(null)}
  options={{
    theme: 'dark',  // Change to 'light' for light theme
    size: 'normal', // Options: 'normal', 'compact'
  }}
/>
```

## Troubleshooting

### Widget not appearing
- Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in your environment
- Verify the domain in Cloudflare matches your current domain
- Check browser console for errors

### Verification always fails
- Ensure `TURNSTILE_SECRET_KEY` is correct
- Check that your secret key matches the site key
- Verify your server can reach `challenges.cloudflare.com`

### Testing on localhost
- Add `localhost` as a domain in your Turnstile site settings on Cloudflare

## Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
