import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

type Credential = {
    email: string,
    password: string
};
type Token = {
    user: IUser
}

async function auth(request: NextApiRequest, response: NextApiResponse) {
    return await NextAuth(request, response, {
        session: {
            strategy: 'jwt'
        },
        providers: [
            Credentials({
                // @ts-ignore
                async authorize(credentials: Credential) {
                    dbConnect();
                    const { email, password } = credentials;

                    const user = await User.findOne({ email }).select('+password');
                    if (!user) throw new Error('Invalid email or password');

                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if (!isPasswordCorrect) throw new Error('Invalid email or password');

                    return user;
                }
            })
        ],
        callbacks: {
            jwt: async ({ token, user }) => {
                const jwtToken = token as Token;
                user && (token.user = user);

                // Update session when user is updated
                if (request.url?.includes('/api/auth/session?update')) {
                    // Hit the database and return the updated user
                    const updatedUser = await User.findById(jwtToken?.user?._id);
                    token.user = updatedUser;
                }

                return token;
            },
            session: async ({ session, token }) => {
                session.user = token.user as IUser;
                // @ts-ignore
                delete session?.user?.password
                return session;
            }
        },
        pages: {
            signIn: '/login'
        },
        secret: process.env.NEXTAUTH_SECRET
    });
};

export { auth as GET, auth as POST };