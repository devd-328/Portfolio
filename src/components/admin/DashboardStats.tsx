"use client";

import { useEffect, useState } from "react";
import { Briefcase, FileText, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface DashboardStatsProps {
    initialProjectsCount: number;
    initialBlogsCount: number;
    initialViewsCount: number;
    engagement: string;
}

export default function DashboardStats({
    initialProjectsCount,
    initialBlogsCount,
    initialViewsCount,
    engagement
}: DashboardStatsProps) {
    const [stats, setStats] = useState({
        projects: initialProjectsCount,
        blogs: initialBlogsCount,
        views: initialViewsCount,
        engagement: engagement
    });

    const supabase = createClient();

    useEffect(() => {
        // Real-time subscription for page views
        const channel = supabase
            .channel('realtime-page-views')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'page_views'
                },
                () => {
                    setStats(prev => ({ ...prev, views: prev.views + 1 }));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const isPositive = stats.engagement.includes('+') && stats.engagement !== '+0%';
    const isNegative = stats.engagement.includes('-');
    const engagementColor = isPositive ? "text-emerald-500" : isNegative ? "text-rose-500" : "text-slate-500";
    const engagementBg = isPositive ? "bg-emerald-500/10" : isNegative ? "bg-rose-500/10" : "bg-slate-500/10";

    const statCards = [
        { label: "Total Projects", value: stats.projects, icon: Briefcase, color: "text-brand-start", bg: "bg-brand-start/10" },
        { label: "Total Blogs", value: stats.blogs, icon: FileText, color: "text-brand-middle", bg: "bg-brand-middle/10" },
        { label: "Page Views", value: stats.views.toLocaleString(), icon: Eye, color: "text-brand-end", bg: "bg-brand-end/10" },
        { label: "Engagement", value: stats.engagement, icon: TrendingUp, color: engagementColor, bg: engagementBg },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
                <Card key={stat.label} className="border-border/50 bg-card/50">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                            <div className={stat.bg + " p-3 rounded-xl " + stat.color}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
