import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { recoverResetPassword } from "@/backend/controllers/user.controller";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.put(catchAsyncErrors(recoverResetPassword));

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};