import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "Blog - Christopher West",
  description: "News, updates, and thoughts on engineering and art",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Blog
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          News, updates, and thoughts on engineering and art
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            No blog posts yet. Add some content in your Sanity CMS!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block overflow-hidden rounded-lg border border-zinc-200 transition-all hover:shadow-md dark:border-zinc-800"
            >
              <article className="flex flex-col md:flex-row">
                {post.coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 md:w-72 md:flex-shrink-0">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(400).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <time className="text-sm text-zinc-600 dark:text-zinc-400">
                    {new Date(post.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
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
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
