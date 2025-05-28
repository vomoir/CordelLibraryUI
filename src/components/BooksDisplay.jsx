import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import EditBook from './EditBook'; // Import the EditBook component
import { formatDate, fixUrl } from '../lib/utils';

import useBookStore from '../stores/bookstore';
import { FaSpinner } from 'react-icons/fa';
import '../styles/styles.css';

const BooksDisplay = () => {
  const {
    books,
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
    setSelectedBook,
    darkMode,
    toggleDarkMode,
    editingBook,
    setEditingBook,
    updateBook,
    clearEditingBook,
    bookDeleted,
  } = useBookStore();

  useEffect(() => {
    fetchBooks(currentPage, booksPerPage);
  }, [currentPage, fetchBooks, booksPerPage, bookDeleted]);

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
        {/* <button onClick={setEditingBook(null)}>Add Book</button> */}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Published Date</th>
              <th>Number of Pages</th>
              <th>Blurb</th>
              <th>Book Cover</th>
            </tr>
          </thead>
          <tbody>
            {books
              ?.filter((book) => book.title.includes(filterKeyword))
              .map((book) => (
                <tr
                  key={book.id}
                  onClick={(event) => {
                    if (event.target.tagName === 'TD') {
                      setSelectedBook(book);
                    } else if (event.target.tagName === 'BUTTON') {
                      setEditingBook(book);
                    }
                  }}
                >
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{formatDate(book.publishedDate)}</td>
                  <td>{book.numberOfPages}</td>
                  <td>{book.blurb}</td>
                  <td>
                    {book.coverUrl ? (
                      <img
                        src={fixUrl(book.coverUrl)}
                        alt={book.title}
                        height="100"
                      />
                    ) : (
                      <span>No cover available</span>
                    )}
                  </td>
                  <td>
                    <button>
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedBook && (
        <div
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
            {selectedBook.coverUrl ? (
              <img
                src={fixUrl(selectedBook.coverUrl)}
                alt={selectedBook.title}
              />
            ) : (
              <span>No cover available</span>
            )}

            <img src={selectedBook.CoverUrl} alt={selectedBook.Title} />
            <h3>{selectedBook.title}</h3>
            <p>{selectedBook.blurb}</p>
            <p>
              <strong>Author: </strong>
              {selectedBook.author}
            </p>
            <p>
              <strong>Publisher: </strong>
              {selectedBook.publisher}
            </p>
            <p>
              <strong>Date Published : </strong>
              {formatDate(selectedBook.publishedDate)}
            </p>
            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}

      {editingBook && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default BooksDisplay;
