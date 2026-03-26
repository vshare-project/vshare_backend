import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateVehicleDto, UpdateVehicleDto } from "@/dtos/vehicle.dto";
import { Station, Vehicle, VehicleType } from "@/entities";
import { AppError } from "@/utils/appError";
import { PaginationResult } from "@/utils/pagination.response";
import { Like } from "typeorm";

export class VehicleService {
  async create(data: CreateVehicleDto) {
    const station = await Station.findOneBy({ id: data.stationId });
    if (!station) throw new AppError('Trạm không tồn tại ', 404);
    if (station.availableSlots <= 0) throw new AppError('Trạm đã hết slot trống !', 400);

    const esxistingVehicle = await Vehicle.findOneBy({ vehicleCode: data.vehicleCode });
    if (esxistingVehicle) throw new AppError('Xe đã tồn tại !', 400);

    const newVehicle = Vehicle.create({ ...data, station });
    station.availableSlots -= 1;
    await Station.save(station);
    await Vehicle.save(newVehicle);
    return {
      ...newVehicle,
      station: {
        id: station.id,
        stationName: station.stationName,
        address: station.address
      }
    }
  }

  async findAll(query: PaginationDto): Promise<PaginationResult<Vehicle>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const { keyword, type, status } = query;

    // Build base condition from type/status filters
    const baseCondition: any = {};
    if (type) baseCondition.vehicleType = type;
    if (status) baseCondition.status = status;

    // If keyword, spread across searchable fields; else use base condition only
    const whereCondition = keyword
      ? [
          { ...baseCondition, vehicleCode: Like(`%${keyword}%`) },
          { ...baseCondition, vehicleType: Like(`%${keyword}%`) },
          { ...baseCondition, status: Like(`%${keyword}%`) },
        ]
      : Object.keys(baseCondition).length ? baseCondition : {};

    const [data, total] = await Vehicle.findAndCount({
      where: whereCondition,
      relations: ['station', 'carDetails', 'motorbikeDetails'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });
    return new PaginationResult(data, total, page, limit);
  }

  async findByType(type: VehicleType, query: PaginationDto): Promise<PaginationResult<Vehicle>> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    if (!Object.values(VehicleType).includes(type)) {
      throw new AppError(`Loại xe không hợp lệ. Các loại hợp lệ: ${Object.values(VehicleType).join(', ')}`, 400);
    }

    const [data, total] = await Vehicle.findAndCount({
      where: { vehicleType: type },
      relations: ['station', 'carDetails', 'motorbikeDetails'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    return new PaginationResult(data, total, page, limit);
  }

  async findById(id: string) {
    const vehicle = await Vehicle.findOne({
      where: { id },
      relations: ['station', 'carDetails', 'motorbikeDetails']
    });
    if (!vehicle) {
      throw new AppError(`Khong tim thay xe co Id là ${id} `, 404);
    }
    return vehicle;
  }

  async update(id: string, data: UpdateVehicleDto) {
    const vehicle = await Vehicle.findOne({
      where: { id },
      relations: ['carDetails', 'motorbikeDetails']
    });
    if (!vehicle) throw new AppError(`Không tìm thấy xe có id là ${id}`, 404);
    if (data.stationId && data.stationId !== vehicle.stationId) {
      const oldStation = await Station.findOneBy({ id: vehicle.stationId });
      const newStation = await Station.findOneBy({ id: data.stationId });
      if (newStation && newStation.availableSlots > 0) {
        if (oldStation) {
          oldStation.availableSlots += 1;
          await Station.save(oldStation);
        }
        newStation.availableSlots -= 1;
        await Station.save(newStation);
      } else {
        throw new AppError('Trạm mới không đủ chỗ', 400);
      }
    }

    // Xử lý update lồng nhau một cách an toàn
    if (data.carDetails) {
      if (vehicle.carDetails) {
        Object.assign(vehicle.carDetails, data.carDetails);
      } else {
        vehicle.carDetails = data.carDetails;
      }
      delete data.carDetails;
    }
    if (data.motorbikeDetails) {
      if (vehicle.motorbikeDetails) {
        Object.assign(vehicle.motorbikeDetails, data.motorbikeDetails);
      } else {
        vehicle.motorbikeDetails = data.motorbikeDetails;
      }
      delete data.motorbikeDetails;
    }

    Object.assign(vehicle, data);
    return await Vehicle.save(vehicle);
  }

  async delete(id: string) {
    const vehicle = await Vehicle.findOneBy({ id })
    if (!vehicle) {
      throw new AppError(`Khong tim thay xe co Id là ${id} `, 404);
    }
    return await Vehicle.remove(vehicle);
  }
}