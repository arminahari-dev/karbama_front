import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
//   throw new Error("ACCESS_TOKEN_SECRET_KEY is not set!");
// }

// const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);

export async function middleware() {
  // console.log("Cookies keys:", [...request.cookies.keys()]);

  // const getCookieValue = (key: string) => {
  //   if (!key) return null;
  //   const cookie = request.cookies.get(key);
  //   if (!cookie || !cookie.value) return null;
  //   return cookie.value;
  // };

  // const accessToken = getCookieValue("accessToken");
  // const token = getCookieValue("roleToken");

  // const pathname = request.nextUrl.pathname;
  // let role: string | undefined = undefined;

  // if (token && token.length > 0) {
  //   try {
  //     const { payload } = await jwtVerify(token, secret);
  //     role = payload?.role as string;
  //   } catch (error) {
  //     console.error("JWT verify error:", error);
  //     return NextResponse.redirect(new URL("/auth", request.url));
  //   }
  // }

  // if (pathname.startsWith("/admin") && !accessToken) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }
  // if (pathname.startsWith("/admin") && role !== "ADMIN") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (pathname.startsWith("/freelancer") && !accessToken) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }
  // if (pathname.startsWith("/freelancer") && role !== "FREELANCER") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }
  
  // if (pathname.startsWith("/owner") && !accessToken) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }
  // if (pathname.startsWith("/owner") && role !== "OWNER") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (
  //   (pathname.startsWith("/auth") && accessToken) ||
  //   (pathname.startsWith("/completeprofile") && accessToken)
  // ) {
  //   return NextResponse.redirect(new URL(`${role?.toLocaleLowerCase()}/dashboard`, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/admin/:path*",
    // "/freelancer/:path*",
    // "/owner/:path*",
    // "/auth/:path*",
    // "/completeprofile/:path*",
  ],
};
