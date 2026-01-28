"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Download, MapPin, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
type Client = Database["public"]["Tables"]["clients"]["Row"];

// Initial fallback stats
const defaultStats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Projects Completed" },
    { value: 30, suffix: "+", label: "Happy Clients" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export default function About() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, clientsRes] = await Promise.all([
                    (supabase.from("site_settings") as any).select("*").single(),
                    (supabase.from("clients") as any).select("*").order("display_order")
                ]);
                if (!settingsRes.error) setSettings(settingsRes.data);
                if (!clientsRes.error) setClients(clientsRes.data || []);
            } catch (err) {
                console.error("About: Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const aboutTitle = settings?.about_title || "Passionate Developer & Creative Problem Solver";
    const aboutBio = settings?.about_bio || "Hello! I'm a Full Stack Developer with over 3 years of experience building web applications that are not only functional but also beautiful and user-friendly.";
    const aboutImage = settings?.about_image_url || "/My-Professional-Pic.jpeg";
    const resumeUrl = settings?.resume_url || "/Dev_Das_Resume.pdf";

    const stats = [
        { value: settings?.years_exp ?? 3, suffix: "+", label: "Years Experience" },
        { value: settings?.projects_count ?? 50, suffix: "+", label: "Projects Completed" },
        { value: settings?.clients_count ?? 30, suffix: "+", label: "Happy Clients" },
        { value: settings?.satisfaction_rate ?? 99, suffix: "%", label: "Client Satisfaction" },
    ];

    if (loading) return null;

    return (
        <section
            id="about"
            className="relative py-12 md:py-16 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-start/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-middle/10 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand-start/20 to-brand-middle/20 rounded-2xl blur-xl" />
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-start rounded-tl-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-brand-middle rounded-br-2xl" />

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                                <Image
                                    src={aboutImage}
                                    alt="About Profile Picture"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>

                            {/* Floating Info Cards */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-4 top-1/4 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-brand-start/20">
                                        <Briefcase className="w-5 h-5 text-brand-start" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Full Stack Developer</p>
                                        <p className="text-xs text-muted-foreground">{settings?.years_exp ?? 3}+ Years</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-4 bottom-1/4 p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-brand-middle/20">
                                        <MapPin className="w-5 h-5 text-brand-middle" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Pakistan</p>
                                        <p className="text-xs text-muted-foreground">Remote Available</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        {/* Section Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6">
                            <Calendar className="w-4 h-4 text-brand-start" />
                            <span className="text-sm font-medium text-brand-start">About Me</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            {aboutTitle}
                        </h2>

                        {/* Description */}
                        <div className="space-y-4 text-muted-foreground">
                            {aboutBio.split('\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group bg-gradient-to-r from-brand-start to-brand-middle hover:opacity-90 text-white shadow-lg shadow-brand-start/25"
                            >
                                <a href={resumeUrl} download>
                                    <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Clients Section [NEW] */}
                {clients.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-24"
                    >
                        <div className="text-center mb-10">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Trusted By</h3>
                            <div className="h-1 w-12 bg-gradient-to-r from-brand-start to-brand-middle mx-auto rounded-full" />
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {clients.map((client) => (
                                <a
                                    key={client.id}
                                    href={client.website_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-24 h-12 md:w-32 md:h-16 group"
                                >
                                    {client.logo_url ? (
                                        <Image
                                            src={client.logo_url}
                                            alt={client.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="flex items-center justify-center font-bold text-lg">{client.name}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
