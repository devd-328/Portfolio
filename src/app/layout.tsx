import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/shared";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio-url.com"),
  title: {
    default: "Portfolio | Full Stack Developer",
    template: "%s | Full Stack Developer",
  },
  description:
    "Personal portfolio showcasing my work as a Full Stack Developer. Building beautiful, performant, and user-centric digital experiences.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "web development",
    "react",
    "next.js",
    "typescript",
    "supabase",
    "pakistan developer",
  ],
  authors: [{ name: "Professional Developer" }],
  creator: "Professional Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    title: "Portfolio | Full Stack Developer",
    description: "Personal portfolio showcasing my work as a Full Stack Developer.",
    siteName: "Developer Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Full Stack Developer",
    description: "Personal portfolio showcasing my work as a Full Stack Developer.",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Professional Developer",
              url: "https://your-portfolio-url.com",
              jobTitle: "Full Stack Developer",
              description:
                "Professional Full Stack Developer specializing in React, Next.js, and modern web technologies.",
              sameAs: [
                "https://github.com",
                "https://linkedin.com",
                "https://twitter.com",
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
