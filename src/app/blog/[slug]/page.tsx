import { notFound } from "next/navigation";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

type Blog = Database['public']['Tables']['blogs']['Row'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: blog } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    const typedBlog = blog as Blog | null;

    if (!typedBlog) {
        return { title: 'Blog Post Not Found' };
    }

    return {
        title: `${typedBlog.title} | Dev Das Blog`,
        description: typedBlog.excerpt ?? `Read "${typedBlog.title}" on Dev Das's blog — insights on web development, React, and modern software engineering.`,
        alternates: {
            canonical: `https://devdas.tech/blog/${slug}`,
        },
        openGraph: {
            title: typedBlog.title,
            description: typedBlog.excerpt ?? "",
            type: "article",
            url: `https://devdas.tech/blog/${slug}`,
            publishedTime: typedBlog.created_at,
            authors: ["Dev Das"],
            images: typedBlog.cover_image
                ? [{ url: typedBlog.cover_image, width: 1200, height: 630, alt: typedBlog.title }]
                : [{ url: "/og-image.png", width: 1200, height: 630, alt: typedBlog.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: typedBlog.title,
            description: typedBlog.excerpt ?? "",
            images: typedBlog.cover_image ? [typedBlog.cover_image] : ["/og-image.png"],
        },
    };
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

    // Estimate read time: ~200 words per minute
    const wordCount = (typedBlog.content ?? "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const sanitizedContent = DOMPurify.sanitize(typedBlog.content ?? "");

    return (
        <article className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="mb-8 pl-0 hover:text-brand-start">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                    </Button>
                </Link>

                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {typedBlog.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-brand-start/10 text-brand-start border-brand-start/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                        {typedBlog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Dev Das</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(typedBlog.created_at), 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readTime} min read</span>
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

                {typedBlog.excerpt && (
                    <p className="text-lg text-muted-foreground mb-8 p-4 border-l-4 border-brand-start italic rounded-r-lg bg-brand-start/5">
                        {typedBlog.excerpt}
                    </p>
                )}

                <div
                    className="rich-text-content prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
            </div>
        </article>
    );
}

