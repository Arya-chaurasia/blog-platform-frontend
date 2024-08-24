import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <nav className="flex items-center space-x-4">
        <Link
          to="/create-blog"
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
        >
          Create Blog
        </Link>
        {user && (
          <img
            src={`http://localhost:5000/${user.profileImage}`}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
        )}
        {/* <Link to="/logout" className="hover:underline">Logout</Link> */}
      </nav>
    </header>
  );
};

export default Header;
