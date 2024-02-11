import { NextResponse } from "next/server";
export function middleware(request) {
  //for signup and login page
  const authToken = request.cookies.get("token")?.value;

  const loginUserNotAccesablePath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (loginUserNotAccesablePath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //for reset-password page
  const resetToken = request.cookies.get("reset")?.value;
  if (request.nextUrl.pathname.startsWith("/reset-password")) {
    if (!resetToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //for dashboard page
  const role = request.cookies.get("role")?.value;

  const normalUserNotAccesablePath = request.nextUrl.pathname === "/dashboard";

  if (normalUserNotAccesablePath) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/signup", "/reset-password/:path*", "/dashboard"],
};
