import { client } from '@/lib/sanity/client'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chriswest.tech'

  const projects = await client.fetch(`
    *[_type == "project" && defined(slug.current)] | order(publishedDate desc) [0...25] {
      title,
      "slug": slug.current,
      summary,
      publishedDate,
      author,
      type
    }
  `)

  const feedItems = projects
    .map(
      (project: any) => `    <item>
      <title><![CDATA[${project.title}]]></title>
      <link>${siteUrl}/article/${project.slug}</link>
      <guid isPermaLink="true">${siteUrl}/article/${project.slug}</guid>
      <description><![CDATA[${project.summary || ''}]]></description>
      <pubDate>${new Date(project.publishedDate).toUTCString()}</pubDate>
      <author>${project.author || 'Chris West'}</author>
      <category>${project.type === 'UI' ? 'Technology' : 'Traditional Art'}</category>
    </item>`
    )
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chris West - Engineering &amp; Art Portfolio</title>
    <link>${siteUrl}</link>
    <description>Technology projects and traditional art by Chris West</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${feedItems}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
