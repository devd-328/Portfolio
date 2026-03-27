import { AboutSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <AboutSkeleton />
        </div>
    );
}
