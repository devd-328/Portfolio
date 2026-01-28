"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Code2, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export default function Hero() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data, error } = await (supabase
                    .from("site_settings") as any)
                    .select("*")
                    .single();
                if (!error) setSettings(data);
            } catch (err) {
                console.error("Hero: Error fetching settings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // Fallbacks
    const heroTitle = settings?.hero_title || "Hi, I'm";
    const heroName = settings?.hero_name || "Dev Das";
    const heroSubtitle = settings?.hero_subtitle || "A passionate Full Stack Developer crafting beautiful, performant, and user-centric digital experiences.";
    const heroImage = settings?.hero_image_url || "/My-Professional-Pic.jpeg";
    const available = settings?.available_for_hire ?? true;

    if (loading) return null;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-brand-start/20" />

                {/* Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-start/20 rounded-full blur-[128px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-middle/20 rounded-full blur-[128px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-end/10 rounded-full blur-[128px]"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Badge */}
                        {available && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-brand-middle" />
                                <span className="text-sm font-medium text-brand-middle">Available for hire</span>
                            </motion.div>
                        )}

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                        >
                            <span className="block text-foreground">{heroTitle}</span>
                            <span className="block mt-2 bg-gradient-to-r from-brand-start via-brand-middle to-brand-end bg-clip-text text-transparent">
                                {heroName}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                        >
                            {heroSubtitle}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/#projects">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-gradient-to-r from-brand-start to-brand-middle hover:from-brand-start/90 hover:to-brand-middle/90 text-white shadow-lg shadow-brand-start/25 hover:shadow-brand-start/40 transition-all duration-300 border-0"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        View My Work
                                        <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="group border-brand-start/30 hover:border-brand-start/50 hover:bg-brand-start/10 transition-all duration-300"
                            >
                                <a href={settings?.resume_url || "/Dev_Das_Resume.pdf"} download>
                                    <Code2 className="w-4 h-4" />
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
                        >
                            {[
                                { value: `${settings?.years_exp ?? 3}+`, label: "Years Exp." },
                                { value: `${settings?.projects_count ?? 50}+`, label: "Projects" },
                                { value: `${settings?.clients_count ?? 30}+`, label: "Happy Clients" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Hero Image/Avatar */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative order-1 lg:order-2 flex justify-center z-0"
                    >
                        <div className="relative scale-75 sm:scale-90 lg:scale-100">
                            {/* Decorative Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 rounded-full border-2 border-dashed border-brand-start/30"
                            />

                            {/* Glow Effect */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-brand-start/20 via-brand-middle/20 to-brand-end/20 rounded-full blur-2xl" />

                            {/* Image Container */}
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-brand-start/30 shadow-2xl shadow-brand-start/20">
                                <Image
                                    src={heroImage}
                                    alt="Profile Picture"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                                    priority
                                />
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 p-3 rounded-xl bg-gradient-to-r from-brand-start to-brand-middle shadow-lg"
                            >
                                <Code2 className="w-6 h-6 text-white" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 p-3 rounded-xl bg-gradient-to-r from-brand-end to-brand-start shadow-lg"
                            >
                                <Rocket className="w-6 h-6 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                >
                    <span className="text-sm text-muted-foreground">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-5 h-5 text-purple-400" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
