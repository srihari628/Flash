import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isStaffOrAdminUser } from '@/lib/staffConfig';

export const dynamic = 'force-dynamic';

export default async function StaffIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?next=/staff/leads');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isStaffOrAdmin = isStaffOrAdminUser(profile?.role, user.email);

  if (!isStaffOrAdmin) {
    redirect('/portal');
  }

  redirect('/staff/leads');
}
