import { useState, useCallback } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'info',
    message: ''
  });

  const showNotification = useCallback((type, message, duration = 3000) => {
    setNotification({
      isVisible: true,
      type,
      message
    });

    // Auto-hide after duration
    setTimeout(() => {
      hideNotification();
    }, duration);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  const showSuccess = useCallback((message) => {
    showNotification('success', message);
  }, [showNotification]);

  const showError = useCallback((message) => {
    showNotification('error', message);
  }, [showNotification]);

  const showWarning = useCallback((message) => {
    showNotification('warning', message);
  }, [showNotification]);

  const showInfo = useCallback((message) => {
    showNotification('info', message);
  }, [showNotification]);

  return {
    notification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification
  };
};

export default useNotification;
