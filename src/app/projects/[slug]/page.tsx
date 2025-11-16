import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs, getNextProject, getPreviousProject, getRelatedProjects, getFeaturedProducts } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/ui/PortableText";
import ArticleNavigation from "@/components/ui/ArticleNavigation";
import SocialShare from "@/components/ui/SocialShare";
import CommentsSection from "@/components/comments/CommentsSection";
import RelatedArticles from "@/components/ui/RelatedArticles";
import ProductShowcase from "@/components/ui/ProductShowcase";
import { calculateReadingTime, formatReadingTime } from "@/lib/utils/readingTime";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const imageUrl = project.featuredImage
    ? urlFor(project.featuredImage).width(1200).height(630).url()
    : null;

  // Process keywords into array for article tags
  const keywordArray = project.keywords
    ? project.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : project.tags || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chriswest.tech';
  const canonicalUrl = `${siteUrl}/projects/${slug}`;

  return {
    title: `${project.title} - ${project.type} Project | Chris West`,
    description: project.summary,
    keywords: project.keywords || project.tags?.join(", ") || "",
    authors: [{ name: project.author || "Chris West" }],
    creator: project.author || "Chris West",
    publisher: project.author || "Chris West",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      publishedTime: project.publishedDate,
      authors: [project.author || "Chris West"],
      tags: keywordArray, // Use keywords for article tags
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: project.title }] : [],
      siteName: "Chris West Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: imageUrl ? [imageUrl] : [],
      creator: "@yourhandle",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch next and previous projects
  const nextProject = await getNextProject(project.publishedDate, project.type);
  const previousProject = await getPreviousProject(project.publishedDate, project.type);

  // Fetch related projects
  const relatedProjects = await getRelatedProjects(
    project._id,
    project.tags || [],
    project.type,
    3
  );

  // Fetch featured products
  const products = await getFeaturedProducts(3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chriswest.tech';
  const canonicalUrl = `${siteUrl}/projects/${slug}`;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    image: project.featuredImage ? urlFor(project.featuredImage).width(1200).height(630).url() : undefined,
    datePublished: project.publishedDate,
    author: {
      "@type": "Person",
      name: project.author || "Chris West",
    },
    publisher: {
      "@type": "Person",
      name: project.author || "Chris West",
    },
    keywords: project.keywords || project.tags?.join(", "),
  };

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Full-width Featured Image with Overlapping Content */}
      <div className="relative">
        {project.featuredImage && (
          <div
            className="relative aspect-[21/13.5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
            style={{
              maskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0px, black 150px)',
            }}
          >
            <Image
              src={urlFor(project.featuredImage).width(1920).height(1230).url()}
              alt={project.featuredImage.alt || project.title}
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
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  project.type === "UI"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-purple-500/20 text-purple-300"
                }`}>
                  {project.type === "UI" ? "Tech" : project.type}
                </span>
                <span className="text-zinc-300">By {project.author || "Chris West"}</span>
                <span className="text-zinc-400">•</span>
                <time className="text-zinc-400">
                  {new Date(project.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-zinc-400">•</span>
                <span className="text-zinc-400">
                  {formatReadingTime(calculateReadingTime(project.description))}
                </span>
              </div>
              <h1 className="mt-6 mb-8 lg:mt-12 lg:mb-12 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-zinc-300">
                {project.summary}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(project.githubLink || project.externalLink) && (
                <div className="mt-6 flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View project ${project.title} (opens in new tab)`}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform transform hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                    >
                      <span>View Project</span>
                      <span aria-hidden="true" className="ml-1 text-sm">↗</span>
                    </a>
                  )}
                </div>
              )}

              {/* Article Content with Sidebar Layout */}
              <div className="mt-6 border-t border-white/10 pt-8">
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Main Column - Article Content, Navigation, Comments */}
                  <div className="flex-1 min-w-0 max-w-[1100px]">
                    {/* Article Content */}
                    {project.description && (
                      <div className="prose prose-zinc prose-invert max-w-none">
                        <PortableText value={project.description} galleryImages={project.images} />
                      </div>
                    )}
                    {/* Clear float */}
                    <div className="clear-both" />

                    {/* Navigation Links */}
                    <ArticleNavigation
                      previous={previousProject}
                      next={nextProject}
                      basePath="/projects"
                      viewAllPath={project.type === "UI" ? "/projects/tech" : "/projects/art"}
                      viewAllLabel={project.type === "UI" ? "Technology" : "Traditional Art"}
                    />

                    {/* Comments Section */}
                    <CommentsSection projectSlug={slug} />
                  </div>

                  {/* Sidebar - Social Share, Related Articles & Product Showcase */}
                  <aside className="w-full lg:w-80 flex-shrink-0">
                    <div className="lg:sticky lg:top-20 space-y-6">
                      {/* Social Sharing */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-white">Share</h3>
                        <SocialShare
                          url={canonicalUrl}
                          title={project.title}
                          description={project.summary}
                        />
                      </div>

                      {/* Related Articles */}
                      <RelatedArticles articles={relatedProjects} />

                      {/* Product Showcase */}
                      <ProductShowcase products={products} />
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
