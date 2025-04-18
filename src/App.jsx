import React from "react";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/layout/Navbar";

// Import Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import TemplatesPage from "./pages/TemplatesPage";
import PortfolioEditPage from "./pages/PortfolioEditPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Routes with Main Layout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/templates" element={<TemplatesPage />} />{" "}
        {/* Example public/semi-public */}
        {/* Protected Routes */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="/portfolio/edit" element={<PortfolioEditPage />} />
        {/* Catch-all Not Found Route within Layout */}
        <Route path="*" element={<NotFoundPage />} />
        {/* Routes without Main Layout (if any) */}
        {/* <Route path="/some-special-page" element={<SpecialPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
