export const CreateStationDtoSchema = {
  type: 'object',
  required: [
    'stationName',
    'address',
    'latitude',
    'longitude',
    'totalSlots',
    'availableSlots',
  ],
  properties: {
    stationName: {
      type: 'string',
      example: 'Phùng Khoang',
      description: 'Tên trạm (bắt buộc, unique)',
    },
    address: {
      type: 'string',
      example: 'Hà Đông',
      description: 'Địa chỉ đầy đủ',
    },
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
      example: -30,
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
      example: 40,
    },
    totalSlots: {
      type: 'integer',
      minimum: 1,
      example: 40,
    },
    availableSlots: {
      type: 'integer',
      minimum: 0,
      example: 39,
    },
    stationType: {
      type: 'string',
      enum: ['public', 'university', 'commercial', 'residential'],
      default: 'public',
      example: 'public',
    },
    openTime: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
      example: '06:00:00',
    },
    closeTime: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
      example: '22:00:00',
    },
  },
};