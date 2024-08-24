import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import CreateBlog from './components/Blogs/CreateBlog';
import BlogList from './components/Blogs/BlogList';
import EditBlog from './components/Blogs/EditBlog';
import LandingPage from './components/LandingPage';
import ViewBlog from './components/Blogs/ViewBlog';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-blog" element={<CreateBlog/>} />
        <Route path="/blogs" element={<BlogList/>} />
        <Route path="/edit-blog/:id" element={<EditBlog/>} />
        <Route path="/blog/:id" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
