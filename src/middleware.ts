import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

import { auth } from "./app/auth";

const PUBLIC_ROUTES = ["/login", "/otp"];
const PROTECTED_DEFAULT_ROUTE = "/misObjetivos";
const LOGIN_ROUTE = "/login";

const ROLES = {
  "Colaborador": 1,
  "Jefe Directo": 2,
  "Administrador": 3,
  "Colaborador y Jefe Directo": 4,
  "Colaborador y Administrador": 5,
  "Jefe Directo y Administrador": 6,
  "Colaborador, Jefe Directo y Administrador": 7
}

const ROLE_PROTECTED_ROUTES_CONFIG: Record<string, number[]> = {
  "/misObjetivos": [
    ROLES.Colaborador, 
    ROLES["Jefe Directo"],
    ROLES.Administrador,
    ROLES["Colaborador y Jefe Directo"], 
    ROLES["Colaborador y Administrador"], 
    ROLES["Colaborador, Jefe Directo y Administrador"]
  ],
  "/misColaboradores": [
    ROLES["Jefe Directo"],
    ROLES["Colaborador y Jefe Directo"],
    ROLES["Jefe Directo y Administrador"],
    ROLES["Colaborador, Jefe Directo y Administrador"]
  ]
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const session = await auth();
  console.log(session)
  const isAuthenticated = !!session;
  const userRole = session?.user?.roleID;
  const currentPath = nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some(path => currentPath.startsWith(path));

  // If user is already authenticated and attempts to access the login or otp page
  if (isPublicRoute) {
    if (isAuthenticated) {
      console.log("IS AUTH AND PUBLIC")
      return NextResponse.redirect(new URL(PROTECTED_DEFAULT_ROUTE, nextUrl.origin))
    }
    console.log("IS PUBLIC")
    return NextResponse.next();
  }


   // If user is not authenticated
  if (!isAuthenticated) {
    console.log("IS NOT AUTH")
    const callbackUrl = currentPath + nextUrl.search;
    return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl.origin));
  }

  // If user is already authenticated and attempts to access some protected route
  const protectedRouteConfigKey = Object.keys(ROLE_PROTECTED_ROUTES_CONFIG).find(
    (routePrefix) => currentPath.startsWith(routePrefix)
  )

  if (protectedRouteConfigKey) {
    const allowedRolesForPath = ROLE_PROTECTED_ROUTES_CONFIG[protectedRouteConfigKey];
    if (!userRole || !allowedRolesForPath.includes(userRole)) {
      console.log("IS PROTECTED AND AUTH")
      const callbackUrl = currentPath + nextUrl.search;
      return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl.origin));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/misObjetivos/:path*", 
    "/misColaboradores/:path*"
  ],
};