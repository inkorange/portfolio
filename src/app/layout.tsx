import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ParallaxBackground from "@/components/ui/ParallaxBackground";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Chris West - Engineering & Art Portfolio",
  description: "Portfolio showcasing UI/Engineering projects and traditional art by Chris West. Explore software engineering tools, user interface designs, and traditional art pieces.",
  keywords: "Chris West, portfolio, UI engineering, software engineering, traditional art, web development, design",
  authors: [{ name: "Chris West" }],
  creator: "Chris West",
  publisher: "Chris West",
  openGraph: {
    title: "Chris West - Engineering & Art Portfolio",
    description: "Portfolio showcasing UI/Engineering projects and traditional art by Chris West",
    type: "website",
    siteName: "Chris West Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris West - Engineering & Art Portfolio",
    description: "Portfolio showcasing UI/Engineering projects and traditional art",
    creator: "@yourhandle",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} font-sans antialiased`}
      >
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
