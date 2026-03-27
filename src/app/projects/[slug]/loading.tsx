import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back button + header */}
                <div className="mb-12">
                    <Skeleton className="h-9 w-36 mb-8 rounded-md" />
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left - content */}
                        <div className="space-y-5">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-14 w-4/5" />
                            <Skeleton className="h-14 w-2/3" />
                            <div className="space-y-3 py-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Skeleton className="h-11 w-36 rounded-xl" />
                                <Skeleton className="h-11 w-36 rounded-xl" />
                            </div>
                        </div>
                        {/* Right - image */}
                        <Skeleton className="aspect-video rounded-2xl w-full" />
                    </div>
                </div>

                {/* Case study cards */}
                <div className="grid md:grid-cols-3 gap-8 py-16">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-border/50 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-12 h-12 rounded-xl" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div className="py-8 flex flex-wrap justify-center gap-3">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-11 w-28 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
