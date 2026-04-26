import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, username: decoded.username });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          logout(); // token expired
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, { username, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: res.data.error };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/register`, { username, password });
      if (res.data.success) {
        return { success: true };
      }
      return { success: false, error: res.data.error };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return { user, login, register, logout, isLoading };
};