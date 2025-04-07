import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer'; // Optional

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content-area">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      {/* <Footer /> */} {/* Optional Footer */}
    </div>
  );
};

export default MainLayout;