import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '@/data/users.json';

const AuthContext = createContext(undefined);

/**
 * @type {React.FC<{children: React.ReactNode}>}
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('artgallery_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const foundUser = usersData.users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('artgallery_user', JSON.stringify(foundUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('artgallery_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
