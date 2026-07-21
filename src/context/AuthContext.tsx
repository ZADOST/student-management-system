import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Configure Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';

// 1. Define the exact blueprint for a User
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  token?: string;
}

// 2. Define the exact blueprint for what the Context provides
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
}

// 3. Initialize the Context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<string> => {
    try {
      const response = await axios.post('/api/login', { email, password });
      
      const loggedInUser = response.data.user;
      const token = response.data.token;

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return loggedInUser.role; // Return the role so Login.tsx can redirect properly
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Update the custom hook to guarantee it never returns null to your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};