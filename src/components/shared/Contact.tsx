"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Twitter,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "devdas.tech10@gmail.com",
        href: "mailto:devdas.tech10@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "0332-8200416",
        href: "tel:+923328200416",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Karachi, Pakistan",
        href: null,
    },
];

const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/devd-328" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/dev-das-webdev/" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/devdas_tech" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/devdas.tech" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const ref = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });

            // Reset status after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Failed to send message"
            );

            // Reset status after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="relative py-12 md:py-16 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-start/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-middle/10 rounded-full blur-[128px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-start/10 to-brand-middle/10 border border-brand-start/20 mb-6">
                        <Mail className="w-4 h-4 text-brand-start" />
                        <span className="text-sm font-medium text-brand-start">
                            Get In Touch
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Let&apos;s Work{" "}
                        <span className="bg-gradient-to-r from-brand-start to-brand-middle bg-clip-text text-transparent">
                            Together
                        </span>
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? Feel free to reach
                        out. I&apos;m always open to discussing new opportunities.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:border-brand-start/50 transition-all duration-300">
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-xl bg-gradient-to-r from-brand-start/20 to-brand-middle/20">
                                                    <info.icon className="w-5 h-5 text-brand-start" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {info.label}
                                                    </p>
                                                    {info.href ? (
                                                        <a
                                                            href={info.href}
                                                            className="font-medium hover:text-brand-start transition-colors"
                                                        >
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <p className="font-medium">{info.value}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <p className="text-sm text-muted-foreground mb-4">
                                Connect with me
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 rounded-xl bg-muted hover:bg-gradient-to-r hover:from-brand-start/20 hover:to-brand-middle/20 text-muted-foreground hover:text-foreground transition-all duration-300 border border-transparent hover:border-brand-start/30"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                        >
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                                </span>
                                <div>
                                    <p className="font-medium text-green-400">
                                        Available for hire
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Response time: 24 hours
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                            <CardContent className="p-6 sm:p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="name"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Name
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading"}
                                                className="bg-muted/50 border-border focus:border-brand-start focus:ring-brand-start/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="email"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading"}
                                                className="bg-muted/50 border-border focus:border-brand-start focus:ring-brand-start/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="subject"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Subject
                                        </label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="What's this about?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            disabled={status === "loading"}
                                            className="bg-muted/50 border-border focus:border-brand-start focus:ring-brand-start/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="message"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell me about your project..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            disabled={status === "loading"}
                                            className="bg-muted/50 border-border focus:border-brand-start focus:ring-brand-start/20 resize-none"
                                        />
                                    </div>

                                    {/* Status Messages */}
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400"
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                                        </motion.div>
                                    )}

                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{errorMessage}</span>
                                        </motion.div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={status === "loading"}
                                        className="w-full group bg-gradient-to-r from-brand-start to-brand-middle hover:from-brand-start/90 hover:to-brand-middle/90 text-white shadow-lg shadow-brand-start/25 disabled:opacity-50 border-0"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
