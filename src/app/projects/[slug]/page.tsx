import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/ui/PortableText";

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

  return {
    title: `${project.title} - Christopher West`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Full-width Featured Image with Overlapping Content */}
      <div className="relative">
        {project.featuredImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={urlFor(project.featuredImage).width(1920).height(820).url()}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Overlapping Header Content */}
        <div className="relative -mt-[15%] pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-black/90 p-8 sm:p-12">
              <span className="text-sm font-medium text-zinc-300">
                {project.type} Project
              </span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
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
                      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      View Project
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {project.description && (
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <PortableText value={project.description} />
          </div>
        )}
      </div>
    </div>
  );
}
