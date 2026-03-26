export const UpdateVehicalDtoSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['available', 'in-use', 'maintenance', 'low_battery'],
      example: 'maintenance',
      description: 'Cập nhật trạng thái xe',
    },
    batteryLevel: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
      example: 85,
      description: 'Cập nhật mức pin',
    },
    stationId: {
      type: 'integer',
      example: 2,
      description: 'Chuyển xe sang trạm khác (nếu thay đổi)',
    },
    currentLat: {
      type: 'number',
      nullable: true,
      example: 21.0300,
    },
    currentLong: {
      type: 'number',
      nullable: true,
      example: 105.8550,
    },
    issueImages: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
      nullable: true,
      description: 'Ảnh vấn đề mới (nếu upload sẽ cập nhật)',
    },
  },
};