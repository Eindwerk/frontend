// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token")?.value;
  let pathname = request.nextUrl.pathname.toLowerCase();

  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const publicPaths = [
    "/sign-in",
    "/create-an-account",
    "/forgot-password",
    "/email-confirmed",
    "/email-sent",
    "/resend-verification",
    "/welcome",
    "/reset-password",
  ];

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!tokenCookie && !isPublic) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }
  if (tokenCookie && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
