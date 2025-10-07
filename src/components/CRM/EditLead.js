import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaSave, 
  FaTimes, 
  FaUser, 
  FaBuilding, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaStickyNote,
  FaCheckCircle,
  FaFileInvoice,
  FaHeart,
  FaChartLine,
  FaComments,
  FaFileAlt,
  FaCogs
} from 'react-icons/fa';
import Notification from './Notification';
import useNotification from './useNotification';
import OverviewTab from './tabs/OverviewTab';
import ClientTab from './tabs/ClientTab';
import CommunicationTab from './tabs/CommunicationTab';
import DocumentsTab from './tabs/DocumentsTab';
import ActivitiesTab from './tabs/ActivitiesTab';
import BusinessTab from './tabs/BusinessTab';
import TechnicalTab from './tabs/TechnicalTab';

const EditLead = ({ onBack }) => {
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  
  const [lead, setLead] = useState({
    id: 1,
    orderNumber: 'HF00001',
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
    nextAction: 'Zavolat zítra v 10:00',
    documents: {
      contract: 'signed',
      workContract: 'pending',
      invoice: 'rejected'
    }
  });

  const [formData, setFormData] = useState(lead);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Definice záložek
  const tabs = [
    { id: 'overview', label: 'Přehled', icon: FaChartLine },
    { id: 'client', label: 'Klient', icon: FaUser },
    { id: 'communication', label: 'Komunikace', icon: FaComments },
    { id: 'documents', label: 'Dokumenty', icon: FaFileAlt },
    { id: 'activities', label: 'Aktivity', icon: FaCalendarAlt },
    { id: 'business', label: 'Obchodní', icon: FaDollarSign },
    { id: 'technical', label: 'Technické', icon: FaCogs }
  ];

  const statuses = [
    { value: 'Akvizice', label: 'Akvizice', color: 'bg-blue-100 text-blue-800' },
    { value: 'Schůzka', label: 'Schůzka', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Nabídka', label: 'Nabídka', color: 'bg-orange-100 text-orange-800' },
    { value: 'Energetická studie', label: 'Energetická studie', color: 'bg-purple-100 text-purple-800' },
    { value: 'Uzavřeno', label: 'Uzavřeno', color: 'bg-green-100 text-green-800' }
  ];

  // Funkce pro status dokumentů
  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'signed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <span className="text-gray-400">-</span>;
      case 'rejected':
        return <FaTimes className="text-red-500" />;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'signed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

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
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Upravit zakázku</h1>
                <p className="text-gray-600">Číslo zakázky: {lead.orderNumber}</p>
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

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg mb-6"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {activeTab === 'overview' && <OverviewTab formData={formData} />}
          {activeTab === 'client' && <ClientTab formData={formData} onInputChange={handleInputChange} />}
          {activeTab === 'communication' && <CommunicationTab formData={formData} />}
          {activeTab === 'documents' && <DocumentsTab formData={formData} />}
          {activeTab === 'activities' && <ActivitiesTab formData={formData} />}
          {activeTab === 'business' && <BusinessTab formData={formData} onInputChange={handleInputChange} />}
          {activeTab === 'technical' && <TechnicalTab formData={formData} />}
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
