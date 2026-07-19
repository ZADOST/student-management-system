import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Define the exact blueprint for a User
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
}

// 2. Define the exact blueprint for what the Context provides
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, roleOverride?: string | null) => Promise<void>;
  logout: () => void;
}

// 3. Initialize the Context with the proper Type, allowing it to be null initially
const AuthContext = createContext<AuthContextType | null>(null);

// Define that the AuthProvider wraps around other React children nodes
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, roleOverride: string | null = null) => {
    const mockUser: User = {
      id: 1,
      email: email,
      name: "Demo User",
      role: roleOverride || 'student',
      token: "mock-jwt-token-12345"
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', mockUser.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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