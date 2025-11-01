# Chris West - Portfolio

A modern portfolio website showcasing UI/Engineering projects and traditional art, built with Next.js and Sanity CMS.

## Features

- **Project Showcase**: Display UI/Engineering and Traditional Art projects
- **Blog/News**: Share updates, thoughts, and articles
- **Headless CMS**: Manage content easily with Sanity
- **Responsive Design**: Beautiful on all devices
- **TypeScript**: Fully typed for better development experience
- **Hybrid Styling**: Tailwind CSS + SCSS Modules for flexibility
- **SEO Optimized**: Dynamic sitemap and robots.txt generation
- **Analytics**: Google Tag Manager integration

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + SCSS Modules
- **CMS**: Sanity
- **Fonts**: Noto Sans Display & Roboto Mono
- **Analytics**: Google Tag Manager

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js pages and routes
│   ├── components/       # React components
│   └── lib/             # Utilities, types, and Sanity config
├── sanity/              # Sanity schemas
└── SETUP.md            # Detailed setup instructions
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

See **[SETUP.md](./SETUP.md)** for detailed instructions on:
- Creating your Sanity project
- Configuring environment variables
- Setting up Sanity Studio
- Adding your first content

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Pages

- `/` - Homepage with featured projects and blog posts
- `/projects` - All projects
- `/projects/ui` - UI/Engineering projects
- `/projects/art` - Traditional art projects
- `/projects/[slug]` - Individual project details
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/about` - About page

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and configuration guide
- **[SCSS_MODULES_GUIDE.md](./SCSS_MODULES_GUIDE.md)** - How to use SCSS modules alongside Tailwind
- **[Next.js Docs](https://nextjs.org/docs)** - Learn about Next.js
- **[Sanity Docs](https://www.sanity.io/docs)** - Learn about Sanity CMS
- **[Tailwind Docs](https://tailwindcss.com/docs)** - Learn about Tailwind CSS

## Deployment

This project is ready to deploy to:
- Vercel (recommended)
- Netlify
- Railway
- Any Node.js hosting platform

See [SETUP.md](./SETUP.md#deployment) for deployment instructions.
