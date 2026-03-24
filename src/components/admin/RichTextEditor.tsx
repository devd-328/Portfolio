"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import of ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-muted animate-pulse rounded-md" />,
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "link",
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor bg-background rounded-md">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="min-h-[200px]"
            />
            <style jsx global>{`
                .rich-text-editor .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    border-color: var(--border);
                    background-color: var(--muted);
                }
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    border-color: var(--border);
                    min-height: 200px;
                    font-family: inherit;
                    font-size: 0.875rem;
                }
                .rich-text-editor .ql-editor {
                    min-height: 200px;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: var(--muted-foreground);
                    font-style: normal;
                }
                .rich-text-editor .ql-snow.ql-toolbar button:hover,
                .rich-text-editor .ql-snow.ql-toolbar button:focus,
                .rich-text-editor .ql-snow.ql-toolbar button.ql-active,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label:hover,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item:hover,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
                    color: var(--brand-start);
                }
                .rich-text-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar button:focus .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
                .rich-text-editor .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
                    stroke: var(--brand-start);
                }
                 .rich-text-editor .ql-snow.ql-toolbar button:hover .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar button:focus .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
                .rich-text-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
                    fill: var(--brand-start);
                }
            `}</style>
        </div>
    );
}
