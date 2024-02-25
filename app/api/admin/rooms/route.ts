import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { createRoom, getAllAdminRooms } from "@/backend/controllers/room.controller";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { authorizeRoles, isAuthUser } from "@/backend/middlewares/auth";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser, authorizeRoles('admin')).get(catchAsyncErrors(getAllAdminRooms));
router.use(isAuthUser, authorizeRoles('admin')).post(catchAsyncErrors(createRoom));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};