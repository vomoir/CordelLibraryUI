import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  author: z.string().min(3, 'Author must be at least 3 characters.'),
  publisher: z.string().optional(),
  // publishedDate: z
  //   .string()
  //   .regex(
  //     /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
  //     'Invalid date format. Must be dd/mm/yyyy'
  //   ),
  numberOfPages: z.coerce.number().positive('Must be a positive number.'),
  blurb: z.string().max(300, 'Blurb cannot exceed 300 characters.'),
  // coverUrl: z.string().url('Invalid URL format.').optional(),
});
