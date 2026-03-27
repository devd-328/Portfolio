import { ProjectCardSkeleton, SectionHeaderSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter buttons placeholder */}
            <div className="mb-12">
                <div className="h-10 w-32 bg-muted/60 rounded-md animate-pulse mb-8" />
                <SectionHeaderSkeleton />
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 w-20 bg-muted/60 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>
            {/* Grid of cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <ProjectCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
