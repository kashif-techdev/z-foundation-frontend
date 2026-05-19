"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "Healthcare",
  "Education",
];

export default function TypingText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const timeout = setTimeout(() => {
      // Typing effect
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        // Pause before deleting
        if (text === currentWord) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      }

      // Deleting effect
      else {
        setText(currentWord.substring(0, text.length - 1));

        // Move to next word
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }
      }
    }, isDeleting ? 70 : 120);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="font-semibold text-[#8EA9D0]">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}