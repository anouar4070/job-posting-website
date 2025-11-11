//export { auth as middleware } from "@/auth";
// middleware.ts
import { auth } from "@/auth-edge"; // ← auth-edge.ts (without Prisma)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isProtected = nextUrl.pathname.startsWith("/dashboard");

  if (!isLoggedIn && isProtected) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
