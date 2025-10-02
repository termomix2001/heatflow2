import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaTimes, FaUser, FaBuilding, FaEnvelope, FaPhone, FaCalendarAlt, FaDollarSign, FaStickyNote } from 'react-icons/fa';
import Notification from './Notification';
import useNotification from './useNotification';

const EditLead = ({ onBack }) => {
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  
  const [lead, setLead] = useState({
    id: 1,
    name: 'Jan Novák',
    company: 'Novák s.r.o.',
    email: 'jan.novak@email.cz',
    phone: '+420 123 456 789',
    status: 'Akvizice',
    value: 150000,
    date: '2024-01-15',
    salesRep: 'Petr Svoboda',
    notes: 'Zájem o uhlíkové infra folie pro rodinný dům',
    source: 'Webový formulář',
    nextAction: 'Zavolat zítra v 10:00'
  });

  const [formData, setFormData] = useState(lead);
  const [isLoading, setIsLoading] = useState(false);

  const statuses = [
    { value: 'Akvizice', label: 'Akvizice', color: 'bg-blue-100 text-blue-800' },
    { value: 'Schůzka', label: 'Schůzka', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Nabídka', label: 'Nabídka', color: 'bg-orange-100 text-orange-800' },
    { value: 'Energetická studie', label: 'Energetická studie', color: 'bg-purple-100 text-purple-800' },
    { value: 'Uzavřeno', label: 'Uzavřeno', color: 'bg-green-100 text-green-800' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulace uložení s možnou chybou
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulace náhodné chyby (10% šance)
      if (Math.random() < 0.1) {
        throw new Error('Chyba připojení k databázi');
      }
      
      setIsLoading(false);
      showSuccess('Poptávka byla úspěšně uložena!');
      
      // Po 2 sekundách se vrátí zpět
      setTimeout(() => {
        if (onBack) {
          onBack();
        } else {
          window.history.back();
        }
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      showError(`Chyba při ukládání: ${error.message}`);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Opravdu chcete zrušit úpravy?')) {
      if (onBack) {
        onBack();
      } else {
        window.history.back();
      }
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    window.history.back();
                  }
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft />
                <span>Zpět</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Upravit poptávku</h1>
                <p className="text-gray-600">Úprava informací o poptávce</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Zrušit
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Ukládání...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Uložit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Client Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUser className="mr-2 text-primary-600" />
                Informace o klientovi
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Novák s.r.o."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="jan.novak@email.cz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+420 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Business Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaBuilding className="mr-2 text-primary-600" />
                Obchodní informace
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stav poptávky *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hodnota obchodu (Kč) *
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Obchodník
                  </label>
                  <input
                    type="text"
                    value={formData.salesRep}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zdroj
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full Width - Notes and Next Action */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaStickyNote className="mr-2 text-primary-600" />
                  Poznámky
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Zájem o uhlíkové infra folie pro rodinný dům..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-600" />
                  Další akce
                </label>
                <input
                  type="text"
                  name="nextAction"
                  value={formData.nextAction}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Zavolat zítra v 10:00"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Zrušit
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Ukládání...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>Uložit změny</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Notification */}
      <Notification
        isVisible={notification.isVisible}
        type={notification.type}
        message={notification.message}
        onClose={hideNotification}
      />
    </div>
  );
};

export default EditLead;
