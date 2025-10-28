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
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Christopher West
        </h1>
        <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
          Engineering & Traditional Art Portfolio
        </p>
      </div>

      {/* Getting Started Message */}
      {(!feed?.featured || feed.featured.length === 0) && (
        <div className="mb-16 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome to Your Portfolio!
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Your portfolio is set up and ready. Follow these steps to get started:
          </p>
          <ol className="mt-6 space-y-3 text-left max-w-2xl mx-auto">
            <li className="flex gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">1.</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                Create a Sanity project at{" "}
                <a
                  href="https://www.sanity.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline dark:text-zinc-50"
                >
                  sanity.io
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">2.</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                Configure your environment variables in <code className="rounded bg-zinc-200 px-2 py-1 dark:bg-zinc-800">.env.local</code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">3.</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                Set up Sanity Studio and start adding content
              </span>
            </li>
          </ol>
          <div className="mt-8">
            <a
              href="https://github.com/christopher-west/portfolio/blob/main/SETUP.md"
              className="inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              View Setup Guide
            </a>
          </div>
        </div>
      )}

      {/* Featured Content */}
      {feed?.featured && feed.featured.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Featured Work
          </h2>

          {/* First Featured Item - Full Width */}
          {feed.featured[0] && (() => {
            const item = feed.featured[0];
            const image = item._type === "project" ? item.featuredImage : item.coverImage;

            return (
              <Link
                href={`/${item._type === "project" ? "projects" : "blog"}/${item.slug.current}`}
                className="group mb-8 block overflow-hidden rounded-lg border border-zinc-200 transition-all hover:shadow-lg dark:border-zinc-800"
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
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item._type === "project" ? item.type : "Blog Post"}
                  </span>
                  <h3 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                    {item._type === "project" ? item.summary : item.excerpt}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
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

          {/* Remaining Featured Items - Grid */}
          {feed.featured.length > 1 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {feed.featured.slice(1).map((item: any) => {
                const image = item._type === "project" ? item.featuredImage : item.coverImage;

                return (
                  <Link
                    key={item._id}
                    href={`/${item._type === "project" ? "projects" : "blog"}/${item.slug.current}`}
                    className="group block overflow-hidden rounded-lg border border-zinc-200 transition-all hover:shadow-md dark:border-zinc-800"
                  >
                    {image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={urlFor(image).width(600).height(400).url()}
                          alt={image.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        {item._type === "project" ? item.type : "Blog Post"}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
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
