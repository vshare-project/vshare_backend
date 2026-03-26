export const LoginDtoSchema = {
  type: 'object',
  required: ['identifier', 'password'],
  properties: {
    identifier: {
      type: 'string',
      format: 'email or phone',
      example: 'admin@ridex.com',
    },
    password: {
      type: 'string',
      format: 'password',
      example: 'admin@123',
    },
  },
};