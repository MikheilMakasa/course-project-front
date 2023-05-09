import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { api } from '../constants';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [loading, setLoading] = useState(true);

  const login = async (inputs) => {
    const res = await axios.post(`${api}/auth/login`, inputs, {
      withCredentials: 'true',
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${api}/auth/logout`);
    setCurrentUser(null);
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
