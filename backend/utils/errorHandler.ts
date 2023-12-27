class ErrorHandler extends Error {
    statusCode: number;

    constructor(errorMsg: string, statusCode: number) {
        super(errorMsg);
        this.statusCode = statusCode;
    }
};

export default ErrorHandler;