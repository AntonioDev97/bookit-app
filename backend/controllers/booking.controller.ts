import { NextRequest, NextResponse } from "next/server";
import Booking from "../models/booking.model";
import { calculateDaysOfStay } from "@/helpers/date.helper";
import Room from "../models/room.model";

export const newBooking = async (request: NextRequest) => {
    const { room, checkIn, checkOut, paymentInfo } = await request.json();

    const roomData = await Room.findById(room);
    const daysOfStay = calculateDaysOfStay(checkIn, checkOut);

    const booking = await Booking.create({
        room,
        user: request.user._id,
        checkIn,
        checkOut,
        daysOfStay,
        paymentInfo: {
            id: paymentInfo.id,
            status: paymentInfo.status,
            amountPaid: roomData.priceNight * daysOfStay,
            paidAt: Date.now(),
        }
    });

    return NextResponse.json({
        success: true,
        booking
    });
};