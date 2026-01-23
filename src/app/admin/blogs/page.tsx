import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import {
    PlusCircle,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BlogList } from "./BlogList";

export default async function AdminBlogsPage() {
    const supabase = await createClient();
    type Blog = Database['public']['Tables']['blogs']['Row'];

    const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

    const blogs = data as Blog[] | null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Blogs</h1>
                    <p className="text-muted-foreground">Manage your articles, tutorials, and latest news.</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Article
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10 max-w-sm" />
                </div>
                <Button variant="outline" size="sm">Filter</Button>
            </div>

            <BlogList initialBlogs={blogs || []} />
        </div>
    );
}
