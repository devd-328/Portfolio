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
            skill_categories: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    icon: string
                    color: string
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    icon: string
                    color: string
                    display_order: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    icon?: string
                    color?: string
                    display_order?: number
                }
            }
            skills: {
                Row: {
                    id: string
                    created_at: string
                    category_id: string
                    name: string
                    level: number
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    category_id: string
                    name: string
                    level: number
                    display_order: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    category_id?: string
                    name?: string
                    level?: number
                    display_order?: number
                }
            }
            site_settings: {
                Row: {
                    id: string
                    updated_at: string
                    hero_title: string
                    hero_name: string
                    hero_subtitle: string
                    hero_image_url: string
                    available_for_hire: boolean
                    about_title: string
                    about_bio: string
                    about_image_url: string
                    resume_url: string
                    years_exp: number
                    projects_count: number
                    clients_count: number
                    satisfaction_rate: number
                    github_url: string | null
                    linkedin_url: string | null
                    twitter_url: string | null
                    instagram_url: string | null
                    email: string | null
                }
                Insert: {
                    id?: string
                    updated_at?: string
                    hero_title?: string
                    hero_name?: string
                    hero_subtitle?: string
                    hero_image_url?: string
                    available_for_hire?: boolean
                    about_title?: string
                    about_bio?: string
                    about_image_url?: string
                    resume_url?: string
                    years_exp?: number
                    projects_count?: number
                    clients_count?: number
                    satisfaction_rate?: number
                    github_url?: string | null
                    linkedin_url?: string | null
                    twitter_url?: string | null
                    instagram_url?: string | null
                    email?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string
                    hero_title?: string
                    hero_name?: string
                    hero_subtitle?: string
                    hero_image_url?: string
                    available_for_hire?: boolean
                    about_title?: string
                    about_bio?: string
                    about_image_url?: string
                    resume_url?: string
                    years_exp?: number
                    projects_count?: number
                    clients_count?: number
                    satisfaction_rate?: number
                    github_url?: string | null
                    linkedin_url?: string | null
                    twitter_url?: string | null
                    instagram_url?: string | null
                    email?: string | null
                }
            }
            clients: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    logo_url: string | null
                    website_url: string | null
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    logo_url?: string | null
                    website_url?: string | null
                    display_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    logo_url?: string | null
                    website_url?: string | null
                    display_order?: number
                }
            }
        }
    }
}
