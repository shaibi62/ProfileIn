import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts and Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import ScrollToTop from "./components/ScrollToTop";


// Context
import { useAuth } from "./contexts/AuthContext";

// Public Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import TemplatesPage from "./pages/TemplatesPage";
import DashboardPage from "./pages/DashboardPage";
import PortfolioEditPage from "./pages/PortfolioEditPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import ManageTemplates from "./pages/Admin/ManageTemplates.jsx";
import AddTemplate from './pages/Admin/AddTemplate';
import UserProfile  from "./pages/userProfile";
import UserInfoForm from "./pages/userInfoForm";
import { useNavigate } from "react-router-dom";
function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="mt-16"></div>

      <Routes>
        {/* Public/Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/portfolio/edit" element={<PortfolioEditPage />} />
        <Route path="userInfoForm" element={<UserInfoForm />} />

        {/* Admin Routes with layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="templates" element={<ManageTemplates />} />
          <Route path="addtemplate" element={<AddTemplate />} />

        </Route>

        {/* Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
