import { PortableText as PortableTextReact } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Image"}
            width={800}
            height={500}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm">
          <code className="text-zinc-100">{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={value.href.startsWith("/") ? "_self" : "_blank"}
          className="text-zinc-900 underline hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-3 mt-6 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2 mt-5 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

interface PortableTextProps {
  value: any;
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />;
}
