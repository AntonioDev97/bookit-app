import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { updateUser } from "@/backend/controllers/user.controller";
import { isAuthUser } from "@/backend/middlewares/auth";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser).put(catchAsyncErrors(updateUser));

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};