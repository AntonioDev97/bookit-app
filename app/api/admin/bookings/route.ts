import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { authorizeRoles, isAuthUser } from "@/backend/middlewares/auth";
import { getAllAdminBookings } from "@/backend/controllers/booking.controller";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser, authorizeRoles('admin')).get(catchAsyncErrors(getAllAdminBookings));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};