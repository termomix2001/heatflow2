import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaBuilding, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHistory,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const ClientTab = ({ formData, onInputChange }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState(formData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(formData);
  };

  const handleSave = () => {
    // Zde by se volala funkce pro uložení dat
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaUser className="mr-3 text-primary-600" />
          Informace o klientovi
        </h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FaEdit />
            <span>Upravit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors"
            >
              <FaTimes />
              <span>Zrušit</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaSave />
              <span>Uložit</span>
            </button>
          </div>
        )}
      </div>

      {/* Client Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaUser className="mr-2 text-primary-600" />
            Osobní údaje
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jméno a příjmení
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-400" />
                  <a href={`mailto:${formData.email}`} className="text-primary-600 hover:text-primary-700">
                    {formData.email}
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-400" />
                  <a href={`tel:${formData.phone}`} className="text-primary-600 hover:text-primary-700">
                    {formData.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaBuilding className="mr-2 text-primary-600" />
            Firemní údaje
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Firma
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={editData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IČO
              </label>
              <p className="text-gray-900">12345678</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresa
              </label>
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <p className="text-gray-900">Václavské náměstí 1<br />110 00 Praha 1</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Client History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaHistory className="mr-2 text-primary-600" />
          Historie s klientem
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">První kontakt</p>
              <p className="text-xs text-gray-500">15. ledna 2024 - Webový formulář</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaPhone className="text-green-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Telefonní hovor</p>
              <p className="text-xs text-gray-500">16. ledna 2024 - 14:30</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-purple-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">E-mailová komunikace</p>
              <p className="text-xs text-gray-500">17. ledna 2024 - Nabídka odeslána</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Previous Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Předchozí zakázky</h3>
        
        <div className="text-center py-8">
          <FaHistory className="text-gray-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-500">Žádné předchozí zakázky</p>
          <p className="text-sm text-gray-400">Toto je první zakázka s tímto klientem</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientTab;



