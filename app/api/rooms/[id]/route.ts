import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { deleteRoom, getRoomDetails, updateRoom } from "@/backend/controllers/room.controller";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";

interface RequestContext { params: { id: string } };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.get(catchAsyncErrors(getRoomDetails));
router.put(catchAsyncErrors(updateRoom));
router.delete(catchAsyncErrors(deleteRoom));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};