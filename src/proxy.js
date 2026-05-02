import { NextResponse } from "next/server";

export async function proxy(request) {
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  console.log("🔥 proxy running:", request.nextUrl.pathname);
  console.log("🍪 token:", sessionToken);

  if (!sessionToken) {
    console.log("❌ no session → redirecting to signin");
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  console.log("✅ session found → allow");
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/all-books/:path*"],
};