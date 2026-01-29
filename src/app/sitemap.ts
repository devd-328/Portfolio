import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/supabase'

type Project = Database['public']['Tables']['projects']['Row']
type Blog = Database['public']['Tables']['blogs']['Row']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://devdas.tech'
    const supabase = await createClient()

    // Fetch all projects
    const { data: projects } = await supabase
        .from('projects')
        .select('id, created_at')

    // Fetch all published blogs
    const { data: blogs } = await supabase
        .from('blogs')
        .select('slug, created_at')
        .eq('published', true)

    const projectUrls = (projects as Project[] || []).map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(project.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const blogUrls = (blogs as Blog[] || []).map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...projectUrls,
        ...blogUrls,
    ]
}
