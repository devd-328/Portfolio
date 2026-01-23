"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Don't show public navbar on admin routes
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <>
            {/* Click-outside Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.header
                ref={navRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled || isOpen
                        ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-md"
                        : "bg-transparent"
                )}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="relative group">
                            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-start via-brand-middle to-brand-end bg-clip-text text-transparent">
                                Portfolio
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-start to-brand-end transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-start to-brand-middle transition-all duration-300 group-hover:w-3/4 rounded-full" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Icons & Theme Toggle - Desktop */}
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            <motion.a
                                href="https://github.com/devd-328"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-brand-start transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/dev-das-webdev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-brand-start transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="mailto:devdas.tech10@gmail.com"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-brand-start transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-brand-start"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border mt-2 rounded-2xl shadow-2xl mx-2"
                            >
                                <div className="py-6 space-y-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-6 py-4 rounded-xl text-lg font-medium text-muted-foreground hover:text-brand-start hover:bg-brand-start/5 transition-all duration-200"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Social Links & Theme Toggle - Mobile */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                                        className="flex items-center gap-3 px-4 pt-4 border-t border-border mt-4"
                                    >
                                        <ThemeToggle />
                                        <a
                                            href="https://github.com/devd-328"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/dev-das-webdev/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="mailto:devdas.tech10@gmail.com"
                                            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </motion.header>
        </>
    );
}
