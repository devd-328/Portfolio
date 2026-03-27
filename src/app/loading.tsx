export default function Loading() {
    // Homepage is a large server component. Show a minimal full-screen shimmer
    // so users see something instantly rather than a blank dark screen.
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero section skeleton */}
            <section className="relative min-h-screen flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left content */}
                        <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                            <div className="h-10 w-44 bg-muted/60 rounded-full animate-pulse mx-auto lg:mx-0" />
                            <div className="space-y-3">
                                <div className="h-16 w-3/4 bg-muted/60 rounded-2xl animate-pulse mx-auto lg:mx-0" />
                                <div className="h-16 w-1/2 bg-muted/60 rounded-2xl animate-pulse mx-auto lg:mx-0" />
                            </div>
                            <div className="h-6 w-full max-w-lg bg-muted/60 rounded-xl animate-pulse mx-auto lg:mx-0" />
                            <div className="h-5 w-5/6 max-w-md bg-muted/60 rounded-xl animate-pulse mx-auto lg:mx-0" />
                            <div className="flex gap-4 justify-center lg:justify-start pt-2">
                                <div className="h-12 w-40 bg-muted/60 rounded-xl animate-pulse" />
                                <div className="h-12 w-36 bg-muted/60 rounded-xl animate-pulse" />
                            </div>
                            <div className="grid grid-cols-3 gap-6 pt-4 max-w-sm mx-auto lg:mx-0">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="space-y-2 text-center lg:text-left">
                                        <div className="h-8 w-16 bg-muted/60 rounded-md animate-pulse" />
                                        <div className="h-4 w-full bg-muted/60 rounded-md animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Right - avatar */}
                        <div className="relative flex justify-center order-1 lg:order-2">
                            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-muted/60 animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
