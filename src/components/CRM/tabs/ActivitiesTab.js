import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaStickyNote,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaFlag
} from 'react-icons/fa';

const ActivitiesTab = ({ formData }) => {
  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState('');

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'task',
      title: 'Zavolat klientovi',
      description: 'Ověřit zájem o nabídku',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-01-22',
      assignedTo: 'Petr Svoboda',
      createdDate: '2024-01-20'
    },
    {
      id: 2,
      type: 'note',
      title: 'Poznámka z hovoru',
      description: 'Klient se ptal na záruku a termín dodání. Zajímá se o energetickou studii.',
      status: 'completed',
      priority: 'medium',
      createdDate: '2024-01-19',
      createdBy: 'Petr Svoboda'
    },
    {
      id: 3,
      type: 'task',
      title: 'Připravit energetickou studii',
      description: 'Vytvořit studii pro rodinný dům',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-25',
      assignedTo: 'Anna Nováková',
      createdDate: '2024-01-18'
    },
    {
      id: 4,
      type: 'note',
      title: 'E-mail odeslán',
      description: 'Odeslána nabídka s technickými specifikacemi',
      status: 'completed',
      priority: 'low',
      createdDate: '2024-01-17',
      createdBy: 'Petr Svoboda'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'task':
        return <FaCheckCircle className="text-blue-500" />;
      case 'note':
        return <FaStickyNote className="text-orange-500" />;
      case 'call':
        return <FaPhone className="text-green-500" />;
      case 'email':
        return <FaEnvelope className="text-purple-500" />;
      case 'meeting':
        return <FaCalendarAlt className="text-yellow-500" />;
      default:
        return <FaStickyNote className="text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'in_progress':
        return <FaClock className="text-yellow-500" />;
      case 'pending':
        return <FaClock className="text-gray-500" />;
      case 'overdue':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newActivity = {
      id: activities.length + 1,
      type: 'task',
      title: newTask,
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Petr Svoboda',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setActivities(prev => [newActivity, ...prev]);
    setNewTask('');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newActivity = {
      id: activities.length + 1,
      type: 'note',
      title: 'Poznámka',
      description: newNote,
      status: 'completed',
      priority: 'low',
      createdDate: new Date().toISOString().split('T')[0],
      createdBy: 'Petr Svoboda'
    };

    setActivities(prev => [newActivity, ...prev]);
    setNewNote('');
  };

  const handleToggleStatus = (id) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === 'completed' ? 'pending' : 'completed' }
        : activity
    ));
  };

  const handleDelete = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaCalendarAlt className="mr-3 text-primary-600" />
          Aktivity
        </h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Celkem úkolů</p>
              <p className="text-2xl font-bold text-gray-900">{activities.filter(a => a.type === 'task').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-blue-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-500">Dokončené</p>
              <p className="text-2xl font-bold text-green-600">
                {activities.filter(a => a.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-500">V procesu</p>
              <p className="text-2xl font-bold text-yellow-600">
                {activities.filter(a => a.status === 'in_progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Čekající</p>
              <p className="text-2xl font-bold text-gray-600">
                {activities.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FaClock className="text-gray-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add New Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Přidat úkol</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Název úkolu
              </label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Např. Zavolat klientovi"
              />
            </div>
            <button
              onClick={handleAddTask}
              disabled={!newTask.trim()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus />
              <span>Přidat úkol</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Přidat poznámku</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poznámka
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Napište poznámku..."
              />
            </div>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaStickyNote />
              <span>Přidat poznámku</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Seznam aktivit</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(activity.status)}
                          <span>
                            {activity.status === 'completed' ? 'Dokončeno' :
                             activity.status === 'in_progress' ? 'V procesu' :
                             activity.status === 'pending' ? 'Čekající' : 'Pozdě'}
                          </span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                        {activity.priority === 'high' ? 'Vysoká' :
                         activity.priority === 'medium' ? 'Střední' : 'Nízká'}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{activity.createdDate}</span>
                      <button
                        onClick={() => handleToggleStatus(activity.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Označit jako dokončené"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Smazat"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {activity.description && (
                    <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {activity.assignedTo && (
                      <span>Přiřazeno: {activity.assignedTo}</span>
                    )}
                    {activity.createdBy && (
                      <span>Vytvořil: {activity.createdBy}</span>
                    )}
                    {activity.dueDate && (
                      <span>Termín: {activity.dueDate}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTab;
