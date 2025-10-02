import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaChartBar, 
  FaUsers, 
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit
} from 'react-icons/fa';

const SalesPerformance = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [salesData, setSalesData] = useState([]);
  const [teamStats, setTeamStats] = useState({});
  const [conversionData, setConversionData] = useState([]);

  const timeRanges = [
    { value: 'week', label: 'Týden' },
    { value: 'month', label: 'Měsíc' },
    { value: 'quarter', label: 'Čtvrtletí' },
    { value: 'year', label: 'Rok' }
  ];

  // Simulace dat
  useEffect(() => {
    setSalesData([
      {
        name: 'Petr Svoboda',
        leads: 45,
        converted: 23,
        revenue: 1200000,
        conversionRate: 51.1,
        avgDealSize: 52174,
        responseTime: 2.5,
        lastActivity: '2024-01-15',
        rank: 1,
        target: 1500000,
        performance: 80
      },
      {
        name: 'Anna Nováková',
        leads: 38,
        converted: 19,
        revenue: 950000,
        conversionRate: 50.0,
        avgDealSize: 50000,
        responseTime: 3.2,
        lastActivity: '2024-01-14',
        rank: 2,
        target: 1200000,
        performance: 79.2
      },
      {
        name: 'Jana Procházková',
        leads: 32,
        converted: 15,
        revenue: 750000,
        conversionRate: 46.9,
        avgDealSize: 50000,
        responseTime: 4.1,
        lastActivity: '2024-01-13',
        rank: 3,
        target: 1000000,
        performance: 75.0
      },
      {
        name: 'Tomáš Dvořák',
        leads: 28,
        converted: 12,
        revenue: 600000,
        conversionRate: 42.9,
        avgDealSize: 50000,
        responseTime: 5.2,
        lastActivity: '2024-01-12',
        rank: 4,
        target: 800000,
        performance: 75.0
      }
    ]);

    setTeamStats({
      totalLeads: 143,
      totalConverted: 69,
      totalRevenue: 3500000,
      avgConversionRate: 48.3,
      avgResponseTime: 3.8,
      topPerformer: 'Petr Svoboda',
      bestMonth: 'Leden 2024'
    });

    setConversionData([
      { phase: 'Akvizice', count: 143, percentage: 100 },
      { phase: 'Schůzka', count: 89, percentage: 62.2 },
      { phase: 'Nabídka', count: 67, percentage: 46.9 },
      { phase: 'Energetická studie', count: 45, percentage: 31.5 },
      { phase: 'Uzavřeno', count: 69, percentage: 48.3 }
    ]);
  }, []);

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-yellow-600';
    if (performance >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceBg = (performance) => {
    if (performance >= 90) return 'bg-green-100';
    if (performance >= 80) return 'bg-yellow-100';
    if (performance >= 70) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Výkonnost týmu</h1>
              <p className="text-gray-600">Přehled výkonnosti obchodních zástupců</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <FaDownload />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Team Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Celkové tržby</p>
                <p className="text-3xl font-bold text-gray-900">
                  {(teamStats.totalRevenue / 1000000).toFixed(1)}M Kč
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-green-600 text-xl" />
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
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Průměrná konverze</p>
                <p className="text-3xl font-bold text-gray-900">{teamStats.avgConversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaChartBar className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowUp className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">+3.2%</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Celkem poptávek</p>
                <p className="text-3xl font-bold text-gray-900">{teamStats.totalLeads}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-purple-600 text-xl" />
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
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Průměrná doba odpovědi</p>
                <p className="text-3xl font-bold text-gray-900">{teamStats.avgResponseTime}h</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <FaArrowDown className="text-green-500 text-sm mr-1" />
              <span className="text-sm text-green-600 font-medium">-0.5h</span>
              <span className="text-sm text-gray-500 ml-2">vs minulý měsíc</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Výkonnost zástupců</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Detailní přehled
              </button>
            </div>
            
            <div className="space-y-4">
              {salesData.map((sales, index) => (
                <motion.div
                  key={sales.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {sales.rank === 1 && <FaTrophy className="text-yellow-500" />}
                        <span className="font-semibold text-gray-900">{sales.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceBg(sales.performance)} ${getPerformanceColor(sales.performance)}`}>
                          {sales.performance}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Cíl: {formatCurrency(sales.target)}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(sales.revenue)} / {formatCurrency(sales.target)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{sales.leads}</p>
                      <p className="text-xs text-gray-600">Poptávky</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{sales.converted}</p>
                      <p className="text-xs text-gray-600">Uzavřeno</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary-600">{sales.conversionRate}%</p>
                      <p className="text-xs text-gray-600">Konverze</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{sales.avgDealSize.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Průměr (Kč)</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(sales.revenue / sales.target) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>Poslední aktivita: {formatDate(sales.lastActivity)}</span>
                    <span>Doba odpovědi: {sales.responseTime}h</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Konverzní trychtýř</h2>
            
            <div className="space-y-4">
              {conversionData.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{phase.phase}</span>
                    <span className="text-sm text-gray-600">{phase.count} ({phase.percentage}%)</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${phase.percentage}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Nejlepší výkonnost</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <FaTrophy className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nejvíce tržeb</h3>
              <p className="text-2xl font-bold text-gray-900">{teamStats.topPerformer}</p>
              <p className="text-sm text-gray-600">{formatCurrency(1200000)}</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <FaChartLine className="text-green-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nejvyšší konverze</h3>
              <p className="text-2xl font-bold text-gray-900">Petr Svoboda</p>
              <p className="text-sm text-gray-600">51.1%</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <FaUsers className="text-blue-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nejvíce poptávek</h3>
              <p className="text-2xl font-bold text-gray-900">Petr Svoboda</p>
              <p className="text-sm text-gray-600">45 poptávek</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesPerformance;
