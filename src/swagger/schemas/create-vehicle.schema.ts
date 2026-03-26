export const CreateVehicalDtoSchema = {
  type: 'object',
  required: [
    'vehicleCode',
    'vehicleType',
    'batteryLevel',
    'status',
    'stationId',
  ],
  properties: {
    vehicleCode: {
      type: 'string',
      example: 'BK-002',
      description: 'Mã xe (unique)',
    },
    vehicleType: {
      type: 'string',
      enum: ['bike', 'motorbike', 'car'],
      example: 'bike',
      description: 'Loại xe',
    },
    batteryLevel: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
      example: 100,
      description: 'Mức pin (%)',
    },
    status: {
      type: 'string',
      enum: ['available', 'in-use', 'maintenance', 'low_battery'],
      example: 'available',
      description: 'Trạng thái xe',
    },
    stationId: {
      type: 'integer',
      example: 1,
      description: 'ID trạm xe gắn vào (bắt buộc)',
    },
    issueImages: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
      nullable: true,
      description: 'Danh sách URL ảnh vấn đề (tự động map từ upload)',
    },
  },
};