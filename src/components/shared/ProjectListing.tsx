"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Folder, ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/projects/${project.slug || project.id}`}>
                <Card className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-brand-start/50 transition-all duration-500 cursor-pointer h-full">
                    {/* Image Container */}
                    <div className="relative aspect-video overflow-hidden">
                        {project.image_url ? (
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-start/20 via-background to-brand-middle/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Folder className="w-16 h-16 text-muted-foreground/30" />
                                </div>
                            </>
                        )}

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <div className="flex gap-3">
                                {project.live_url && (
                                    <motion.span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(project.live_url!, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 rounded-full bg-gradient-to-r from-brand-start to-brand-middle text-white shadow-lg cursor-pointer"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </motion.span>
                                )}
                                {project.github_url && (
                                    <motion.span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(project.github_url!, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground shadow-lg cursor-pointer"
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.span>
                                )}
                            </div>
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                            <div className="absolute top-3 right-3 border-0">
                                <Badge className="bg-gradient-to-r from-brand-start to-brand-middle text-white border-0">
                                    Featured
                                </Badge>
                            </div>
                        )}
                    </div>

                    <CardContent className="p-6">
                        {/* Category */}
                        <Badge
                            variant="secondary"
                            className="mb-3 text-xs bg-brand-start/10 text-brand-start border-brand-start/20"
                        >
                            {project.category}
                        </Badge>

                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-start transition-colors">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {project.short_description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 4 && (
                                <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                    +{project.technologies.length - 4}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export default function ProjectListing({
    projects,
    categories,
}: {
    projects: Project[];
    categories: string[];
}) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 hover:bg-brand-start/10 hover:text-brand-start transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6">
                            <Folder className="w-4 h-4 text-brand-start" />
                            <span className="text-sm font-medium text-brand-start">
                                Portfolio
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            All My{" "}
                            <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category: string) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category)}
                                className={
                                    activeCategory === category
                                        ? "bg-gradient-to-r from-brand-start to-brand-middle text-white border-0"
                                        : "border-brand-start/30 hover:border-brand-start/50 hover:bg-brand-start/10"
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No projects found in this category.</p>
                </div>
            )}
        </div>
    );
}
