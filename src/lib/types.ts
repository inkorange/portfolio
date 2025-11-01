// Content type definitions for portfolio site

export type ProjectType = "UI" | "Art";

export interface Slug {
  current: string;
  _type: "slug";
}

export interface ImageAsset {
  _key?: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: Slug;
  type: ProjectType;
  summary: string;
  author: string;
  keywords?: string;
  description?: string; // Rich text content
  images: ImageAsset[];
  featuredImage: ImageAsset;
  tags: string[];
  technologies?: string[]; // For UI projects
  publishedDate: string;
  featured: boolean;
  externalLink?: string;
  githubLink?: string;
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: Slug;
  excerpt: string;
  author: string;
  keywords?: string;
  content: string; // Rich text content
  coverImage?: ImageAsset;
  publishedDate: string;
  tags: string[];
  featured: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface About {
  _id: string;
  _type: "about";
  bio: string; // Rich text content
  profileImage?: ImageAsset;
  skills: string[];
  socialLinks: SocialLink[];
}

// Combined type for homepage feed
export type FeedItem = (Project | BlogPost) & {
  itemType: "project" | "blog";
};

// Filter types
export type ProjectFilter = "all" | "ui" | "art";

// API response types
export interface ProjectsResponse {
  projects: Project[];
  total: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
}
