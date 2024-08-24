import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/get-specific-blog/${id}`);
        console.log(res, "resss")
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setExistingImage(res.data.data.image);
      } catch (err) {
        setMessage('Error fetching blog details.');
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/blog/update-blog/${id}`, formData);
      setMessage('Blog updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Blog Description</label>
          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Blog Image</label>
          {existingImage && (
            <div className="mb-2">
              <img
                src={`http://localhost:5000/${existingImage}`}
                alt="Existing Blog"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          Update Blog
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default EditBlog;
