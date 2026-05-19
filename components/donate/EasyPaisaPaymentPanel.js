"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { MANUAL_DONATION, getDonationWhatsappUrl } from "@/lib/donationPayment";

async function copyText(label, text) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  } catch {
    toast.error("Could not copy. Please copy manually.");
  }
}

export default function EasyPaisaPaymentPanel() {
  const [waNote, setWaNote] = useState("");

  const copyAll = useCallback(() => {
    const block = [
      `EasyPaisa mobile: ${MANUAL_DONATION.easypaisaMobile}`,
      `Account title: ${MANUAL_DONATION.accountTitle}`,
      `Channel: ${MANUAL_DONATION.channel}`,
    ].join("\n");
    copyText("Payment details", block);
  }, []);

  const waHref = getDonationWhatsappUrl(waNote);

  return (
    <div className="donate-payment-card">
      <div className="donate-payment-card__header">
        <span className="donate-payment-card__badge" aria-hidden="true">
          <i className="fas fa-mobile-screen" />
        </span>
        <div>
          <p className="donate-payment-card__subtitle">
          Support Z-Foundation securely through EasyPaisa. After completing your donation,
          you may share your transaction screenshot on WhatsApp for confirmation and record keeping.
          </p>
        </div>
      </div>

      <dl className="donate-payment-details">
        <div className="donate-payment-row">
          <dt>EasyPaisa number</dt>
          <dd>
            <span className="donate-payment-value">{MANUAL_DONATION.easypaisaMobile}</span>
            <button
              type="button"
              className="donate-copy-btn"
              onClick={() => copyText("Number", MANUAL_DONATION.easypaisaMobile)}
            >
              <i className="fas fa-copy" aria-hidden="true" />
              Copy
            </button>
          </dd>
        </div>
        <div className="donate-payment-row">
          <dt>Account title</dt>
          <dd>
            <span className="donate-payment-value">{MANUAL_DONATION.accountTitle}</span>
            <button
              type="button"
              className="donate-copy-btn"
              onClick={() => copyText("Account title", MANUAL_DONATION.accountTitle)}
            >
              <i className="fas fa-copy" aria-hidden="true" />
              Copy
            </button>
          </dd>
        </div>
        <div className="donate-payment-row">
          <dt>Channel</dt>
          <dd>
            <span className="donate-payment-value">{MANUAL_DONATION.channel}</span>
          </dd>
        </div>
      </dl>

      <div className="donate-payment-actions">
        <button type="button" className="donate-copy-all-btn" onClick={copyAll}>
          <i className="fas fa-clipboard-list" aria-hidden="true" />
          Copy all details
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="donate-wa-link"
        >
          <i className="fab fa-whatsapp" aria-hidden="true" />
          Notify us on WhatsApp
        </a>
      </div>

      <div className="donate-wa-note">
        <label htmlFor="donate-wa-note">Optional note for WhatsApp (e.g. transaction ID)</label>
        <input
          id="donate-wa-note"
          type="text"
          className="donate-wa-note__input"
          placeholder="Optional — helps us match your payment"
          value={waNote}
          onChange={(e) => setWaNote(e.target.value)}
          maxLength={200}
          autoComplete="off"
        />
      </div>

      <p className="donate-payment-footnote">
        <i className="fas fa-circle-info" aria-hidden="true" />
        Always keep your EasyPaisa receipt or screenshot until you receive confirmation.
        For Zakat or large gifts, use the form below so we can acknowledge correctly.
      </p>
    </div>
  );
}
