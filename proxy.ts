import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("raserva_token")?.value;
  const role = request.cookies.get("raserva_role")?.value;
  const loginUrl = new URL("/auth/login", request.url);

  if (pathname.startsWith("/dashboard")) {
    if (!token || !role) return NextResponse.redirect(loginUrl);
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
    if (pathname.startsWith("/dashboard/customer") && role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  }

  if (pathname.startsWith("/auth") && token && role) {
    return NextResponse.redirect(new URL(role === "ADMIN" ? "/dashboard/admin" : "/dashboard/customer", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"]
};
