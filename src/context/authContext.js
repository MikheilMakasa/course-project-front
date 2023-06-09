import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { api } from '../constants';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [loading, setLoading] = useState(false);

  const login = async (inputs) => {
    setLoading(true);
    const res = await axios.post(`${api}/auth/login`, inputs, {
      withCredentials: true,
    });
    localStorage.setItem('token', res.data.token);
    setCurrentUser(res.data.user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
