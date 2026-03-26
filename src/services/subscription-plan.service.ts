import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateSubscriptionPlanDto, UpdateSubscriptionPlanDto } from "@/dtos/subscription-plan.dto";
import { SubscriptionPlan } from "@/entities";
import { AppError } from "@/utils/appError";
import { PaginationResult } from "@/utils/pagination.response";
import { Like } from "typeorm";

export class SubscriptionPlanService {
  async create(data: CreateSubscriptionPlanDto) {
    const exitingSubPlan = await SubscriptionPlan.findOne({
      where: { name: data.name }
    });
    if (exitingSubPlan) {
        throw new AppError('Tên gói cước này đã tồn tại', 400);
    }

    const plan = SubscriptionPlan.create({
      ...data,
      isActive: true
    });
    return await SubscriptionPlan.save(plan);
  }

 
  async findAll(query: PaginationDto): Promise<PaginationResult<SubscriptionPlan>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const keyword = query.keyword;

    const whereConditon = keyword
      ? [
        { name: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) }
      ]
      : {};
    const [data, total] = await SubscriptionPlan.findAndCount({
      where: whereConditon,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip
    })
    return new PaginationResult(data, total, page, limit);
  }

  async findOne(id: string) {
    const subPlan = await SubscriptionPlan.findOneBy({ id });
    if (!subPlan) {
      throw new AppError(`Không tìm thấy vé có id là ${id}`, 404);
    }
    return subPlan;
  }

  async update(id: string, data: UpdateSubscriptionPlanDto) {
    const subPlan = await this.findOne(id);
    if (!subPlan) {
      throw new AppError('Không tìm thấy vé', 404);
    }
    Object.assign(subPlan, data);
    return await SubscriptionPlan.save(subPlan);
  }

  async delete(id: string) {
    const plain = await this.findOne(id);
    if (!plain) {
      throw new AppError(`Không tìm thấy vé có id là ${id}`, 404);
    }
    return await SubscriptionPlan.remove(plain);
  }
}