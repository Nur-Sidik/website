import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "desa-banaran-super-secret-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  // 1. Kunci semua rute yang dimulai dengan /admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      // Jika token kedaluwarsa atau dimanipulasi, lempar ke login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // 2. Jika sudah login dan mencoba buka /login lagi, arahkan balik ke dashboard
  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.redirect(new URL("/admin", request.url));
    } catch {
      // Token tidak valid, biarkan di halaman login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};