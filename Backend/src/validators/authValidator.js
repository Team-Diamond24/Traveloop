const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  additional_info: z.string().optional(),
  photo: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
