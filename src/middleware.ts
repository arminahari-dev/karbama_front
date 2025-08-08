import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY!);

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const token = request.cookies.get("roleToken")?.value;

  const pathname = request.nextUrl.pathname;
  let role: string | undefined = undefined;

  if (token) {
    const { payload } = await jwtVerify(token, secret);
    role = payload?.role as string;
  }

  if (pathname.startsWith("/admin") && !accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/freelancer") && !accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.startsWith("/freelancer") && role !== "FREELANCER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  
  if (pathname.startsWith("/owner") && !accessToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (pathname.startsWith("/owner") && role !== "OWNER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    (pathname.startsWith("/auth") && accessToken) ||
    (pathname.startsWith("/completeprofile") && accessToken)
  ) {
    return NextResponse.redirect(new URL(`${role?.toLocaleLowerCase()}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/freelancer/:path*",
    "/owner/:path*",
    "/auth:path*",
    "/completeprofile:path*",
  ],
};
