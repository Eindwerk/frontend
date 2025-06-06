// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let pathname = request.nextUrl.pathname;

  // Zorg dat alles lowercase is (optioneel, maar voorkomt case‐issues)
  pathname = pathname.toLowerCase();

  // 🔓 Public routes (exacte path of prefix).
  //   We vergelijken zowel exact als op “startswith” voor alles wat daarna komt (bv. /email-confirmed/xyz of /email-confirmed?...)
  const publicPaths = [
    "/sign-in",
    "/create-an-account",
    "/forgot-password",
    "/email-confirmed",
    "/email-sent",
    "/welcome",
    "/reset-password",
    "/resend-verification",
  ];

  // Een route is “public” als de pathname precies gelijk is aan een item in publicPaths
  // OF als de pathname daarna een slash of query‐parameter heeft.
  const isPublic = publicPaths.some((publicPath) => {
    return (
      pathname === publicPath || pathname.startsWith(publicPath + "/") // bv. /email-confirmed/iets
    );
  });

  // 1) Als er géén token is én we zitten NIET op een public route → redirect naar /welcome
  if (!token && !isPublic) {
    const loginUrl = new URL("/welcome", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2) Als er wél een token is én we zitten op een public route → stuur naar "/"
  //    (we willen ingelogde gebruikers niet op sign-in/…/email-confirmed laten blijven)
  if (token && isPublic) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 3) In alle andere gevallen (token + niet‐public ⋁ geen token + public) → laat doorgaan
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Activeer deze middleware op alle routes behalve:
        _next/static, _next/image, favicon.ico én api‐routes
    */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
