"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ResumeUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    bucket?: string;
    folder?: string;
}

export default function ResumeUpload({
    value,
    onChange,
    label = "Resume / CV",
    description = "Upload your latest CV (PDF, DOCX)",
    bucket = "portfolio",
    folder = "resumes",
}: ResumeUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleUpload = async (file: File) => {
        // Validation
        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a PDF or Word document.");
            return;
        }

        try {
            setLoading(true);
            const fileExt = file.name.split(".").pop();
            const timestamp = Date.now();
            const fileName = `CV-${timestamp}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onChange(publicUrl);
            toast.success("CV uploaded successfully!");
        } catch (error: any) {
            console.error("CV Upload error:", error);
            toast.error(error.message || "Failed to upload CV.");
        } finally {
            setLoading(false);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
            e.target.value = "";
        }
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    }, []);

    const removeFile = () => {
        onChange("");
        toast.info("CV link removed. Don't forget to save!");
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-start" />
                <label className="text-sm font-medium">{label}</label>
            </div>

            {value ? (
                <div className="relative flex items-center gap-4 p-4 rounded-xl border border-brand-start/20 bg-brand-start/5">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <FileText className="w-6 h-6 text-brand-start" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Current CV Attached</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{value}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs hover:text-brand-start"
                        >
                            Replace
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={removeFile}
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                        "relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center p-8",
                        isDragging
                            ? "border-brand-start bg-brand-start/5 scale-[0.99]"
                            : "border-border hover:border-brand-start/50 hover:bg-muted/30"
                    )}
                >
                    {loading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 text-brand-start animate-spin" />
                            <p className="text-sm font-medium text-muted-foreground">Uploading CV...</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="w-12 h-12 rounded-full bg-brand-start/10 flex items-center justify-center mx-auto">
                                <Upload className="w-6 h-6 text-brand-start" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{description}</p>
                                <p className="text-xs text-muted-foreground mt-1">PDF or Word documents only</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
            />
        </div>
    );
}
