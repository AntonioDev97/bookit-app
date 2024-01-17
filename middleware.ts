import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(request) {

    }
);

export const config = {
    matcher: ['/users/me/:path*']
}