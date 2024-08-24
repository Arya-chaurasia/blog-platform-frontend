import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res?.data?.blogs);
      } catch (err) {
        setMessage('Error fetching blogs');
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-blog/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setMessage('Blog deleted successfully!');
    } catch (err) {
      setMessage('Error deleting blog');
    }
  };

  return (
    <div>
      <h2>Blog List</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog?._id}>
              <td>{blog?.title}</td>
              <td>{blog?.description}</td>
              <td><img src={`http://localhost:5000/${blog?.image}`} alt={blog?.title} style={{ width: '100px' }} /></td>
              <td>
                <Link to={`/edit-blog/${blog?._id}`}>Edit</Link>
                <button onClick={() => handleDelete(blog?._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
