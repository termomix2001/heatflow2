import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaInfo, FaExclamationTriangle } from 'react-icons/fa';

const Notification = ({ isVisible, type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-600" />;
      case 'error':
        return <FaTimes className="text-red-600" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-600" />;
      case 'info':
        return <FaInfo className="text-blue-600" />;
      default:
        return <FaInfo className="text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className={`${getBgColor()} border rounded-lg shadow-lg p-4`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon()}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${getTextColor()}`}>
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
