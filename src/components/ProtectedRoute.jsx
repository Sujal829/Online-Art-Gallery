import React from 'react';
import {  Navigate, useLocation  } from 'react-router-dom';
import {  useAuth  } from '@/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'artist') {
      return <Navigate to="/artist" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
