import { NextRequest, NextResponse } from "next/server";
import Room, { IRImages, IRReview, IRoom } from "../models/room.model";
import Booking from '../models/booking.model';
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";
import { deleteFile, uploadFile } from "../utils/cloudinary";

export const getAllRooms = async (request: NextRequest) => {
    const resPerPage: number = 4;

    const { searchParams } = new URL(request.url);
    const queryStr: any = {};
    searchParams.forEach((value, key) => queryStr[key] = value);

    const totalRooms: number = await Room.countDocuments();
    const apiFilters = new APIFilters(Room, queryStr).search().filter().pagination(resPerPage);
    const rooms: IRoom[] = await apiFilters.query;

    return NextResponse.json({
        success: true,
        data: {
            pagination: { page: Number(searchParams.get('page') || 1), limit: resPerPage },
            total: totalRooms,
            count: rooms.length,
            rooms,
        }
    });
};

export const createRoom = async (request: NextRequest) => {
    const body = await request.json();
    body.createdBy = request.user._id;
    const room = await Room.create(body);
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};

// Get room details -> GET /api/rooms/[id]
export const getRoomDetails = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate('reviews.user');
    if (!room) throw new ErrorHandler('Room not found', 404);
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};

// Update room -> PUT /api/rooms/[id]
export const updateRoom = async (request: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await request.json();
    if (!room) throw new ErrorHandler('Room not found', 404);
    room = await Room.findByIdAndUpdate(params.id, body), { new: true };
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};

// Upload room images  =>  /api/admin/rooms/:id/upload_images
export const uploadRoomImages = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) throw new ErrorHandler("Room not found", 404);

    const uploader = async (image: string) => uploadFile(image, "bookit/rooms");
    const urls = await Promise.all((body?.images).map(uploader));

    room.images?.push(...urls);
    await room.save();

    return NextResponse.json({
        success: true,
        room,
    });
};

// Delete room image  =>  /api/admin/rooms/:id/delete_image
export const deleteRoomImage = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) throw new ErrorHandler("Room not found", 404);
    const isDeleted = await deleteFile(body?.imgId);

    if (isDeleted) {
        room.images = room?.images.filter((img: IRImages) => img.public_id !== body.imgId);
    }

    await room.save();

    return NextResponse.json({
        success: true,
        room,
    });
};

// Create/Update room review -> POST /api/rooms/review
export const postRoomReview = async (request: NextRequest) => {
    const body = await request.json();
    const { rating, comment, roomId } = body;
    const reviewInit = {
        user: request.user._id,
        rating: Number(rating),
        comment
    };

    const room = await Room.findById(roomId);
    if (!room) throw new ErrorHandler('Room not found', 404);

    const isReviewed = room?.reviews.some((review: IRReview) => review.user?.toString() === request.user._id?.toString());
    if (isReviewed) {
        room?.reviews?.forEach((review: IRReview) => {
            if (review.user?.toString() === request.user._id?.toString()) {
                review.comment = comment;
                review.rating = reviewInit.rating;
            }
        });
    } else {
        room.reviews.push(reviewInit);
        room.numReviews = room.reviews.length;
    }

    room.ratings = room.reviews.reduce((acc: number, item: { rating: number }) => item.rating + acc, 0) / room.reviews.length;

    const roomSaved = await room.save();

    return NextResponse.json({
        success: true,
        data: roomSaved
    }, { status: 200 });
};

// Can user review room  =>  /api/rooms/review/allow
export const canReview = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    const bookings = await Booking.find({ user: request.user._id, room: roomId });
    const canReview = !!(bookings?.length > 0);

    return NextResponse.json({ canReview });
};

// Delete room -> DELETE /api/rooms/[id]
export const deleteRoom = async (request: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);

    if (!room) throw new ErrorHandler('Room not found', 404);

    // Delete images associated with the room
    for (let i = 0; i < room.images?.length; i++) {
        await deleteFile(room.images[i].public_id);
    }

    room = await room.deleteOne();
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};

// Get all rooms - ADMIN => /api/admin/rooms
export const getAllAdminRooms = async (request: NextRequest) => {
    const rooms = await Room.find();

    return NextResponse.json({
        success: true,
        data: {
            rooms
        }
    });
};

// Get room reviews - ADMIN  =>  /api/admin/rooms/reviews
export const getRoomReviews = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const room = await Room.findById(searchParams.get("roomId"));

    return NextResponse.json({
        success: true,
        reviews: room.reviews
    });
};

// Delete room review - ADMIN  =>  /api/admin/rooms/reviews
export const deleteRoomReview = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId");
    const reviewId = searchParams.get("id");

    const room = await Room.findById(roomId);

    const reviews = room.reviews.filter((review: IRReview) => review?._id.toString() !== reviewId);
    const numReviews = reviews.length;

    const ratings = numReviews === 0 ? 0 : room?.reviews?.reduce((acc: number, item: { rating: number }) => item.rating + acc, 0) / numReviews;

    await Room.findByIdAndUpdate(roomId, { reviews, numReviews, ratings });

    return NextResponse.json({
        success: true
    });
};