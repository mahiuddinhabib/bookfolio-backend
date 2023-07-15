import { z } from 'zod';
import { bookGenre } from './book.constant';

const createReviewZodSchema = z.object({
  body: z.object({
    reviewer: z.string({
      required_error: 'Reviewer is required',
    }),
    review: z.string({
      required_error: 'Drop a review',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    reviewer: z.string().optional(),
    review: z.string().optional(),
  }),
});

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.enum([...bookGenre] as [string, ...string[]], {
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Date is required',
    }),
    reviews: z
      .array(
        z.object({
          reviewer: z.string({
            required_error: 'Reviewer is required',
          }),
          review: z.string({
            required_error: 'Drop a review',
          }),
        })
      )
      .optional(),
    owner: z.string({
      required_error: 'Owner is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.enum([...bookGenre] as [string, ...string[]]).optional(),
    publicationDate: z.string().optional(),
    reviews: z
      .array(
        z.object({
          reviewer: z.string().optional(),
          review: z.string().optional(),
        })
      )
      .optional(),
    owner: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  createReviewZodSchema,
  updateReviewZodSchema,
};
