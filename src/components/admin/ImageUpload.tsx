"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    bucket?: string;
    folder?: string;
    customFileName?: string;
}

export default function ImageUpload({
    value,
    onChange,
    label = "Image",
    description = "Drag & drop or click to upload",
    bucket = "portfolio",
    folder = "images",
    customFileName
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleUpload = async (file: File) => {
        try {
            setLoading(true);
            const fileExt = file.name.split(".").pop();
            const timestamp = Date.now();
            const name = customFileName
                ? `${customFileName}-${timestamp}.${fileExt}`
                : `${timestamp}.${fileExt}`;
            const filePath = `${folder}/${name}`;

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
        } catch (error: any) {
            console.error("Upload error:", error);
            let message = "Failed to upload image.";
            if (error.message?.includes("row-level security")) {
                message = "Permission denied: Please check your Supabase Storage RLS policies.";
            } else if (error.message?.includes("bucket not found")) {
                message = "Storage bucket 'portfolio' not found. Please create it in Supabase.";
            } else {
                message = error.message || "An unexpected error occurred during upload.";
            }
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
            // Reset input value so the same file can be selected again
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

    const removeImage = () => {
        onChange("");
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-medium">{label}</label>
            </div>

            {value ? (
                <div className="relative group aspect-video rounded-xl overflow-hidden border border-border shadow-inner bg-muted/20">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("Image load failed:", value);
                            e.currentTarget.src = "https://placehold.co/600x400?text=Image+Load+Error";
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={removeImage}
                            className="shadow-xl"
                        >
                            <X className="w-4 h-4 mr-2" /> Remove
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => fileInputRef.current?.click()}
                            className="shadow-xl"
                        >
                            <Upload className="w-4 h-4 mr-2" /> Replace
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
                        "relative aspect-video rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center p-6 group",
                        isDragging
                            ? "border-brand-start bg-brand-start/5 scale-[0.99] shadow-inner"
                            : "border-border hover:border-brand-start/50 hover:bg-muted/30"
                    )}
                >
                    {loading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 text-brand-start animate-spin" />
                            <p className="text-sm font-medium text-muted-foreground">Uploading...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-16 h-16 rounded-full bg-brand-start/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-brand-start" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold mb-1">{description}</p>
                                <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WEBP</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}
