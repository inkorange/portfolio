import { client, isSanityConfigured } from "./client";
import {
  allProjectsQuery,
  featuredProjectsQuery,
  projectsByTypeQuery,
  projectBySlugQuery,
  nextProjectQuery,
  previousProjectQuery,
  relatedProjectsQuery,
  allBlogPostsQuery,
  featuredBlogPostsQuery,
  blogPostBySlugQuery,
  nextBlogPostQuery,
  previousBlogPostQuery,
  recentBlogPostsQuery,
  homepageFeedQuery,
  aboutQuery,
  allSlugsQuery,
} from "./queries";
import type { Project, BlogPost, About, ProjectType, ImageAsset } from "../types";

// Project fetching functions

export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(allProjectsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(featuredProjectsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectsByType(type: ProjectType): Promise<Project[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(projectsByTypeQuery(type), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching ${type} projects:`, error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(projectBySlugQuery(slug), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

export async function getNextProject(publishedDate: string, type: ProjectType): Promise<{ _id: string; title: string; slug: { current: string }; type: string; featuredImage?: ImageAsset } | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(nextProjectQuery(publishedDate, type), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching next project:`, error);
    return null;
  }
}

export async function getPreviousProject(publishedDate: string, type: ProjectType): Promise<{ _id: string; title: string; slug: { current: string }; type: string; featuredImage?: ImageAsset } | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(previousProjectQuery(publishedDate, type), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching previous project:`, error);
    return null;
  }
}

export async function getRelatedProjects(projectId: string, tags: string[], type: ProjectType, limit: number = 3): Promise<Project[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(relatedProjectsQuery(projectId, tags, type, limit), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching related projects:`, error);
    return [];
  }
}

// Blog post fetching functions

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(allBlogPostsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(featuredBlogPostsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(blogPostBySlugQuery(slug), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

export async function getNextBlogPost(publishedDate: string): Promise<{ _id: string; title: string; slug: { current: string }; coverImage?: ImageAsset } | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(nextBlogPostQuery(publishedDate), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching next blog post:`, error);
    return null;
  }
}

export async function getPreviousBlogPost(publishedDate: string): Promise<{ _id: string; title: string; slug: { current: string }; coverImage?: ImageAsset } | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(previousBlogPostQuery(publishedDate), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error(`Error fetching previous blog post:`, error);
    return null;
  }
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(recentBlogPostsQuery(limit), {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching recent blog posts:", error);
    return [];
  }
}

// Homepage feed

export async function getHomepageFeed() {
  if (!isSanityConfigured()) return { featured: [], recent: [] };
  try {
    return await client.fetch(homepageFeedQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching homepage feed:", error);
    return { featured: [], recent: [] };
  }
}

// About page

export async function getAbout(): Promise<About | null> {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(aboutQuery, {}, { next: { revalidate: 3600 } }); // Cache for 1 hour
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
}

// Utility functions for generating static paths

export async function getAllProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];
  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      allSlugsQuery("project"),
      {},
      { next: { revalidate: 3600 } }
    );
    return slugs.map((item) => item.slug);
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return [];
  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      allSlugsQuery("blogPost"),
      {},
      { next: { revalidate: 3600 } }
    );
    return slugs.map((item) => item.slug);
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return [];
  }
}
