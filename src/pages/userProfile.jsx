
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
export default function UserProfile()
{
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const confirmLogout = window.confirm("Are you sure you want to logout?");
            if (!confirmLogout) return;
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return(
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username:</label>
                        <p className="text-gray-900">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
        </div>
    );
}