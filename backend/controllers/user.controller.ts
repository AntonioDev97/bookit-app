import { NextRequest, NextResponse } from "next/server";
import User from "../models/user.model";

// Register a new user => /api/users
export const registerUser = async (request: NextRequest) => {
    const body = await request.json();
    const { name, email, password } = body;

    const user = await User.create({ name, email, password });
    
    return NextResponse.json({
        success: true,
        message: 'User created successfully!',
        data: user
    }, { status: 200 });
};