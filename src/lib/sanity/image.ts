import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import type { ImageAsset } from "../types";

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image reference
 */
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Get optimized image URL with specific dimensions
 */
export function getImageUrl(
  image: any,
  width?: number,
  height?: number
): string {
  let imageBuilder = urlFor(image).auto("format").quality(90);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}

/**
 * Convert Sanity image to ImageAsset type
 */
export function sanityImageToAsset(
  image: any,
  alt?: string
): ImageAsset | null {
  if (!image?.asset) return null;

  return {
    url: urlFor(image).url(),
    alt: alt || image.alt || "",
    width: image.asset.metadata?.dimensions?.width,
    height: image.asset.metadata?.dimensions?.height,
  };
}
