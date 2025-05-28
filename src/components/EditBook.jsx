import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema } from '../schemas/bookSchema';
import useBookStore from '../stores/bookstore';
import { useEffect } from 'react';
import { fixUrl, formatDate } from '../lib/utils';

const EditBook = () => {
  const {
    fetchBooks,
    setEditingBook,
    editingBook,
    isEditing,
    updateBook,
    deleteBook,
    createBook,
  } = useBookStore();

  const bookData = editingBook;
  const formattedDate = formatDate(bookData.PublishedDate);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: isEditing ? zodResolver(bookSchema) : undefined,
    defaultValues: bookData,
  });

  const onSubmit = async (data) => {
    if (isEditing) {
      await updateBook(data); // Update existing book
    } else {
      await createBook(data); // Create a new book
    }
    setEditingBook(false); // Close the edit form
  };

  const deleteBookHandler = async (book) => {
    // Update form fields when bookData changes
    deleteBook(book.id); // Delete the book in the store
    setEditingBook(false); // Close the edit form
  };

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
        {errors.publishedDate && <span>{errors.publishedDate.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Number of Pages:</label>
        <input
          type="number"
          {...register('numberOfPages')}
          style={styles.input}
        />
        {errors.numberOfPages && <span>{errors.numberOfPages.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Blurb:</label>
        <textarea {...register('blurb')} style={styles.input} />
        {errors.blurb && <span>{errors.blurb.message}</span>}
      </div>

      <div style={styles.formRow}>
        <label style={styles.label}>Cover Url:</label>
        <input
          type="input"
          {...register('coverUrl')}
          value={fixUrl(bookData.CoverUrl)}
          style={styles.input}
          placeholder="https://covers.openlibrary.org/b/id/1-M.jpg"
        />
        {errors.coverUrl && (
          <p style={{ color: 'red' }}>{errors.coverUrl.message}</p>
        )}
      </div>

      <div style={styles.buttonContainer}>
        <button type="submit" style={styles.saveBtn}>
          Save Changes
        </button>

        {isEditing && (
          <button
            type="button"
            style={styles.deleteBtn}
            onClick={() => deleteBookHandler(editingBook)}
          >
            Delete Book
          </button>
        )}

        <button
          type="button"
          style={styles.cancelBtn}
          onClick={() => setEditingBook(false)}
        >
          Cancel
        </button>
      </div>
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
  buttonContainer: {
    display: 'flex',
    gap: '10px' /* Spacing between buttons */,
    justifyContent: 'flexEnd' /* Align buttons to the right */,
    marginTop: '20px' /* Spacing from form fields */,
  },
  saveBtn: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#28a745' /* Green */,
    color: 'white',
  },

  deleteBtn: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#dc3545' /* Red */,
    color: 'white',
  },

  cancelBtn: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#6c757d' /* Gray */,
    color: 'white',
  },
};

export default EditBook;
