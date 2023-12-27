import { NextRequest, NextResponse } from "next/server";

type HandlerFunction = (request: NextRequest, params: any) => Promise<NextResponse>;

interface IValidationError {
    message: string
}

export const catchAsyncErrors = (handler: HandlerFunction) => async (request: NextRequest, params: any) => {
    try {
        return await handler(request, params);
    } catch (error: any) {
        console.error(error);
        
        if (error?.name === 'CastError') {
            error.message = 'Resource not found. Invalid ' + error?.path || 'unknow';
            error.statusCode = 400;
        }

        if (error?.name === 'ValidationError') {
            error.message = Object.values<IValidationError>(error.errors).map(value => value.message);
            error.statusCode = 400;
        }

        return NextResponse.json(
            { error, message: error.message }, 
            { status: error.statusCode || 500 }
        );
    }
};