import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // Proteksi rute admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // Jika mencoba akses /admin tanpa token atau setelah token habis
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("session", "expired");
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      // Jika token kedaluwarsa atau signature tidak valid
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("session", "expired");
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // Jika sudah login dan mencoba buka /login, lempar ke /admin
  if (pathname === "/login" && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};