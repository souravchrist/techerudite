import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CustomerRegistration from './components/CustomerRegistration';
import AdminRegistration from './components/AdminRegistration';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register/customer" element={<CustomerRegistration />} />
        <Route path="/register/admin" element={<AdminRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;