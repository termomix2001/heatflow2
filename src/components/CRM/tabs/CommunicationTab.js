import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaComment,
  FaPaperPlane,
  FaPlus,
  FaEdit,
  FaTrash,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const CommunicationTab = ({ formData }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedType, setSelectedType] = useState('email');

  const [communications, setCommunications] = useState([
    {
      id: 1,
      type: 'email',
      direction: 'outgoing',
      subject: 'Nabídka na topné folie',
      content: 'Dobrý den, zasílám Vám nabídku na topné folie HeatFlow...',
      date: '2024-01-20 14:30',
      status: 'sent',
      from: 'petr@heatflow.cz',
      to: formData.email
    },
    {
      id: 2,
      type: 'phone',
      direction: 'incoming',
      content: 'Klient se ptal na záruku a termín dodání',
      date: '2024-01-19 10:15',
      status: 'completed',
      duration: '15 min'
    },
    {
      id: 3,
      type: 'email',
      direction: 'incoming',
      subject: 'Re: Nabídka na topné folie',
      content: 'Děkuji za nabídku, mám několik otázek...',
      date: '2024-01-20 16:45',
      status: 'read',
      from: formData.email,
      to: 'petr@heatflow.cz'
    },
    {
      id: 4,
      type: 'meeting',
      direction: 'scheduled',
      subject: 'Schůzka - technická konzultace',
      content: 'Naplánována schůzka na 25.1.2024 v 10:00',
      date: '2024-01-18 09:30',
      status: 'scheduled',
      location: 'Kancelář HeatFlow'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <FaEnvelope className="text-blue-500" />;
      case 'phone':
        return <FaPhone className="text-green-500" />;
      case 'meeting':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'note':
        return <FaComment className="text-orange-500" />;
      default:
        return <FaComment className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <FaPaperPlane className="text-blue-500" />;
      case 'read':
        return <FaCheckCircle className="text-green-500" />;
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'scheduled':
        return <FaClock className="text-yellow-500" />;
      case 'failed':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'text-blue-600 bg-blue-50';
      case 'read':
        return 'text-green-600 bg-green-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newComm = {
      id: communications.length + 1,
      type: selectedType,
      direction: 'outgoing',
      content: newMessage,
      date: new Date().toLocaleString('cs-CZ'),
      status: 'sent',
      from: 'petr@heatflow.cz',
      to: formData.email
    };

    setCommunications(prev => [newComm, ...prev]);
    setNewMessage('');
  };

  const handleDelete = (id) => {
    setCommunications(prev => prev.filter(comm => comm.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaComment className="mr-3 text-primary-600" />
          Komunikace
        </h2>
        <div className="flex items-center space-x-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="email">E-mail</option>
            <option value="phone">Telefon</option>
            <option value="meeting">Schůzka</option>
            <option value="note">Poznámka</option>
          </select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
        >
          <FaEnvelope className="text-blue-600" />
          <span className="text-sm font-medium">E-mail</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
        >
          <FaPhone className="text-green-600" />
          <span className="text-sm font-medium">Zavolat</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
        >
          <FaCalendarAlt className="text-purple-600" />
          <span className="text-sm font-medium">Schůzka</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
        >
          <FaComment className="text-orange-600" />
          <span className="text-sm font-medium">Poznámka</span>
        </motion.button>
      </div>

      {/* New Message */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Nová zpráva</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typ komunikace
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="email">E-mail</option>
              <option value="phone">Telefon</option>
              <option value="meeting">Schůzka</option>
              <option value="note">Poznámka</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zpráva
            </label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Napište zprávu..."
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              <span>Odeslat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Communications Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Historie komunikace</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {communications.map((comm, index) => (
            <motion.div
              key={comm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(comm.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {comm.subject || `${comm.type === 'phone' ? 'Telefonní hovor' : 'Zpráva'}`}
                      </h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comm.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(comm.status)}
                          <span>
                            {comm.status === 'sent' ? 'Odesláno' :
                             comm.status === 'read' ? 'Přečteno' :
                             comm.status === 'completed' ? 'Dokončeno' :
                             comm.status === 'scheduled' ? 'Naplánováno' : 'Čeká'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{comm.date}</span>
                      <button
                        onClick={() => handleDelete(comm.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{comm.content}</p>
                  
                  {comm.from && (
                    <div className="text-xs text-gray-500">
                      Od: {comm.from} → {comm.to}
                    </div>
                  )}
                  
                  {comm.duration && (
                    <div className="text-xs text-gray-500">
                      Délka: {comm.duration}
                    </div>
                  )}
                  
                  {comm.location && (
                    <div className="text-xs text-gray-500">
                      Místo: {comm.location}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationTab;
