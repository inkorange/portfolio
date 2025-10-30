"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

interface GalleryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
}

export default function GalleryImage({ src, alt, width, height, sizes }: GalleryImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer transition-opacity hover:opacity-80"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full rounded-lg"
          sizes={sizes}
        />
        {alt && (
          <p className="mt-2 text-xs text-zinc-400">{alt}</p>
        )}
      </div>

      {isOpen && (
        <ImageLightbox
          src={src}
          alt={alt}
          width={width}
          height={height}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
