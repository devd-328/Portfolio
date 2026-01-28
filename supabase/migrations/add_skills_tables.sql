-- Create skill_categories table
CREATE TABLE IF NOT EXISTS skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skill_categories_display_order ON skill_categories(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);

-- Seed skill categories with existing data from Skills.tsx
INSERT INTO skill_categories (title, icon, color, display_order) VALUES
    ('Frontend', 'Code2', 'from-brand-start to-brand-middle', 1),
    ('Backend', 'Server', 'from-brand-middle to-brand-end', 2),
    ('Database', 'Database', 'from-brand-end to-brand-start', 3),
    ('DevOps & Cloud', 'Cloud', 'from-brand-start to-brand-end', 4),
    ('Tools & Others', 'Wrench', 'from-brand-middle to-brand-start', 5),
    ('Mobile', 'Smartphone', 'from-brand-end to-brand-middle', 6);

-- Seed skills for Frontend category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'React', 95, 1 FROM skill_categories WHERE title = 'Frontend'
UNION ALL
SELECT id, 'Next.js', 90, 2 FROM skill_categories WHERE title = 'Frontend'
UNION ALL
SELECT id, 'TypeScript', 88, 3 FROM skill_categories WHERE title = 'Frontend'
UNION ALL
SELECT id, 'Tailwind CSS', 92, 4 FROM skill_categories WHERE title = 'Frontend'
UNION ALL
SELECT id, 'HTML/CSS', 95, 5 FROM skill_categories WHERE title = 'Frontend'
UNION ALL
SELECT id, 'JavaScript', 93, 6 FROM skill_categories WHERE title = 'Frontend';

-- Seed skills for Backend category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'Node.js', 90, 1 FROM skill_categories WHERE title = 'Backend'
UNION ALL
SELECT id, 'Express.js', 88, 2 FROM skill_categories WHERE title = 'Backend'
UNION ALL
SELECT id, 'Python', 80, 3 FROM skill_categories WHERE title = 'Backend'
UNION ALL
SELECT id, 'REST APIs', 92, 4 FROM skill_categories WHERE title = 'Backend'
UNION ALL
SELECT id, 'GraphQL', 75, 5 FROM skill_categories WHERE title = 'Backend'
UNION ALL
SELECT id, 'Socket.io', 78, 6 FROM skill_categories WHERE title = 'Backend';

-- Seed skills for Database category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'PostgreSQL', 85, 1 FROM skill_categories WHERE title = 'Database'
UNION ALL
SELECT id, 'MongoDB', 88, 2 FROM skill_categories WHERE title = 'Database'
UNION ALL
SELECT id, 'MySQL', 82, 3 FROM skill_categories WHERE title = 'Database'
UNION ALL
SELECT id, 'Redis', 75, 4 FROM skill_categories WHERE title = 'Database'
UNION ALL
SELECT id, 'Prisma ORM', 85, 5 FROM skill_categories WHERE title = 'Database'
UNION ALL
SELECT id, 'Firebase', 80, 6 FROM skill_categories WHERE title = 'Database';

-- Seed skills for DevOps & Cloud category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'Docker', 78, 1 FROM skill_categories WHERE title = 'DevOps & Cloud'
UNION ALL
SELECT id, 'AWS', 72, 2 FROM skill_categories WHERE title = 'DevOps & Cloud'
UNION ALL
SELECT id, 'Vercel', 90, 3 FROM skill_categories WHERE title = 'DevOps & Cloud'
UNION ALL
SELECT id, 'CI/CD', 80, 4 FROM skill_categories WHERE title = 'DevOps & Cloud'
UNION ALL
SELECT id, 'Linux', 75, 5 FROM skill_categories WHERE title = 'DevOps & Cloud'
UNION ALL
SELECT id, 'Nginx', 70, 6 FROM skill_categories WHERE title = 'DevOps & Cloud';

-- Seed skills for Tools & Others category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'Git & GitHub', 92, 1 FROM skill_categories WHERE title = 'Tools & Others'
UNION ALL
SELECT id, 'VS Code', 95, 2 FROM skill_categories WHERE title = 'Tools & Others'
UNION ALL
SELECT id, 'Figma', 70, 3 FROM skill_categories WHERE title = 'Tools & Others'
UNION ALL
SELECT id, 'Postman', 88, 4 FROM skill_categories WHERE title = 'Tools & Others'
UNION ALL
SELECT id, 'Jest', 75, 5 FROM skill_categories WHERE title = 'Tools & Others'
UNION ALL
SELECT id, 'Webpack', 72, 6 FROM skill_categories WHERE title = 'Tools & Others';

-- Seed skills for Mobile category
INSERT INTO skills (category_id, name, level, display_order)
SELECT id, 'React Native', 80, 1 FROM skill_categories WHERE title = 'Mobile'
UNION ALL
SELECT id, 'Expo', 78, 2 FROM skill_categories WHERE title = 'Mobile'
UNION ALL
SELECT id, 'Flutter', 60, 3 FROM skill_categories WHERE title = 'Mobile'
UNION ALL
SELECT id, 'PWA', 85, 4 FROM skill_categories WHERE title = 'Mobile'
UNION ALL
SELECT id, 'Responsive Design', 92, 5 FROM skill_categories WHERE title = 'Mobile'
UNION ALL
SELECT id, 'Mobile-First', 90, 6 FROM skill_categories WHERE title = 'Mobile';
