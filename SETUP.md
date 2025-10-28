# Portfolio Setup Guide

This guide will walk you through setting up your portfolio website with Sanity CMS.

## What's Been Set Up

✅ **Foundation (Phase 1 - Complete)**
- Folder structure for components and libraries
- TypeScript types for all content models
- Navigation and Footer components
- Root layout with proper structure

✅ **Sanity CMS Integration (Phase 2 - Complete)**
- Sanity client configuration
- Content schemas (Project, Blog Post, About)
- GROQ queries for fetching data
- Image optimization utilities

✅ **Page Structure (Phase 3 - Complete)**
- Homepage (needs content update)
- `/projects` - All projects listing
- `/projects/ui` - UI/Engineering projects
- `/projects/art` - Traditional art projects
- `/projects/[slug]` - Individual project pages
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/about` - About page

## Quick Start

### 1. Create a Sanity Project

1. Go to [https://www.sanity.io](https://www.sanity.io) and sign up/login
2. Create a new project
3. Note your **Project ID** and **Dataset name** (usually "production")

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token_here
   ```

3. To create an API token:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to **API** → **Tokens**
   - Create a new token with **Viewer** permissions

### 3. Initialize Sanity Studio

You have two options for managing content:

#### Option A: Embedded Studio (Recommended)

Create a Sanity Studio route in your Next.js app:

```bash
mkdir -p src/app/studio
```

Create `src/app/studio/[[...tool]]/page.tsx`:
```typescript
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

Install the required package:
```bash
npm install next-sanity
```

Access the Studio at: `http://localhost:3000/studio`

#### Option B: Standalone Studio

Deploy Sanity Studio separately using:
```bash
npx sanity init
```

### 4. Deploy Schemas to Sanity

Run this command to deploy your content schemas:
```bash
npx sanity schema deploy
```

Or if using the Sanity CLI:
```bash
npx sanity deploy
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## Adding Content

### Adding Your First Project

1. Access Sanity Studio (either at `/studio` or your deployed studio)
2. Click **Project** → **Create new**
3. Fill in the fields:
   - **Title**: Your project name
   - **Slug**: Auto-generates from title (click "Generate")
   - **Type**: Choose "UI/Engineering" or "Traditional Art"
   - **Summary**: Brief description (max 300 chars)
   - **Description**: Full project details (rich text)
   - **Featured Image**: Upload main project image
   - **Gallery Images**: Upload additional images
   - **Tags**: Add relevant tags
   - **Technologies**: (UI projects only) List tech stack
   - **Published Date**: When the project was completed
   - **Featured**: Toggle to show prominently on homepage
   - **External Link**: Live project URL
   - **GitHub Link**: Repository URL (UI projects)
4. Click **Publish**

### Adding a Blog Post

1. In Sanity Studio, click **Blog Post** → **Create new**
2. Fill in:
   - **Title**: Post title
   - **Slug**: Auto-generates from title
   - **Excerpt**: Brief summary (max 250 chars)
   - **Content**: Full post content (supports rich text, images, code blocks)
   - **Cover Image**: Optional featured image
   - **Published Date**: Publication date
   - **Tags**: Categorize your post
   - **Featured**: Show on homepage
3. Click **Publish**

### Setting Up About Page

1. In Sanity Studio, click **About** → **Create** (or edit existing)
2. Fill in:
   - **Bio**: Your background and story (rich text)
   - **Profile Image**: Your photo
   - **Skills**: List your skills (press Enter to add each)
   - **Social Links**: Add your social profiles
     - Platform: Choose from dropdown
     - URL: Full URL to your profile
3. Click **Publish**

## Next Steps

### Phase 4: Homepage Enhancement

Update `src/app/page.tsx` to use the `getHomepageFeed()` function to display:
- Featured projects and blog posts
- Recent content
- Filter/sort functionality

### Phase 5: Component Development

Create reusable components in `src/components/`:

**UI Components** (`src/components/ui/`):
- `<ProjectCard>` - Display project preview
- `<BlogCard>` - Display blog post preview
- `<TagBadge>` - Styled tag badges
- `<FilterTabs>` - Filter UI/Art projects

**Project Components** (`src/components/projects/`):
- `<ProjectGrid>` - Grid layout for projects
- `<ImageGallery>` - Photo gallery for project details

**Blog Components** (`src/components/blog/`):
- `<BlogList>` - Blog post listing
- `<PortableText>` - Render Sanity rich text content

### Phase 6: Rich Text Rendering

Install Portable Text for rendering Sanity rich content:
```bash
npm install @portabletext/react
```

Create a component to render blog content and project descriptions.

### Phase 7: Enhancements

- Add search functionality
- Implement pagination for large lists
- Add related projects section
- Create RSS feed for blog
- Add analytics (Google Analytics, Plausible, etc.)
- Set up Open Graph images for social sharing
- Implement dark mode toggle (if desired)

## Troubleshooting

### Cannot connect to Sanity

- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that your dataset name matches (usually "production")
- Ensure API token has proper permissions

### No content appearing

- Make sure you've published content in Sanity Studio (not just saved as draft)
- Check the published date is not in the future
- Verify the content type matches the query (project vs blogPost)

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set
- Verify Sanity schemas are deployed: `npx sanity schema deploy`

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx         # Root layout with nav/footer
│   │   ├── page.tsx           # Homepage
│   │   ├── projects/          # Projects pages
│   │   ├── blog/              # Blog pages
│   │   └── about/             # About page
│   ├── components/
│   │   ├── layout/            # Navigation, Footer
│   │   ├── ui/                # Reusable UI components
│   │   ├── projects/          # Project-specific components
│   │   └── blog/              # Blog-specific components
│   └── lib/
│       ├── types.ts           # TypeScript type definitions
│       ├── sanity/            # Sanity configuration
│       │   ├── client.ts      # Sanity client
│       │   ├── queries.ts     # GROQ queries
│       │   ├── fetch.ts       # Data fetching functions
│       │   └── image.ts       # Image utilities
│       └── utils/             # Utility functions
├── sanity/
│   └── schemas/               # Sanity content schemas
│       ├── project.ts
│       ├── blogPost.ts
│       └── about.ts
├── sanity.config.ts           # Sanity Studio config
├── sanity.cli.ts              # Sanity CLI config
└── .env.local                 # Environment variables (not in git)
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js app can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting

Make sure to set environment variables in your deployment platform.

## Support

For Next.js issues: https://nextjs.org/docs
For Sanity issues: https://www.sanity.io/docs
For Tailwind CSS: https://tailwindcss.com/docs
