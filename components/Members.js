"use client";

import { useState, useEffect, useCallback } from "react";
import ImageWithFallback from "./ImageWithFallback";

const MEMBERS = [
  {
    name: "Imran Ullah",
    role: "Founder & Coordinator",
    image: "/images/member-imranullah.jpeg",
    designation: "Lecturer at University of Technology Noshera",
  },
  {
    name: "Atta Ul Aman",
    role: "Member",
    image: "/images/member-Atta.jpeg",
    designation: "Geologist at MUC Engineering and Consulting Dubai",
  },
  {
    name: "DR. IRSHAD ULLAH ",
    role: "Member",
    image: "/images/member-irshad.jpeg",
    designation: "Assistant Professor at University of Technology, Nowshera ",
  },
  {
    name: "DR. MUHAMMAD ALI SIKANDAR ",
    role: "Relief Operations Manager",
    image: "/images/member-sikandar.jpeg",
    designation: "Professor at CECOS University Peshawar",
  },
  {
    name: "Muhammd kashif",
    role: "Member",
    image: "/images/member-kashif.jpg",
    designation: "Air University Islamabad",
  },
];

const AUTO_SLIDE_INTERVAL = 4000;

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

export default function Members() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, MEMBERS.length - visibleCount);

  const goNext = useCallback(() => {
    if (!isPaused) {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  }, [maxIndex, isPaused]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  const currentIndex = Math.min(index, maxIndex);
  const trackWidthPercent = (MEMBERS.length / visibleCount) * 100;
  const offsetPercent = -currentIndex * (100 / MEMBERS.length);

  return (
    <section className="members" id="teams" aria-labelledby="members-title">
      <div className="max-width">
        <h2 id="members-title" className="title">
          Our Members
        </h2>
        <p className="members-subtitle">
          Meet our core team behind Z-Foundation.
        </p>

        <div
          className="members-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="members-wrapper">
            <div
              className="members-track"
              role="list"
              aria-label="Member directory"
              style={{
                transform: `translateX(${offsetPercent}%)`,
                width: `${trackWidthPercent}%`,
              }}
            >
              {MEMBERS.map((member) => (
                <article
                  key={member.name}
                  role="listitem"
                  className="member-card"
                  style={{ flex: `0 0 ${100 / MEMBERS.length}%` }}
                >
                  <div className="member-photo-wrap">
                    <ImageWithFallback
                      src={member.image}
                      alt={`${member.name} profile`}
                      width={280}
                      height={240}
                      className="member-photo"
                    />
                  </div>
                  <div className="member-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-designation">{member.designation}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="members-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`members-dot ${i === currentIndex ? "active" : ""}`}
                  aria-label={`Go to member slide ${i + 1} of ${maxIndex + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
