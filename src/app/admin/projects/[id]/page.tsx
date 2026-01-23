import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage(props: EditProjectPageProps) {
    const { id } = await props.params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    const project = data as Database['public']['Tables']['projects']['Row'] | null;

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <ProjectForm initialData={project} />
        </div>
    );
}
