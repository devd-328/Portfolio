import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, projects } from "@/lib/data";
import { ProjectDetailClient } from "@/app/projects/[id]/ProjectDetailClient";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const project = getProjectById(params.id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.shortDescription,
        openGraph: {
            title: project.title,
            description: project.shortDescription,
            type: "article",
        },
    };
}

export default async function ProjectPage(props: Props) {
    const params = await props.params;
    const project = getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}
