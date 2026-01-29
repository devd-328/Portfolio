import Link from "next/link";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Blog | Portfolio",
    description: "Thoughts, tutorials, and insights on software development.",
    alternates: {
        canonical: "https://devdas.tech/blog",
    },
};

export default async function BlogPage() {
    const supabase = await createClient();
    type Blog = Database['public']['Tables']['blogs']['Row'];

    // Fetch blogs from Supabase
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    const blogs = data as Blog[] | null;

    if (error) {
        console.error("Error fetching blogs:", error);
        // Fallback content if DB connection fails (or table doesn't exist yet)
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">Blog</h1>
                    <p className="text-muted-foreground mb-8">
                        Connect to Supabase to see real blog posts.
                    </p>
                    <div className="p-6 border border-dashed border-border rounded-xl bg-muted/50">
                        <p className="text-sm text-yellow-500 mb-2 font-mono">
                            Supabase Connection needed
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Please configure your <code>.env.local</code> with valid Supabase credentials and ensure the <code>blogs</code> table exists.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Blog
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Insights</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Thoughts, tutorials, and deep dives into modern web development, software architecture, and more.
                    </p>
                </div>

                {blogs && blogs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Card key={blog.id} className="flex flex-col h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                                {blog.cover_image && (
                                    <div className="relative aspect-video overflow-hidden rounded-t-xl">
                                        <img
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex gap-2 mb-3">
                                        {blog.tags?.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-xl line-clamp-2 hover:text-purple-400 transition-colors">
                                        <Link href={`/blog/${blog.slug}`}>
                                            {blog.title}
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground line-clamp-3 text-sm">
                                        {blog.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="border-t border-border/50 pt-4 mt-auto flex justify-between items-center text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild className="hover:text-purple-400">
                                        <Link href={`/blog/${blog.slug}`}>
                                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No blog posts found yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
