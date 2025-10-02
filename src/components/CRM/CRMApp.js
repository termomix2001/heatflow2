import React, { useState, useEffect } from 'react';
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
  FaFileInvoice,
  FaMoon,
  FaSun
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Zkontroluj URL parametry při načtení
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  // Načti dark mode preference z localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('crm-dark-mode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Ulož dark mode preference do localStorage
  useEffect(() => {
    localStorage.setItem('crm-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
        return <Dashboard onEditLead={handleEditLead} isDarkMode={isDarkMode} />;
      case 'leads':
        return <LeadsManagement onEditLead={handleEditLead} isDarkMode={isDarkMode} />;
      case 'billing':
        return <Billing isDarkMode={isDarkMode} />;
      case 'performance':
        return <SalesPerformance isDarkMode={isDarkMode} />;
      case 'team':
        return <div className={`p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}><h2 className="text-2xl font-bold">Tým</h2><p>Zde bude správa týmu</p></div>;
      case 'calendar':
        return <CalendarComponent isDarkMode={isDarkMode} />;
      case 'edit-lead':
        return <EditLead onBack={handleBackToLeads} isDarkMode={isDarkMode} />;
      case 'settings':
        return <div className={`p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}><h2 className="text-2xl font-bold">Nastavení</h2><p>Zde budou nastavení</p></div>;
      default:
        return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`flex h-screen w-full crm-container ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`w-64 shadow-2xl flex flex-col flex-shrink-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`flex items-center justify-between h-16 px-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>HeatFlow CRM</span>
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
                    ? isDarkMode 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-primary-100 text-primary-700'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
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
        <div className={`p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-600' : 'bg-primary-100'}`}>
              <FaUser className={isDarkMode ? 'text-white' : 'text-primary-600'} />
            </div>
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.email}</p>
            </div>
          </div>
          
          <div className="flex space-x-2 mb-3">
            <button className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              <FaCog className="inline mr-2" />
              Nastavení
            </button>
            <button
              onClick={handleLogout}
              className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm ${
                isDarkMode 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <FaSignOutAlt className="inline mr-2" />
              Odhlásit
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            <span className="text-sm font-medium">
              {isDarkMode ? 'Světlý režim' : 'Tmavý režim'}
            </span>
          </button>
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
        <div className={`shadow-lg border-b px-6 py-4 flex-shrink-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <FaBars />
              </button>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Vítejte, {currentUser.name}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-primary-600' : 'bg-primary-100'}`}>
                <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-primary-600'}`}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-auto min-h-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
