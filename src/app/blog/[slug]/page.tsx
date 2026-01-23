import { notFound } from "next/navigation";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
}

type Blog = Database['public']['Tables']['blogs']['Row'];

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: blog } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();


    const typedBlog = blog as Blog | null;

    if (!typedBlog) {
        return {
            title: 'Blog Not Found',
        }
    }

    return {
        title: `${typedBlog.title} | Portfolio`,
        description: typedBlog.excerpt,
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    const typedBlog = blog as Blog | null;

    if (error || !typedBlog) {
        console.error("Error fetching blog post:", error);
        notFound();
    }

    return (
        <article className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 pl-0 hover:text-purple-400">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                    </Button>
                </Link>

                <header className="mb-12">
                    <div className="flex gap-2 mb-6">
                        {typedBlog.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                        {typedBlog.title}
                    </h1>
                    <div className="flex items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Admin</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(typedBlog.created_at), 'MMMM d, yyyy')}</span>
                        </div>
                    </div>
                </header>

                {typedBlog.cover_image && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border border-border/50">
                        <img
                            src={typedBlog.cover_image}
                            alt={typedBlog.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-purple max-w-none">
                    {/* 
                TODO: Replace with proper Markdown/MDX renderer. 
                For now, just displaying raw content or simple whitespace preservation.
            */}
                    <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-muted-foreground/90">
                        {typedBlog.content}
                    </div>
                </div>
            </div>
        </article>
    );
}
