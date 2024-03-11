import { IUser } from "@/interfaces/user.interface";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import NextAuth from "next-auth/next";
import { Provider } from "next-auth/providers/index";

const {
    NEXTAUTH_SECRET,
    NEXTAUTH_SIGNIN_PAGE,
    W3SSO_ISSUER,
    W3SSO_AUTHORIZATION,
    W3SSO_TOKEN,
    W3SSO_USERINFO,
    W3SSO_CLIENT_ID,
    W3SSO_CLIENT_SECRET,
    W3SSO_JWKS,
    NODE_ENV
} = process.env;
async function auth(request: NextApiRequest&NextRequest, response: NextApiResponse) {
    const W3SSOProvider: Provider = {
        id: 'W3SSO',
        name: 'W3SSO',
        type: 'oauth',
        authorization: W3SSO_AUTHORIZATION,
        token: W3SSO_TOKEN,
        userinfo: W3SSO_USERINFO,
        clientId: W3SSO_CLIENT_ID,
        clientSecret: W3SSO_CLIENT_SECRET,
        issuer: W3SSO_ISSUER,
        jwks_endpoint: W3SSO_JWKS,
        idToken: true,
        profile(profile) {
            return ({
                id: profile.uid,
                ...profile,
            });
        },
    }
    if (NODE_ENV !== 'production') {
        W3SSOProvider.checks = ['none'];
    }
    return await NextAuth(request, response, {
        secret: NEXTAUTH_SECRET,
        session: {
            strategy: 'jwt'
        },
        pages: {
            signIn: NEXTAUTH_SIGNIN_PAGE
        },
        providers: [W3SSOProvider],
        callbacks: {
            jwt: async ({ token, user }) => {  
                if (user) {
                    user.roles = ['user'];
                    token.user = user;
                }
                return token;
            },
            session: async ({ session, token }) => {
                session.user = token.user as IUser;
                return session;
            },
        }
    });
};

export { auth as GET, auth as POST };