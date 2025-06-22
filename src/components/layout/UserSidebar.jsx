import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // make sure this path is correct
import {User,Folder, SquarePen} from "lucide-react";
export default function UserSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  if (!user) {
    navigate("/login"); // Redirect to login if user is not authenticated
    return null; // Prevent rendering the sidebar if user is not authenticated
  }
  const navLinkClass =
    "cursor-pointer p-2 title-font font-medium inline-flex flex-row items-center leading-none tracking-wider rounded-t hover:text-[#6366F1] hover:bg-[#F3F4F6] hover:border-[#6366F1] text-white border-[#3B82F6]";

  const handleLogout = async () => {
    try {
      if (window.confirm("Are you sure you want to logout?")) {
        await logout(); // Call logout from context
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sidebar m-3 rounded-xl w-[250px] flex flex-col items-center bg-[#6366F1] text-white p-4">
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <ul className="flex flex-col space-y-2 mt-8">
        <li className={navLinkClass}>
          <Link to="/userprofile" className="flex flex-row items-center">
           <User className="mr-2"/> User Profile
          </Link>
        </li>
        <li className={navLinkClass}>
          <Link to="/portfolio/edit" className="flex flex-row items-center">
            <SquarePen className="mr-2"/>Edit Portfolio
          </Link>
        </li>
        <li className={navLinkClass}>
          <Link to="/portfolio" className="flex flex-row items-center">
            <Folder className="mr-2"/>Your Portfolios
          </Link>
        </li>
          </ul>
          <Link to="/reset-password" className="m-2 hover:bg-blue-600 hover:text-white px-4 py-2 rounded bg-white text-blue-600 transition w-[150px]">
            Reset Password
          </Link>
        
          <button
            onClick={handleLogout}
            className="m-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 transition w-[150px]"
          >
            Logout
          </button>
       
    </div>
  );
}
