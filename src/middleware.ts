import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/login") {
          return true;
        }
        // Require token for all other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/system/:path*",
    "/admin/:path*",
    "/campaigns/:path*",
    "/assets/:path*",
  ],
};
