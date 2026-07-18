import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial load, check if we have a user stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function: In a real app, this takes credentials, calls your API, 
  // gets a JWT, and then sets the user state.
  const login = async (email, password, roleOverride = null) => {
    // MOCK API CALL
    // In production: const response = await axios.post('/api/login', { email, password });
    
    const mockUser = {
      id: 1,
      email: email,
      name: "Demo User", // Simulated dynamic data
      role: roleOverride || 'student', // Admin, teacher, or student
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

// Custom hook for easier importing in other components
export const useAuth = () => useContext(AuthContext);