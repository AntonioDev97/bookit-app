import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
    resetPasswordExpire: Date
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

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);