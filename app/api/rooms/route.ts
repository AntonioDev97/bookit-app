import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { createRoom, getAllRooms } from "@/backend/controllers/room.controller";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.get(catchAsyncErrors(getAllRooms));
router.post(catchAsyncErrors(createRoom));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};