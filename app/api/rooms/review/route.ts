import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { postRoomReview } from "@/backend/controllers/room.controller";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { isAuthUser } from "@/backend/middlewares/auth";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser).post(catchAsyncErrors(postRoomReview));

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};