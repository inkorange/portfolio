import { groq } from "next-sanity";

// Common fragments
const imageFragment = groq`
  asset-> {
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
`;

const projectFields = groq`
  _id,
  _type,
  title,
  slug,
  type,
  summary,
  author,
  keywords,
  description,
  "featuredImage": featuredImage {
    ${imageFragment}
  },
  "images": images[] {
    ${imageFragment}
  },
  tags,
  technologies,
  publishedDate,
  featured,
  externalLink,
  githubLink
`;

const blogPostFields = groq`
  _id,
  _type,
  title,
  slug,
  excerpt,
  author,
  keywords,
  content,
  "coverImage": coverImage {
    ${imageFragment}
  },
  publishedDate,
  tags,
  featured
`;

// Project Queries

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedDate desc) {
    ${projectFields}
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedDate desc) {
    ${projectFields}
  }
`;

export const projectsByTypeQuery = (type: "UI" | "Art") => groq`
  *[_type == "project" && type == "${type}"] | order(publishedDate desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = (slug: string) => groq`
  *[_type == "project" && slug.current == "${slug}"][0] {
    ${projectFields}
  }
`;

export const nextProjectQuery = (publishedDate: string, type: string) => groq`
  *[_type == "project" && type == "${type}" && publishedDate < "${publishedDate}"] | order(publishedDate desc) [0] {
    _id,
    title,
    slug,
    type,
    "featuredImage": featuredImage {
      ${imageFragment}
    }
  }
`;

export const previousProjectQuery = (publishedDate: string, type: string) => groq`
  *[_type == "project" && type == "${type}" && publishedDate > "${publishedDate}"] | order(publishedDate asc) [0] {
    _id,
    title,
    slug,
    type,
    "featuredImage": featuredImage {
      ${imageFragment}
    }
  }
`;

// Blog Post Queries

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedDate desc) {
    ${blogPostFields}
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedDate desc) {
    ${blogPostFields}
  }
`;

export const blogPostBySlugQuery = (slug: string) => groq`
  *[_type == "blogPost" && slug.current == "${slug}"][0] {
    ${blogPostFields}
  }
`;

export const nextBlogPostQuery = (publishedDate: string) => groq`
  *[_type == "blogPost" && publishedDate < "${publishedDate}"] | order(publishedDate desc) [0] {
    _id,
    title,
    slug,
    "coverImage": coverImage {
      ${imageFragment}
    }
  }
`;

export const previousBlogPostQuery = (publishedDate: string) => groq`
  *[_type == "blogPost" && publishedDate > "${publishedDate}"] | order(publishedDate asc) [0] {
    _id,
    title,
    slug,
    "coverImage": coverImage {
      ${imageFragment}
    }
  }
`;

export const recentBlogPostsQuery = (limit: number = 3) => groq`
  *[_type == "blogPost"] | order(publishedDate desc) [0...${limit}] {
    ${blogPostFields}
  }
`;

// Homepage Feed Query (Projects only)

export const homepageFeedQuery = groq`
  {
    "featured": *[_type == "project" && featured == true] | order(publishedDate desc) [0...6] {
      _id,
      _type,
      title,
      slug,
      publishedDate,
      author,
      type,
      summary,
      "featuredImage": featuredImage {
        ${imageFragment}
      },
      tags
    },
    "recent": *[_type == "project"] | order(publishedDate desc) [0...10] {
      _id,
      _type,
      title,
      slug,
      publishedDate,
      author,
      featured,
      type,
      summary,
      description,
      "featuredImage": featuredImage {
        ${imageFragment}
      },
      tags
    }
  }
`;

// About Query

export const aboutQuery = groq`
  *[_type == "about"] | order(_updatedAt desc) [0] {
    _id,
    _type,
    bio,
    "profileImage": profileImage {
      ${imageFragment}
    },
    skills,
    socialLinks[] {
      platform,
      url
    }
  }
`;

// Related Projects Query (by matching tags)
export const relatedProjectsQuery = (projectId: string, tags: string[], type: string, limit: number = 3) => {
  const tagsFilter = tags.length > 0 ? `&& count((tags[])[@ in ${JSON.stringify(tags)}]) > 0` : '';
  return groq`
    *[_type == "project" && _id != "${projectId}" && type == "${type}" ${tagsFilter}] | order(publishedDate desc) [0...${limit}] {
      _id,
      title,
      slug,
      type,
      summary,
      publishedDate,
      "featuredImage": featuredImage {
        ${imageFragment}
      },
      tags
    }
  `;
};

// Product Queries

const productFields = groq`
  _id,
  _type,
  title,
  summary,
  "image": image {
    ${imageFragment}
  },
  url_link,
  "article_link": article_link-> {
    _type,
    _id,
    title,
    slug
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    ${productFields}
  }
`;

export const featuredProductsQuery = (limit: number = 3) => groq`
  *[_type == "product"] | order(_createdAt desc) [0...${limit}] {
    ${productFields}
  }
`;

// Utility Queries

export const allSlugsQuery = (type: "project" | "blogPost") => groq`
  *[_type == "${type}"] {
    "slug": slug.current
  }
`;
