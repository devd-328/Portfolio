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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
    Save,
    Loader2,
    User,
    Layout,
    Share2,
    BarChart3,
    FileText,
} from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await (supabase
                .from("site_settings") as any)
                .select("*")
                .single();

            if (error) throw error;
            setSettings(data);
        } catch (error: any) {
            console.error("Error fetching settings:", error);
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const { error } = await (supabase
                .from("site_settings") as any)
                .update(settings)
                .eq("id", settings.id);

            if (error) throw error;
            toast.success("Settings updated successfully");
        } catch (error: any) {
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No settings found. Please run the SQL migration.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Content Management</h1>
                    <p className="text-muted-foreground">
                        Customize your portfolio's hero, about, and global details
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brand-start hover:bg-brand-start/90 shadow-lg shadow-brand-start/20"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="hero" className="w-full">
                <TabsList className="grid grid-cols-4 w-full md:w-auto mb-8">
                    <TabsTrigger value="hero" className="flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Hero
                    </TabsTrigger>
                    <TabsTrigger value="about" className="flex items-center gap-2">
                        <User className="w-4 h-4" /> About
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Stats
                    </TabsTrigger>
                    <TabsTrigger value="socials" className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Socials
                    </TabsTrigger>
                </TabsList>

                {/* Hero Tab */}
                <TabsContent value="hero" className="space-y-6">
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>Main title and introductory text</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Intro Tagline</Label>
                                        <Input
                                            value={settings.hero_title}
                                            onChange={e => setSettings({ ...settings, hero_title: e.target.value })}
                                            placeholder="Hi, I'm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            value={settings.hero_name}
                                            onChange={e => setSettings({ ...settings, hero_name: e.target.value })}
                                            placeholder="Dev Das"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                                        <div className="space-y-0.5">
                                            <Label>Available for Hire</Label>
                                            <p className="text-[10px] text-muted-foreground italic">Shows badge in Hero</p>
                                        </div>
                                        <Switch
                                            checked={settings.available_for_hire}
                                            onCheckedChange={checked => setSettings({ ...settings, available_for_hire: checked })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle / Bio</Label>
                                    <Textarea
                                        className="h-[120px] resize-none"
                                        value={settings.hero_subtitle}
                                        onChange={e => setSettings({ ...settings, hero_subtitle: e.target.value })}
                                        placeholder="Brief introduction..."
                                    />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-border/50">
                                <ImageUpload
                                    label="Hero Profile Image"
                                    value={settings.hero_image_url}
                                    onChange={url => setSettings({ ...settings, hero_image_url: url })}
                                    folder="site"
                                    customFileName="hero-profile"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle>About Section</CardTitle>
                            <CardDescription>Detailed biography and profile info</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>About Heading</Label>
                                <Input
                                    value={settings.about_title}
                                    onChange={e => setSettings({ ...settings, about_title: e.target.value })}
                                    placeholder="Passionate Developer..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Full Biography</Label>
                                <Textarea
                                    className="h-[200px]"
                                    value={settings.about_bio}
                                    onChange={e => setSettings({ ...settings, about_bio: e.target.value })}
                                    placeholder="Tell your story..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                                <ImageUpload
                                    label="About Page Image"
                                    value={settings.about_image_url}
                                    onChange={url => setSettings({ ...settings, about_image_url: url })}
                                    folder="site"
                                    customFileName="about-profile"
                                />
                                <div className="space-y-2">
                                    <Label>Resume / CV File Path</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={settings.resume_url}
                                            onChange={e => setSettings({ ...settings, resume_url: e.target.value })}
                                            placeholder="/resume.pdf"
                                        />
                                        <Button variant="outline" size="icon">
                                            <FileText className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic">Url or public path to your dynamic PDF</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent value="stats" className="space-y-6">
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle>Experience & Impact</CardTitle>
                            <CardDescription>Key numbers shown in Hero and About</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Years Exp.</Label>
                                    <Input
                                        type="number"
                                        value={settings.years_exp}
                                        onChange={e => setSettings({ ...settings, years_exp: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Projects</Label>
                                    <Input
                                        type="number"
                                        value={settings.projects_count}
                                        onChange={e => setSettings({ ...settings, projects_count: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Clients</Label>
                                    <Input
                                        type="number"
                                        value={settings.clients_count}
                                        onChange={e => setSettings({ ...settings, clients_count: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Satisfaction %</Label>
                                    <Input
                                        type="number"
                                        value={settings.satisfaction_rate}
                                        onChange={e => setSettings({ ...settings, satisfaction_rate: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Socials Tab */}
                <TabsContent value="socials" className="space-y-6">
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle>Online Presence</CardTitle>
                            <CardDescription>Your social links and contact email</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>GitHub URL</Label>
                                    <Input
                                        value={settings.github_url || ""}
                                        onChange={e => setSettings({ ...settings, github_url: e.target.value })}
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>LinkedIn URL</Label>
                                    <Input
                                        value={settings.linkedin_url || ""}
                                        onChange={e => setSettings({ ...settings, linkedin_url: e.target.value })}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Twitter URL</Label>
                                    <Input
                                        value={settings.twitter_url || ""}
                                        onChange={e => setSettings({ ...settings, twitter_url: e.target.value })}
                                        placeholder="https://x.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Instagram URL</Label>
                                    <Input
                                        value={settings.instagram_url || ""}
                                        onChange={e => setSettings({ ...settings, instagram_url: e.target.value })}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Contact Email</Label>
                                    <Input
                                        value={settings.email || ""}
                                        onChange={e => setSettings({ ...settings, email: e.target.value })}
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
