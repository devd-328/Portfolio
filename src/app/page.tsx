import {
  Hero,
  About,
  Projects,
  Skills,
  Contact,
} from "@/components/shared";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type SkillCategory = Database["public"]["Tables"]["skill_categories"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Client = Database["public"]["Tables"]["clients"]["Row"];

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const supabase = await createClient();

  // Fetch all data in parallel to avoid waterfalls
  const [
    { data: settings },
    { data: projects },
    { data: skillCategories },
    { data: skills },
    { data: clients },
  ] = await Promise.all([
    supabase.from("site_settings").select("*").single(),
    supabase.from("projects").select("*").order("created_at", { ascending: false }),
    supabase.from("skill_categories").select("*").order("display_order"),
    supabase.from("skills").select("*").order("display_order"),
    supabase.from("clients").select("*").order("display_order"),
  ]);

  const typedProject = projects as Project[] | null;
  const typedSkillCategories = skillCategories as SkillCategory[] | null;
  const typedSkills = skills as Skill[] | null;
  const typedClients = clients as Client[] | null;

  // Transform skill categories to the format expected by the Skills component
  const transformedSkillCategories = (typedSkillCategories || []).map((category) => ({
    title: category.title,
    icon: category.icon,
    color: category.color,
    skills: (typedSkills || [])
      .filter((skill) => skill.category_id === category.id)
      .map((skill) => ({
        name: skill.name,
        level: skill.level,
      })),
  }));

  return (
    <>
      <Hero settings={settings as any} />
      <About settings={settings as any} clients={typedClients || []} />
      <Projects projects={typedProject || []} />
      <Skills skillCategories={transformedSkillCategories as any} />
      <Contact />
    </>
  );
}
