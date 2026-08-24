import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check if logged-in user exists in localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('eventora_auth_user');
      return savedUser ? JSON.parse(savedUser) : mockUsers[0]; // Default to Student Demo user for instant viva experience
    } catch {
      return mockUsers[0];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('eventora_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('eventora_auth_user');
      }
    } catch (e) {
      console.warn('Auth localStorage error:', e);
    }
  }, [user]);

  /**
   * User login function
   */
  const login = (email, password, role = 'student') => {
    // Check against mock users
    const matched = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (matched) {
      setUser(matched);
      return { success: true, user: matched };
    }

    // Dynamic mock user creation if not found
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: role || 'student',
      college: 'University Campus',
      department: 'Computer Science & Engineering',
      rollNo: `2026-CSE-${Math.floor(100 + Math.random() * 900)}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      interests: ['Technology', 'Music', 'Workshops']
    };

    setUser(newUser);
    return { success: true, user: newUser };
  };

  /**
   * 1-Click Demo Login for Quick Viva Demonstrations
   */
  const quickLogin = (roleType) => {
    const found = mockUsers.find((u) => u.role === roleType) || mockUsers[0];
    setUser(found);
    return found;
  };

  /**
   * Register new student / organizer
   */
  const register = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      interests: userData.interests || ['Technology', 'Music']
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  /**
   * Update Profile info
   */
  const updateProfile = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  /**
   * User logout
   */
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'guest',
        login,
        register,
        quickLogin,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
