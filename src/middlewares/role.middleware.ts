/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { UserRole } from "@/entities";

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req?.user?.userType)) {
      return next(new AppError('Bạn không có quyền truy cập vào tài nguyên này', 403))
    }
    next();
  };
};