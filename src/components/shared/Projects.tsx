"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, categories, type Project } from "@/lib/data";

function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/projects/${project.id}`}>
                <Card className="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-brand-start/50 transition-all duration-500 cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-video overflow-hidden">
                        {project.image ? (
                            <Image
                                src={project.image}
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
                                {project.liveUrl && (
                                    <motion.span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(project.liveUrl!, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 rounded-full bg-gradient-to-r from-brand-start to-brand-middle text-white shadow-lg cursor-pointer"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </motion.span>
                                )}
                                <motion.span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.githubUrl!, "_blank");
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground shadow-lg cursor-pointer"
                                >
                                    <Github className="w-5 h-5" />
                                </motion.span>
                            </div>
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                            <div className="absolute top-3 right-3">
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
                            {project.shortDescription}
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

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-start/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-middle/10 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6">
                        <Folder className="w-4 h-4 text-brand-start" />
                        <span className="text-sm font-medium text-brand-start">
                            My Projects
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore my recent projects showcasing my skills in full-stack
                        development, from responsive web apps to scalable backend systems.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
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
                </motion.div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="group border-brand-start/30 hover:border-brand-start/50 hover:bg-brand-start/10"
                    >
                        View All Projects
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
