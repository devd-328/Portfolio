"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function PageViewTracker() {
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        // Function to track page view
        const trackView = async () => {
            try {
                // Ignore admin routes if you don't want to track yourself
                if (pathname.startsWith("/admin")) return;

                await (supabase.from("page_views") as any).insert([
                    { page_path: pathname }
                ]);
            } catch (error) {
                console.error("Failed to track page view:", error);
            }
        };

        trackView();
    }, [pathname, supabase]);

    return null; // This component doesn't render anything
}
