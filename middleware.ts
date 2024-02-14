import { withAuth } from "next-auth/middleware"
import { IUser } from "./backend/models/user.model";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request) {
        // authorize roles
        const url = request?.nextUrl?.pathname;
        const user = request?.nextauth?.token?.user as IUser;
        
        if (url?.startsWith('/admin') && user?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

export const config = {
    matcher: ['/users/me/:path*', '/bookings/:path*', '/admin/:path*']
}