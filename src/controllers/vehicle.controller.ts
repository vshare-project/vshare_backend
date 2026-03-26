import { PaginationDto } from "@/dtos/pagination.dto";
import { CreateVehicleDto, UpdateVehicleDto } from "@/dtos/vehicle.dto";
import { VehicleService } from "@/services";
import { AppError } from "@/utils/appError";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

const vehicleService = new VehicleService();

export class VehicleController {
  /**
   * @swagger
   * tags:
   *   - name: Vehicles
   *     description: Quản lý xe (tạo/cập nhật/xóa chỉ dành cho Admin/Staff)
   */

  /**
   * @swagger
   * /vehicle:
   *   post:
   *     summary: Tạo mới một xe (Admin/Staff only)
   *     tags: [Vehicles]
   *     operationId: createVehicle
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             allOf:
   *               - $ref: '#/components/schemas/CreateVehicleDto'
   *               - type: object
   *                 properties:
   *                   issueImages:
   *                     type: array
   *                     items:
   *                       type: string
   *                       format: binary
   *                     description: Tải lên tối đa 3 ảnh vấn đề (field name phải là "issueImages")
   *     responses:
   *       '201':
   *         description: Tạo xe thành công
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
   *                   example: Thêm xe thành công!
   *                 data:
   *                   $ref: '#/components/schemas/Vehicle'
   *       '400':
   *         description: Dữ liệu không hợp lệ, trùng mã xe, trạm không tồn tại hoặc hết slot
   *       '401':
   *         description: Unauthorized
   *       '403':
   *         description: Forbidden (không phải Admin/Staff)
   *       '404':
   *         description: Trạm không tồn tại
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateVehicleDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }

      if (req.files && Array.isArray(req.files)) {
        dto.issueImages = (req.files as any[]).map((file) => file.location);
      }

      const result = await vehicleService.create(dto);

      res.status(201).json({
        status: "Success",
        message: "Thêm xe thành công!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
 * @swagger
 * /vehicle/{id}:
 *   patch:
 *     summary: Cập nhật thông tin xe (Admin/Staff only)
 *     tags: [Vehicles]
 *     operationId: updateVehicle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của xe cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/UpdateVehicleDto'
 *             type: object
 *             properties:
 *               issueImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 nullable: true
 *                 description: Tải lên ảnh vấn đề mới (tối đa 3 ảnh, field name phải là "issueImages")
 *     responses:
 *       '200':
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
 *                   example: Cập nhật thông tin xe thành công!
 *                 data:
 *                   $ref: '#/components/schemas/Vehicle'
 *       '400':
 *         description: Dữ liệu không hợp lệ hoặc trạm mới không đủ chỗ
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden (không phải Admin/Staff)
 *       '404':
 *         description: Không tìm thấy xe
 */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const dto = plainToInstance(UpdateVehicleDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        const firstError = Object.values(errors[0].constraints || {})[0];
        throw new AppError(firstError || "Dữ liệu không hợp lệ", 400);
      }

      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        dto.issueImages = (req.files as any[]).map((file) => file.location);
      }

      const result = await vehicleService.update(id, dto);

      res.status(200).json({
        status: "Success",
        message: "Cập nhật thông tin xe thành công!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /vehicle:
   *   get:
   *     summary: Lấy danh sách tất cả xe (phân trang + tìm kiếm)
   *     tags: [Vehicles]
   *     operationId: getAllVehicles
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
   *         description: Tìm theo mã xe, loại xe hoặc trạng thái
   *     responses:
   *       '200':
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
   *                   example: Lấy danh sách xe thành công!
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Vehicle'
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 limit:
   *                   type: integer
   *                 totalPages:
   *                   type: integer
   */
  async getAllVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = plainToInstance(PaginationDto, req.query);
      const result = await vehicleService.findAll(query);

      res.status(200).json({
        status: "Success",
        message: "Lấy danh sách xe thành công!",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByType(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params;
      const query = plainToInstance(PaginationDto, req.query);
      const result = await vehicleService.findByType(type as any, query);

      res.status(200).json({
        status: "Success",
        message: `Lấy danh sách xe loại '${type}' thành công!`,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /vehicle/{id}:
   *   get:
   *     summary: Lấy thông tin chi tiết một xe theo ID
   *     tags: [Vehicles]
   *     operationId: getVehicleById
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID của xe (string)
   *     responses:
   *       '200':
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
   *                   example: Lấy thông tin xe thành công!
   *                 data:
   *                   $ref: '#/components/schemas/Vehicle'
   *       '400':
   *         description: ID không hợp lệ
   *       '404':
   *         description: Không tìm thấy xe
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      if (!id) throw new AppError("Id không hợp lệ", 400);

      const result = await vehicleService.findById(id);

      res.status(200).json({
        status: "Success",
        message: "Lấy thông tin xe thành công!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /vehicle/{id}:
   *   delete:
   *     summary: Xóa một xe (Admin/Staff only)
   *     tags: [Vehicles]
   *     operationId: deleteVehicle
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
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
   *                   example: Xóa xe thành công!
   *       '400':
   *         description: ID không hợp lệ
   *       '401':
   *         description: Unauthorized
   *       '403':
   *         description: Forbidden
   *       '404':
   *         description: Không tìm thấy xe
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      if (!id) throw new AppError("Id không hợp lệ", 400);

      await vehicleService.delete(id);

      res.status(200).json({
        status: "Success",
        message: "Xóa xe thành công!",
      });
    } catch (error) {
      next(error);
    }
  }
}