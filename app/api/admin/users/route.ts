import dbConnect from "@/backend/config/dbConnect";
import { allAdminUsers } from "@/backend/controllers/user.controller";
import { authorizeRoles, isAuthUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthUser, authorizeRoles('admin')).get(allAdminUsers);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};