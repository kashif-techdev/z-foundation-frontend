"use client";

import { useState, useEffect } from "react";

// Simple, robust fallback that behaves like a normal <img>
const FALLBACK_SRC = "/images/placeholder.svg";

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        if (imgSrc !== FALLBACK_SRC) {
          setImgSrc(FALLBACK_SRC);
        }
      }}
      {...props}
    />
  );
}
