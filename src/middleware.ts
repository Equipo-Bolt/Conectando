import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/auth";

const PUBLIC_ROUTES = ["/login"];
const UNSEARCHABLE_ROUTES = ["/error", "/llenarInformacion", "/403"];
const PROTECTED_DEFAULT_ROUTE = "/misObjetivos";
const LOGIN_ROUTE = "/login";

const ROLES = {
  Colaborador: 1,
  "Jefe Directo": 2,
  Administrador: 3,
  "Colaborador y Jefe Directo": 4,
  "Colaborador y Administrador": 5,
  "Jefe Directo y Administrador": 6,
  "Colaborador, Jefe Directo y Administrador": 7,
};

const ROLE_PROTECTED_ROUTES_CONFIG: Record<string, number[]> = {
  "/misObjetivos": [
    ROLES.Colaborador,
    ROLES["Jefe Directo"],
    ROLES.Administrador,
    ROLES["Colaborador y Jefe Directo"],
    ROLES["Colaborador y Administrador"],
    ROLES["Colaborador, Jefe Directo y Administrador"],
  ],
  "/misColaboradores": [
    ROLES["Jefe Directo"],
    ROLES["Colaborador y Jefe Directo"],
    ROLES["Jefe Directo y Administrador"],
    ROLES["Colaborador, Jefe Directo y Administrador"],
  ],
  "/usuarios": [
    ROLES.Administrador,
    ROLES["Jefe Directo y Administrador"],
    ROLES["Colaborador, Jefe Directo y Administrador"],
  ],
};

export async function middleware(req: NextRequest) {
  const referer = req.headers.get("referer");
  const { nextUrl } = req;

  const session = await auth();
  const isAuthenticated = !!session;
  const userRole = session?.user?.roleID;
  const currentPath = nextUrl.pathname;
  const isDirectAccess = !referer;

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
        new URL(PROTECTED_DEFAULT_ROUTE, nextUrl.origin)
      );
    }
    console.log("IS PUBLIC");
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
    "/llenarInformacion"
  ],
};
