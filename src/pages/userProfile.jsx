
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

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

    const handleAddInfo = () => {
        navigate('/userInfoForm');
    };
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        else{
            document.title = `${user.name}'s Profile`;

            const userData = {
            };

        }
    }
    , [user]);

    return(
        
            <div className="flex flex-row min-h-screen w-full">
                <div className="sidebar m-3 rounded-xl lg:w-1/5 w-1/2 flex flex-col bg-[#6366F1] text-white p-4">
                    <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <Link to="/userprofile" className="text-white hover:text-gray-200">User Profile</Link>
                        </li>
                        <li>
                            <Link to="/templates" className="text-white hover:text-gray-200">Templates</Link>
                        </li>
                        <li>
                            <Link to="/portfolio/edit" className="text-white hover:text-gray-200">Edit Portfolio</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                                Logout
                            </button>
                        </li>
                    </ul>    
                </div>
                <div className="bg-white shadow-md m-3 rounded-lg p-8 w-full border-[#6366F1] border-2 ">
                    <h2 className="text-2xl font-bold mb-6 text-center">{user.name}'s Data</h2>
                    <div className="flex flex-col items-center">
                        <div className="text-lg mb-6">
                            <div>
                                <label className="text-[#111827] inline-block">Username:</label>
                                <p className="text-[#111827] ml-2 inline-block">{user.name}</p>
                            </div>
                            <div>
                                <label className="text-[#111827] inline-block">Email:</label>
                                <p className="text-[#111827] ml-2 inline-block">{user.email}</p>
                            </div>
                            <div>                                
                            </div>
                        </div>
                                <button onClick={handleAddInfo} className="mt-4 bg-[#3B82F6] text-white px-4 py-2 rounded hover:bg-[#6366F1] transition-colors">
                                    Add Info
                                </button>

                    </div>
                    
                    
                </div>
            </div>
            
    );
}