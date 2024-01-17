import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string, 
    avatar: {
        public_id: string,
        url: string
    },
    role: string,
    createdAt: Date,
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    comparePassword(inputPassword: string): Promise<boolean>,
    getResetPasswordToken(): string
};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name']
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String, 
    resetPasswordExpire: Date
},
{
    timestamps: true
});

// Encrypting password before saving new user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function(inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);