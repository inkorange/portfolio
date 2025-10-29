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

export const recentBlogPostsQuery = (limit: number = 3) => groq`
  *[_type == "blogPost"] | order(publishedDate desc) [0...${limit}] {
    ${blogPostFields}
  }
`;

// Homepage Feed Query (Combined projects and blog posts)

export const homepageFeedQuery = groq`
  {
    "featured": *[_type in ["project", "blogPost"] && featured == true] | order(publishedDate desc) [0...6] {
      _id,
      _type,
      title,
      slug,
      publishedDate,
      _type == "project" => {
        type,
        summary,
        "featuredImage": featuredImage {
          ${imageFragment}
        },
        tags
      },
      _type == "blogPost" => {
        excerpt,
        "coverImage": coverImage {
          ${imageFragment}
        },
        tags
      }
    },
    "recent": *[_type in ["project", "blogPost"]] | order(publishedDate desc) [0...10] {
      _id,
      _type,
      title,
      slug,
      publishedDate,
      featured,
      _type == "project" => {
        type,
        summary,
        "featuredImage": featuredImage {
          ${imageFragment}
        },
        tags
      },
      _type == "blogPost" => {
        excerpt,
        "coverImage": coverImage {
          ${imageFragment}
        },
        tags
      }
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

// Utility Queries

export const allSlugsQuery = (type: "project" | "blogPost") => groq`
  *[_type == "${type}"] {
    "slug": slug.current
  }
`;
