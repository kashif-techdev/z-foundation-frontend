"use client";

import { useState, useEffect } from "react";

const WORDS = ["Food", "Health", "Education", "Cloths", "Shelter"];

export default function TypingText() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(WORDS[0]);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const word = WORDS[index];
    const interval = setInterval(() => {
      setDisplay((prev) => {
        if (direction === "forward") {
          if (prev.length < word.length) return word.slice(0, prev.length + 1);
          setDirection("backward");
          return prev;
        } else {
          if (prev.length > 0) return prev.slice(0, -1);
          setIndex((i) => (i + 1) % WORDS.length);
          setDirection("forward");
          return "";
        }
      });
    }, direction === "forward" ? 320 : 180);
    return () => clearInterval(interval);
  }, [index, direction]);

  return <span>{display}</span>;
}
