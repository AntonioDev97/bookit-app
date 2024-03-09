import dbConnect from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/room.controller";
import { authorizeRoles, isAuthUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
};

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.use(isAuthUser, authorizeRoles('admin')).put(updateRoom);
router.use(isAuthUser, authorizeRoles('admin')).delete(deleteRoom);

export async function PUT(request: NextRequest, ctx: RequestContext) { 
    return router.run(request, ctx);
};

export async function DELETE(request: NextRequest, ctx: RequestContext) { 
    return router.run(request, ctx);
}