import React, { useEffect } from 'react';
import EditBook from './EditBook'; // Import the EditBook component
import { motion } from 'framer-motion';

import useBookStore from '../stores/bookstore';
import { FaSpinner } from 'react-icons/fa';
import '../styles/styles.css';
import BookList from './BookListTable';
import BookDisplayCard from './BookDisplayCard';

const BooksDisplay = () => {
  const {
    loadingBooks,
    errorBooks,
    fetchBooks,
    nextPage,
    prevPage,
    currentPage,
    booksPerPage,
    setBooksPerPage,
    filterKeyword,
    setFilterKeyword,
    sortOrder,
    setSortOrder,
    selectedBook,
    darkMode,
    toggleDarkMode,
    editingBook,
    setEditingBook,
    setAddNewBook,
    updateBook,
    clearEditingBook,
    bookDeleted,
    isEditing,
  } = useBookStore();

  const handleAddBookClick = () => {
    console.log(`adding new book...`);
    console.log('isEditing state:', isEditing);
    const book = useBookStore.getState().getBookData();
    setEditingBook(null); // Clear any existing editing state
    setAddNewBook(book);
    console.log(`Book data for adding:${JSON.stringify(book)}`);
    console.log(`Updated Zustand state: ${useBookStore.getState().book}`);
  };

  useEffect(() => {
    fetchBooks(currentPage, booksPerPage);
  }, [currentPage, fetchBooks, booksPerPage, bookDeleted]);

  useEffect(() => {
    console.log('isEditing state:', isEditing);
  }, [isEditing]);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="buttonsContainer">
        <div className="buttonGroup">
          <label htmlFor="booksPerPage">Books per page:</label>
          <input
            type="number"
            id="booksPerPage"
            name="booksPerPage"
            value={booksPerPage}
            onChange={(e) => setBooksPerPage(Number(e.target.value))}
            min="1"
          />
          <button onClick={() => fetchBooks(1, booksPerPage)}>Apply</button>
        </div>

        <div className="buttonGroup">
          <label>
            Sort order:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>
            </select>
          </label>
        </div>

        <div className="buttonGroup">
          <label>
            Filter Title by keyword:
            <input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={toggleDarkMode}>🌙 Toggle Dark Mode</button>
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        <button onClick={nextPage}>Next ➡</button>
      </div>

      <div className="buttonGroup">
        <h3>Books (Page {currentPage}):</h3>
        {loadingBooks && <FaSpinner size={24} className="spinner" />}
        {errorBooks && (
          <p>
            Error: {errorBooks}
            <button
              onClick={() => fetchBooks(currentPage, booksPerPage, sortOrder)}
            >
              Retry
            </button>
          </p>
        )}
        <button onClick={() => handleAddBookClick()}>Add Book</button>
      </div>

      <div className="table-container">
        <BookList />
      </div>

      {selectedBook && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, type: 'spring' }}
          style={{
            marginTop: '20px',
            padding: '10px',
            background: '#f8f9fa',
            border: '1px solid #ccc',
            width: 'fit-content',
            transform: 'translateX(-50%)',
          }}
        >
          <BookDisplayCard />
        </motion.div>
      )}

      {editingBook && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, type: 'spring' }}
          style={{
            marginTop: '20px',
            padding: '10px',
            background: '#f8f9fa',
            border: '1px solid #ccc',
            width: 'fit-content',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="card-content">
            <EditBook
              saveEdit={(data) => {
                updateBook(data);
                clearEditingBook();
              }}
              onClose={() => {
                setEditingBook(null);
              }}
            />
          </div>
          <button onClick={clearEditingBook}>Cancel</button>
        </motion.div>
      )}
    </div>
  );
};

export default BooksDisplay;
