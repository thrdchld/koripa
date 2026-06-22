import { NextResponse } from 'next/server';
import { createClient } from '@/services/supabase.service';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Verify whitelist status
        const { data: admin, error: dbError } = await supabase
          .from('admins')
          .select('is_active')
          .eq('email', user.email)
          .single();

        if (!dbError && admin && admin.is_active) {
          return NextResponse.redirect(`${origin}${next}`);
        } else {
          // Unauthorized email, clear session and redirect with error
          await supabase.auth.signOut();
          return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`);
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
