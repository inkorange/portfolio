import Link from "next/link";
import Image from "next/image";
import { getProjectsByType } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export const metadata = {
  title: "Traditional Art Gallery | Chris West",
  description: "Explore traditional art pieces by Chris West. View paintings, drawings, and other traditional media artwork with detailed descriptions.",
  keywords: "traditional art, paintings, drawings, fine art, gallery, Chris West, art portfolio",
  openGraph: {
    title: "Traditional Art Gallery",
    description: "Traditional art portfolio and gallery by Chris West",
    type: "website",
    siteName: "Chris West Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traditional Art Gallery",
    description: "Traditional art portfolio and gallery",
  },
};

export default async function ArtProjectsPage() {
  const projects = await getProjectsByType("Art");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Traditional Art
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          A gallery of traditional art pieces
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            No art projects yet. Add some content in your Sanity CMS!
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
                <h3 className="text-xl font-semibold text-white">
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
