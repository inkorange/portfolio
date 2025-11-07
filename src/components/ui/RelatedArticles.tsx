import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/types";
import { calculateReadingTime, formatReadingTime } from "@/lib/utils/readingTime";

type RelatedArticle = Pick<Project, '_id' | 'title' | 'slug' | 'summary' | 'publishedDate' | 'featuredImage' | 'description'>;

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  basePath?: string;
}

export default function RelatedArticles({ articles, basePath = "/projects" }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Related Articles</h3>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`${basePath}/${article.slug.current}`}
              className="group block transition-opacity hover:opacity-80"
            >
              <div className="flex gap-3">
                {article.featuredImage && (
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded bg-zinc-800">
                    <Image
                      src={urlFor(article.featuredImage).width(120).height(90).url()}
                      alt={article.featuredImage.alt || article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="line-clamp-2 text-sm font-medium text-white group-hover:text-zinc-100">
                    {article.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                    <time>
                      {new Date(article.publishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    {article.description && (
                      <>
                        <span>•</span>
                        <span>{formatReadingTime(calculateReadingTime(article.description))}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
