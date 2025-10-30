import Link from "next/link";
import Image from "next/image";
import { getHomepageFeed } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export default async function Home() {
  const feed = await getHomepageFeed();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          Engineering and Art Portfolio
        </h1>
        <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
          from the mind of Chris West
        </p>
      </div>

      {/* Recent Articles */}
      {feed?.recent && feed.recent.length > 0 && (
        <div className="mb-16">
          {/* Most Recent Article - Full Width Hero */}
          {feed.recent[0] && (() => {
            const item = feed.recent[0];
            const image = item._type === "project" ? item.featuredImage : item.coverImage;

            return (
              <Link
                href={`/${item._type === "project" ? "projects" : "blog"}/${item.slug.current}`}
                className="group mb-12 block overflow-hidden rounded-lg border border-zinc-200 bg-black/75 transition-all hover:shadow-lg dark:border-zinc-800"
              >
                {image && (
                  <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={urlFor(image).width(1400).height(600).url()}
                      alt={image.alt || item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-zinc-300">
                      {item._type === "project" ? item.type : "Blog Post"}
                    </span>
                    <span className="text-sm text-zinc-400">•</span>
                    <time className="text-sm text-zinc-400">
                      {new Date(item.publishedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg text-zinc-300">
                    {item._type === "project" ? item.summary : item.excerpt}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })()}

          {/* Remaining Recent Articles - List Layout with Thumbnails */}
          {feed.recent.length > 1 && (
            <div className="space-y-6">
              {feed.recent.slice(1, 10).map((item: any) => {
                const image = item._type === "project" ? item.featuredImage : item.coverImage;

                return (
                  <Link
                    key={item._id}
                    href={`/${item._type === "project" ? "projects" : "blog"}/${item.slug.current}`}
                    className="group flex gap-6 overflow-hidden rounded-lg border border-zinc-200 bg-black/75 transition-all hover:shadow-md dark:border-zinc-800"
                  >
                    {/* Thumbnail Image on Left */}
                    {image && (
                      <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={urlFor(image).width(400).height(300).url()}
                          alt={image.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="192px"
                        />
                      </div>
                    )}

                    {/* Content on Right */}
                    <div className="flex flex-1 flex-col justify-center py-4 pr-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-300">
                          {item._type === "project" ? item.type : "Blog Post"}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <time className="text-xs text-zinc-400">
                          {new Date(item.publishedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-white sm:text-lg lg:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                        {item._type === "project" ? item.summary : item.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/projects/ui"
          className="group rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            UI & Engineering →
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Browse software engineering projects and UI designs
          </p>
        </Link>

        <Link
          href="/projects/art"
          className="group rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Traditional Art →
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            View traditional art portfolio and gallery
          </p>
        </Link>

        <Link
          href="/blog"
          className="group rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Blog →
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Read latest updates and articles
          </p>
        </Link>
      </div>
    </div>
  );
}
