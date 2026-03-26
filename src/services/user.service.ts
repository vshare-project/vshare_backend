import { UpdateUserDto } from "@/dtos/user.dto";
import { User } from "@/entities/user.entity";
import { AppError } from "@/utils/appError";

export class UserService {
  async profile(userId: string) {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new AppError('User Không tồn tại', 404);
    }
    return user;
  }

  async updateAvatar(userId: string, imageUrl: string) {
    const user = await this.profile(userId);
    user.profileImageUrl = imageUrl;
    return await User.save(user);

  }
  async updateProfile(userId: string, data: UpdateUserDto) {
    const user = await this.profile(userId);
    Object.assign(user, data);
    return await User.save(user);
  }
}
