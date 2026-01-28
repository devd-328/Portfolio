"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    LogOut,
    User,
    Menu,
    X,
    PlusCircle,
    Settings,
    Zap,
    Building2,
    Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/about", icon: Edit3 },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Skills", href: "/admin/skills", icon: Zap },
    { name: "Clients", href: "/admin/clients", icon: Building2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    // Reset sidebar on desktop, keep toggle on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
                <span className="font-bold text-xl bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                    Admin
                </span>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar with Backdrop on Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: -260, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -260, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed md:sticky inset-y-0 left-0 w-64 bg-card border-r border-border p-4 flex flex-col z-[60] h-screen overflow-y-auto"
                        >
                            <div className="mb-8 px-2 flex items-center justify-between">
                                <span className="font-bold text-2xl bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                    Portfolio Admin
                                </span>
                                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <nav className="flex-1 space-y-2">
                                {sidebarLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                            pathname === link.href
                                                ? "bg-gradient-to-r from-brand-start/10 to-brand-middle/10 text-brand-start border border-brand-start/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="pt-4 border-t border-border space-y-2 mt-auto">
                                {/* Back to Site Link */}
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-4"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Back to Website
                                </Link>

                                <div className="px-3 py-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-start to-brand-middle flex items-center justify-center text-white font-bold text-xs">
                                        {user?.email?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{user?.email?.split('@')[0]}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-muted/20 p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
