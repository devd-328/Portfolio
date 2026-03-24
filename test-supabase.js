const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://yhsyqajzouyfqrrgrjjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloc3lxYWp6b3V5ZnFycmdyampnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjc4NjgsImV4cCI6MjA4NDY0Mzg2OH0.8jxJ2JPi9NqxJ5HOmum_Agkob5Io7pyiKhUBc2lZqCE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing skills fetch...');
  const { data: categories, error: catError } = await supabase.from('skill_categories').select('*');
  console.log('Categories:', categories);
  if (catError) console.error(catError);

  const { data: skills, error: skillsError } = await supabase.from('skills').select('*');
  console.log('Skills count:', skills?.length);
  if (skillsError) console.error(skillsError);
}
test();
