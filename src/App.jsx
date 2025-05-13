import React from "react";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Import Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import TemplatesPage from "./pages/TemplatesPage";
import PortfolioEditPage from "./pages/PortfolioEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { user, logout, loading } = useAuth(); // Get loading state

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loader
  }

  console.log('User in App:', user);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="mt-20"></div>
      
      <Routes>

        {/* Routes with Main Layout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="/portfolio/edit" element={<PortfolioEditPage />} />
        {/* Catch-all Not Found Route within Layout */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;