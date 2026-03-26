import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/user.service';
import { AppError } from '@/utils/appError';
import { User } from '@/entities';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '@/dtos/user.dto';

const userService = new UserService();

export class UserController {
  async profile(req: Request, res: Response, next: Function) {
    try {
      const user = (req as any).user as User;
      if (!user || !user.id) throw new AppError("Unauthorized", 401);
      const result = await userService.profile(user.id);
      res.status(200).json({
        status: 'Success',
        message: "Lấy thông tin user thành công!",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req: Request, res: Response, next: Function) {
    try {
      const user = (req as any).user as User;
      if (!user || !user.id) throw new AppError("Unauthorized", 401);
      if (!req.file) throw new AppError("Vui lòng chọn một ảnh gửi lên", 400);
      const imageUrl = (req.file as any).location;
      const result = await userService.updateAvatar(user.id, imageUrl);
      res.status(200).json({
        status: 'Success',
        message: "Cập nhật ảnh đại diện thành công!",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user as User;
      if (!user || !user.id) throw new AppError("Unauthorized", 401);
      const dto = plainToInstance(UpdateUserDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }
      const result = await userService.updateProfile(user.id, dto);
      res.status(200).json({
        status: 'Success',
        message: 'Cập nhật thông tin thành công!',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}