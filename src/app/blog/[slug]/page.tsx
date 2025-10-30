import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPostBySlug, getAllBlogPostSlugs, getNextBlogPost, getPreviousBlogPost } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/ui/PortableText";
import ArticleNavigation from "@/components/ui/ArticleNavigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Christopher West`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch next and previous blog posts
  const nextPost = await getNextBlogPost(post.publishedDate);
  const previousPost = await getPreviousBlogPost(post.publishedDate);

  return (
    <article>
      {/* Full-width Cover Image with Overlapping Content */}
      <div className="relative">
        {post.coverImage && (
          <div
            className="relative aspect-[21/13.5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
            }}
          >
            <Image
              src={urlFor(post.coverImage).width(1920).height(1230).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Overlapping Header Content */}
        <div className="relative -mt-[50%] pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-black/90 p-8 sm:p-12">
              <time className="text-sm text-zinc-300">
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-zinc-300">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Main Article Content */}
              {post.content && (
                <div className="mt-8 border-t border-white/10 pt-8">
                  <div className="prose prose-zinc prose-invert max-w-none">
                    <PortableText value={post.content} />
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <ArticleNavigation
                previous={previousPost}
                next={nextPost}
                basePath="/blog"
                viewAllPath="/blog"
                viewAllLabel="Blog Posts"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
