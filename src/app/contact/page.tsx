import type { Metadata } from "next";
import { Contact } from "@/components/shared";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Dev Das — Full Stack Developer based in Karachi, Pakistan. Available for freelance projects, full-time roles, and collaborations. Response time within 24 hours.",
    alternates: {
        canonical: "https://devdas.tech/contact",
    },
    openGraph: {
        title: "Contact Dev Das | Full Stack Developer",
        description:
            "Have a project in mind? Let's work together. Reach out to Dev Das — Full Stack Developer available for freelance and full-time opportunities.",
        url: "https://devdas.tech/contact",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Contact Dev Das",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Dev Das | Full Stack Developer",
        description:
            "Available for projects and collaborations. Response within 24 hours.",
        images: ["/og-image.png"],
    },
};

export default function ContactPage() {
    return (
        <PageTransition>
            <main className="min-h-screen pt-24 pb-16">
                <Contact />
            </main>
        </PageTransition>
    );
}
