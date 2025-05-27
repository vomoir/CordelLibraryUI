import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema } from '../schemas/validation';
import useStore from '../stores/bookstore';
import { useEffect } from 'react';
import { formatDate } from '../lib/utils';

const EditBook = () => {
  const { setEditingBook, editingBook, updateBook } = useStore();
  const bookData = editingBook;
  const formattedDate = formatDate(bookData.PublishedDate);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: bookData,
  });

  const onSubmit = (data) => {
    console.log(`Updating book: ${JSON.stringify(data)}`);
    updateBook(data); // Update the book in the store
    setEditingBook(false); // Close the edit form
    // Optionally, you can also reset the form after submission
    reset(); // Reset the form fields
    setEditingBook(null); // Clear the editing state
  };
  // Update form fields when bookData changes
  useEffect(() => {
    if (bookData) {
      reset(bookData); // Explicitly set form values
    }
  }, [bookData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input type="hidden" {...register('id')} value={bookData.Id} />

      <div style={styles.formRow}>
        <label style={styles.label}>Title:</label>
        <input
          {...register('title')}
          style={styles.input}
          value={bookData.Title}
        />
        {errors.Title && <span>{errors.Title.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Author:</label>
        <input {...register('author')} style={styles.input} />
        {errors.Author && <span>{errors.Author.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Publisher:</label>
        <input {...register('publisher')} style={styles.input} />
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Published Date:</label>
        <input
          type="date"
          {...register('publishedDate')}
          defaultValue={formattedDate} // Set the default value to the formatted date
          style={styles.input}
        />
        {errors.PublishedDate && <span>{errors.PublishedDate.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Number of Pages:</label>
        <input
          type="number"
          {...register('numberOfPages')}
          style={styles.input}
        />
        {errors.NumberOfPages && <span>{errors.NumberOfPages.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Blurb:</label>
        <textarea {...register('blurb')} style={styles.input} />
        {errors.Blurb && <span>{errors.Blurb.message}</span>}
      </div>

      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => setEditingBook(false)}>
        Cancel
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px', // Space between label and input
    marginBottom: '5px', // Spacing between rows
  },
  label: {
    width: '120px', // Fixed width for labels to align neatly
    fontWeight: 'bold',
  },
  input: {
    flex: 1, // Makes input take up the remaining space
    padding: '5px',
  },
};

export default EditBook;
