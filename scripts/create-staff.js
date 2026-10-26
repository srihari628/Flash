// BuilDo Administrative Role Setup Script
// Usage: node scripts/create-staff.js <user-email> [role: staff | developer | reviewer | admin]

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration in .env.local');
  process.exit(1);
}

const email = process.argv[2];
const targetRole = process.argv[3] || 'staff';

if (!email) {
  console.log('Usage: node scripts/create-staff.js <email> [role]');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function assignRole() {
  console.log(`Setting role "${targetRole}" for ${email}...`);
  // Look up profile by email
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .single();

  if (error || !profile) {
    console.log(`No registered user found with email ${email}. Please sign up first at /auth/signup, then run this command.`);
    return;
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: targetRole })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Failed to update role:', updateError);
  } else {
    console.log(`Successfully updated ${profile.full_name} (${email}) to role "${targetRole}".`);
  }
}

assignRole();
