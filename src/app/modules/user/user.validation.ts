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

const addToWishListZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
});

const addToReadZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
  addToWishListZodSchema,
  addToReadZodSchema,
};
