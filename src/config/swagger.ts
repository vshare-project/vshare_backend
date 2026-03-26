
import {
  CreateVehicalDtoSchema, UpdateVehicalDtoSchema, VehicleSchema,
  AuthResponseSchema, LoginDtoSchema, RegisterDtoSchema,
  CreateStationDtoSchema, StationSchema, UpdateStationDtoSchema
} from '@/swagger';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RideX API Documentation',
      version: '1.0.0',
      description: 'API cho hệ thống thuê xe RideX',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local server' },
    ],
    // Thêm định nghĩa tags chuẩn ở đây
    tags: [
      { name: 'Auth', description: 'API xác thực và phân quyền' },
      { name: 'Stations', description: 'Quản lý trạm xe (trạm sạc/đỗ)' },
      { name: 'Vehicles', description: 'API quản lý xe' },
      { name: 'Rentals', description: 'API quản lý thuê xe' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        RegisterDto: RegisterDtoSchema,
        LoginDto: LoginDtoSchema,
        AuthResponse: AuthResponseSchema,
        Station: StationSchema,
        CreateStationDto: CreateStationDtoSchema,
        UpdateStationDto: UpdateStationDtoSchema,
        Vehicle: VehicleSchema,
        CreateVehicleDto: CreateVehicalDtoSchema,
        UpdateVehicleDto: UpdateVehicalDtoSchema,
      },
    },
  },
  apis: [path.join(__dirname, '../controllers/*.{ts,js}')],
};

export const swaggerSpec = swaggerJsdoc(options);
