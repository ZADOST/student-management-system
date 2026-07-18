import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 1. If no user is logged in, redirect to login page.
  // We pass the current location in state so we can redirect them back after they log in.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If the user is logged in but their role is not in the allowedRoles array, deny access.
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. User is logged in and has the correct role. Render the child components.
  return <Outlet />;
};

export default ProtectedRoute;