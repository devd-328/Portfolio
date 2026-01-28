"use client";

import { useState } from "react";
import {
    Edit,
    Trash2,
    ExternalLink,
    FileText,
    Calendar,
    Check,
    X,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Database } from "@/types/supabase";

type Blog = Database['public']['Tables']['blogs']['Row'];

interface BlogListProps {
    initialBlogs: Blog[];
}

export function BlogList({ initialBlogs }: BlogListProps) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setBlogs(prev => prev.filter(b => b.id !== id));
            setDeletingId(null);
            toast.success("Blog post deleted successfully");
            router.refresh();
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog post");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Article</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Tags</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Date</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Status</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                                            <FileText className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0 max-w-[250px] sm:max-w-[400px]">
                                            <p className="font-medium text-sm truncate">{blog.title}</p>
                                            <p className="text-xs text-muted-foreground truncate line-clamp-1">{blog.excerpt}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1">
                                        {blog.tags?.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="text-[10px] py-0 px-2 bg-muted/50 uppercase tracking-tighter">{tag}</Badge>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3 h-3 text-purple-400" />
                                        {format(new Date(blog.created_at), "MMM d, yyyy")}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Badge
                                        variant={blog.published ? "default" : "secondary"}
                                        className={blog.published
                                            ? "bg-green-500/10 text-green-400 border-green-500/20 text-[10px] uppercase font-bold"
                                            : "text-[10px] uppercase"}
                                    >
                                        {blog.published ? "Published" : "Draft"}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {deletingId === blog.id ? (
                                            <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-200">
                                                <span className="text-[10px] font-bold text-red-500 mr-1 uppercase">Delete?</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-green-500 hover:bg-green-500/10"
                                                    onClick={() => handleDelete(blog.id)}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 hover:bg-gray-500/10"
                                                    onClick={() => setDeletingId(null)}
                                                    disabled={isDeleting}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <Link href={`/blog/${blog.slug}`} target="_blank" title="View Post">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-purple-500/10 hover:text-purple-400">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/blogs/${blog.id}`} title="Edit Article">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-purple-500/10 hover:text-purple-400">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                                    title="Delete Article"
                                                    onClick={() => setDeletingId(blog.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-12 text-center text-muted-foreground">
                                <div className="flex flex-col items-center gap-3">
                                    <FileText className="w-12 h-12 text-muted/20" />
                                    <p>No blog posts found. Write your first article!</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
