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
    "/confirm-email",
    "/create-an-account",
    "/email-confirmed",
    "/email-sent",
    "/forgot-password",
    "/reset-password",
    "/sign-in",
    "/resend-verification",
    "/welcome",
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
