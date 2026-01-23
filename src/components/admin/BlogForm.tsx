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
    FileText,
    Eye,
    Type
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogFormProps {
    initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        cover_image: initialData?.cover_image || "",
        tags: initialData?.tags || [],
        published: initialData?.published || false,
        author_id: initialData?.author_id || "", // This should be set on save if missing
    });
    const [newTag, setNewTag] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        setFormData({ ...formData, slug });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const submissionData = {
                ...formData,
                author_id: user.id
            };

            if (initialData?.id) {
                const { error } = await (supabase
                    .from("blogs") as any)
                    .update(submissionData)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                const { error } = await (supabase
                    .from("blogs") as any)
                    .insert([submissionData]);
                if (error) throw error;
            }

            router.push("/admin/blogs");
            router.refresh();
        } catch (error: any) {
            alert("Error saving blog: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag]
            });
            setNewTag("");
        }
    };

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t: string) => t !== tag)
        });
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{initialData ? "Edit Article" : "New Article"}</h1>
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
                        {formData.published ? "Publish Article" : "Save as Draft"}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Content */}
                    <Card className="border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg">Content</CardTitle>
                            <div className="flex bg-muted rounded-lg p-1">
                                <Button
                                    type="button"
                                    variant={activeTab === "edit" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setActiveTab("edit")}
                                    className="h-7 text-xs px-3"
                                >
                                    <Type className="w-3 h-3 mr-1" /> Edit
                                </Button>
                                <Button
                                    type="button"
                                    variant={activeTab === "preview" ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setActiveTab("preview")}
                                    className="h-7 text-xs px-3"
                                >
                                    <Eye className="w-3 h-3 mr-1" /> Preview
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {activeTab === "edit" ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Title</label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Article Title"
                                            onBlur={generateSlug}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Excerpt</label>
                                        <Textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            rows={2}
                                            placeholder="Brief summary shown in listings..."
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Body (Markdown)</label>
                                        <Textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={20}
                                            className="font-mono text-sm leading-relaxed"
                                            placeholder="# Start writing..."
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-indigo max-w-none min-h-[500px] border border-border/50 p-6 rounded-lg bg-muted/20 overflow-auto">
                                    <h1>{formData.title || "Untitled Article"}</h1>
                                    <p className="lead italic text-muted-foreground">{formData.excerpt}</p>
                                    <div className="whitespace-pre-wrap">{formData.content || "No content yet."}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Status & Options */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Publish Settings</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="article-url-slug"
                                    />
                                    <Button type="button" size="sm" variant="outline" onClick={generateSlug}>Auto</Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Published Status</label>
                                    <p className="text-[10px] text-muted-foreground italic">Visible to the public?</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-brand-start focus:ring-brand-start"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Media</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                    <label className="text-sm font-medium">Cover Image URL</label>
                                </div>
                                <Input
                                    value={formData.cover_image}
                                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                                    placeholder="https://..."
                                />
                                {formData.cover_image && (
                                    <div className="mt-2 relative aspect-[16/9] rounded-md overflow-hidden border border-border">
                                        <img src={formData.cover_image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-lg">Tags</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add tag..."
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                />
                                <Button type="button" size="icon" variant="outline" onClick={addTag}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="py-1 pl-3 pr-1 group">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 hover:text-red-500 rounded-full p-0.5"
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
