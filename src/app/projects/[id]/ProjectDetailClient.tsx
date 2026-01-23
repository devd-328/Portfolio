"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Clock,
    User,
    Folder,
    CheckCircle2,
    Lightbulb,
    Target,
    Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/data";

interface ProjectDetailClientProps {
    project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-start/15 rounded-full blur-[128px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-middle/15 rounded-full blur-[128px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/#projects">
                            <Button
                                variant="ghost"
                                className="group mb-8 text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Projects
                            </Button>
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Category Badge */}
                            <Badge className="mb-4 bg-brand-start/20 text-brand-start border-brand-start/30">
                                {project.category}
                            </Badge>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground mb-8">
                                {project.fullDescription}
                            </p>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4 text-brand-start" />
                                    <span>{project.year}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 text-brand-start" />
                                    <span>{project.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="w-4 h-4 text-brand-start" />
                                    <span>{project.role}</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="group bg-gradient-to-r from-brand-start to-brand-middle hover:from-brand-start/90 hover:to-brand-middle/90 text-white border-0 shadow-lg shadow-brand-start/20">
                                            View Live Demo
                                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="border-brand-start/30 hover:border-brand-start/50 hover:bg-brand-start/10 transition-all duration-300">
                                            <Github className="w-4 h-4 mr-2" />
                                            View Code
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-brand-start/10 via-background to-brand-middle/10">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Folder className="w-24 h-24 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-brand-start rounded-tr-2xl opacity-50" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-brand-middle rounded-bl-2xl opacity-50" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Case Study Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Challenge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-red-500/20">
                                            <Target className="w-6 h-6 text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold">The Challenge</h3>
                                    </div>
                                    <p className="text-muted-foreground">{project.challenge}</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-yellow-500/20">
                                            <Lightbulb className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold">The Solution</h3>
                                    </div>
                                    <p className="text-muted-foreground">{project.solution}</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Result */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-green-500/20">
                                            <Trophy className="w-6 h-6 text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold">The Result</h3>
                                    </div>
                                    <p className="text-muted-foreground">{project.result}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Tech{" "}
                            <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                Stack
                            </span>
                        </h2>
                        <p className="text-muted-foreground">
                            Technologies and tools used to build this project
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {project.technologies.map((tech, index) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background border border-border hover:border-brand-start/50 transition-all duration-300">
                                    <CheckCircle2 className="w-4 h-4 text-brand-start" />
                                    <span className="font-medium">{tech}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Project{" "}
                            <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                Gallery
                            </span>
                        </h2>
                        <p className="text-muted-foreground">
                            Screenshots and visuals from the project
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {project.gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-video rounded-xl overflow-hidden border border-border bg-gradient-to-br from-brand-start/10 via-background to-brand-middle/10"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {image && image.startsWith("/") ? (
                                        <Image
                                            src={image}
                                            alt={`${project.title} screenshot ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <Folder className="w-12 h-12 text-muted-foreground/30" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Interested in working together?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Let&apos;s discuss your next project and bring your ideas to life.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/#contact">
                                <Button className="bg-gradient-to-r from-brand-start to-brand-middle hover:from-brand-start/90 hover:to-brand-middle/90 text-white border-0 shadow-lg shadow-brand-start/20">
                                    Get In Touch
                                </Button>
                            </Link>
                            <Link href="/#projects">
                                <Button variant="outline" className="border-brand-start/30 hover:border-brand-start/50 hover:bg-brand-start/10 transition-all duration-300">
                                    View More Projects
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
