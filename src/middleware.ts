import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import { getDefaultRouteForRole } from "@/utils/getDefaultRouteForRole";

const PUBLIC_ROUTES = ["/login"];
const UNSEARCHABLE_ROUTES = ["/error", "/llenarInformacion", "/403"];
const LOGIN_ROUTE = "/login";

const ROLE_PROTECTED_ROUTES_CONFIG: Record<string, number[]> = {
  "/misObjetivos": [1, 4, 5, 7],
  "/misColaboradores": [2, 4, 6, 7],
  "/usuarios": [3, 5, 6, 7],
};

export async function middleware(req: NextRequest) {
  const referer = req.headers.get("referer");
  const { nextUrl } = req;

  const session = await auth();
  const isAuthenticated = !!session;
  const userRole = session?.user?.roleID;
  const protectedDefaultRoute = getDefaultRouteForRole(userRole || 0);
  const currentPath = nextUrl.pathname;
  const isDirectAccess = !referer || !referer.startsWith(nextUrl.origin); 

  const isPublicRoute = PUBLIC_ROUTES.some((path) =>
    currentPath.startsWith(path)
  );

  const isUnsearchableRoute = UNSEARCHABLE_ROUTES.some((path) =>
    currentPath.startsWith(path)
  );

  // * If user is already authenticated and attempts to access the login
  if (isPublicRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(protectedDefaultRoute, nextUrl.origin)
      );
    }
    return NextResponse.next();
  }

  // * If user is not authenticated
  if (!isAuthenticated) {
    const callbackUrl = currentPath + nextUrl.search;
    return NextResponse.redirect(
      new URL(
        `${LOGIN_ROUTE}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        nextUrl.origin
      )
    );
  }

  // * If user tries to access unsearchable route
  if (isUnsearchableRoute && isDirectAccess) {
    if (nextUrl.pathname === "/403") {
      return NextResponse.redirect(new URL(protectedDefaultRoute, nextUrl.origin));
    }
    return NextResponse.redirect(new URL("/403", nextUrl.origin));
  }

  // * If user is already authenticated and attempts to access some protected route
  const protectedRouteConfigKey = Object.keys(
    ROLE_PROTECTED_ROUTES_CONFIG
  ).find((routePrefix) => currentPath.startsWith(routePrefix));

  if (protectedRouteConfigKey) {
    const allowedRolesForPath =
      ROLE_PROTECTED_ROUTES_CONFIG[protectedRouteConfigKey];
    if (!userRole || !allowedRolesForPath.includes(userRole)) {
      return NextResponse.redirect(new URL("/403", nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/misObjetivos/:path*",
    "/misColaboradores/:path*",
    "/usuarios/:path*",
    "/llenarInformacion/:path*",
    "/error",
    "/llenarInformacion",
    "/miInformacion",
    "/403"
  ],
};
