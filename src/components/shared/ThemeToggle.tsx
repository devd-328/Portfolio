"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const cycleTheme = () => {
        if (theme === "system") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("system");
        }
    };

    const getIcon = () => {
        if (theme === "system") {
            return <Monitor className="w-4 h-4" />;
        }
        return resolvedTheme === "dark" ? (
            <Moon className="w-4 h-4" />
        ) : (
            <Sun className="w-4 h-4" />
        );
    };

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted"
                aria-label={`Current theme: ${theme}. Click to change.`}
            >
                <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {getIcon()}
                </motion.div>
            </Button>
        </motion.div>
    );
}
