"use client";

import { useState, useEffect, useRef } from "react";

// Inline SVG data URI - always works, no network request needed
const INLINE_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" fill="#e8eef4"/><path fill="#9ab0c9" d="M100 60c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40zm0 65c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25z"/><path fill="#9ab0c9" d="M100 125l-35-35 70 70z"/><path fill="#9ab0c9" d="M100 125l35-35-70 70z"/></svg>'
  );

const LOAD_TIMEOUT_MS = 8000;

function addDevCacheBust(url) {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development") return url;
  if (url.startsWith("data:")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}t=${Date.now()}`;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = INLINE_PLACEHOLDER,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const finishedRef = useRef(false);

  // Reset when src changes; in dev, append cache-bust so new files are picked up
  useEffect(() => {
    const effectiveSrc = addDevCacheBust(src);
    setImgSrc(effectiveSrc);
    setIsLoading(true);
    finishedRef.current = false;
  }, [src]);

  const handleError = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setImgSrc((prev) => (prev === fallbackSrc ? prev : fallbackSrc));
    setIsLoading(false);
  };

  const handleLoad = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsLoading(false);
  };

  // If image does not load or error within 8s, show placeholder (avoids stuck spinner)
  useEffect(() => {
    if (!src) return;
    const t = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setIsLoading(false);
        setImgSrc(fallbackSrc);
      }
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [src, fallbackSrc]);

  return (
    <div
      className={`image-wrapper ${className}`}
      style={{
        position: "relative",
        width: width || "auto",
        height: height || "auto",
        backgroundColor: "#f0f0f0",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #b0c4de",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        onError={handleError}
        onLoad={handleLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        {...props}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
