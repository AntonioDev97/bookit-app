import { NextRequest, NextResponse } from "next/server";

export const healthCheck = async (request: NextRequest): Promise<NextResponse> => {
    return NextResponse.json(
        { success: true },
        { status: 200 }
    );
}