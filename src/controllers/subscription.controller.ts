import { PaginationDto } from "@/dtos/pagination.dto";
import { PurchaseSubscriptionDto } from "@/dtos/subscription.dto";
import { SubscriptionService } from "@/services";
import { AppError } from "@/utils/appError";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

const subService = new SubscriptionService();

export class SubscriptionController {
  async purchase(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(PurchaseSubscriptionDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || 'Dữ liệu không hợp lệ', 400);
      }
      const result = await subService.purchase(req.user!.id, dto.planId);
      res.status(201).json({
        status: 'Success',
        message: 'Mua gói cước thành công!',
        data: result
      })
    } catch (error) {
      next(error);
    }
  }

  async getMySub(req: Request, res: Response, next: NextFunction) {
    try {
      const query = plainToInstance(PaginationDto, req.query);
      const result = await subService.getMySubscription(req.user!.id, query);
      res.status(200).json({
        status: 'Success',
        message: 'Lấy thông tin gói cước thành công!',
        ...result
      })
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const result = await subService.cancel(req.user!.id, id);
      res.status(200).json({
        status: 'Success',
        message: 'Hủy gói cước thành công!',
        data: result
      })
    } catch (error) {
      next(error);
    }
  }
}