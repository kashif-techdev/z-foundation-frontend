"use client";

import Link from "next/link";
import { WHATSAPP_URL } from "./WhatsAppButton";

const WHATSAPP_BAR_MESSAGE =
  "Hello! I'd like to get in touch with Z-Foundation via WhatsApp.";

export default function TopInfoBar() {
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_BAR_MESSAGE)}`;

  return (
    <div className="top-info-bar" role="region" aria-label="Quick links">
      <div className="top-info-bar__inner max-width">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="top-info-bar__link top-info-bar__whatsapp"
          aria-label="Contact us via WhatsApp"
        >
          <i className="fab fa-whatsapp top-info-bar__icon" aria-hidden="true" />
          <span className="top-info-bar__whatsapp-label">
            <span className="top-info-bar__label-full">Contact Us via WhatsApp</span>
            <span className="top-info-bar__label-short">WhatsApp</span>
          </span>
        </a>
        <Link href="/volunteer" className="top-info-bar__volunteer" aria-label="Become a volunteer">
          <i className="fas fa-handshake top-info-bar__icon" aria-hidden="true" />
          <span className="top-info-bar__volunteer-label">
            <span className="top-info-bar__label-full">Become a Volunteer</span>
            <span className="top-info-bar__label-short">Volunteer</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
