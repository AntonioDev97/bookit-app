import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user.model";

export const isAuthUser = async (req: NextRequest, event: any, next: any) => {
    const session = await getToken({ req });
    if (!session) {
        return NextResponse.json(
            { message: 'Please sign in first to access this resource' },
            { status: 401 }
        );
    }
    req.user = session.user as IUser;
    return next();
};