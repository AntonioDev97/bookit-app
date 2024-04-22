import dbConnect from "@/backend/config/dbConnect";
import { deleteUser, getUserDetails, updateUserFromAdmin } from "@/backend/controllers/user.controller";
import { authorizeRoles, isAuthUser } from "@/backend/middlewares/auth";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthUser, authorizeRoles('admin'));

router.put(catchAsyncErrors(updateUserFromAdmin));
router.get(catchAsyncErrors(getUserDetails));
router.delete(catchAsyncErrors(deleteUser));

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};

