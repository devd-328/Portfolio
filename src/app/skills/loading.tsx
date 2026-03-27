import { SkillCardSkeleton, SectionHeaderSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionHeaderSkeleton />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <SkillCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
