import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { Skills } from "@/components/shared";
import PageTransition from "@/components/shared/PageTransition";

type SkillCategory = Database["public"]["Tables"]["skill_categories"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];

export const metadata: Metadata = {
    title: "Skills & Expertise",
    description:
        "Explore the technical skills of Dev Das — covering React, Next.js, TypeScript, Node.js, Python, Supabase, PostgreSQL, AWS, Docker, and more. Full Stack Developer based in Karachi, Pakistan.",
    alternates: {
        canonical: "https://devdas.tech/skills",
    },
    keywords: [
        "Dev Das skills",
        "React developer",
        "Next.js developer",
        "TypeScript",
        "Node.js",
        "Supabase",
        "PostgreSQL",
        "AWS",
        "Full Stack Developer Pakistan",
    ],
    openGraph: {
        title: "Skills & Expertise | Dev Das",
        description:
            "Technical skills spanning frontend, backend, databases, and DevOps. React, Next.js, TypeScript, Node.js, Supabase, and more.",
        url: "https://devdas.tech/skills",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Dev Das — Skills & Expertise",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Skills & Expertise | Dev Das",
        description:
            "React, Next.js, TypeScript, Node.js, Supabase, PostgreSQL, AWS and more.",
        images: ["/og-image.png"],
    },
};

export const revalidate = 3600;

export default async function SkillsPage() {
    const supabase = await createClient();

    const [{ data: skillCategories }, { data: skills }] = await Promise.all([
        supabase.from("skill_categories").select("*").order("display_order"),
        supabase.from("skills").select("*").order("display_order"),
    ]);

    const typedSkillCategories = (skillCategories as SkillCategory[] | null) ?? [];
    const typedSkills = (skills as Skill[] | null) ?? [];

    const transformedCategories = typedSkillCategories.map((category) => ({
        title: category.title,
        icon: category.icon,
        color: category.color,
        skills: typedSkills
            .filter((skill) => skill.category_id === category.id)
            .map((skill) => ({
                name: skill.name,
                level: skill.level,
            })),
    }));

    return (
        <PageTransition>
            <main className="min-h-screen pt-24 pb-16">
                <Skills skillCategories={transformedCategories as any} />
            </main>
        </PageTransition>
    );
}
