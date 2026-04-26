"use client";

import { useMemo, useState } from "react";
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

const SWIPE_THRESHOLD = 95;
const OFFSCREEN_X = 420;
const VISIBLE_STACK = 4;
const EXIT_ANIMATION_MS = 820;
const RESET_ANIMATION_MS = 700;
const FAN_TRANSFORMS = [
  { x: 0, y: 0, scale: 1, rotate: 0 },
  { x: -62, y: 26, scale: 0.94, rotate: -16 },
  { x: 58, y: 40, scale: 0.9, rotate: 14 },
  { x: -18, y: 58, scale: 0.86, rotate: -8 },
];

export default function Members() {
  const [order, setOrder] = useState(MEMBERS.map((_, i) => i));
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [exitDirection, setExitDirection] = useState(1);
  const [isResetting, setIsResetting] = useState(false);

  const canInteract = !isAnimatingOut && !isResetting && order.length > 0;

  const visibleOrder = useMemo(() => order.slice(0, VISIBLE_STACK), [order]);

  const removeTopCard = (direction = 1, preserveDragPosition = true) => {
    if (!canInteract) return;
    const normalizedDirection = direction >= 0 ? 1 : -1;
    setIsAnimatingOut(true);
    setExitDirection(normalizedDirection);
    if (preserveDragPosition) {
      setDragX(normalizedDirection * OFFSCREEN_X);
    } else {
      setDragX(0);
    }

    window.setTimeout(() => {
      setOrder((prev) => prev.slice(1));
      setDragX(0);
      setIsAnimatingOut(false);
    }, EXIT_ANIMATION_MS);
  };

  const onPointerDown = (e) => {
    if (!canInteract) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsDragging(true);
    setDragX(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging || !canInteract) return;
    setDragX((prev) => prev + e.movementX);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      removeTopCard(dragX > 0 ? 1 : -1);
      return;
    }

    setDragX(0);
  };

  const handleTopCardClick = () => {
    if (!canInteract || isDragging) return;
    removeTopCard(1, false);
  };

  const resetStack = () => {
    setIsResetting(true);
    setOrder(MEMBERS.map((_, i) => i));
    setDragX(0);
    window.setTimeout(() => setIsResetting(false), RESET_ANIMATION_MS);
  };

  return (
    <section className="members" id="teams" aria-labelledby="members-title">
      <div className="max-width">
        <h2 id="members-title" className="title">
          Our Members
        </h2>
        <p className="members-subtitle">
          Meet our core team behind Z-Foundation.
        </p>

        <div className="members-stack-wrap">
          <div className="members-stack" role="list" aria-label="Member directory stack">
            {visibleOrder.map((memberIndex, stackPos) => {
              const member = MEMBERS[memberIndex];
              const isTopCard = stackPos === 0;
              const stackShape = FAN_TRANSFORMS[stackPos] || FAN_TRANSFORMS[FAN_TRANSFORMS.length - 1];

              const topTransform = `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`;
              const stackTransform = `translateX(${stackShape.x}px) translateY(${stackShape.y}px) scale(${stackShape.scale}) rotate(${stackShape.rotate}deg)`;

              const transform = isTopCard ? topTransform : stackTransform;
              const opacity = isTopCard ? 1 : 0.82 - stackPos * 0.11;

              return (
                <article
                  key={`${member.name}-${memberIndex}`}
                  role="listitem"
                  className={`member-stack-card ${isTopCard ? "is-top" : ""} ${isAnimatingOut && isTopCard ? "is-exiting" : ""} ${isResetting ? "is-resetting" : ""}`}
                  style={{
                    zIndex: VISIBLE_STACK - stackPos,
                    transform,
                    opacity,
                    "--stack-index": stackPos,
                    "--exit-x": `${exitDirection * OFFSCREEN_X}px`,
                  }}
                  onPointerDown={isTopCard ? onPointerDown : undefined}
                  onPointerMove={isTopCard ? onPointerMove : undefined}
                  onPointerUp={isTopCard ? onPointerUp : undefined}
                  onPointerCancel={isTopCard ? onPointerUp : undefined}
                  onClick={isTopCard ? handleTopCardClick : undefined}
                >
                  <div className="member-photo-frame">
                    <ImageWithFallback
                      src={member.image}
                      alt={`${member.name} profile`}
                      width={320}
                      height={210}
                      className="member-photo"
                      draggable={false}
                    />
                  </div>
                  <div className="member-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <span className="member-designation">{member.designation}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {order.length === 0 && (
            <div className="members-reset">
              <p className="members-reset-text">All member cards viewed.</p>
              <button type="button" className="members-reset-btn" onClick={resetStack}>
                Reset Stack
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
