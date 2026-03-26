import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/appError";
import { User, UserRole, UserStatus } from "@/entities/user.entity";

interface JwtPayload {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export const protect = async (req: Request, res:Response, next: NextFunction ) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization?.split(' ')[1];
  }
  if(!token){
    return next(new AppError('Bạn chưa đăng nhập, Vui lòng đăng nhập để truy cập !', 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
    const currentUser = await User.findOne({where: {id: decoded.id}});
    if(!currentUser){
      return next(new AppError('Người dùng không tồn tại', 401))
    }
    if(currentUser.status !== UserStatus.ACTIVE){
      return next(new AppError('Tài khoản đã bị khóa', 401));
    }
    (req as any).user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Token không hợp lệ hoặc đã hết hạn, Vui lòng đăng nhập lại !', 401))
  }

}