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
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [timeoutWarning, setTimeoutWarning] = useState(false);

  // Načti uživatele z localStorage při startu
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('crm_user');
        const sessionExpiry = localStorage.getItem('crm_session_expiry');
        
        if (savedUser && sessionExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(sessionExpiry);
          
          if (now < expiry) {
            // Session je stále platná
            setUser(JSON.parse(savedUser));
            const remainingTime = expiry - now;
            startSessionTimer(remainingTime);
          } else {
            // Session vypršela
            logout();
          }
        }
      } catch (error) {
        console.error('Error loading user session:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Spusť timer pro automatické odhlášení
  const startSessionTimer = (duration = 60 * 60 * 1000) => { // 1 hodina
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    // Upozornění 5 minut před vypršením
    const warningTime = duration - (5 * 60 * 1000);
    if (warningTime > 0) {
      setTimeout(() => {
        setTimeoutWarning(true);
      }, warningTime);
    }

    // Automatické odhlášení
    const timeout = setTimeout(() => {
      logout();
    }, duration);

    setSessionTimeout(timeout);
  };

  // Přihlášení
  const login = (userData) => {
    const expiryTime = new Date().getTime() + (60 * 60 * 1000); // 1 hodina
    
    setUser(userData);
    localStorage.setItem('crm_user', JSON.stringify(userData));
    localStorage.setItem('crm_session_expiry', expiryTime.toString());
    
    startSessionTimer();
    setTimeoutWarning(false);
  };

  // Odhlášení
  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
    localStorage.removeItem('crm_session_expiry');
    
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    
    setTimeoutWarning(false);
  };

  // Prodloužení session
  const extendSession = () => {
    if (user) {
      const expiryTime = new Date().getTime() + (60 * 60 * 1000);
      localStorage.setItem('crm_session_expiry', expiryTime.toString());
      startSessionTimer();
      setTimeoutWarning(false);
    }
  };

  // Kontrola platnosti session
  const isSessionValid = () => {
    const sessionExpiry = localStorage.getItem('crm_session_expiry');
    if (!sessionExpiry) return false;
    
    const now = new Date().getTime();
    const expiry = parseInt(sessionExpiry);
    return now < expiry;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    extendSession,
    isSessionValid,
    timeoutWarning,
    setTimeoutWarning
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
