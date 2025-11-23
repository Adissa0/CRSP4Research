import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  canUpload: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // Simulate login
    setUser({
      id: '123',
      name: 'Utilisateur Test',
      email: 'user@una.bj',
      role: role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const canUpload = user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, canUpload }}>
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