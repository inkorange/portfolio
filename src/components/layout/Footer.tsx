import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand/Bio */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Christopher West
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Engineering & Traditional Art Portfolio
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/ui"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  UI/Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/art"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Traditional Art
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links - Placeholder */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Connect
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Social links will be populated from CMS
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {currentYear} Christopher West. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
