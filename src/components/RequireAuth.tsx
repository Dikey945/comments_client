import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from './Loader';

interface Props {
  children?: React.ReactNode;
}
export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { isChecked, user } = useAuth();
  const location = useLocation();

  if (!isChecked) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return(
    <>
      {children || <Outlet/>}
    </>
  );
};