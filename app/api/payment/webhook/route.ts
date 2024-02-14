import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import { webhookCheckout } from "@/backend/controllers/payment.controller";

interface RequestContext { };

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.post(catchAsyncErrors(webhookCheckout));

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
};