import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room.model";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

export const getAllRooms = async (request: NextRequest) => {
    const resPerPage: number = 4;

    const { searchParams } = new URL(request.url);
    const queryStr:any = {};
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
    const room = await Room.create(body);
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};

// Get room details -> GET /api/rooms/[id]
export const getRoomDetails = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
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

// Deñete room -> DELETE /api/rooms/[id]
export const deleteRoom = async (request: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);

    if (!room) throw new ErrorHandler('Room not found', 404);

    // TODO: delete images assiciated with this room.

    room = await room.deleteOne();
    return NextResponse.json({
        success: true,
        data: room
    }, { status: 200 });
};