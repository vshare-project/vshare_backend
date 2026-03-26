import { AppDataSource } from "@/config/data-source";
import { PaginationDto } from "@/dtos/pagination.dto";
import { User, Subscription, SubscriptionStatus, SubscriptionPlan } from "@/entities";
import { AppError } from "@/utils/appError";
import { PaginationResult } from "@/utils/pagination.response";
import { Like } from "typeorm";

export class SubscriptionService {
  async purchase(userId: string, planId: string) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const plan = await queryRunner.manager.findOne(SubscriptionPlan, {
        where: { id: planId, isActive: true }
      });
      if (!plan) throw new AppError('Gói cước không tồn tại hoặc đã ngừng cung cấp', 404);
      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
      if (!user) throw new AppError('Người dùng không tồn tại', 404);
      if (Number(user.walletBalance) < Number(plan.price)) {
        throw new AppError('Số dư ví không đủ để mua gói cước', 400);
      }

      user.walletBalance = Number(user.walletBalance) - Number(plan.price);
      await queryRunner.manager.save(user);

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + plan.durationDays);

      const newSubscription = queryRunner.manager.create(Subscription, {
        userId,
        planId: plan.id,
        priceAtPurchase: plan.price,
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE
      });

      await queryRunner.manager.save(newSubscription);
      await queryRunner.commitTransaction();

      return newSubscription;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getMySubscription(userId: string, query: PaginationDto): Promise<PaginationResult<Subscription>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const keyword = query.keyword;

    const whereCondition = keyword
      ? [
        { userId: Like(`%${keyword}%`) },
        { planId: Like(`%${keyword}%`) }
      ]
      : {};
    const [data, total] = await Subscription.findAndCount({
      where: { userId, ...whereCondition },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip
    });
    return new PaginationResult(data, total, page, limit);

  }
  // async findAll(query: PaginationDto): Promise<PaginationResult<University>> {
  //     const page = query.page || 1;
  //     const limit = query.limit || 10;
  //     const skip = (page - 1) * limit;
  //     const keyword = query.keyword;

  //     const whereConditon = keyword
  //       ? [
  //         { universityName: Like(`%${keyword}%`) },
  //         { emailDomain: Like(`%${keyword}%`) }
  //       ]
  //       : {};
  //     const [data, total] = await University.findAndCount({
  //       where: whereConditon,
  //       order: { createdAt: 'DESC' },
  //       take: limit,
  //       skip: skip
  //     })

  //     return new PaginationResult(data, total, page, limit);
  //   }

  async cancel(userId: string, subId: string) {
    const subscription = await Subscription.findOne({
      where: { userId, id: subId }
    });
    if (!subscription) {
      throw new AppError('Gói cước không tồn tại hoặc đã hết hạn/hủy', 404);
    }
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new AppError('Gói cước này không ở trạng thái có thể hủy', 400);
    }
    const now = new Date();
    const startDate = subscription.startDate;
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const timeDiff = now.getTime() - startDate.getTime();
    if (timeDiff > oneDayInMs) {
      throw new AppError('Chỉ có thể hủy gói cước trong vòng 24 giờ kể từ khi mua', 400);
    }
    subscription.status = SubscriptionStatus.CANCELLED;
    return await Subscription.save(subscription);
  }
}