import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';



const userRole = sessionStorage.getItem('rol');

const PrivateRoutes = ({ children }) => {
  const isOwner = userRole === 'Owner';

  return isOwner ? <>{children}</> : <Navigate to="/unauthorized" />;
};

const PublicRoutes = ({ children }) => {
    const isUser = userRole === 'User';

    return isUser ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export { PrivateRoutes, PublicRoutes };