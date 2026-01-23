"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    Save,
    X,
    Loader2,
    Image as ImageIcon,
    Plus,
    Trash2,
    ExternalLink,
    Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
    initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        short_description: initialData?.short_description || "",
        full_description: initialData?.full_description || "",
        challenge: initialData?.challenge || "",
        solution: initialData?.solution || "",
        result: initialData?.result || "",
        category: initialData?.category || "Web App",
        year: initialData?.year || new Date().getFullYear().toString(),
        duration: initialData?.duration || "1 month",
        role: initialData?.role || "Developer",
        live_url: initialData?.live_url || "",
        github_url: initialData?.github_url || "",
        featured: initialData?.featured || false,
        image_url: initialData?.image_url || "",
        technologies: initialData?.technologies || [],
    });
    const [newTech, setNewTech] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData?.id) {
                // Update
                const { error } = await (supabase
                    .from("projects") as any)
                    .update(formData)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await (supabase
                    .from("projects") as any)
                    .insert([formData]);
                if (error) throw error;
            }

            router.push("/admin/projects");
            router.refresh();
        } catch (error: any) {
            alert("Error saving project: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addTech = () => {
        if (newTech && !formData.technologies.includes(newTech)) {
            setFormData({
                ...formData,
                technologies: [...formData.technologies, newTech]
            });
            setNewTech("");
        }
    };

    const removeTech = (tech: string) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter((t: string) => t !== tech)
        });
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{initialData ? "Edit Project" : "New Project"}</h1>
                <div className="flex gap-3">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                        <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-brand-start to-brand-middle hover:from-brand-start/90 hover:to-brand-middle/90 text-white border-0 shadow-lg shadow-brand-start/20"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Project
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Project Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="E.g. E-Commerce Platform"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Short Description</label>
                                <Input
                                    value={formData.short_description}
                                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                    placeholder="One sentence summary"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Description</label>
                                <Textarea
                                    value={formData.full_description}
                                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                                    rows={4}
                                    placeholder="Detailed project summary..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Case Study */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Case Study Content</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">The Challenge</label>
                                <Textarea
                                    value={formData.challenge}
                                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                    rows={3}
                                    placeholder="What was the problem?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">The Solution</label>
                                <Textarea
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    rows={3}
                                    placeholder="How did you solve it?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">The Result</label>
                                <Textarea
                                    value={formData.result}
                                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                                    rows={3}
                                    placeholder="What were the outcomes?"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Metadata */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Properties</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Web App">Web App</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Backend">Backend</option>
                                    <option value="UI/UX">UI/UX</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Year</label>
                                    <Input
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Duration</label>
                                    <Input
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Input
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-brand-start focus:ring-brand-start"
                                />
                                <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media & Links */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Links & Media</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    <label className="text-sm font-medium">Live URL</label>
                                </div>
                                <Input
                                    value={formData.live_url}
                                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Github className="w-4 h-4 text-muted-foreground" />
                                    <label className="text-sm font-medium">GitHub URL</label>
                                </div>
                                <Input
                                    value={formData.github_url}
                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                    <label className="text-sm font-medium">Image URL</label>
                                </div>
                                <Input
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://..."
                                />
                                {formData.image_url && (
                                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border border-border">
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tech Stack */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Tech Stack</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newTech}
                                    onChange={(e) => setNewTech(e.target.value)}
                                    placeholder="Add technology..."
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                                />
                                <Button type="button" size="icon" variant="outline" onClick={addTech}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map((tech: string) => (
                                    <Badge key={tech} className="bg-brand-start/10 text-brand-start py-1 pl-3 pr-1 border-brand-start/20 group">
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => removeTech(tech)}
                                            className="ml-2 hover:bg-brand-start/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
