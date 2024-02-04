import { NextRequest, NextResponse } from "next/server";
import Booking, { IBooking } from "../models/booking.model";
import { calculateDaysOfStay } from "@/helpers/date.helper";
import Room from "../models/room.model";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

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

export const checkAvailability = async (request: NextRequest) => {
    const { 
        roomId, 
        checkIn,
        checkOut
    } = Object.fromEntries(new URL(request.url).searchParams);

    const bookings: IBooking[] = await Booking.find({
        room: roomId,
        checkIn: { $lte: new Date(checkOut) },
        checkOut: { $gte: new Date(checkIn) }
    });
    
    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
        success: true,
        isAvailable
    });
};

export const getRoomBookings = async (request: NextRequest) => {
    const { roomId } = Object.fromEntries(new URL(request.url).searchParams);

    const bookings: IBooking[] = await Booking.find({ room: roomId });
    
    const dates: Date[] = bookings.flatMap(booking => 
        Array.from(
            moment.range(moment(booking.checkIn), moment(booking.checkOut)).by('day')
        )
    );

    return NextResponse.json({
        success: true,
        dates
    });
};

export const getUserBookings = async (request: NextRequest) => {
    const bookings: IBooking[] = await Booking.find({ user: request.user._id});
    
    return NextResponse.json({
        success: true,
        bookings
    });
};

export const getBookingById = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate('user room');

    if (booking && booking.user?._id?.toString() !== request.user._id) {
        throw new ErrorHandler('You cannot view this booking', 403);
    }
    
    return NextResponse.json({
        success: true,
        booking
    });
};