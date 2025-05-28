import { bookSchema } from './bookSchema'; // Your existing edit schema

// Create Schema: Allow ID to be optional for new books
export const newBookSchema = bookSchema.omit({ id: true });
