"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, Image as ImageIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    label?: string;
    description?: string;
    bucket?: string;
    folder?: string;
    customFileName?: string;
}

export default function MultiImageUpload({
    value = [],
    onChange,
    label = "Gallery Images",
    description = "Upload project screenshots",
    bucket = "portfolio",
    folder = "projects",
    customFileName
}: MultiImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleUpload = async (files: FileList) => {
        try {
            setLoading(true);
            const newUrls = [...value];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split(".").pop();
                const timestamp = Date.now() + i; // Offset slightly for uniqueness
                const name = customFileName
                    ? `${customFileName}-gallery-${timestamp}.${fileExt}`
                    : `gallery-${timestamp}.${fileExt}`;
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

                newUrls.push(publicUrl);
            }

            onChange(newUrls);
        } catch (error: any) {
            console.error("Multi-upload error:", error);
            let message = "Failed to upload images.";
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
        if (e.target.files) {
            handleUpload(e.target.files);
            e.target.value = "";
        }
    };

    const removeImage = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    <label className="text-sm font-medium">{label}</label>
                </div>
                <span className="text-xs text-muted-foreground">{value.length} images</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {value.map((url, index) => (
                    <div key={url} className="relative group aspect-video rounded-xl overflow-hidden border border-border bg-muted/20">
                        <img
                            src={url}
                            alt={`Gallery ${index}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error("Gallery image load failed:", url);
                                e.currentTarget.src = "https://placehold.co/600x400?text=Load+Error";
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className={cn(
                        "aspect-video rounded-xl border-2 border-dashed border-border hover:border-brand-start/50 hover:bg-muted/30 transition-all flex flex-col items-center justify-center text-center p-4 group",
                        loading && "cursor-not-allowed opacity-50"
                    )}
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 text-brand-start animate-spin" />
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-brand-start/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-brand-start" />
                            </div>
                            <p className="text-xs font-medium text-muted-foreground">Add Image</p>
                        </>
                    )}
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                multiple
                className="hidden"
            />
            <p className="text-[10px] text-muted-foreground">{description}</p>
        </div>
    );
}
