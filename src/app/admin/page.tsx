import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import {
    Briefcase,
    FileText,
    Eye,
    TrendingUp,
    PlusCircle,
    ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardStats from "@/components/admin/DashboardStats";
import Link from "next/link";
import { formatDate } from "date-fns";

export default async function AdminDashboardPage() {
    const supabase = await createClient();
    type Project = Database['public']['Tables']['projects']['Row'];
    type Blog = Database['public']['Tables']['blogs']['Row'];

    // Fetch some stats
    const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

    const { count: blogsCount } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true });

    const { count: viewsCount } = await (supabase
        .from("page_views") as any)
        .select("*", { count: "exact", head: true });

    // Calculate Engagement (View growth last 24h vs previous 24h)
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const last48h = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    const { count: currentViews } = await (supabase
        .from("page_views") as any)
        .select("*", { count: "exact", head: true })
        .gte("created_at", last24h);

    const { count: previousViews } = await (supabase
        .from("page_views") as any)
        .select("*", { count: "exact", head: true })
        .gte("created_at", last48h)
        .lt("created_at", last24h);

    let engagementValue = 0;
    if (previousViews && previousViews > 0) {
        engagementValue = Math.round(((currentViews || 0) - previousViews) / previousViews * 100);
    } else if (currentViews && currentViews > 0) {
        engagementValue = 100;
    }
    const engagement = engagementValue >= 0 ? `+${engagementValue}%` : `${engagementValue}%`;

    // Get recent logs/updates or similar
    const { data: projData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

    const { data: blogData } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

    const recentProjects = (projData as Project[] | null) || [];
    const recentBlogs = (blogData as Blog[] | null) || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back to your portfolio management center.</p>
            </div>

            <DashboardStats
                initialProjectsCount={projectsCount || 0}
                initialBlogsCount={blogsCount || 0}
                initialViewsCount={viewsCount || 0}
                engagement={engagement}
            />

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <Card className="border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Recent Projects</CardTitle>
                            <CardDescription>Latest additions to your showcase</CardDescription>
                        </div>
                        <Link href="/admin/projects">
                            <Button variant="ghost" size="sm">
                                View All <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentProjects && recentProjects.length > 0 ? (
                                recentProjects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                <Briefcase className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{project.title}</p>
                                                <p className="text-xs text-muted-foreground">{project.category}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] uppercase">{project.featured ? "Featured" : "Standard"}</Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                    No projects added yet.
                                </div>
                            )}
                            <Link href="/admin/projects/new" className="block">
                                <Button className="w-full" variant="outline">
                                    <PlusCircle className="mr-2 w-4 h-4" /> Add New Project
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Blogs */}
                <Card className="border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Recent Blogs</CardTitle>
                            <CardDescription>Latest articles published</CardDescription>
                        </div>
                        <Link href="/admin/blogs">
                            <Button variant="ghost" size="sm">
                                View All <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBlogs && recentBlogs.length > 0 ? (
                                recentBlogs.map((blog) => (
                                    <div key={blog.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{blog.title}</p>
                                                <p className="text-xs text-muted-foreground">Draft</p>
                                            </div>
                                        </div>
                                        <Badge variant={blog.published ? "default" : "secondary"} className="text-[10px] uppercase">
                                            {blog.published ? "Published" : "Draft"}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                    No blog posts yet.
                                </div>
                            )}
                            <Link href="/admin/blogs/new" className="block">
                                <Button className="w-full" variant="outline">
                                    <PlusCircle className="mr-2 w-4 h-4" /> Write New Post
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
