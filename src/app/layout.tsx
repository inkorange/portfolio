import type { Metadata } from "next";
import { Noto_Sans_Display, Roboto_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ParallaxBackground from "@/components/ui/ParallaxBackground";
import GoogleTagManager from "@/components/GoogleAnalytics";
import "./globals.css";

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-sans-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chris West - Engineering & Art Portfolio",
  description: "Portfolio showcasing Technology projects and traditional art by Chris West. Explore software engineering tools, technology designs, and traditional art pieces.",
  keywords: "Chris West, portfolio, technology, software engineering, traditional art, web development, design",
  authors: [{ name: "Chris West" }],
  creator: "Chris West",
  publisher: "Chris West",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://chriswest.tech"),
  openGraph: {
    title: "Chris West - Engineering & Art Portfolio",
    description: "Portfolio showcasing Technology projects and traditional art by Chris West",
    type: "website",
    siteName: "Chris West Portfolio",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris West - Engineering & Art Portfolio",
    description: "Portfolio showcasing Technology projects and traditional art",
    creator: "@chriswest_tech",
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
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chriswest.tech";

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Chris West Portfolio",
      description: "Portfolio showcasing Technology projects and traditional art by Chris West.",
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/about#person`,
      name: "Chris West",
      url: `${siteUrl}/about`,
      jobTitle: "Software Engineer",
      knowsAbout: ["Software Engineering", "Web Development", "Traditional Art"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="alternate" type="application/rss+xml" title="Chris West Portfolio" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
      </head>
      <body
        className={`${notoSansDisplay.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <GoogleTagManager />

        {/* Parallax Background Image */}
        <ParallaxBackground />

        <div className="flex min-h-screen flex-col relative">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
