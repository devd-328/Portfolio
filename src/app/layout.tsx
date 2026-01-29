import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/shared";
import { PageViewTracker } from "@/components/shared/PageViewTracker";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devdas.tech"),
  title: {
    default: "Dev Das | Full Stack Developer",
    template: "%s | Dev Das",
  },
  description:
    "Personal portfolio of Dev Das, a Full Stack Developer building beautiful, performant, and user-centric digital experiences.",
  keywords: [
    "Dev Das",
    "portfolio",
    "developer",
    "full stack",
    "web development",
    "react",
    "next.js",
    "typescript",
    "supabase",
  ],
  authors: [{ name: "Dev Das" }],
  creator: "Dev Das",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devdas.tech",
    title: "Dev Das | Full Stack Developer",
    description: "Personal portfolio of Dev Das, a Full Stack Developer.",
    siteName: "Dev Das Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dev Das Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Das | Full Stack Developer",
    description: "Personal portfolio of Dev Das, a Full Stack Developer.",
    images: ["/og-image.png"],
    creator: "@devdas_tech",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://devdas.tech",
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
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dev Das",
              url: "https://devdas.tech",
              jobTitle: "Full Stack Developer",
              description:
                "Professional Full Stack Developer specializing in React, Next.js, and modern web technologies.",
              sameAs: [
                "https://github.com/devd-328",
                "https://linkedin.com/in/dev-das-webdev/",
                "https://x.com/devdas_tech",
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
          <PageViewTracker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SpeedInsights />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
