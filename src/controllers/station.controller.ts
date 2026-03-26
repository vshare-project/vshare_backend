import { CreateStationDto, UpdateStationDto } from "@/dtos";
import { PaginationDto } from "@/dtos/pagination.dto";
import { StationService } from "@/services/station.service";
import { AppError } from "@/utils/appError";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

const stationService = new StationService();
export class StationController {
  /**
   * @swagger
   * tags:
   *   - name: Stations
   *     description: Quản lý trạm xe (tạo/cập nhật/xóa chỉ dành cho Admin)
   */

  /**
   * @swagger
   * /station:
   *   post:
   *     summary: Tạo mới một trạm xe (Admin only)
   *     tags: [Stations]
   *     operationId: createStation
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             allOf:
   *               - $ref: '#/components/schemas/CreateStationDto'
   *               - type: object
   *                 properties:
   *                   images:
   *                     type: array
   *                     items:
   *                       type: string
   *                       format: binary
   *                     description: Tải lên tối đa 5 ảnh (field name phải là "images")
   *     responses:
   *       201:
   *         description: Tạo trạm thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Success
   *                 message:
   *                   type: string
   *                   example: Thêm trạm thành công!
   *                 data:
   *                   $ref: '#/components/schemas/Station'
   *       400:
   *         description: Dữ liệu không hợp lệ, trùng tên trạm, hoặc availableSlots > totalSlots
   *       401:
   *         description: Unauthorized - chưa đăng nhập
   *       403:
   *         description: Forbidden - không có quyền Admin
   */
  async createStation(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateStationDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || 'Dữ liệu không hợp lệ', 400);
      }
      if (req.files && Array.isArray(req.files)) {
        dto.imageUrls = (req.files as any[]).map(file => file.location);
      }
      const result = await stationService.createStation(dto);
      res.status(201).json({
        status: 'Success',
        message: 'Thêm trạm thành công!',
        data: result
      })
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /station:
   *   get:
   *     summary: Lấy danh sách tất cả trạm xe (hỗ trợ phân trang và tìm kiếm)
   *     tags: [Stations]
   *     operationId: getAllStations
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 10
   *       - in: query
   *         name: keyword
   *         schema:
   *           type: string
   *         description: Tìm theo tên trạm, địa chỉ hoặc universityName
   *     responses:
   *       200:
   *         description: Lấy danh sách thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Success
   *                 message:
   *                   type: string
   *                   example: Lấy danh sách station thành công!
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Station'
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 limit:
   *                   type: integer
   *                 totalPages:
   *                   type: integer
   */
  async getAllStation(req: Request, res: Response, next: NextFunction) {
    try {
      const query = plainToInstance(PaginationDto, req.query);
      const result = await stationService.findAll(query);
      res.status(200).json({
        status: 'Success',
        message: 'Lấy danh sách station thành công!',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /station/{id}:
   *   get:
   *     summary: Lấy thông tin chi tiết một trạm xe theo ID
   *     tags: [Stations]
   *     operationId: getStationById
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID của trạm
   *     responses:
   *       200:
   *         description: Lấy thông tin thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Success
   *                 message:
   *                   type: string
   *                   example: Lấy thông tin station thành công!
   *                 data:
   *                   $ref: '#/components/schemas/Station'
   *       400:
   *         description: ID không hợp lệ
   *       404:
   *         description: Không tìm thấy trạm
   */
  async getStationById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!id || isNaN(id)) {
        throw new AppError('Id không hợp lệ', 400);
      }
      const result = await stationService.findOne(id);
      res.status(200).json({
        status: 'Success',
        message: 'Lấy thông tin station thành công!',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /station/{id}:
   *   patch:
   *     summary: Cập nhật thông tin trạm xe (Admin only)
   *     tags: [Stations]
   *     operationId: updateStation
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             allOf:
   *               - $ref: '#/components/schemas/UpdateStationDto'
   *               - type: object
   *                 properties:
   *                   images:
   *                     type: array
   *                     items:
   *                       type: string
   *                       format: binary
   *                     description: Ảnh mới (nếu upload sẽ cập nhật imageUrls)
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Success
   *                 message:
   *                   type: string
   *                   example: Cập nhật thông tin station thành công!
   *                 data:
   *                   $ref: '#/components/schemas/Station'
   *       400:
   *         description: Dữ liệu không hợp lệ, trùng tên trạm, hoặc availableSlots > totalSlots
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Không tìm thấy trạm
   */
  async updateStation(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const dto = plainToInstance(UpdateStationDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || 'Dữ liệu không hợp lệ', 400);
      }
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        dto.imageUrls = (req.files as any[]).map(file => file.location);
      }
      const result = await stationService.update(id, dto);
      res.status(200).json({
        status: 'Success',
        message: 'Cập nhật thông tin station thành công!',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * @swagger
   * /station/{id}:
   *   delete:
   *     summary: Xóa một trạm xe (Admin only)
   *     tags: [Stations]
   *     operationId: deleteStation
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Xóa thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Success
   *                 message:
   *                   type: string
   *                   example: Xóa station thành công!
   *       400:
   *         description: ID không hợp lệ
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Không tìm thấy trạm
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!id || isNaN(id)) {
        throw new AppError('Id không hợp lệ', 400);
      }
      await stationService.delete(id);
      res.status(200).json({
        status: 'Success',
        message: 'Xóa station thành công!'
      });
    } catch (error) {
      next(error);
    }
  }


}

