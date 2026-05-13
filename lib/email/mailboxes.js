/** Production inboxes — override with env on Vercel if needed. */
export function getMailboxes() {
  return {
    info: process.env.MAIL_TO_INFO || "info@zifoundation.com",
    donate: process.env.MAIL_TO_DONATE || "donate@zifoundation.com",
    volunteer: process.env.MAIL_TO_VOLUNTEER || "volunteer@zifoundation.com",
    support: process.env.MAIL_TO_SUPPORT || "support@zifoundation.com",
  };
}

export function getSiteName() {
  return process.env.MAIL_SITE_NAME || "Z-Foundation";
}

export function getPublicSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://zifoundation.com";
}
