import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const split = path.split("/");
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as any;

  const role = session ? session.user.role.name : "";
  if (split[1] === "admin" || split[1] === "ap") {
    if (!session || role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
