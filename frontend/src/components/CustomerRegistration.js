import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CustomerRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const response = await fetch('/api/auth/register/customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message || 'An error occurred. Please try again.');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Customer Registration</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-6 p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
      <div className="mt-4">
        <Link to="/register/admin" className="text-blue-500 hover:underline">
          Admin Registration
        </Link>
        <span> | </span>
        <Link to="/" className="text-blue-500 hover:underline">
          Admin Login
        </Link>
      </div>
    </div>
  );
}

export default CustomerRegistration;