export const AuthResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'success',
    },
    message: {
      type: 'string',
      example: 'Đăng nhập thành công',
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', example: 'ngoc@example.com' },
            fullName: { type: 'string', example: 'Nguyễn Văn Ngọc' },
            role: { type: 'string', example: 'USER' },
          },
        },
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  },
};

export const RefreshTokenResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string', example: 'success' },
    message: { type: 'string', example: 'Refresh token thành công' },
    data: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  },
};