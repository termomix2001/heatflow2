import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUsers, 
  FaChartLine, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaCog,
  FaCalendarAlt,
  FaEdit,
  FaFileInvoice
} from 'react-icons/fa';
import Dashboard from './Dashboard';
import LeadsManagement from './LeadsManagement';
import SalesPerformance from './SalesPerformance';
import CalendarComponent from './Calendar';
import EditLead from './EditLead';
import Billing from './Billing';
import Login from './Login';

const CRMApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Zkontroluj URL parametry při načtení
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleEditLead = (lead) => {
    setActiveTab('edit-lead');
  };

  const handleBackToLeads = () => {
    setActiveTab('leads');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome },
    { id: 'leads', label: 'Poptávky', icon: FaUsers },
    { id: 'billing', label: 'Fakturace', icon: FaFileInvoice },
    { id: 'performance', label: 'Výkonnost', icon: FaChartLine },
    { id: 'team', label: 'Tým', icon: FaUsers },
    { id: 'calendar', label: 'Kalendář', icon: FaCalendarAlt },
    { id: 'edit-lead', label: 'Upravit poptávku', icon: FaEdit },
    { id: 'settings', label: 'Nastavení', icon: FaCog }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onEditLead={handleEditLead} />;
      case 'leads':
        return <LeadsManagement onEditLead={handleEditLead} />;
      case 'billing':
        return <Billing />;
      case 'performance':
        return <SalesPerformance />;
      case 'team':
        return <div className="p-6"><h2 className="text-2xl font-bold">Tým</h2><p>Zde bude správa týmu</p></div>;
      case 'calendar':
        return <CalendarComponent />;
      case 'edit-lead':
        return <EditLead onBack={handleBackToLeads} />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Nastavení</h2><p>Zde budou nastavení</p></div>;
      default:
        return <Dashboard />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full crm-container">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-2xl flex flex-col flex-shrink-0">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">HeatFlow CRM</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-8 px-6 flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User info */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <FaUser className="text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              <FaCog className="inline mr-2" />
              Nastavení
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm"
            >
              <FaSignOutAlt className="inline mr-2" />
              Odhlásit
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-lg border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <FaBars />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Vítejte, {currentUser.name}
              </div>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50 min-h-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CRMApp;
