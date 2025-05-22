import { create } from "zustand";

const useStore = create((set) => ({
  posts: [],
  users: [],
  loadingPosts: false,
  loadingUsers: false,
  errorPosts: null,
  errorUsers: null,
  currentPage: 1,
  postsPerPage:  Number(localStorage.getItem("postsPerPage")) || 5,
  filterKeyword: "",
  sortOrder: "asc",
  selectedPost: null,
  editingPost: null,
  setEditingPost: (post) => set({ editingPost: post }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  clearEditingPost: () => set({ editingPost: null }),
  darkMode:  JSON.parse(localStorage.getItem("darkMode")) || false,
   toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    return { darkMode: newMode };
  }),
    setPostsPerPage: (size) => set(() => {
    localStorage.setItem("postsPerPage", size);
    return { postsPerPage: size };
  }),
  setFilterKeyword: (keyword) => set({ filterKeyword: keyword }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  updatePost: async (updatedPost) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
        method: "PUT", // PUT simulates an update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        ),
      }));
    } catch (error) {
      console.error("Update failed:", error);
    }
  },
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
}));

export default useStore;