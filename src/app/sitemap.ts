import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chriswest.tech' // Update this to your actual domain

  // Fetch all blog posts
  const blogPosts = await client.fetch(`
    *[_type == "blogPost" && defined(slug.current)] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedDate
    }
  `)

  // Fetch all projects
  const projects = await client.fetch(`
    *[_type == "project" && defined(slug.current)] {
      "slug": slug.current,
      "updatedAt": _updatedAt,
      publishedDate
    }
  `)

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/ui`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/art`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Blog post pages
  const blogPostPages = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Project pages
  const projectPages = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPostPages, ...projectPages]
}
