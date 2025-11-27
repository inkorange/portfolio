import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Use environment variable for deployed domain, fallback for local dev
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'dubgtcg',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
