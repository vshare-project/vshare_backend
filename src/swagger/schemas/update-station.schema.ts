export const UpdateStationDtoSchema = {
  type: 'object',
  properties: {
    stationName: {
      type: 'string',
      example: 'Phùng Khoang (cập nhật)',
    },
    address: {
      type: 'string',
      example: 'Hà Đông, Hà Nội',
    },
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
      example: -29.5,
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
      example: 41,
    },
    totalSlots: {
      type: 'integer',
      minimum: 1,
      example: 45,
    },
    availableSlots: {
      type: 'integer',
      minimum: 0,
      example: 42,
    },
    stationType: {
      type: 'string',
      enum: ['public', 'university', 'commercial', 'residential'],
      example: 'university',
    },
    openTime: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
      example: '05:30:00',
    },
    closeTime: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
      example: '23:00:00',
    },
  },
};