import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { healthCheck } from "@/backend/controllers/healthCheck.controller";
import { errorHandler } from "@/backend/middlewares/errorHandler";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(errorHandler(healthCheck));

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx) as Promise<NextResponse>;
};