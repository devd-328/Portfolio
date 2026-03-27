import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ProjectListing from "@/components/shared/ProjectListing";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export const metadata: Metadata = {
    title: "Projects | Dev Das",
    description: "A curated showcase of Dev Das's web development projects — from full-stack SaaS platforms to event discovery apps and admin dashboards. Built with React, Next.js, TypeScript, and Supabase.",
    alternates: {
        canonical: "https://devdas.tech/projects",
    },
    keywords: [
        "Dev Das projects",
        "full stack projects",
        "Next.js portfolio",
        "React projects",
        "web development portfolio",
        "Supabase apps",
    ],
    openGraph: {
        title: "Projects | Dev Das — Full Stack Developer",
        description: "Explore web development projects built with React, Next.js, TypeScript, Supabase, and more.",
        url: "https://devdas.tech/projects",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dev Das Projects" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | Dev Das — Full Stack Developer",
        description: "Explore web development projects built with React, Next.js, TypeScript, and Supabase.",
        images: ["/og-image.png"],
    },
};

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
    const supabase = await createClient();

    const { data: projects, error } = await (supabase
        .from("projects") as any)
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
    }

    const typedProjects = (projects || []) as Project[];

    // Extract unique categories
    const categories = ["All", ...Array.from(
        new Set(typedProjects.map((p) => p.category))
    )];

    return (
        <div className="min-h-screen pt-24 pb-20">
            <ProjectListing projects={typedProjects} categories={categories} />
        </div>
    );
}
