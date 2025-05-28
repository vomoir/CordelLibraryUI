import React, { useEffect, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import useBookStore from '../stores/bookstore';
import { formatDate, fixUrl } from '../lib/utils';
import '../styles/styles.css';

const BookList = ({ data }) => {
  const tableRef = useRef(null);
  const { books, filterKeyword, setSelectedBook, setEditingBook } =
    useBookStore();

  // Scroll to the bottom of the table when data updates
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [data]); // Runs when data updates

  return (
    <div ref={tableRef} className="table-container">
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
  );
};

export default BookList;
