import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProjectDetailClient } from "@/app/projects/[id]/ProjectDetailClient";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    const supabase = await createClient();
    const { data: projects } = await (supabase
        .from("projects") as any)
        .select("id");

    return (projects || []).map((project: { id: string }) => ({
        id: project.id,
    }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const supabase = await createClient();
    const { data: project } = await (supabase
        .from("projects") as any)
        .select("*")
        .eq("id", params.id)
        .single();

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.short_description,
        openGraph: {
            title: project.title,
            description: project.short_description,
            type: "article",
        },
    };
}

export default async function ProjectPage(props: Props) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: project } = await (supabase
        .from("projects") as any)
        .select("*")
        .eq("id", params.id)
        .single();

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
