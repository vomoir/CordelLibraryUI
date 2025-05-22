import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import edit icon
import EditBook from "./EditBook"; // Import the EditBook component

import useStore from "./store";
import { FaSpinner } from "react-icons/fa";
import "./styles.css"; 

const FetchComponent = () => {
  const { 
    posts, loadingPosts, errorPosts, 
    fetchPosts, nextPage, prevPage, 
    currentPage, postsPerPage, setPostsPerPage, 
    filterKeyword, setFilterKeyword, sortOrder, 
    setSortOrder, selectedPost, setSelectedPost,
    darkMode, toggleDarkMode, editingPost, setEditingPost,
    updatePost,clearEditingPost 
  } = useStore();

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage);
  }, [postsPerPage]);

  return (
    <div  className={darkMode ? "dark-mode" : ""}>
      <h2>Fetch Example with Floating Card</h2>

      <label>
        Posts per page: 
        <input 
          type="number" 
          value={postsPerPage} 
          onChange={(e) => setPostsPerPage(Number(e.target.value))} 
          min="1" 
        />
        <button onClick={() => fetchPosts(1, postsPerPage)}>Apply</button>
      </label>
      <div>
        <label>
          Sort order: 
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Filter by keyword: 
          <input 
            type="text" 
            value={filterKeyword} 
            onChange={(e) => setFilterKeyword(e.target.value)} 
          />
        </label>
      </div>
    <button onClick={toggleDarkMode}>🌙 Toggle Dark Mode</button>
        <div>
        <label>
          Sort order: 
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </label>
      </div>

      <h3>Posts (Page {currentPage}):</h3>
      {loadingPosts && <FaSpinner size={24} className="spinner" />}
      {errorPosts && <p>Error: {errorPosts} <button onClick={() => fetchPosts(currentPage, postsPerPage, sortOrder)}>Retry</button></p>}
      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>          
          {posts?.filter(post => post.title.includes(filterKeyword)).map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => setEditingPost(post)}>
                  <FaEdit /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>⬅ Previous</button>
        <button onClick={nextPage}>Next ➡</button>
      </div>

      {selectedPost && (
        <div className="floating-card fade-in">
          <div className="card-content">
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
            <button onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}
      {editingPost && (
        <div className="floating-card fade-in">
          <div className="card-content">
            <EditBook post={editingPost} saveEdit={(data) =>{ updatePost(data); clearEditingPost();}} />

            <button onClick={clearEditingPost}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchComponent;