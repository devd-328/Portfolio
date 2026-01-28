"use client";

import { useState } from "react";
import {
    Edit,
    Trash2,
    ExternalLink,
    Briefcase,
    PlusCircle,
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
import { Database } from "@/types/supabase";

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectListProps {
    initialProjects: Project[];
}

export function ProjectList({ initialProjects }: ProjectListProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from("projects")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setProjects(prev => prev.filter(p => p.id !== id));
            setDeletingId(null);
            toast.success("Project deleted successfully");
            router.refresh();
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="border border-border/50 rounded-xl bg-card/30 backdrop-blur-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Project</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Category</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Year</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Featured</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap">Status</th>
                        <th className="p-4 font-semibold text-sm whitespace-nowrap text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0 max-w-[200px] sm:max-w-[300px]">
                                            <p className="font-medium text-sm truncate">{project.title}</p>
                                            <p className="text-xs text-muted-foreground truncate line-clamp-1">{project.short_description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Badge variant="secondary" className="text-[10px] py-0 px-2 uppercase tracking-wider">{project.category}</Badge>
                                </td>
                                <td className="p-4 text-sm text-muted-foreground">{project.year}</td>
                                <td className="p-4">
                                    {project.featured ? (
                                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] py-0 px-2 cursor-default">
                                            <PlusCircle className="w-3 h-3 mr-1" />
                                            Featured
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-muted-foreground border-border/50 text-[10px] py-0 px-2 cursor-default">
                                            Standard
                                        </Badge>
                                    )}
                                </td>
                                <td className="p-4">
                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] py-0 px-2 uppercase tracking-wider font-bold">Live</Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {deletingId === project.id ? (
                                            <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-200">
                                                <span className="text-[10px] font-bold text-red-500 mr-1 uppercase tracking-tight">Confirm Delete?</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-green-500 hover:bg-green-500/10"
                                                    onClick={() => handleDelete(project.id)}
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
                                                <Link href={`/projects/${project.id}`} target="_blank" title="View Live">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-purple-500/10 hover:text-purple-400">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/projects/${project.id}`} title="Edit Project">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-purple-500/10 hover:text-purple-400">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                                    title="Delete Project"
                                                    onClick={() => setDeletingId(project.id)}
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
                            <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                <div className="flex flex-col items-center gap-3">
                                    <Briefcase className="w-12 h-12 text-muted/20" />
                                    <p>No projects found. Create your first one!</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
