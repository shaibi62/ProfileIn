// src/pages/admin/Dashboard.jsx
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Analytics</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-100 p-6 rounded shadow">👤 Total Users: 120</div>
          <div className="bg-blue-100 p-6 rounded shadow">📂 Templates: 45</div>
          <div className="bg-yellow-100 p-6 rounded shadow">📈 Visits Today: 325</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
