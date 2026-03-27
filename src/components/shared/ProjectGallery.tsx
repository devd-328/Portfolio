"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Folder } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Optional: Import plugins if needed
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface ProjectGalleryProps {
    images: string[];
    projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
    const [index, setIndex] = useState(-1);

    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-border/50 bg-muted/20">
                <Folder className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No screenshots available for this project.</p>
            </div>
        );
    }

    const slides = images.map((src) => ({
        src,
        title: projectTitle,
    }));

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative aspect-video rounded-xl overflow-hidden border border-border bg-linear-to-br from-brand-start/5 via-background to-brand-middle/5 cursor-pointer shadow-sm hover:shadow-xl hover:border-brand-start/30 transition-all duration-500"
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={image}
                            alt={`${projectTitle} screenshot ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-brand-start/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Maximize2 className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        {/* Image Index Indicator */}
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {i + 1} / {images.length}
                        </div>
                    </motion.div>
                ))}
            </div>

            <Lightbox
                index={index}
                slides={slides}
                open={index >= 0}
                close={() => setIndex(-1)}
                plugins={[Zoom, Thumbnails, Counter]}
                thumbnails={{
                    position: "bottom",
                    width: 120,
                    height: 80,
                    border: 1,
                    gap: 10,
                }}
            />
        </div>
    );
}
