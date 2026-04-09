import { CreateStationDto, UpdateStationDto } from "@/dtos";
import { PaginationDto } from "@/dtos/pagination.dto";
import { Station } from "@/entities";
import { AppError } from "@/utils/appError";
import { PaginationResult } from "@/utils/pagination.response";
import { Like } from "typeorm";

export class StationService {
  async createStation(data: CreateStationDto) {
    // Kiểm tra trùng tên trạm
    const existingStation = await Station.findOne({
      where: { stationName: data.stationName }
    });
    if (existingStation) {
      throw new AppError('Tên trạm này đã tồn tại', 400);
    }

    // Kiểm tra số chỗ khả dụng không vượt quá tổng số chỗ
    if (data.availableSlots > data.totalSlots) {
      throw new AppError('Số chỗ khả dụng không được vượt quá tổng số chỗ', 400);
    }

    const newStation = Station.create({
      ...data,
      isActive: true,
    });
    return await Station.save(newStation);
  }

  async findAll(query: PaginationDto): Promise<PaginationResult<Station>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const keyword = query.keyword;

    const whereConditon = keyword
      ? [
        { stationName: Like(`%${keyword}%`) },
        { address: Like(`%${keyword}%`) }
      ]
      : {};
    const [data, total] = await Station.findAndCount({
      where: whereConditon,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip
    })
    return new PaginationResult(data, total, page, limit);
  }

  async findOne(id: number) {
    const station = await Station.findOneBy({ id });
    if (!station) {
      throw new AppError(`Không tìm thấy trạm có id là ${id}`, 404);
    }
    return station;
  }

  async update(id: number, data: UpdateStationDto) {
    const station = await this.findOne(id);
    if (data.stationName && data.stationName !== station.stationName) {
      const existingStation = await Station.findOne({
        where: { stationName: data.stationName }
      });
      if (existingStation) {
        throw new AppError('Tên trạm này đã tồn tại', 400);
      }
    }
    const totalSlots = data.totalSlots ?? station.totalSlots;
    const availableSlots = data.availableSlots ?? station.availableSlots;
    if (availableSlots > totalSlots) {
      throw new AppError('Số chỗ khả dụng không được vượt quá tổng số chỗ', 400);
    }
    Object.assign(station, data);
    return await Station.save(station);
  }

  async delete(id: number) {
    const station = await this.findOne(id);
    if (!station) {
      throw new AppError(`Không tìm thấy trạm có id là ${id}`, 404);
    }
    return await Station.remove(station);
  }

}  