import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaFileInvoice
} from 'react-icons/fa';
import Notification from './Notification';
import useNotification from './useNotification';

const LeadsManagement = ({ onEditLead }) => {
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

  const statuses = [
    { value: 'all', label: 'Všechny', color: 'bg-gray-100 text-gray-800' },
    { value: 'Akvizice', label: 'Akvizice', color: 'bg-blue-100 text-blue-800' },
    { value: 'Schůzka', label: 'Schůzka', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Nabídka', label: 'Nabídka', color: 'bg-orange-100 text-orange-800' },
    { value: 'Energetická studie', label: 'Energetická studie', color: 'bg-purple-100 text-purple-800' },
    { value: 'Uzavřeno', label: 'Uzavřeno', color: 'bg-green-100 text-green-800' }
  ];

  const phases = [
    { id: 1, name: 'Akvizice', description: 'První kontakt s klientem', icon: FaPhone },
    { id: 2, name: 'Schůzka', description: 'Schůzka s klientem', icon: FaCalendarAlt },
    { id: 3, name: 'Nabídka', description: 'Příprava a odeslání nabídky', icon: FaEnvelope },
    { id: 4, name: 'Energetická studie', description: 'Volitelná energetická studie', icon: FaCheckCircle }
  ];

  // Generování čísla zakázky
  const generateOrderNumber = (id) => {
    return `HF${String(id).padStart(5, '0')}`;
  };

  // Simulace dat
  useEffect(() => {
    const mockLeads = [
      {
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
          contract: 'signed', // signed, pending, rejected
          workContract: 'pending',
          invoice: 'rejected'
        }
      },
      {
        id: 2,
        orderNumber: 'HF00002',
        name: 'Marie Svobodová',
        company: 'Svobodová a.s.',
        email: 'marie.svobodova@email.cz',
        phone: '+420 987 654 321',
        status: 'Schůzka',
        value: 200000,
        date: '2024-01-14',
        salesRep: 'Anna Nováková',
        notes: 'Schůzka naplánována na 20.1.2024',
        source: 'Doporučení',
        nextAction: 'Připravit prezentaci',
        documents: {
          contract: 'pending',
          workContract: 'pending',
          invoice: 'pending'
        }
      },
      {
        id: 3,
        orderNumber: 'HF00003',
        name: 'Tomáš Dvořák',
        company: 'Dvořák s.r.o.',
        email: 'tomas.dvorak@email.cz',
        phone: '+420 555 666 777',
        status: 'Nabídka',
        value: 180000,
        date: '2024-01-13',
        salesRep: 'Petr Svoboda',
        notes: 'Nabídka odeslána, čekáme na odpověď',
        source: 'Webový formulář',
        nextAction: 'Sledovat stav nabídky',
        documents: {
          contract: 'signed',
          workContract: 'signed',
          invoice: 'pending'
        }
      },
      {
        id: 4,
        orderNumber: 'HF00004',
        name: 'Jana Procházková',
        company: 'Procházková s.r.o.',
        email: 'jana.prochazkova@email.cz',
        phone: '+420 111 222 333',
        status: 'Energetická studie',
        value: 250000,
        date: '2024-01-12',
        salesRep: 'Anna Nováková',
        notes: 'Energetická studie v procesu',
        source: 'Telefonický kontakt',
        nextAction: 'Dokončit studii',
        documents: {
          contract: 'signed',
          workContract: 'signed',
          invoice: 'signed'
        }
      },
      {
        id: 5,
        orderNumber: 'HF00005',
        name: 'Pavel Hruška',
        company: 'Hruška a.s.',
        email: 'pavel.hruska@email.cz',
        phone: '+420 444 555 666',
        status: 'Uzavřeno',
        value: 300000,
        date: '2024-01-10',
        salesRep: 'Jana Procházková',
        notes: 'Obchod úspěšně uzavřen',
        source: 'Webový formulář',
        nextAction: 'Instalace naplánována',
        documents: {
          contract: 'signed',
          workContract: 'signed',
          invoice: 'signed'
        }
      }
    ];
    
    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
  }, []);

  // Filtrování a vyhledávání
  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Akvizice': return <FaPhone className="text-blue-600" />;
      case 'Schůzka': return <FaCalendarAlt className="text-yellow-600" />;
      case 'Nabídka': return <FaEnvelope className="text-orange-600" />;
      case 'Energetická studie': return <FaCheckCircle className="text-purple-600" />;
      case 'Uzavřeno': return <FaCheckCircle className="text-green-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const handleEditLead = (lead) => {
    if (onEditLead) {
      onEditLead(lead);
    } else {
      // Fallback - přesměruj na samostatnou stránku pro úpravu
      const currentUrl = new URL(window.location);
      currentUrl.searchParams.set('tab', 'edit-lead');
      window.history.pushState({}, '', currentUrl);
      window.location.reload();
    }
  };

  const handleSaveEdit = () => {
    try {
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id ? { ...lead, ...editForm } : lead
      ));
      setEditMode(false);
      setShowModal(false);
      setEditForm({});
      showSuccess('Poptávka byla úspěšně upravena!');
    } catch (error) {
      showError(`Chyba při ukládání: ${error.message}`);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditForm({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

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

  return (
    <div className="h-full p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Správa poptávek</h1>
          <p className="text-gray-600">Spravujte všechny poptávky a jejich fáze</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Vyhledat podle jména, firmy nebo emailu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              
              <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                <FaPlus />
                <span>Nová poptávka</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Číslo zakázky
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontakt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stav
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hodnota
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Obchodník
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akce
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">
                        {lead.orderNumber}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-primary-600 font-semibold">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.company}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(lead.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.value.toLocaleString()} Kč
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.salesRep}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(lead.date)}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            console.log('Opening modal for lead:', lead);
                            setSelectedLead(lead);
                            setEditMode(false);
                            setShowModal(true);
                            console.log('Modal state:', showModal);
                          }}
                          className="text-primary-600 hover:text-primary-900 p-2"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEditLead(lead)}
                          className="text-gray-600 hover:text-gray-900 p-2"
                        >
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Lead Detail Modal */}
        {showModal && selectedLead && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowModal(false);
              setEditMode(false);
            }}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editMode ? 'Upravit poptávku' : 'Detail poptávky'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Číslo zakázky: {selectedLead.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditMode(false);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Status Bar */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Aktuální fáze:</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedLead.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedLead.date}
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dokumenty</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaFileInvoice className="text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Smlouva</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedLead.documents.contract)}`}>
                        {getDocumentStatusIcon(selectedLead.documents.contract)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaFileInvoice className="text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Smlouva o dílo</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedLead.documents.workContract)}`}>
                        {getDocumentStatusIcon(selectedLead.documents.workContract)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaFileInvoice className="text-purple-500" />
                        <span className="text-sm font-medium text-gray-700">Faktura</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(selectedLead.documents.invoice)}`}>
                        {getDocumentStatusIcon(selectedLead.documents.invoice)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informace o klientovi</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Jméno</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{selectedLead.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Firma</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editForm.company}
                            onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{selectedLead.company}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        {editMode ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{selectedLead.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Telefon</label>
                        {editMode ? (
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{selectedLead.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Obchodní informace</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Stav</label>
                        {editMode ? (
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {statuses.filter(s => s.value !== 'all').map(status => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(selectedLead.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                              {selectedLead.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Hodnota</label>
                        {editMode ? (
                          <input
                            type="number"
                            value={editForm.value}
                            onChange={(e) => setEditForm({...editForm, value: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-semibold">{selectedLead.value.toLocaleString()} Kč</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Obchodník</label>
                        <p className="text-gray-900">{selectedLead.salesRep}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Zdroj</label>
                        <p className="text-gray-900">{selectedLead.source}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Poznámky</h3>
                  {editMode ? (
                    <textarea
                      value={editForm.notes}
                      onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.notes}</p>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Další akce</h3>
                  {editMode ? (
                    <input
                      type="text"
                      value={editForm.nextAction}
                      onChange={(e) => setEditForm({...editForm, nextAction: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      {selectedLead.nextAction}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  {editMode ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Zrušit
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Uložit
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Zavřít
                      </button>
                      <button
                        onClick={() => handleEditLead(selectedLead)}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Upravit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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

export default LeadsManagement;
