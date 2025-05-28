import { auth } from "@/app/auth";

// TODO find middleware that protects routes
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
});

export const config = {
  matcher: ["/misObjetivos", "/misColaboradores"],
};