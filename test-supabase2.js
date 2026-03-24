const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://yhsyqajzouyfqrrgrjjg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloc3lxYWp6b3V5ZnFycmdyampnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjc4NjgsImV4cCI6MjA4NDY0Mzg2OH0.8jxJ2JPi9NqxJ5HOmum_Agkob5Io7pyiKhUBc2lZqCE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing projects fetch...');
  const { data: projects, error } = await supabase.from('projects').select('id, title').limit(2);
  console.log('Projects:', projects);
  if (error) console.error(error);
}
test();
