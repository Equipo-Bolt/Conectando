import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

const PUBLIC_ROUTES = ["/login", "/otp"];
const PROTECTED_DEFAULT_ROUTE = "/misObjetivos";
const LOGIN_ROUTE = "/login";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPublicRoute = PUBLIC_ROUTES.some(path => nextUrl.pathname.startsWith(path));
  const isProtectedRoute = config.matcher.some(path => nextUrl.pathname.startsWith(path));

  if (isPublicRoute) {
    if (isAuthenticated && (nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/otp"))) {
      return NextResponse.redirect(new URL(PROTECTED_DEFAULT_ROUTE, nextUrl.origin))
    }
    return NextResponse.next();
  }


  if (isProtectedRoute) {
    if (!isAuthenticated) {
      const callbackUrl = nextUrl.pathname + nextUrl.search;
      return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl.origin));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/misObjetivos/:path*", "/misColaboradores/:path*"],
};