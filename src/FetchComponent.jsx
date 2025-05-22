import React, { useEffect } from "react";
import useStore from "./store";
import { FaSpinner } from "react-icons/fa";
import "./styles.css"; // Import the CSS file


const FetchComponent = () => {
  const { 
    posts, users, 
    loadingPosts, loadingUsers, 
    errorPosts, errorUsers, 
    fetchPosts, fetchUsers, 
    nextPage, prevPage, currentPage, 
    postsPerPage, setPostsPerPage, 
    filterKeyword, setFilterKeyword, 
    sortOrder, setSortOrder 
  } = useStore();

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage, sortOrder);
    fetchUsers();
  }, [postsPerPage, sortOrder]);

  return (
    <div>
      <h2>Fetch Example with Sorting & Filtering</h2>

      <div>
        <label>
          Posts per page: 
          <input 
            type="number" 
            value={postsPerPage} 
            onChange={(e) => setPostsPerPage(Number(e.target.value))} 
            min="1" 
          />
          <button onClick={() => fetchPosts(1, postsPerPage, sortOrder)}>Apply</button>
        </label>
      </div>

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
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>⬅ Previous</button>
        <button onClick={nextPage}>Next ➡</button>
      </div>

      <h3>Users:</h3>
      {loadingUsers && <FaSpinner size={24} className="spinner" />}
      {errorUsers && <p>Error: {errorUsers} <button onClick={fetchUsers}>Retry</button></p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchComponent;