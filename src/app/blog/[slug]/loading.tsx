import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <article className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back button */}
                <Skeleton className="h-9 w-32 mb-8 rounded-md" />

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Title */}
                <Skeleton className="h-12 w-full mb-3" />
                <Skeleton className="h-12 w-3/4 mb-6" />

                {/* Meta row */}
                <div className="flex gap-6 mb-12">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                </div>

                {/* Cover image */}
                <Skeleton className="aspect-video w-full rounded-2xl mb-12" />

                {/* Content paragraphs */}
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className={`h-4 w-${i % 3 === 2 ? '3/4' : 'full'}`} />
                    ))}
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i + 10} className="h-4 w-full" />
                    ))}
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </article>
    );
}
