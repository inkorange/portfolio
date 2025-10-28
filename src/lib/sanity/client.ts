import { createClient } from "next-sanity";

// Default placeholder project ID for when Sanity is not configured yet
const PLACEHOLDER_PROJECT_ID = "placeholder";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PLACEHOLDER_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01", // Use current date (YYYY-MM-DD) to target the latest API version
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production for faster response times
  perspective: "published", // Only fetch published content
});

// Optional: Client for draft content (for preview mode)
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PLACEHOLDER_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_TOKEN, // Required for preview mode
});

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== PLACEHOLDER_PROJECT_ID
  );
};
