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
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          Engineering and Art Reflections
        </h1>
        <p className="mt-6 text-xl text-zinc-400">
          from the mind of a seasoned tech leader
        </p>
      </div>

      {/* Recent Articles */}
      {feed?.recent && feed.recent.length > 0 && (
        <div className="mb-16">
          {/* Most Recent Article - Full Width Hero */}
          {feed.recent[0] && (() => {
            const item = feed.recent[0];

            return (
              <Link
                href={`/projects/${item.slug.current}`}
                className="group mb-12 block overflow-hidden rounded-lg border border-zinc-800 bg-black/75 transition-all hover:shadow-lg"
              >
                {item.featuredImage && (
                  <div className="relative aspect-[21/11] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={urlFor(item.featuredImage).width(1400).height(600).url()}
                      alt={item.featuredImage.alt || item.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.type === "UI"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {item.type === "UI" ? "Tech" : item.type}
                    </span>
                    <span className="text-zinc-300">By {item.author || "Chris West"}</span>
                    <span className="text-zinc-400">•</span>
                    <time className="text-zinc-400">
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
                    {item.summary}
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

          {/* Remaining Recent Articles - Grid Layout */}
          {feed.recent.length > 1 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {feed.recent.slice(1, 10).map((item: any) => (
                <Link
                  key={item._id}
                  href={`/projects/${item.slug.current}`}
                  className="group block overflow-hidden rounded-lg border border-zinc-800 bg-black/75 transition-all hover:shadow-md"
                >
                  {item.featuredImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={urlFor(item.featuredImage).width(600).height(400).url()}
                        alt={item.featuredImage.alt || item.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.type === "UI"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-purple-500/20 text-purple-300"
                      }`}>
                        {item.type === "UI" ? "Tech" : item.type}
                      </span>
                      <span className="text-zinc-300">By {item.author || "Chris West"}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/projects/tech"
          className="group rounded-lg border border-zinc-800 p-6 transition-colors hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold text-zinc-50">
            Technology →
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Browse software engineering projects and technology designs
          </p>
        </Link>

        <Link
          href="/projects/art"
          className="group rounded-lg border border-zinc-800 p-6 transition-colors hover:bg-zinc-900"
        >
          <h3 className="text-lg font-semibold text-zinc-50">
            Traditional Art →
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            View traditional art portfolio and gallery
          </p>
        </Link>
      </div>
    </div>
  );
}
