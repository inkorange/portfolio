import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "All Projects | Chris West Portfolio",
  description: "Browse all Technology and Traditional Art projects by Chris West. Explore software engineering tools, web applications, technology designs, and traditional art pieces.",
  keywords: "projects, portfolio, technology, software development, traditional art, Chris West",
  openGraph: {
    title: "All Projects - Chris West",
    description: "Browse all Technology and Traditional Art projects",
    type: "website",
    siteName: "Chris West Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects - Chris West",
    description: "Browse all Technology and Traditional Art projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          All Projects
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          A collection of my Technology and Traditional Art work
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            No projects yet. Add some content in your Sanity CMS!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug.current}`}
              className="group block overflow-hidden rounded-lg border border-zinc-200 bg-black/75 transition-all hover:shadow-md dark:border-zinc-800"
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
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  project.type === "UI"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-purple-500/20 text-purple-300"
                }`}>
                  {project.type === "UI" ? "Tech" : project.type}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-300">
                  {project.summary}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                      >
                        {tag}
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
