import mongoose, { Document, Schema } from "mongoose";
import { IRoom } from "./room.model";
import { IUser } from "./user.model";

export interface IBooking extends Document {
    room: IRoom;
    user: IUser;
    checkIn: Date;
    checkOut: Date;
    daysOfStay: number;
    paymentInfo: {
        id: string;
        method: string;
        status: string;
        amountPaid: number;
        paidAt: Date;
    };
    createdAt: Date,
    updatedAt: Date
}

const bookingSchema: Schema<IBooking> = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    daysOfStay: {
        type: Number,
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        amountPaid: {
            type: Number,
            required: true,
        },
        paidAt: {
            type: Date,
            required: true,
        },
    }
},
{
    timestamps: true
});

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);