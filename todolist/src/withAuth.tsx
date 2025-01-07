import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const token = localStorage.getItem('Naruto');

    if (!token) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
