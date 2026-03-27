import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted/60",
                className
            )}
        />
    );
}

/** Full project card placeholder */
export function ProjectCardSkeleton() {
    return (
        <div className="rounded-2xl border border-border/50 bg-background/50 overflow-hidden flex flex-col">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-6 flex-1 flex flex-col gap-3">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 mt-auto pt-2">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                </div>
            </div>
        </div>
    );
}

/** Full blog card placeholder */
export function BlogCardSkeleton() {
    return (
        <div className="rounded-2xl border border-border/50 bg-background/50 overflow-hidden flex flex-col">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/30">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                </div>
            </div>
        </div>
    );
}

/** Section header placeholder */
export function SectionHeaderSkeleton() {
    return (
        <div className="text-center mb-12 flex flex-col items-center gap-4">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-12 w-64 sm:w-96" />
            <Skeleton className="h-5 w-72 sm:w-[500px]" />
            <Skeleton className="h-5 w-56 sm:w-96" />
        </div>
    );
}

/** Skill card placeholder */
export function SkillCardSkeleton() {
    return (
        <div className="p-6 rounded-2xl border border-border/50 bg-background/50 flex flex-col gap-5">
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-6 w-36" />
            </div>
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                </div>
            ))}
        </div>
    );
}

/** About page skeleton */
export function AboutSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image side */}
                <Skeleton className="aspect-4/5 rounded-2xl w-full" />
                {/* Content side */}
                <div className="space-y-6">
                    <Skeleton className="h-8 w-28 rounded-full" />
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-12 w-1/2" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                    <Skeleton className="h-12 w-40 rounded-xl" />
                    <div className="grid grid-cols-4 gap-6 pt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="text-center space-y-2">
                                <Skeleton className="h-8 w-16 mx-auto" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
