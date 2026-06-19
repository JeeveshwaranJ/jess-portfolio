import type { Metadata } from "next";
import { Anton, Space_Mono } from "next/font/google";
import "./globals.css";

const fontAnton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const fontSpaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jess.dev | I Build Digital Businesses — Websites, SaaS & AI Tools",
  description: "Jess.dev builds custom websites, SaaS products, and AI-powered tools for startups and businesses. View projects, process, and get in touch.",
  keywords: [
    "web development",
    "SaaS development",
    "AI tools",
    "Next.js developer",
    "freelance developer",
    "brutalist web design",
    "AI agent developer",
    "React developer",
    "TypeScript developer"
  ],
  authors: [{ name: "jess.dev" }],
  creator: "jess.dev",
  publisher: "jess.dev",
  metadataBase: new URL("https://jess.dev"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jess.dev | I Build Digital Businesses — Websites, SaaS & AI Tools",
    description: "Jess.dev builds custom websites, SaaS products, and AI-powered tools for startups and businesses. View projects, process, and get in touch.",
    url: "https://jess.dev",
    siteName: "Jess.dev",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jess.dev | I Build Digital Businesses — Websites, SaaS & AI Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jess.dev | I Build Digital Businesses — Websites, SaaS & AI Tools",
    description: "Jess.dev builds custom websites, SaaS products, and AI-powered tools for startups and businesses. View projects, process, and get in touch.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontAnton.variable} ${fontSpaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-neo-cream text-neo-black">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "jess.dev",
              "url": "https://jess.dev",
              "jobTitle": "Web & AI Developer",
              "description": "Jess.dev builds custom websites, SaaS products, and AI-powered tools for startups and businesses.",
              "sameAs": [
                "https://github.com/jessaideveloper",
                "https://www.instagram.com/jess.developer/",
                "https://www.linkedin.com/in/jess-j-2331b1418/"
              ],
              "knowsAbout": [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "SaaS Development",
                "AI Tools",
                "Web Development"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
