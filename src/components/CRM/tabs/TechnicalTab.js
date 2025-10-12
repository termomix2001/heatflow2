import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCogs, 
  FaThermometerHalf, 
  FaHome, 
  FaRuler, 
  FaBolt,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaTools,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

const TechnicalTab = ({ formData }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaCogs className="mr-3 text-primary-600" />
          Technické informace
        </h2>
      </div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaHome className="mr-2 text-primary-600" />
          Přehled projektu
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typ objektu
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="family_house">Rodinný dům</option>
              <option value="apartment">Byt</option>
              <option value="commercial">Komerční objekt</option>
              <option value="industrial">Průmyslový objekt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rozloha vytápění
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="50"
              />
              <span className="text-sm text-gray-500">m²</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typ podlahy
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="concrete">Beton</option>
              <option value="wood">Dřevo</option>
              <option value="tiles">Dlažba</option>
              <option value="laminate">Laminát</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Výška místnosti
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="2.5"
              />
              <span className="text-sm text-gray-500">m</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaThermometerHalf className="mr-2 text-primary-600" />
            Topné parametry
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Požadovaná teplota
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="22"
                />
                <span className="text-sm text-gray-500">°C</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Výkon topení
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="150"
                />
                <span className="text-sm text-gray-500">W/m²</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typ topné folie
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="carbon">Carbon folie</option>
                <option value="infrared">Infračervená folie</option>
                <option value="resistance">Odporová folie</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaBolt className="mr-2 text-primary-600" />
            Elektrické připojení
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Napětí
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="230">230V</option>
                <option value="400">400V</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Příkon
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="7.5"
                />
                <span className="text-sm text-gray-500">kW</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typ připojení
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="direct">Přímé připojení</option>
                <option value="thermostat">Přes termostat</option>
                <option value="smart">Smart řízení</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Installation Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaTools className="mr-2 text-primary-600" />
          Instalační detaily
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Datum instalace
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instalační tým
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="team1">Tým A - Praha</option>
              <option value="team2">Tým B - Brno</option>
              <option value="team3">Tým C - Ostrava</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Odhadovaná doba
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="2"
              />
              <span className="text-sm text-gray-500">dny</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Energy Study */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaFileAlt className="mr-2 text-primary-600" />
          Energetická studie
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaFileAlt className="text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Energetická studie v1.0</p>
                <p className="text-xs text-gray-500">Vytvořeno: 18. ledna 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Dokončeno
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FaCheckCircle />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Úspora energie
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="35"
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Návratnost investice
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="5"
                />
                <span className="text-sm text-gray-500">let</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Installation Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white border border-gray-200 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontrolní seznam instalace</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xs" />
            </div>
            <span className="text-sm text-gray-900">Příprava podkladu</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xs" />
            </div>
            <span className="text-sm text-gray-900">Položení topné folie</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xs" />
            </div>
            <span className="text-sm text-gray-900">Elektrické připojení</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FaClock className="text-gray-400 text-xs" />
            </div>
            <span className="text-sm text-gray-900">Testování systému</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FaClock className="text-gray-400 text-xs" />
            </div>
            <span className="text-sm text-gray-900">Předání zákazníkovi</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalTab;



