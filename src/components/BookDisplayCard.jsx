import useBookStore from '../stores/bookstore';
import { formatDate, fixUrl } from '../lib/utils';
import '../styles/styles.css';

const BookDisplayCard = () => {
  const { selectedBook, setSelectedBook, setEditingBook } = useBookStore();

  if (!selectedBook) {
    return null; // Return null if no book is selected
  }

  return (
    <div className="card-content">
      {selectedBook.coverUrl ? (
        <img src={fixUrl(selectedBook.coverUrl)} alt={selectedBook.title} />
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
  );
};

export default BookDisplayCard;
