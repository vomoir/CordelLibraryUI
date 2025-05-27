import { z } from 'zod';
import { fixUrl } from '../lib/utils';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string') {
    const [year, month, day] = arg.split('-'); // Split by "/"
    if (day && month && year) {
      return new Date(`${year}-${month}-${day}`); // Convert to "yyyy-mm-dd"
    }
  }
  return undefined; // Invalid date format
}, z.date());

const urlSchema = z.preprocess((arg) => {
  if (typeof arg === 'string') {
    const fixedUrl = fixUrl(arg);
    try {
      new URL(fixedUrl); // Validate URL format
      return fixedUrl; // Return the fixed URL if valid
    } catch {
      return undefined; // Invalid URL format
    }
  }
  return undefined; // Not a string
}, z.string().url('Invalid URL format.'));

export const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  author: z.string().min(3, 'Author must be at least 3 characters.'),
  publisher: z.string().optional(),
  publishedDate: dateSchema
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format. Must be a valid date.',
    })
    .transform((date) => date.toISOString().split('T')[0]), // Convert to ISO string and keep only the date part
  numberOfPages: z.coerce.number().positive('Must be a positive number.'),
  blurb: z.string().max(300, 'Blurb cannot exceed 300 characters.'),
  coverUrl: urlSchema.optional(),
});
