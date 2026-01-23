import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPage(props: EditBlogPageProps) {
    const { id } = await props.params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

    const blog = data as Database['public']['Tables']['blogs']['Row'] | null;

    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <BlogForm initialData={blog} />
        </div>
    );
}
