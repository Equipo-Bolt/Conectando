import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import { getDefaultRouteForRole } from "@/utils/getDefaultRouteForRole";

const PUBLIC_ROUTES = ["/login"];
const LOGIN_ROUTE = "/login";

const ROLE_PROTECTED_ROUTES_CONFIG: Record<string, number[]> = {
  "/misObjetivos": [1, 4, 5, 7],
  "/misColaboradores": [2, 4, 6, 7],
  "/usuarios": [3, 5, 6, 7],
};

/**
 * Base URL for the 403 page with a special query parameter.
 * The "origin=internal" parameter indicates it was an internal redirect (not manual).
 * This prevents users from being caught in redirect loops when manually accessing /403.
 */
const FORBIDDEN_URL = new URL("/403?origin=internal", "http://localhost");

/**
 * Middleware to handle authentication and authorization.
 * - Redirects public routes if the user is authenticated.
 * - Protects routes based on user role.
 * - Handles unauthenticated access by redirecting to /403 with a callback.
 * - Allows access to /403 only when it is an internal redirect.
 *
 * @param req - Next.js request object
 * @returns NextResponse for request flow control and redirection
 */
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isAuthenticated = !!session;
  const userRole = session?.user?.roleID;
  const currentPath = nextUrl.pathname;

  // If the URL does not have the special "origin=internal" parameter, it is treated as a manual access and redirected.
  if (currentPath === "/403") {
    if (nextUrl.searchParams.get("origin") !== "internal") {
      // Redirect to a safe page based on authentication status
      const fallbackUrl = isAuthenticated
        ? getDefaultRouteForRole(userRole || 0)
        : LOGIN_ROUTE;
      return NextResponse.redirect(new URL(fallbackUrl, nextUrl.origin));
    }
    // If it has the special parameter, allow showing the 403 page
    return NextResponse.next();
  }

  // Allow access to public routes for unauthenticated users
  if (PUBLIC_ROUTES.some((path) => currentPath.startsWith(path))) {
    // Authenticated users trying to access login are redirected to their default route
    if (isAuthenticated) {
      const defaultRoute = getDefaultRouteForRole(userRole || 0);
      return NextResponse.redirect(new URL(defaultRoute, nextUrl.origin));
    }
    return NextResponse.next();
  }

  // From here on, authentication is required
  if (!isAuthenticated) {
    // Unauthenticated users trying to access protected routes are redirected to /403
    FORBIDDEN_URL.searchParams.set("callbackUrl", currentPath + nextUrl.search);
    return NextResponse.redirect(new URL(FORBIDDEN_URL.pathname + FORBIDDEN_URL.search, nextUrl.origin));
  }

  // Role-based authorization for protected routes
  const protectedRouteConfigKey = Object.keys(ROLE_PROTECTED_ROUTES_CONFIG).find((routePrefix) =>
    currentPath.startsWith(routePrefix)
  );

  if (protectedRouteConfigKey) {
    const allowedRoles = ROLE_PROTECTED_ROUTES_CONFIG[protectedRouteConfigKey];
    if (!allowedRoles.includes(userRole || -1)) {
      // If the user's role is not allowed, redirect to /403 with the special parameter
      FORBIDDEN_URL.searchParams.set("callbackUrl", currentPath + nextUrl.search);
      return NextResponse.redirect(new URL(FORBIDDEN_URL.pathname + FORBIDDEN_URL.search, nextUrl.origin));
    }
  }

  // If all validations pass, allow the request to continue
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
    "/403",
  ],
};