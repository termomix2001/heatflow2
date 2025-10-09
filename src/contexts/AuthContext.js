import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutWarning, setTimeoutWarning] = useState(false);

  // Načti uživatele z localStorage při startu
  useEffect(() => {
    const savedUser = localStorage.getItem('heatflow-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Session timeout management
  useEffect(() => {
    if (!user) return;

    let timeoutId;
    let warningTimeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      
      // Warning po 25 minutách neaktivity
      warningTimeoutId = setTimeout(() => {
        setTimeoutWarning(true);
      }, 25 * 60 * 1000); // 25 minut

      // Auto logout po 30 minutách neaktivity
      timeoutId = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minut
    };

    // Reset timeout při jakékoliv aktivitě
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('heatflow-user', JSON.stringify(userData));
    setTimeoutWarning(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('heatflow-user');
    setTimeoutWarning(false);
  };

  const extendSession = () => {
    setTimeoutWarning(false);
    // Timeout se resetuje automaticky při další aktivitě
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    timeoutWarning,
    setTimeoutWarning,
    extendSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
