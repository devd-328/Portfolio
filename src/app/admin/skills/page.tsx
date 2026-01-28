"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Edit,
    Save,
    X,
    Loader2,
    Trash2,
    Plus,
    Code2,
    Server,
    Database as DbIcon,
    Palette,
    Wrench,
    Cloud,
    Smartphone,
    GitBranch,
    Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SkillCategory = Database["public"]["Tables"]["skill_categories"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];

interface CategoryWithSkills extends SkillCategory {
    skills: Skill[];
}

const iconMap: Record<string, any> = {
    Code2,
    Server,
    Database: DbIcon,
    Palette,
    Wrench,
    Cloud,
    Smartphone,
    GitBranch,
    Zap,
};

export default function SkillsPage() {
    const [categories, setCategories] = useState<CategoryWithSkills[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSkill, setEditingSkill] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", level: 0 });
    const [saving, setSaving] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<{ id: string; name: string } | null>(null);
    const [isAddingTo, setIsAddingTo] = useState<string | null>(null);
    const [newSkillData, setNewSkillData] = useState({ name: "", level: 80 });
    const supabase = createClient();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        try {
            // Fetch categories
            const { data: categoriesData, error: categoriesError } =
                await supabase
                    .from("skill_categories")
                    .select("*")
                    .order("display_order")
                    .returns<SkillCategory[]>();

            if (categoriesError) throw categoriesError;

            // Fetch all skills
            const { data: skillsData, error: skillsError } = await supabase
                .from("skills")
                .select("*")
                .order("display_order")
                .returns<Skill[]>();

            if (skillsError) throw skillsError;

            // Combine categories with their skills
            const categoriesWithSkills: CategoryWithSkills[] =
                (categoriesData || []).map((category) => ({
                    ...category,
                    skills: (skillsData || []).filter(
                        (skill) => skill.category_id === category.id
                    ),
                }));

            setCategories(categoriesWithSkills);
        } catch (error: any) {
            console.error("Error fetching skills:", error);
            toast.error("Failed to load skills: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (skill: Skill) => {
        setEditingSkill(skill.id);
        setEditForm({ name: skill.name, level: skill.level });
    };

    const handleCancelEdit = () => {
        setEditingSkill(null);
        setEditForm({ name: "", level: 0 });
    };

    const handleSaveEdit = async (skillId: string) => {
        setSaving(true);
        try {
            const { error } = await (supabase
                .from("skills") as any)
                .update({
                    name: editForm.name,
                    level: editForm.level,
                })
                .eq("id", skillId);

            if (error) throw error;

            toast.success("Skill updated successfully");

            // Update local state
            setCategories((prev) =>
                prev.map((category) => ({
                    ...category,
                    skills: category.skills.map((skill: Skill) =>
                        skill.id === skillId
                            ? { ...skill, name: editForm.name, level: editForm.level }
                            : skill
                    ),
                }))
            );

            setEditingSkill(null);
        } catch (error: any) {
            console.error("Error updating skill:", error);
            toast.error("Failed to update skill: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleAddSkill = async (categoryId: string) => {
        if (!newSkillData.name.trim()) {
            toast.error("Skill name is required");
            return;
        }

        setSaving(true);
        try {
            const { data, error } = await (supabase
                .from("skills") as any)
                .insert([{
                    name: newSkillData.name,
                    level: newSkillData.level,
                    category_id: categoryId,
                    display_order: 0
                }])
                .select()
                .single();

            if (error) throw error;

            toast.success(`"${newSkillData.name}" added successfully`);

            // Update local state
            setCategories(prev => prev.map(cat =>
                cat.id === categoryId
                    ? { ...cat, skills: [...cat.skills, data] }
                    : cat
            ));

            setIsAddingTo(null);
            setNewSkillData({ name: "", level: 80 });
        } catch (error: any) {
            console.error("Error adding skill:", error);
            toast.error("Failed to add skill: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSkill = async () => {
        if (!skillToDelete) return;

        setSaving(true);
        const { id: skillId, name: skillName } = skillToDelete;

        try {
            const { error } = await (supabase
                .from("skills") as any)
                .delete()
                .eq("id", skillId);

            if (error) throw error;

            // Update local state - remove skill from categories
            setCategories((prev) =>
                prev.map((category) => ({
                    ...category,
                    skills: category.skills.filter((skill: Skill) => skill.id !== skillId),
                }))
            );

            toast.success(`"${skillName}" deleted successfully`);
        } catch (error: any) {
            console.error("Error deleting skill:", error);
            toast.error("Failed to delete skill: " + error.message);
        } finally {
            setSaving(false);
            setSkillToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Skills Management</h1>
                <p className="text-muted-foreground">
                    Edit your skills and proficiency levels
                </p>
            </div>

            <div className="grid gap-6">
                {categories.map((category) => (
                    <Card key={category.id} className="border-border/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} bg-opacity-20`}
                                >
                                    {(() => {
                                        const Icon = iconMap[category.icon || "Code2"] || Code2;
                                        return <Icon className="w-6 h-6 text-white" />;
                                    })()}
                                </div>
                                <div>
                                    <CardTitle className="text-xl">
                                        {category.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {category.skills.length} skills
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                                    >
                                        {editingSkill === skill.id ? (
                                            <>
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`name-${skill.id}`}>
                                                            Skill Name
                                                        </Label>
                                                        <Input
                                                            id={`name-${skill.id}`}
                                                            value={editForm.name}
                                                            onChange={(e) =>
                                                                setEditForm((prev) => ({
                                                                    ...prev,
                                                                    name: e.target.value,
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`level-${skill.id}`}>
                                                            Level (0-100)
                                                        </Label>
                                                        <Input
                                                            id={`level-${skill.id}`}
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={editForm.level}
                                                            onChange={(e) =>
                                                                setEditForm((prev) => ({
                                                                    ...prev,
                                                                    level: parseInt(
                                                                        e.target.value
                                                                    ),
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            handleSaveEdit(skill.id)
                                                        }
                                                        disabled={saving}
                                                    >
                                                        {saving ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Save className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={handleCancelEdit}
                                                        disabled={saving}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium">
                                                            {skill.name}
                                                        </span>
                                                        <Badge variant="outline">
                                                            {skill.level}%
                                                        </Badge>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                            style={{
                                                                width: `${skill.level}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleEditClick(skill)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setSkillToDelete({ id: skill.id, name: skill.name })}
                                                        disabled={saving}
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {/* Add Skill Inline Form */}
                                <div className="pt-4 border-t border-dashed border-border/50">
                                    {isAddingTo === category.id ? (
                                        <div className="flex flex-col gap-4 p-4 rounded-lg bg-muted/30 border border-brand-start/20 animate-in fade-in slide-in-from-top-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`new-name-${category.id}`}>Skill Name</Label>
                                                    <Input
                                                        id={`new-name-${category.id}`}
                                                        placeholder="e.g. Next.js"
                                                        value={newSkillData.name}
                                                        onChange={e => setNewSkillData(prev => ({ ...prev, name: e.target.value }))}
                                                        autoFocus
                                                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill(category.id)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`new-level-${category.id}`}>Level (0-100)</Label>
                                                    <Input
                                                        id={`new-level-${category.id}`}
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={newSkillData.level}
                                                        onChange={e => setNewSkillData(prev => ({ ...prev, level: parseInt(e.target.value) || 0 }))}
                                                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill(category.id)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => setIsAddingTo(null)}>
                                                    Cancel
                                                </Button>
                                                <Button size="sm" onClick={() => handleAddSkill(category.id)} disabled={saving}>
                                                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                                    Add Skill
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-muted-foreground hover:text-brand-start hover:bg-brand-start/5"
                                            onClick={() => {
                                                setIsAddingTo(category.id);
                                                setNewSkillData({ name: "", level: 80 });
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add new skill to {category.title}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AlertDialog open={!!skillToDelete} onOpenChange={(open) => !open && setSkillToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the skill "{skillToDelete?.name}".
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteSkill}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={saving}
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Delete Skill
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
