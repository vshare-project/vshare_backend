export const StationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 2,
    },
    stationName: {
      type: 'string',
      example: 'Phùng Khoang',
    },
    address: {
      type: 'string',
      example: 'Hà Đông',
    },
    latitude: {
      type: 'number',
      format: 'decimal',
      example: -30,
    },
    longitude: {
      type: 'number',
      format: 'decimal',
      example: 40,
    },
    totalSlots: {
      type: 'integer',
      example: 40,
    },
    availableSlots: {
      type: 'integer',
      example: 39,
    },
    isActive: {
      type: 'boolean',
      example: true,
    },
    universityName: {
      type: 'string',
      nullable: true,
      example: null,
    },
    stationType: {
      type: 'string',
      enum: ['public', 'university', 'commercial', 'residential'],
      example: 'public',
    },
    imageUrls: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
      example: [
        'https://dichung.com.s3.ap-southeast-1.amazonaws.com/vehicle/images-1772609798118-693564108.png',
        'https://dichung.com.s3.ap-southeast-1.amazonaws.com/vehicle/images-1772609798125-24279979.png',
      ],
    },
    openTime: {
      type: 'string',
      format: 'time',
      example: '06:00:00',
    },
    closeTime: {
      type: 'string',
      format: 'time',
      example: '22:00:00',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-03-04T00:36:39.775Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-03-04T00:36:39.775Z',
    },
  },
  required: [
    'id',
    'stationName',
    'address',
    'latitude',
    'longitude',
    'totalSlots',
    'availableSlots',
    'isActive',
    'stationType',
  ],
};