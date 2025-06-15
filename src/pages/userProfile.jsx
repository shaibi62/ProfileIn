import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import UserSidebar from "../components/layout/UserSidebar";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    await logout();
    navigate("/login");
  };

  const handleAddInfo = () => {
    navigate("/userInfoForm");
  };

  const Baseurl = "http://localhost/Profilein-Backend/";

  const fetchUserData = async () => {
    try {
      if (!user?.id) return;

      const response = await fetch(`${Baseurl}getUserData.php?id=${user.id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setUserData(data.data);
      } else {
        setError(data.error || "Failed to fetch user data.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const renderTable = (title, dataArray) => {
    if (!dataArray?.length) return null;

    return (
      <div className="mb-8 w-full">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">{title}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(dataArray[0]).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b"
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {dataArray.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  {Object.values(item).map((val, i) => (
                    <td
                      key={i}
                      className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-50">
    <UserSidebar /> 
      <div>
        {user && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {user?.name}'s Profile
            </h2>
            <div className="mb-6">
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Username:</span> {user?.name}
              </p>
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
            </div>
          </>
        )}

        {userData?.personalInfo && (
          <div className="mb-8 w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Personal Info
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                <tbody className="bg-white divide-y divide-gray-100">
                  {Object.entries(userData.personalInfo).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 font-medium text-sm text-gray-700 capitalize w-1/3 bg-gray-50 border-r">
                        {key.replace(/_/g, " ")}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {renderTable("Education", userData?.education)}
        {renderTable("Certifications", userData?.certifications)}
        {renderTable("Skills", userData?.skills)}
        {renderTable("Projects", userData?.projects)}

        <button
          onClick={handleAddInfo}
          className="mt-6 bg-[#3B82F6] text-white px-6 py-3 rounded-lg hover:bg-[#6366F1] transition"
        >
          {userData?.personalInfo ? "Edit Info" : "Add Info"}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
