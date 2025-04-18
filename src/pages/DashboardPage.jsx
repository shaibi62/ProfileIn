// src/pages/DashboardPage.jsx
import React from 'react';

const DashboardPage = () => {
  console.log("DashboardPage Minimal Version Rendering"); // Add this line

  return (
    <div style={{ padding: '20px', border: '2px solid green' }}>
      <h1>Dashboard</h1>
      <p>If you see this, the basic Dashboard component and routing are working.</p>
    </div>
  );
};

export default DashboardPage;