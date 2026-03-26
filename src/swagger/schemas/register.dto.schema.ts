export const RegisterDtoSchema = {
  type: 'object',
  required: ['email', 'password', 'fullName'], 
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'ngoc@example.com',
      description: 'Email người dùng (phải unique)',
    },
    password: {
      type: 'string',
      format: 'password',
      example: 'MatKhauManh123!',
      minLength: 8,
      description: 'Mật khẩu (ít nhất 8 ký tự, có chữ hoa, số, ký tự đặc biệt)',
    },
    fullName: {
      type: 'string',
      example: 'Nguyễn Văn Ngọc',
      description: 'Họ và tên đầy đủ',
    },
    phone: {
      type: 'string',
      example: '0987654321',
    },
  },
};