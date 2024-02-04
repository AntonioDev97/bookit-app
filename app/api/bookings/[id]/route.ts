import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { getBookingById } from "@/backend/controllers/booking.controller";
import { isAuthUser } from "@/backend/middlewares/auth";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser).get(catchAsyncErrors(getBookingById));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};