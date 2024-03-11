import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/backend/middlewares/errorHandler";
import { getW3Image } from "@/backend/controllers/w3images.controller";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(errorHandler(getW3Image));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};