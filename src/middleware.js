export { default } from "next-auth/middleware";
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
    // Redirect to login if no token is found
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  
    // Check if the user has the "admin" role
    console.log(token)
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url)); // Redirect to a "Forbidden" page
    }
  
    return NextResponse.next();
  }

export const config = {
    matcher: ["/admin/:path*"],
 };