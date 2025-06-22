import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import { handleSuccessToast, handleErrorToast } from '../utils';

const UserPortfolios = () => {
    const [portfolios, setPortfolios] = useState([]);
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
    useEffect(() => {
        axios.get(`http://localhost/Profilein-Backend/UserPortfolios.php?id=${user?.id}`)
            .then(res => {
                if (res.data.success) {
                    setPortfolios(res.data.data);
                } else {
                    handleErrorToast(res.data.message || 'Failed to fetch data');
                }
            })
            .catch(err => {
                console.error(err);
                handleErrorToast('Server error');
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-md rounded p-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">User Portfolios</h2>

                <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-center">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">User</th>
                            <th className="p-3">Template Used</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolios.length > 0 ? (
                            portfolios.map((item, index) => (
                                <tr key={item.prtId} className="border-t text-center">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{item.userName}</td>
                                    <td className="p-3">{item.templateName}</td>
                                    <td className="p-3 space-x-2">
                                        <a
                                            href={item.portfolioLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </a>
                                        <a
                                            href={`http://localhost/Profilein-Backend/download_portfolio.php?file=${item.portfolioLink.split('/').pop()}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        >
                                            Download
                                        </a>


                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">No portfolios found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPortfolios;
