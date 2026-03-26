import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import Logger from "@/utils/logger";
import { ValidationError } from "class-validator";

export const globalErrorHandler = (
  err: Error | AppError | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  let statusCode = 500;
  let message = 'Internal Server Error';
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    Logger.error('❌ System Error:', error);
  }
  res.status(statusCode).json({
    status: statusCode.toString().startsWith('4') ? 'fail' : 'error',
    message: message,
    stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
  });
}

