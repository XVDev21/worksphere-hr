import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('ws_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'Admin User',
      email,
      role: 'admin',
      department: 'Management',
      phone: '+1 (555) 000-0000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    };
    setUser(mockUser);
    localStorage.setItem('ws_user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, _password: string) => {
    // Mock register
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'employee',
      department: 'Engineering',
      phone: '+1 (555) 000-0000',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    setUser(mockUser);
    localStorage.setItem('ws_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ws_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('ws_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
