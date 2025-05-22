import { create } from "zustand";

const useStore = create((set) => ({
  posts: [],
  users: [],
  loadingPosts: false,
  loadingUsers: false,
  errorPosts: null,
  errorUsers: null,
  currentPage: 1,
  postsPerPage: 5,
  filterKeyword: "",
  sortOrder: "asc",

  setPostsPerPage: (size) => set({ postsPerPage: size }),
  setFilterKeyword: (keyword) => set({ filterKeyword: keyword }),
  setSortOrder: (order) => set({ sortOrder: order }),

  fetchPosts: async (page = 1, limit = 5, sortOrder = "asc") => {
    set({ loadingPosts: true, errorPosts: null });
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      let data = await response.json();

      // Apply sorting
      data = data.sort((a, b) => {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      });

      set({ posts: data, loadingPosts: false, currentPage: page });
    } catch (error) {
      set({ errorPosts: error.message, loadingPosts: false });
    }
  },

  fetchUsers: async () => {
    set({ loadingUsers: true, errorUsers: null });
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      set({ users: data, loadingUsers: false });
    } catch (error) {
      set({ errorUsers: error.message, loadingUsers: false });
    }
  },

  nextPage: () => {
    const { currentPage, postsPerPage, sortOrder } = useStore.getState();
    useStore.getState().fetchPosts(currentPage + 1, postsPerPage, sortOrder);
  },

  prevPage: () => {
    const { currentPage, postsPerPage, sortOrder } = useStore.getState();
    if (currentPage > 1) {
      useStore.getState().fetchPosts(currentPage - 1, postsPerPage, sortOrder);
    }
  },
}));

export default useStore;