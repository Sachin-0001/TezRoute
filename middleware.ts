import { NextRequest, NextResponse } from "next/server";

// Public paths that do not require authentication
const PUBLIC_PATHS: RegExp[] = [
  /^\/login$/,
  /^\/api\/users\/login$/,
  /^\/api\/users\/signup$/,
  /^\/api\/users\/logout$/, // allow so client can call it without being blocked
  /^\/public\//,
  /^\/favicon\.ico$/,
  /^\/.*\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Debug logging
  console.log(`Middleware checking: ${pathname}`);

  const isPublic = PUBLIC_PATHS.some((re) => re.test(pathname));
  if (isPublic) {
    console.log(`Public path allowed: ${pathname}`);
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log(`Token found: ${!!token}`);

  if (!token) {
    console.log(`Redirecting to login from: ${pathname}`);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log(`Access granted to: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
