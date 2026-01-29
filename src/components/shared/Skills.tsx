"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    Code2,
    Server,
    Database,
    Palette,
    Wrench,
    Cloud,
    Smartphone,
    GitBranch,
    Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Icon mapping
const iconMap: Record<string, any> = {
    Code2,
    Server,
    Database,
    Palette,
    Wrench,
    Cloud,
    Smartphone,
    GitBranch,
    Zap,
};

interface Skill {
    name: string;
    level: number;
}

interface SkillCategory {
    title: string;
    icon: any;
    color: string;
    skills: Skill[];
}


function SkillBar({
    name,
    level,
    index,
    color,
}: {
    name: string;
    level: number;
    index: number;
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="space-y-2"
        >
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{level}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
            </div>
        </motion.div>
    );
}

function SkillCard({
    category,
    index,
}: {
    category: SkillCategory;
    index: number;
}) {
    const Icon = category.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-brand-start/50 transition-all duration-500"
        >
            {/* Glow Effect */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`}
            />

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} bg-opacity-20`}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>

            {/* Skills */}
            <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        index={skillIndex}
                        color={category.color}
                    />
                ))}
            </div>
        </motion.div>
    );
}

interface SkillsProps {
    skillCategories?: SkillCategory[];
    loading?: boolean;
}

export default function Skills({ skillCategories = [], loading = false }: SkillsProps) {
    const ref = useRef(null);

    if (loading) {
        return (
            <section id="skills" className="relative py-8 md:py-12 overflow-hidden">
                <div className="flex items-center justify-center min-h-[150px]">
                    <div className="text-muted-foreground">Loading skills...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="relative py-8 md:py-12 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-start/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-middle/10 rounded-full blur-[128px]" />
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-end/10 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6">
                        <Zap className="w-4 h-4 text-brand-start" />
                        <span className="text-sm font-medium text-brand-start">
                            My Skills
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Technical{" "}
                        <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                            Expertise
                        </span>
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive overview of my technical skills across different
                        domains of software development, from frontend to DevOps.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCard key={category.title} category={category} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20">
                        <GitBranch className="w-8 h-8 text-brand-start" />
                        <div className="text-left">
                            <p className="font-semibold">Always Learning</p>
                            <p className="text-sm text-muted-foreground">
                                Currently exploring AI/ML and Web3 technologies
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
