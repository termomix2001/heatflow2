import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaChartLine, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

const Dashboard = ({ onEditLead, isDarkMode = false }) => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    monthlyRevenue: 0
  });

  const [recentLeads, setRecentLeads] = useState([]);
  const [salesPerformance, setSalesPerformance] = useState([]);

  // Simulace dat - v reálné aplikaci by se načítaly z API
  useEffect(() => {
    setStats({
      totalLeads: 156,
      activeLeads: 23,
      convertedLeads: 89,
      monthlyRevenue: 2450000
    });

    setRecentLeads([
      {
        id: 1,
        name: 'Jan Novák',
        company: 'Novák s.r.o.',
        email: 'jan.novak@email.cz',
        phone: '+420 123 456 789',
        status: 'Akvizice',
        value: 150000,
        date: '2024-01-15',
        salesRep: 'Petr Svoboda'
      },
      {
        id: 2,
        name: 'Marie Svobodová',
        company: 'Svobodová a.s.',
        email: 'marie.svobodova@email.cz',
        phone: '+420 987 654 321',
        status: 'Schůzka',
        value: 200000,
        date: '2024-01-14',
        salesRep: 'Anna Nováková'
      },
      {
        id: 3,
        name: 'Tomáš Dvořák',
        company: 'Dvořák s.r.o.',
        email: 'tomas.dvorak@email.cz',
        phone: '+420 555 666 777',
        status: 'Nabídka',
        value: 180000,
        date: '2024-01-13',
        salesRep: 'Petr Svoboda'
      }
    ]);

    setSalesPerformance([
      {
        name: 'Petr Svoboda',
        leads: 45,
        converted: 23,
        revenue: 1200000,
        conversionRate: 51.1
      },
      {
        name: 'Anna Nováková',
        leads: 38,
        converted: 19,
        revenue: 950000,
        conversionRate: 50.0
      },
      {
        name: 'Jana Procházková',
        leads: 32,
        converted: 15,
        revenue: 750000,
        conversionRate: 46.9
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Akvizice': return 'bg-blue-100 text-blue-800';
      case 'Schůzka': return 'bg-yellow-100 text-yellow-800';
      case 'Nabídka': return 'bg-orange-100 text-orange-800';
      case 'Energetická studie': return 'bg-purple-100 text-purple-800';
      case 'Uzavřeno': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Akvizice': return <FaClock className="text-blue-600" />;
      case 'Schůzka': return <FaCalendarAlt className="text-yellow-600" />;
      case 'Nabídka': return <FaEnvelope className="text-orange-600" />;
      case 'Energetická studie': return <FaChartLine className="text-purple-600" />;
      case 'Uzavřeno': return <FaCheckCircle className="text-green-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="h-full p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CRM Dashboard</h1>
          <p className="text-gray-600">Přehled poptávek a výkonnosti obchodního týmu</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Celkem poptávek</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalLeads}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">+12%</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktivní poptávky</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.activeLeads}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-yellow-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">+8%</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uzavřené obchody</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.convertedLeads}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">+15%</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Měsíční tržby</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(stats.monthlyRevenue / 1000000).toFixed(1)}M Kč
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">+22%</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nejnovější poptávky</h2>
              <button 
                onClick={() => window.location.href = '/crm?tab=leads'}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Zobrazit všechny
              </button>
            </div>
            
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.company}</p>
                      <p className="text-sm text-gray-500">{lead.salesRep}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lead.value.toLocaleString()} Kč
                      </p>
                      <p className="text-sm text-gray-500">{lead.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => {
                            alert(`Detail poptávky:\n\nJméno: ${lead.name}\nFirma: ${lead.company}\nEmail: ${lead.email}\nTelefon: ${lead.phone}\nStav: ${lead.status}\nHodnota: ${lead.value.toLocaleString()} Kč\nPoznámky: ${lead.notes}`);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => {
                            if (onEditLead) {
                              onEditLead(lead);
                            } else {
                              window.location.href = '/crm?tab=edit-lead';
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sales Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Výkonnost týmu</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Detailní přehled
              </button>
            </div>
            
            <div className="space-y-4">
              {salesPerformance.map((sales, index) => (
                <motion.div
                  key={sales.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sales.name}</h3>
                    <span className="text-sm text-gray-500">
                      {sales.conversionRate}% konverze
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sales.leads}</p>
                      <p className="text-sm text-gray-600">Poptávky</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{sales.converted}</p>
                      <p className="text-sm text-gray-600">Uzavřeno</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary-600">
                        {(sales.revenue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-gray-600">Tržby (Kč)</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${sales.conversionRate}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
