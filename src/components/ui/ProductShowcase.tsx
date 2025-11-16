import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Product } from "@/lib/types";

interface ProductShowcaseProps {
  products: Product[];
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Featured Projects</h3>
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group overflow-hidden rounded-lg border border-white/10 bg-black/40 transition-all hover:border-white/20 hover:shadow-lg"
            >
              {/* Product Image */}
              {product.image && (
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={urlFor(product.image).width(400).height(225).url()}
                    alt={product.image.alt || product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="400px"
                  />
                </div>
              )}

              {/* Product Content */}
              <div className="p-4">
                <h4 className="text-base font-semibold text-white group-hover:text-zinc-100">
                  {product.title}
                </h4>
                <p className="mt-2 line-clamp-3 text-sm text-zinc-300">
                  {product.summary}
                </p>

                {/* Call to Action Buttons */}
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={product.url_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform transform hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                  >
                    <span>View Project</span>
                    <span aria-hidden="true" className="text-sm">↗</span>
                  </a>

                  {/* Optional Article Link */}
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
          ))}
        </div>
      </div>
    </div>
  );
}
