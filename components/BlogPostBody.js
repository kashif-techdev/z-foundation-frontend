"use client";

import ReactMarkdown from "react-markdown";

export default function BlogPostBody({ content }) {
  return (
    <div className="blog-markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
