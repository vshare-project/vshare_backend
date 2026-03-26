import { Request, Response, NextFunction } from 'express';
import { SubscriptionPlanService } from '@/services/subscription-plan.service';
import { CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto } from '@/dtos/subscription-plan.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppError } from '@/utils/appError';
import { PaginationDto } from '@/dtos/pagination.dto';

const planService = new SubscriptionPlanService();

export class SubscriptionPlanController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateSubscriptionPlanDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) throw new AppError('Dữ liệu không hợp lệ', 400);

      const result = await planService.create(dto);
      res.status(201).json({ status: 'Success', message: 'Thêm gói thành công!', data: result });
    } catch (error) { next(error); }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = plainToInstance(PaginationDto, req.query);
      const result = await planService.findAll(query);
      res.status(200).json({
        status: 'Success',
        message: 'Lấy danh sách plan thành công!',
        ...result
      });
    } catch (error) { next(error); }
  }

  async getPlanById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      if (!id) {
        throw new AppError('Id không hợp lệ', 400);
      }
      const result = await planService.findOne(id);
      res.status(200).json({
        status: 'Success',
        message: 'Lấy thông tin vé thành công!',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const dto = plainToInstance(UpdateSubscriptionPlanDto, req.body);
      const result = await planService.update(id, dto);
      res.status(200).json({ status: 'Success', message: 'Update plan thành công!', data: result });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await planService.delete(id);
      res.status(200).json({ status: 'Success', message: 'Xóa gói thành công' });
    } catch (error) { next(error); }
  }
}