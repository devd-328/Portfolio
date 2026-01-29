import { createClient } from "@/lib/supabase/server";
import ProjectListing from "@/components/shared/ProjectListing";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

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
