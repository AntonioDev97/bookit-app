import { NextRequest, NextResponse } from "next/server";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import { deleteFile, uploadFile } from "../utils/cloudinary";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplates/resetPassword";
import { sendEmail } from "../utils/emailer";
import crypto from 'crypto';

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

// Update user => /api/users/me
export const updateUser = async (request: NextRequest) => {
    const body = await request.json();
    const { name, email, password } = body;
    const userData = { name, email };

    const user = await User.findByIdAndUpdate(request.user._id, userData);
    
    return NextResponse.json({
        success: true,
        message: 'User created successfully!',
        data: user
    }, { status: 200 });
};

// Update password => /api/users/me/password
export const updatePassword = async (request: NextRequest) => {
    const body = await request.json();
    const user = await User.findById(request?.user?._id).select('+password');
    
    const isMatched = await user.comparePassword(body.oldPassword);
    if (!isMatched) throw new ErrorHandler('Old password is incorrect', 400);

    user.password = body.password;
    await user.save();

    return NextResponse.json({ success: true, user });
};

// Recover password => /api/users/me/password/recover
export const recoverPassword = async (request: NextRequest) => {
    const body = await request.json();
    const user = await User.findOne({ email: body.email });
    if (!user) throw new ErrorHandler('User not found!', 404);

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetURL = `${process.env.API_URL}/recoverPassword/${resetToken}`;
    const emailBody = resetPasswordHTMLTemplate(user.name, resetURL);
    try {
        await sendEmail({
            email: user.email,
            message: emailBody,
            subject: 'Bookit - Recover your password now!'
        });
    } catch (error: any) {
        user.resetPassword = undefined;
        user.resetPasswordExpire= undefined;
        await user.save();
        throw new ErrorHandler(error?.message || 'Email not sent', error?.code || 500)
    }

    return NextResponse.json({ success: true, user });
};

// Recover password reset => /api/users/me/password/recover/:token
export const recoverResetPassword = async (request: NextRequest, { params } : { params: { token: string } }) => {
    const body = await request.json();

    // Hash the token
    const resetPasswordToken = crypto.createHash('sha256').update(params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) throw new ErrorHandler('User reset token is invalid or has expired!', 404);
    if (body.password !== body.confirmPassword) throw new ErrorHandler('Passwords do not match', 400);

    user.password = body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
 
    await user.save();

    return NextResponse.json({ success: true });
};

// Update avatar => /api/users/me/avatar
export const updateAvatar = async (request: NextRequest) => {
    const body = await request.json();
    if (body?.avatar?.length < 1) throw new ErrorHandler('New avatar invalid', 400);
    const avatar = await uploadFile(body.avatar, 'bookit/avatars');

    // remove avatar if exist
    if (request?.user?.avatar?.public_id?.length > 0) await deleteFile(request.user.avatar.public_id);
    // Update new avatar
    const user = await User.findByIdAndUpdate(request.user._id, { avatar });

    return NextResponse.json({ success: true, user });
};