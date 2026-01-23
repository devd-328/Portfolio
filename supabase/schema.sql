-- =====================================================
-- Portfolio Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Basic Info
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    
    -- Case Study
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    result TEXT NOT NULL,
    
    -- Media
    image_url TEXT NOT NULL DEFAULT '',
    gallery_urls TEXT[] DEFAULT '{}',
    
    -- Classification
    category TEXT NOT NULL DEFAULT 'Web App',
    technologies TEXT[] DEFAULT '{}',
    
    -- Links
    live_url TEXT,
    github_url TEXT,
    
    -- Metadata
    featured BOOLEAN DEFAULT FALSE,
    year TEXT NOT NULL DEFAULT '2024',
    duration TEXT NOT NULL DEFAULT '1 month',
    role TEXT NOT NULL DEFAULT 'Developer'
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Projects are publicly readable"
    ON public.projects
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only authenticated users can modify projects (for admin)
CREATE POLICY "Authenticated users can insert projects"
    ON public.projects
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
    ON public.projects
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
    ON public.projects
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- BLOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Content
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    
    -- Media
    cover_image TEXT NOT NULL DEFAULT '',
    
    -- Classification
    tags TEXT[] DEFAULT '{}',
    
    -- Status
    published BOOLEAN DEFAULT FALSE,
    
    -- Author (references Supabase Auth)
    author_id UUID NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public read access for published blogs
CREATE POLICY "Published blogs are publicly readable"
    ON public.blogs
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Authenticated users can read all blogs (including drafts)
CREATE POLICY "Authenticated users can read all blogs"
    ON public.blogs
    FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated users can modify blogs
CREATE POLICY "Authenticated users can insert blogs"
    ON public.blogs
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
    ON public.blogs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blogs"
    ON public.blogs
    FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================
-- INDEXES (for performance)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Sample Project
INSERT INTO public.projects (
    title, short_description, full_description, challenge, solution, result,
    category, technologies, live_url, github_url, featured, year, duration, role
) VALUES (
    'E-Commerce Platform',
    'A full-featured e-commerce platform with product management, cart, and payments.',
    'A comprehensive e-commerce solution with real-time inventory, Stripe payments, and admin dashboard.',
    'The client needed a scalable e-commerce solution handling thousands of users.',
    'Built with Next.js, integrated Stripe for payments, PostgreSQL with Prisma ORM.',
    '99.9% uptime, 60% faster load times, 35% conversion increase.',
    'Web App',
    ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    'https://example.com',
    'https://github.com',
    true,
    '2024',
    '3 months',
    'Full Stack Developer'
);

-- Sample Blog (you'll need to replace 'YOUR_USER_ID' with actual auth user ID)
-- INSERT INTO public.blogs (
--     title, slug, excerpt, content, cover_image, tags, published, author_id
-- ) VALUES (
--     'Getting Started with Next.js 15',
--     'getting-started-nextjs-15',
--     'A comprehensive guide to the new features in Next.js 15...',
--     '# Getting Started with Next.js 15\n\nNext.js 15 introduces exciting new features...',
--     'https://example.com/cover.jpg',
--     ARRAY['Next.js', 'React', 'Tutorial'],
--     true,
--     'YOUR_USER_ID'
-- );
