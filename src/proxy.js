// import { NextResponse } from "next/server";
// import { auth } from "./lib/auth";

// export async function proxy(request) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   console.log("✅ session found → allow");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile", "/all-books/:path"],
// };