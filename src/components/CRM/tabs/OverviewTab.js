import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFileInvoice,
  FaUser,
  FaBuilding
} from 'react-icons/fa';

const OverviewTab = ({ formData }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Akvizice':
        return <FaPhone className="text-blue-500" />;
      case 'Schůzka':
        return <FaCalendarAlt className="text-yellow-500" />;
      case 'Nabídka':
        return <FaEnvelope className="text-orange-500" />;
      case 'Energetická studie':
        return <FaCheckCircle className="text-purple-500" />;
      case 'Uzavřeno':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaPhone className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Akvizice':
        return 'bg-blue-100 text-blue-800';
      case 'Schůzka':
        return 'bg-yellow-100 text-yellow-800';
      case 'Nabídka':
        return 'bg-orange-100 text-orange-800';
      case 'Energetická studie':
        return 'bg-purple-100 text-purple-800';
      case 'Uzavřeno':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'signed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'rejected':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'signed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Aktuální fáze:</span>
              <div className="flex items-center space-x-2">
                {getStatusIcon(formData.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(formData.status)}`}>
                  {formData.status}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formData.date}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Hodnota zakázky</p>
              <p className="text-2xl font-bold text-gray-900">{formData.value.toLocaleString()} Kč</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaDollarSign className="text-green-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pravděpodobnost</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-blue-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Dny v procesu</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaClock className="text-purple-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rychlé akce</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <FaPhone className="text-blue-600" />
            <span className="text-sm font-medium">Zavolat</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <FaEnvelope className="text-green-600" />
            <span className="text-sm font-medium">E-mail</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <FaCalendarAlt className="text-purple-600" />
            <span className="text-sm font-medium">Schůzka</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <FaFileInvoice className="text-orange-600" />
            <span className="text-sm font-medium">Dokument</span>
          </button>
        </div>
      </div>

      {/* Documents Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stav dokumentů</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaFileInvoice className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Smlouva</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(formData.documents.contract)}`}>
              {getDocumentStatusIcon(formData.documents.contract)}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaFileInvoice className="text-green-500" />
              <span className="text-sm font-medium text-gray-700">Smlouva o dílo</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(formData.documents.workContract)}`}>
              {getDocumentStatusIcon(formData.documents.workContract)}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaFileInvoice className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Faktura</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(formData.documents.invoice)}`}>
              {getDocumentStatusIcon(formData.documents.invoice)}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Poslední aktivity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaEnvelope className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">E-mail odeslán klientovi</p>
              <p className="text-xs text-gray-500">Před 2 hodinami</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaPhone className="text-green-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Telefonní hovor s klientem</p>
              <p className="text-xs text-gray-500">Včera 14:30</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FaCalendarAlt className="text-purple-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Schůzka naplánována</p>
              <p className="text-xs text-gray-500">Před 3 dny</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;



