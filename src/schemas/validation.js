import { z } from 'zod';

export const bookSchema = z.object({
  Title: z.string().min(3, 'Title must be at least 3 characters.'),
  Author: z.string().min(3, 'Author must be at least 3 characters.'),
  Publisher: z.string().optional(),
  PublishedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD).'),
  NumberOfPages: z.number().positive('Must be a positive number.'),
  Blurb: z.string().max(300, 'Blurb cannot exceed 300 characters.'),
});
