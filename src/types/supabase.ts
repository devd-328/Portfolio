export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    short_description: string
                    full_description: string
                    challenge: string
                    solution: string
                    result: string
                    image_url: string
                    gallery_urls: string[]
                    category: string
                    technologies: string[]
                    live_url: string | null
                    github_url: string | null
                    featured: boolean
                    year: string
                    duration: string
                    role: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    short_description: string
                    full_description: string
                    challenge: string
                    solution: string
                    result: string
                    image_url: string
                    gallery_urls: string[]
                    category: string
                    technologies: string[]
                    live_url?: string | null
                    github_url?: string | null
                    featured?: boolean
                    year: string
                    duration: string
                    role: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    short_description?: string
                    full_description?: string
                    challenge?: string
                    solution?: string
                    result?: string
                    image_url?: string
                    gallery_urls?: string[]
                    category?: string
                    technologies?: string[]
                    live_url?: string | null
                    github_url?: string | null
                    featured?: boolean
                    year?: string
                    duration?: string
                    role?: string
                }
            }
            blogs: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    slug: string
                    excerpt: string
                    content: string
                    cover_image: string
                    tags: string[]
                    published: boolean
                    author_id: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    slug: string
                    excerpt: string
                    content: string
                    cover_image: string
                    tags: string[]
                    published?: boolean
                    author_id: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    slug?: string
                    excerpt?: string
                    content?: string
                    cover_image?: string
                    tags?: string[]
                    published?: boolean
                    author_id?: string
                }
            }
        }
    }
}
