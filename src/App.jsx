import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/layout/Navbar';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import PortfolioEditPage from './pages/PortfolioEditPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      {/* Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="templates" element={<TemplatesPage />} /> {/* Example public/semi-public */}

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="portfolio/edit"
          element={
            <ProtectedRoute>
              <PortfolioEditPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Not Found Route within Layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Routes without Main Layout (if any) */}
      {/* <Route path="/some-special-page" element={<SpecialPage />} /> */}

    </Routes>
    </>
  );
}

export default App;