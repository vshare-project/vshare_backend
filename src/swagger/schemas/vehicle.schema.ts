export const VehicleSchema = {
  type: 'object',
  properties: {
    vehicleCode: {
      type: 'string',
      example: 'BK-002',
    },
    vehicleType: {
      type: 'string',
      enum: ['bike', 'scooter', 'car'],
      example: 'bike',
    },
    batteryLevel: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
      example: 100,
    },
    status: {
      type: 'string',
      enum: ['available', 'in-use', 'maintenance', 'broken'],
      example: 'available',
    },
    stationId: {
      type: 'integer',
      example: 1,
    },
    station: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        stationName: { type: 'string', example: 'Phùng Khoang' },
        address: { type: 'string', example: 'Hà Đông' },
        // thêm field khác nếu cần hiển thị chi tiết station
      },
      description: 'Thông tin trạm xe đang gắn (relation)',
    },
    currentLat: {
      type: 'number',
      format: 'decimal',
      nullable: true,
      example: 21.0285,
    },
    currentLong: {
      type: 'number',
      format: 'decimal',
      nullable: true,
      example: 105.8542,
    },
    issueImages: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
      nullable: true,
      example: [
        'https://dichung.com.s3.ap-southeast-1.amazonaws.com/vehicle/issue-1772681561890-141605749.png',
      ],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-03-05T10:00:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-03-05T10:30:00.000Z',
    },
  },
  required: [
    'id',
    'vehicleCode',
    'vehicleType',
    'batteryLevel',
    'status',
    'stationId',
  ],
};