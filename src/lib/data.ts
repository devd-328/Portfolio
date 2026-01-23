export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    challenge: string;
    solution: string;
    result: string;
    image: string;
    gallery: string[];
    category: string;
    technologies: string[];
    liveUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    year: string;
    duration: string;
    role: string;
}

export const projects: Project[] = [
    {
        id: "ecommerce-platform",
        title: "E-Commerce Platform",
        shortDescription:
            "A full-featured e-commerce platform with product management, cart functionality, payment integration, and order tracking.",
        fullDescription:
            "A comprehensive e-commerce solution built for modern online businesses. This platform includes advanced features like real-time inventory management, secure payment processing with Stripe, and a responsive admin dashboard for managing products, orders, and customers.",
        challenge:
            "The client needed a scalable e-commerce solution that could handle thousands of concurrent users while maintaining fast load times and a seamless checkout experience.",
        solution:
            "Built with Next.js for optimal performance and SEO, integrated Stripe for secure payments, and implemented PostgreSQL with Prisma ORM for reliable data management. Used Redis for caching frequently accessed data.",
        result:
            "Achieved 99.9% uptime, reduced page load times by 60%, and increased conversion rates by 35% within the first month of launch.",
        image: "/projects/ecommerce.png",
        gallery: [
            "/projects/ecommerce-1.png",
            "/projects/ecommerce-2.png",
            "/projects/ecommerce-3.png",
        ],
        category: "Web App",
        technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma", "Redis", "Tailwind CSS"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        year: "2024",
        duration: "3 months",
        role: "Full Stack Developer",
    },
    {
        id: "task-management-app",
        title: "Task Management App",
        shortDescription:
            "A collaborative task management application with real-time updates, team workspaces, and progress tracking.",
        fullDescription:
            "A modern task management platform designed for remote teams. Features include real-time collaboration, customizable workflows, time tracking, and comprehensive analytics to measure team productivity.",
        challenge:
            "Remote teams struggle with staying synchronized. The challenge was to create a tool that provides real-time updates and intuitive collaboration features without overwhelming users.",
        solution:
            "Implemented Socket.io for real-time synchronization, designed an intuitive drag-and-drop interface, and created customizable workspace templates. Built notification system for important updates.",
        result:
            "Over 500 teams adopted the platform within 6 months. User surveys showed 89% satisfaction rate and 40% improvement in team productivity.",
        image: "/projects/taskapp.png",
        gallery: [
            "/projects/taskapp-1.png",
            "/projects/taskapp-2.png",
            "/projects/taskapp-3.png",
        ],
        category: "Web App",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Redux"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        year: "2024",
        duration: "4 months",
        role: "Lead Developer",
    },
    {
        id: "finance-dashboard",
        title: "Finance Dashboard",
        shortDescription:
            "An interactive dashboard for tracking personal finances, investments, and generating financial reports.",
        fullDescription:
            "A comprehensive personal finance management tool that helps users track expenses, monitor investments, set budgets, and generate detailed financial reports with beautiful visualizations.",
        challenge:
            "Users needed a clear way to visualize complex financial data without feeling overwhelmed by numbers and charts.",
        solution:
            "Created intuitive data visualizations using D3.js, implemented smart categorization of transactions, and designed a clean, minimalist interface that surfaces the most important information.",
        result:
            "Users reported 50% better understanding of their spending habits and an average savings increase of 20% within 3 months of using the app.",
        image: "/projects/finance.png",
        gallery: [
            "/projects/finance-1.png",
            "/projects/finance-2.png",
            "/projects/finance-3.png",
        ],
        category: "Web App",
        technologies: ["React", "D3.js", "Express", "MySQL", "Chart.js", "Tailwind CSS"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        year: "2023",
        duration: "2 months",
        role: "Frontend Developer",
    },
    {
        id: "social-media-api",
        title: "Social Media API",
        shortDescription:
            "A scalable REST API for social media features including authentication, posts, comments, and real-time notifications.",
        fullDescription:
            "A robust backend API designed to power social media applications. Features include JWT authentication, rate limiting, real-time notifications via WebSockets, and comprehensive documentation with Swagger.",
        challenge:
            "Building an API that can scale to millions of requests while maintaining security and providing real-time features.",
        solution:
            "Implemented horizontal scaling with load balancing, used Redis for caching and session management, and designed efficient database queries with proper indexing.",
        result:
            "Successfully handles 10,000+ requests per second with average response time under 50ms. Zero security breaches since launch.",
        image: "/projects/api.png",
        gallery: [
            "/projects/api-1.png",
            "/projects/api-2.png",
            "/projects/api-3.png",
        ],
        category: "Backend",
        technologies: ["Node.js", "Express", "Redis", "PostgreSQL", "JWT", "Socket.io", "Swagger"],
        liveUrl: null,
        githubUrl: "https://github.com",
        featured: false,
        year: "2023",
        duration: "2 months",
        role: "Backend Developer",
    },
    {
        id: "mobile-fitness-app",
        title: "Mobile Fitness App",
        shortDescription:
            "A cross-platform fitness tracking app with workout plans, progress analytics, and social challenges.",
        fullDescription:
            "A comprehensive fitness companion app that helps users achieve their health goals. Features personalized workout plans, nutrition tracking, progress photos, and social challenges to stay motivated.",
        challenge:
            "Creating an engaging fitness app that users would actually stick with, unlike the many abandoned fitness apps in the market.",
        solution:
            "Focused on gamification with achievements and challenges, integrated social features for accountability, and used machine learning to provide personalized workout recommendations.",
        result:
            "85% of users remained active after 30 days (vs industry average of 25%). Featured in App Store's 'Apps We Love' section.",
        image: "/projects/fitness.png",
        gallery: [
            "/projects/fitness-1.png",
            "/projects/fitness-2.png",
            "/projects/fitness-3.png",
        ],
        category: "Mobile",
        technologies: ["React Native", "Firebase", "Redux", "Expo", "Node.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        year: "2024",
        duration: "5 months",
        role: "Full Stack Developer",
    },
    {
        id: "portfolio-template",
        title: "Portfolio Template",
        shortDescription:
            "A modern, customizable portfolio template for developers and designers with dark mode support.",
        fullDescription:
            "A beautiful, fully responsive portfolio template designed specifically for developers and designers. Features smooth animations, dark mode, and easy customization through a simple configuration file.",
        challenge:
            "Creating a portfolio template that stands out while remaining easy to customize for users with varying technical skills.",
        solution:
            "Built with Next.js and Tailwind CSS for easy styling, used Framer Motion for smooth animations, and created a simple JSON configuration for customization.",
        result:
            "Over 1,000 GitHub stars and used by 500+ developers worldwide. Featured in multiple 'Best Portfolio Templates' lists.",
        image: "/projects/portfolio.png",
        gallery: [
            "/projects/portfolio-1.png",
            "/projects/portfolio-2.png",
            "/projects/portfolio-3.png",
        ],
        category: "UI/UX",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        year: "2024",
        duration: "1 month",
        role: "Designer & Developer",
    },
];

export const categories = ["All", "Web App", "Mobile", "Backend", "UI/UX"];

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((p) => p.featured);
}
