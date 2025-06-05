import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // 🔓 Public routes
  const publicPaths = [
    "/sign-in",
    "/create-an-account",
    "/forgot-password",
    "/confirm-email",
    "/email-sent",
    "/welcome",
    "/reset-password",
  ];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublic) {
    const loginUrl = new URL("/welcome", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Als user wel token heeft én op publieke pagina zit → redirect naar "/"
  if (token && isPublic) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Alle routes behalve statische assets en API routes
    */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
