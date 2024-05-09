import dbConnect from "@/backend/config/dbConnect";
import { deleteBooking } from "@/backend/controllers/booking.controller";
import {
    authorizeRoles,
    isAuthUser,
} from "@/backend/middlewares/auth";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { NextApiRequest } from "next";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext { params: { id: string } };

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthUser, authorizeRoles('admin')).delete(catchAsyncErrors(deleteBooking));

export async function DELETE(request: NextApiRequest & NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
}