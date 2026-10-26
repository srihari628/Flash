import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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

  const isStaffOrAdmin =
    (profile && ['admin', 'staff', 'developer', 'reviewer'].includes(profile.role)) ||
    ['skchanu007@gmail.com', 'skchan007@gmail.com'].includes(user.email || '');

  if (!isStaffOrAdmin) {
    redirect('/portal');
  }

  redirect('/staff/leads');
}
