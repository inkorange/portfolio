import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, getAllProductSlugs, getFeaturedProducts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/ui/PortableText";
import SocialShare from "@/components/ui/SocialShare";
import ProductShowcase from "@/components/ui/ProductShowcase";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const imageUrl = product.image
    ? urlFor(product.image).width(1200).height(630).url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chriswest.tech';
  const canonicalUrl = `${siteUrl}/project/${slug}`;

  return {
    title: `${product.title} | Chris West`,
    description: product.summary,
    keywords: product.title,
    authors: [{ name: "Chris West" }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: product.title,
      description: product.summary,
      type: "website",
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.title }] : [],
      siteName: "Chris West Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.summary,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const products = await getFeaturedProducts(3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chriswest.tech';
  const canonicalUrl = `${siteUrl}/project/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    image: product.image ? urlFor(product.image).width(1200).height(630).url() : undefined,
    url: product.url_link,
  };

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Full-width Hero Image with Overlapping Content */}
      <div className="relative">
        {product.image && (
          <div
            className="relative aspect-[21/13.5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
            }}
          >
            <Image
              src={urlFor(product.image).width(1920).height(1230).url()}
              alt={product.image.alt || product.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Overlapping Header Content */}
        <div className="relative -mt-[50%] pb-16">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-black/90 p-6 sm:p-12">
              {/* Product badge */}
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                  Product
                </span>
              </div>

              <h1 className="mt-6 mb-8 lg:mt-12 lg:mb-12 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                {product.title}
              </h1>

              <p className="mt-4 text-lg text-zinc-300">
                {product.summary}
              </p>

              {/* Action buttons */}
              <div className="mt-6 flex gap-4 flex-wrap">
                <a
                  href={product.url_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${product.title} (opens in new tab)`}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform transform hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                >
                  <span>View Project</span>
                  <span aria-hidden="true" className="ml-1 text-sm">↗</span>
                </a>
                {product.article_link && (
                  <a
                    href={
                      product.article_link._type === "project"
                        ? `/article/${product.article_link.slug.current}`
                        : `/blog/${product.article_link.slug.current}`
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Related: {product.article_link.title} →
                  </a>
                )}
              </div>

              {/* Content area with sidebar */}
              {product.description && (
                <div className="mt-6 border-t border-white/10 pt-8">
                  <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Column - Description */}
                    <div className="flex-1 min-w-0 max-w-[1100px]">
                      <div className="prose prose-zinc prose-invert max-w-none">
                        <PortableText value={product.description} />
                      </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                      <div className="lg:sticky lg:top-20 space-y-6">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                          <h3 className="mb-4 text-lg font-semibold text-white">Share</h3>
                          <SocialShare
                            url={canonicalUrl}
                            title={product.title}
                            description={product.summary}
                          />
                        </div>
                        <ProductShowcase products={products} />
                      </div>
                    </aside>
                  </div>
                </div>
              )}

              {/* If no description, still show share section */}
              {!product.description && (
                <div className="mt-6 border-t border-white/10 pt-8">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6 inline-block">
                    <h3 className="mb-4 text-lg font-semibold text-white">Share</h3>
                    <SocialShare
                      url={canonicalUrl}
                      title={product.title}
                      description={product.summary}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
