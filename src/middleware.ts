import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Exclude public paths from authentication check
  if (pathname.startsWith('/login') || 
      pathname.startsWith('/api/auth') || 
      pathname.includes('favicon.ico') ||
      pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });
  
  // Redirect to login if not authenticated and accessing protected routes
  if (!token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 