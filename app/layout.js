import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Z-Foundation | Helping Communities in Need",
  description:
    "Z-Foundation is a private non-profit organization helping flood-affected communities, providing healthcare, education, food, clothing, and shelter. Based in Darbhanga, Bihar, India.",
  keywords: [
    "NGO",
    "non-profit",
    "charity",
    "flood relief",
    "healthcare",
    "education",
    "Darbhanga",
    "Bihar",
    "social work",
    "community help",
  ],
  authors: [{ name: "Z-Foundation" }],
  creator: "Z-Foundation",
  publisher: "Z-Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zifoundation.com"
  ),
  openGraph: {
    title: "Z-Foundation | Helping Communities in Need",
    description:
      "A private non-profit organization helping flood-affected communities, providing healthcare, education, food, clothing, and shelter.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://zifoundation.com",
    siteName: "Z-Foundation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z-Foundation | Helping Communities in Need",
    description:
      "A private non-profit organization helping flood-affected communities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://cdnjs.cloudflare.com"
        />
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
