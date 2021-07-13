import React, { useEffect, useContext } from 'react';
import axiosInstance from 'src/services/axios-instance';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext, emptyUser } from 'src/contexts/current-user-context';

export default function SignUp() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  console.log('currrr Logout', currentUser);
  useEffect(() => {
    axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    axiosInstance.defaults.headers.Authorization = null;
    setCurrentUser(emptyUser);
  });
  return <Navigate to="/login" />;
}
