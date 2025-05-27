import { create } from 'zustand';

const useStore = create((set) => ({
  books: [],
  loadingBooks: false,
  errorBooks: null,
  currentPage: 1,
  booksPerPage: Number(localStorage.getItem('booksPerPage')) || 5,
  filterKeyword: '',
  sortOrder: 'asc',
  selectedBook: null,
  editingBook: null,
  setEditingBook: (book) => set({ editingBook: book }),
  clearEditingBook: () => set({ editingBook: null }),
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return { darkMode: newMode };
    }),
  setBooksPerPage: (size) =>
    set(() => {
      localStorage.setItem('booksPerPage', size);
      return { booksPerPage: size };
    }),
  setFilterKeyword: (keyword) => set({ filterKeyword: keyword }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedBook: (book) => set({ selectedBook: book }),
  updateBook: async (updatedBook) => {
    console.log('Updating book:', updatedBook);
    try {
      const response = await fetch(
        `https://localhost:7179/api/Books/${updatedBook.id}`,
        {
          method: 'PUT', // PUT simulates an update
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBook),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      set((state) => ({
        books: state.books.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        ),
      }));
    } catch (error) {
      console.error('Update failed:', error);
    }
  },
  fetchBooks: async (page = 1, limit = 5, sortOrder = 'asc') => {
    set({ loadingBooks: true, errorBooks: null });
    try {
      const response = await fetch(
        `https://localhost:7179/api/Books?page=${page}&limit=${limit}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      let data = await response.json();
      console.log('Retrieving all books:', data);
      // Apply sorting
      data = data.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });

      set({ books: data, loadingBooks: false, currentPage: page });
    } catch (error) {
      set({ errorBooks: error.message, loadingBooks: false });
    }
  },
}));

export default useStore;
