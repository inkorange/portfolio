import Image from "next/image";
import { getAbout } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/ui/PortableText";

export const metadata = {
  title: "About - Chris West",
  description: "Learn more about Chris West",
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          About
        </h1>
      </div>

      {!about ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">
            No about content yet. Add some content in your Sanity CMS!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Profile Image */}
          {about.profileImage && (
            <div className="flex justify-center">
              <div className="relative h-48 w-48 overflow-hidden rounded-full">
                <Image
                  src={urlFor(about.profileImage).width(400).height(400).url()}
                  alt={about.profileImage.alt || "Profile"}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
          )}

          {/* Bio Content */}
          {about.bio && (
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <PortableText value={about.bio} />
            </div>
          )}

          {about.skills && about.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Skills
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {about.socialLinks && about.socialLinks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Connect
              </h2>
              <div className="mt-4 flex flex-wrap gap-4">
                {about.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
