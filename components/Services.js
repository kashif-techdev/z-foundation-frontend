"use client";

import { useState, useEffect, useCallback } from "react";
import ImageWithFallback from "./ImageWithFallback";

const SERVICES = [
  {
    title: "Health",
    description:
      "Providing medical aid and healthcare support to those in need.",
    image: "/images/health.jpg",
  },
  {
    title: "Education",
    description:
      "Ensuring quality education and learning resources for underprivileged children.",
    image: "/images/education.jpg",
  },
  {
    title: "Food",
    description: "Distributing food supplies and meals to combat hunger.",
    image: "/images/food.jpg",
  },
  {
    title: "Clothes",
    description:
      "Providing clothing to those in need, ensuring dignity and warmth.",
    image: "/images/clothes.jpg",
  },
  {
    title: "Scholarships",
    description:
      "Offering financial aid and scholarships to support education.",
    image: "/images/scholarship.jpg",
  },
  {
    title: "Shelter",
    description: "Providing safe housing and shelter for the homeless.",
    image: "/images/shelter.jpg",
  },
];

const AUTO_SLIDE_INTERVAL = 4000;

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1200) return 3;
  return 3;
}

export default function Services() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, SERVICES.length - visibleCount);

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
  const trackWidthPercent = (SERVICES.length / visibleCount) * 100;
  const offsetPercent = -currentIndex * (100 / SERVICES.length);

  return (
    <section className="services" id="services">
      <div className="max-width">
        <h2 className="title">Our Services</h2>
        
        <div 
          className="services-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="services-wrapper">
            <div
              className="services-track"
              style={{
                transform: `translateX(${offsetPercent}%)`,
                width: `${trackWidthPercent}%`,
              }}
            >
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="service-card"
                  style={{
                    flex: `0 0 ${100 / SERVICES.length}%`,
                  }}
                >
                  <div className="service-icon-wrapper">
                    <ImageWithFallback
                      src={service.image}
                      alt={`${service.title} service icon`}
                      width={100}
                      height={100}
                      className="service-icon"
                    />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="services-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`services-dot ${i === currentIndex ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1} of ${maxIndex + 1}`}
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
