import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/favicon.ico') ||
    pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    return supabaseResponse;
  }

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser();

  // Admin routing protection
  if (pathname.startsWith('/admin')) {
    const isLoginRoute = pathname === '/admin/login';

    if (!user) {
      if (!isLoginRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // Check whitelist in admins table
      const { data: admin, error } = await supabase
        .from('admins')
        .select('is_active')
        .eq('email', user.email)
        .single();

      const isWhitelisted = !error && admin && admin.is_active;

      if (!isWhitelisted) {
        // Sign out user and redirect to login with error
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url));
      } else if (isLoginRoute) {
        // Whitelisted admin already logged in, redirect to admin home dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
