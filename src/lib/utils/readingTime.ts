import type { PortableTextBlock } from "next-sanity";

/**
 * Calculate estimated reading time for content
 * @param content - Portable Text content array
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  content: PortableTextBlock[] | null | undefined,
  wordsPerMinute: number = 200
): number {
  if (!content || !Array.isArray(content)) {
    return 1;
  }

  // Extract text from Portable Text blocks
  const text = content
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children
          .map((child: any) => child.text || "")
          .join(" ");
      }
      return "";
    })
    .join(" ");

  // Count words
  const wordCount = text.trim().split(/\s+/).length;

  // Calculate reading time (minimum 1 minute)
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime);
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
