import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blog/get-specific-blog/${id}`);
        setBlog(response.data.data);
      } catch (error) {
        setError('Error fetching blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <img
          src={`http://localhost:5000/${blog.image}`}
          alt={blog.title}
          className="w-64 h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700">{blog.description}</p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
