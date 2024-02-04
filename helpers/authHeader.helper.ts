import { cookies } from 'next/headers';

export const getAuthHeader = () => {
    const nextCookies = cookies();
    const nextCookieName = process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token';
    const nextAuthSessionToken = nextCookies.get(nextCookieName);

    return {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`
        }
    }
}