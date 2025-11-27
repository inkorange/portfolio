import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Featured Projects | Chris West",
  description: "Explore my featured projects and web applications",
};

export default async function FeaturedProjectsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeIn className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
          Featured Projects
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          A showcase of my web applications and digital projects
        </p>
      </FadeIn>

      {/* Projects Grid */}
      {products && products.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <FadeIn key={product._id} delay={index * 100}>
              <div className="group flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-black/75 transition-all hover:border-zinc-700 hover:shadow-lg">
                {/* Product Image */}
                {product.image && (
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={urlFor(product.image).width(600).height(400).url()}
                      alt={product.image.alt || product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Product Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold text-white group-hover:text-zinc-100">
                    {product.title}
                  </h2>

                  {/* Full Summary - not truncated */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
                    {product.summary}
                  </p>

                  {/* Call to Action Buttons */}
                  <div className="mt-6 flex flex-col gap-3">
                    {/* Primary CTA - View Project */}
                    <a
                      href={product.url_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform transform hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                    >
                      <span>View Project</span>
                      <span aria-hidden="true" className="text-sm">↗</span>
                    </a>

                    {/* Secondary CTA - Read Article (if exists) */}
                    {product.article_link && (
                      <Link
                        href={
                          product.article_link._type === "project"
                            ? `/projects/${product.article_link.slug.current}`
                            : `/blog/${product.article_link.slug.current}`
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                      >
                        Read Article →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-lg text-zinc-400">
              No featured projects available yet. Check back soon!
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
