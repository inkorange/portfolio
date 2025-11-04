import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { ImageAsset } from "@/lib/types";

interface NavigationItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  featuredImage?: ImageAsset;
  coverImage?: ImageAsset;
}

interface ArticleNavigationProps {
  previous: NavigationItem | null;
  next: NavigationItem | null;
  basePath: string; // e.g., "/projects" or "/blog"
  viewAllPath: string; // e.g., "/projects/ui" or "/blog"
  viewAllLabel: string; // e.g., "Technology" or "Traditional Art"
}

export default function ArticleNavigation({
  previous,
  next,
  basePath,
  viewAllPath,
  viewAllLabel,
}: ArticleNavigationProps) {
  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous / All Link */}
        <div>
          {previous ? (
            <Link
              href={`${basePath}/${previous.slug.current}`}
              className="group block rounded-lg border border-white/20 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="text-xs text-zinc-400 mb-3">Previous</div>
              <div className="flex gap-3">
                {(previous.featuredImage || previous.coverImage) && (
                  <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-zinc-800">
                    <Image
                      src={urlFor(
                        previous.featuredImage || previous.coverImage!
                      )
                        .width(100)
                        .height(75)
                        .url()}
                      alt={
                        (previous.featuredImage || previous.coverImage)?.alt ||
                        previous.title
                      }
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div className="flex-1 flex items-center">
                  <div className="text-sm font-medium text-white group-hover:text-zinc-100">
                    {previous.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={viewAllPath}
              className="group block rounded-lg border border-white/20 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="text-xs text-zinc-400">View All</div>
              <div className="mt-1 text-sm font-medium text-white group-hover:text-zinc-100">
                {viewAllLabel}
              </div>
            </Link>
          )}
        </div>

        {/* Next / All Link */}
        <div>
          {next ? (
            <Link
              href={`${basePath}/${next.slug.current}`}
              className="group block rounded-lg border border-white/20 bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="text-xs text-zinc-400 text-right mb-3">Next</div>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center justify-end">
                  <div className="text-sm font-medium text-white text-right group-hover:text-zinc-100">
                    {next.title}
                  </div>
                </div>
                {(next.featuredImage || next.coverImage) && (
                  <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded bg-zinc-800">
                    <Image
                      src={urlFor(next.featuredImage || next.coverImage!)
                        .width(100)
                        .height(75)
                        .url()}
                      alt={
                        (next.featuredImage || next.coverImage)?.alt ||
                        next.title
                      }
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <Link
              href={viewAllPath}
              className="group block rounded-lg border border-white/20 bg-white/5 p-4 text-right transition-colors hover:bg-white/10"
            >
              <div className="text-xs text-zinc-400">View All</div>
              <div className="mt-1 text-sm font-medium text-white group-hover:text-zinc-100">
                {viewAllLabel}
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
