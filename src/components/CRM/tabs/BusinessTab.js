import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDollarSign, 
  FaChartLine, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaPercent
} from 'react-icons/fa';

const BusinessTab = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaDollarSign className="mr-3 text-primary-600" />
          Obchodní informace
        </h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Hodnota zakázky</p>
              <p className="text-3xl font-bold text-gray-900">{formData.value.toLocaleString()} Kč</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FaDollarSign className="text-green-600 text-2xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pravděpodobnost</p>
              <p className="text-3xl font-bold text-gray-900">75%</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FaPercent className="text-blue-600 text-2xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Očekávaný zisk</p>
              <p className="text-3xl font-bold text-gray-900">45,000 Kč</p>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <FaChartLine className="text-purple-600 text-2xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Business Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaUser className="mr-2 text-primary-600" />
            Obchodní údaje
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Obchodník
              </label>
              <p className="text-gray-900">{formData.salesRep}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zdroj zakázky
              </label>
              <p className="text-gray-900">{formData.source}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Datum vytvoření
              </label>
              <p className="text-gray-900">{formData.date}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Očekávané uzavření
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                defaultValue="2024-02-15"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaChartLine className="mr-2 text-primary-600" />
            Analýza zakázky
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pravděpodobnost uzavření
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priorita zakázky
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="high">Vysoká</option>
                <option value="medium" selected>Střední</option>
                <option value="low">Nízká</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konkurence
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Např. ABC Heating, XYZ Systems"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risks and Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-red-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-600" />
            Rizika
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaExclamationTriangle className="text-red-600 text-xs" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Rozpočet klienta</p>
                <p className="text-xs text-gray-500">Klient má omezený rozpočet, může být problém s cenou</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaClock className="text-yellow-600 text-xs" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Termín realizace</p>
                <p className="text-xs text-gray-500">Klient potřebuje rychlou realizaci</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-green-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaCheckCircle className="mr-2 text-green-600" />
            Příležitosti
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaCheckCircle className="text-green-600 text-xs" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dlouhodobá spolupráce</p>
                <p className="text-xs text-gray-500">Klient má další projekty v plánu</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaBuilding className="text-blue-600 text-xs" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Referenční projekt</p>
                <p className="text-xs text-gray-500">Možnost získat další zakázky v okolí</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-primary-600" />
          Další kroky
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Připravit energetickou studii</p>
              <p className="text-xs text-gray-500">Termín: 25. ledna 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaClock className="text-yellow-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Schůzka s klientem</p>
              <p className="text-xs text-gray-500">Termín: 30. ledna 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FaClock className="text-gray-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Finální nabídka</p>
              <p className="text-xs text-gray-500">Termín: 5. února 2024</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessTab;



