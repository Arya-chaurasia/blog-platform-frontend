import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/get-all-blogs"
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blog/delete-blog/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div >
      <Header />
      
      <div className="flex flex-col md:flex-row  items-center justify-center  mt-10 ">
        <div className="  w-[98%]">
          <h2 className="text-2xl font-bold mb-4">Blog List</h2>
          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-4 ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog._id} >
                      <td className="px-6 py-4 lg:whitespace-nowrap text-sm font-medium text-gray-900">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4  text-sm text-gray-500 lg:w-[50rem]  " >
                        {blog.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <img
                          src={`http://localhost:5000/${blog.image}`}
                          alt="Blog"
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 lg:whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/edit-blog/${blog._id}`}
                          className="bg-gray-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-green-600 "
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="bg-gray-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-red-500"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/blog/${blog._id}`}
                          className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-blue-500"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
