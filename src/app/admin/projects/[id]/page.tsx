import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProjectPage(props: EditProjectPageProps) {
    const { id } = await props.params;
    console.log("DEBUG: admin/projects/[id] fetching id:", id);
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("DEBUG: admin/projects/[id] error:", error);
    }

    const project = data as Database['public']['Tables']['projects']['Row'] | null;

    if (!project) {
        console.log("DEBUG: admin/projects/[id] project not found for id:", id);
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <ProjectForm initialData={project} />
        </div>
    );
}
