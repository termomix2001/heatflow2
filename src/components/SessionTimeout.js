import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const SessionTimeout = () => {
  const { timeoutWarning, setTimeoutWarning, extendSession, logout } = useAuth();
  const [countdown, setCountdown] = useState(300); // 5 minut
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timeoutWarning) {
      setShowModal(true);
      setCountdown(300);
      
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeoutWarning, logout]);

  const handleExtendSession = () => {
    extendSession();
    setShowModal(false);
    setTimeoutWarning(false);
  };

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FaExclamationTriangle className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Session vyprší
                    </h3>
                    <p className="text-sm text-gray-600">
                      Vaše session vyprší za {formatTime(countdown)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(countdown / 300) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Prodloužit session nebo se odhlásit
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Odhlásit
                </button>
                <button
                  onClick={handleExtendSession}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaClock />
                  <span>Prodloužit</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SessionTimeout;



