import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const isAuthenticated = Cookies.get('token');
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/');
        }
    },[])
  return (
    isAuthenticated &&
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Welcome to the Admin Dashboard</h2>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;