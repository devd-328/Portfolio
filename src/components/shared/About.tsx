"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Download, MapPin, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const stats = [
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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="about"
            className="relative py-20 md:py-32 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-start/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-middle/10 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                                    src="/My-Professional-Pic.jpeg"
                                    alt="About Profile Picture"
                                    fill
                                    className="object-cover"
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
                                        <p className="text-xs text-muted-foreground">3+ Years</p>
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
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                            Passionate Developer &{" "}
                            <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                Creative Problem Solver
                            </span>
                        </h2>

                        {/* Description */}
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Hello! I&apos;m a Full Stack Developer with over 3 years of experience
                                building web applications that are not only functional but also
                                beautiful and user-friendly.
                            </p>
                            <p>
                                My journey in tech started with a curiosity about how things work
                                on the internet, and it has evolved into a passion for creating
                                digital experiences that make a difference. I specialize in modern
                                JavaScript frameworks, with a focus on React, Next.js, and Node.js.
                            </p>
                            <p>
                                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                                contributing to open-source projects, or sharing knowledge with
                                the developer community.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-8"
                        >
                            <Button
                                size="lg"
                                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
                            >
                                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                Download CV
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
