import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { About } from "@/components/shared";
import PageTransition from "@/components/shared/PageTransition";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
type Client = Database["public"]["Tables"]["clients"]["Row"];

export const metadata: Metadata = {
    title: "About Me",
    description:
        "Learn about Dev Das — a Full Stack Developer based in Karachi, Pakistan with 3+ years of experience building performant, user-centric web applications with React, Next.js, and TypeScript.",
    alternates: {
        canonical: "https://devdas.tech/about",
    },
    openGraph: {
        title: "About Dev Das | Full Stack Developer",
        description:
            "Full Stack Developer from Karachi, Pakistan. Passionate about building beautiful, performant digital experiences with React, Next.js, TypeScript, and Supabase.",
        url: "https://devdas.tech/about",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Dev Das — About",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Dev Das | Full Stack Developer",
        description:
            "Full Stack Developer from Karachi, Pakistan. 3+ years building modern web apps.",
        images: ["/og-image.png"],
    },
};

export const revalidate = 60;

export default async function AboutPage() {
    const supabase = await createClient();

    const [{ data: settings }, { data: clients }] = await Promise.all([
        supabase.from("site_settings").select("*").single(),
        supabase.from("clients").select("*").order("display_order"),
    ]);

    return (
        <PageTransition>
            <main className="min-h-screen pt-24 pb-16">
                <About
                    settings={settings as SiteSettings | null}
                    clients={(clients as Client[] | null) ?? []}
                />
            </main>
        </PageTransition>
    );
}
