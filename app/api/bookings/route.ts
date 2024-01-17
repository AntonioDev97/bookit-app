import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { newBooking } from "@/backend/controllers/booking.controller";
import { isAuthUser } from "@/backend/middlewares/auth";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser).post(catchAsyncErrors(newBooking));

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};