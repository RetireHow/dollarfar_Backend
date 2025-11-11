import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      // profileImg: z.string(),
      city: z.string(),
      designation: z.string(),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    // profileImg: z.string().optional(),
    city: z.string().optional(),
    designation: z.string().max(30).optional(),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
