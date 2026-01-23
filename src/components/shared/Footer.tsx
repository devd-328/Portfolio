"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, Instagram } from "lucide-react";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/devd-328", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dev-das-webdev/", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/devdas_tech", icon: Twitter },
    { name: "Instagram", href: "https://www.instagram.com/devdas.tech", icon: Instagram },
    { name: "Email", href: "mailto:devdas.tech10@gmail.com", icon: Mail },
];

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Footer() {
    const pathname = usePathname();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Don't show public footer on admin routes
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="relative bg-muted/30 border-t border-border">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold bg-gradient-to-r from-brand-start via-brand-middle to-brand-end bg-clip-text text-transparent">
                                Portfolio
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Building digital experiences with passion and precision. Let&apos;s create something amazing together.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-brand-start to-brand-middle transition-all duration-300 rounded-full" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Connect
                        </h3>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 rounded-full bg-muted hover:bg-gradient-to-r hover:from-brand-start/20 hover:to-brand-middle/20 text-muted-foreground hover:text-foreground transition-all duration-300 border border-transparent hover:border-brand-start/30"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                        © {new Date().getFullYear()} Portfolio. Made with{" "}
                        <Heart className="w-4 h-4 text-brand-start fill-brand-start animate-pulse" />{" "}
                        in Pakistan
                    </p>

                    {/* Scroll to Top Button */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-gradient-to-r hover:from-brand-start hover:to-brand-end text-muted-foreground hover:text-white transition-all duration-300 text-sm font-medium"
                    >
                        Back to top
                        <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
}
