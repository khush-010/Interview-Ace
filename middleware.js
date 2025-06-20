import { NextResponse } from "next/server";
import { auth } from "@/middlewares/auth";
import { verifyUser } from "./middlewares/roleVerify";

function parseCookies(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  return Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [key, ...value] = cookie.split("=");
      return [key, value.join("=")];
    })
  );
}

export async function middleware(req) {
  
  const path = req.nextUrl.pathname;
  const method = req.method;
  const cookies = parseCookies(req);
  const arr = [

  ];

  // API Authentication
//   if (path.startsWith("/api")) {
//     if (method === "GET" ) {
//         return NextResponse.json(
//           { error: "Unauthorized access" },
//           { status: 403 }
//         );
    
//     }

//     if (method !== "GET" && !arr.includes(path)) return auth(req);
//     else if (path === "/api/partner/service") {
//       return auth(req);
//     } else if (path === "/api/partner") {
//       return auth(req);
//     } else return NextResponse.next();
//   }

  if (path.startsWith("/_next")) return NextResponse.next();

  const isUser = await verifyUser(cookies);

  // Publicly accessible routes
  const publicRoutes = [
    "/",
    "/favico.svg",
    "/login",
    "/api/signup",
    "/api/login",
    "/features",
    "/howitworks",
    "/faqs",
    "/interviewguide",
    "/api/send-otp",
    "/api/verify-otp",
  ];

  if (
    publicRoutes.includes(path) 
  ) {
    if (
      isUser &&
      (path === "/login" )
    )
      return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  }

  if (isUser && path.startsWith("/user")) return NextResponse.next();
  if(path==="/interview"){
    if (isUser) return NextResponse.next();
    else return NextResponse.redirect(new URL("/login", req.url));
  }
  // Redirect unauthorized access
  if (isUser) return NextResponse.redirect(new URL("/", req.url));

  // If not logged in, redirect to login
  return NextResponse.redirect(new URL("/", req.url));
}

// export const config = {
// 	matcher: ["/:path*"],
// };
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|logo.png).*)",
  ],
};