import Link from "next/link";
import Image from "next/image";
import { getProjectsByType } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "Technology Projects | Chris West",
  description: "Explore software engineering tools, web applications, and technology designs by Chris West. View detailed case studies and technical implementations.",
  keywords: "technology, software engineering, web development, front-end development, Chris West",
  openGraph: {
    title: "Technology Projects",
    description: "Software engineering tools and technology designs by Chris West",
    type: "website",
    siteName: "Chris West Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Projects",
    description: "Software engineering and technology projects",
  },
};

export default async function UIProjectsPage() {
  const projects = await getProjectsByType("UI");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50">
          Technology Projects
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Software engineering tools and technology designs
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
          <p className="text-zinc-400">
            No UI projects yet. Add some content in your Sanity CMS!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block overflow-hidden rounded-lg border border-zinc-800 bg-black/75 transition-all hover:shadow-md"
            >
              {project.featuredImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={urlFor(project.featuredImage).width(600).height(400).url()}
                    alt={project.featuredImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                  {project.summary}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
