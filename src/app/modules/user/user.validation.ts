import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    email: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
