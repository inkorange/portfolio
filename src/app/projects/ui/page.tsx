import Link from "next/link";
import Image from "next/image";
import { getProjectsByType } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "UI & Engineering Projects - Christopher West",
  description: "Software engineering and UI/UX projects",
};

export default async function UIProjectsPage() {
  const projects = await getProjectsByType("UI");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          UI & Engineering Projects
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Software engineering tools and user interface designs
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            No UI projects yet. Add some content in your Sanity CMS!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block overflow-hidden rounded-lg border border-zinc-200 transition-all hover:shadow-md dark:border-zinc-800"
            >
              {project.featuredImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
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
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
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
