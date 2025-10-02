import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileInvoice, 
  FaDownload, 
  FaEye, 
  FaSearch, 
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import InvoiceHTML from './InvoiceHTML';

const Billing = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  // Simulace dat - poptávky ve stavu "Nabídka"
  useEffect(() => {
    const mockLeads = [
      {
        id: 1,
        name: 'Jan Novák',
        company: 'Novák s.r.o.',
        email: 'jan.novak@email.cz',
        phone: '+420 123 456 789',
        address: 'Praha 1, Václavské náměstí 1',
        status: 'Nabídka',
        value: 450000,
        date: '2024-01-15',
        description: 'Tepelné čerpadlo pro rodinný dům 150m²',
        salesRep: 'Petr Svoboda'
      },
      {
        id: 2,
        name: 'Marie Svobodová',
        company: 'Svobodová a spol.',
        email: 'marie.svobodova@email.cz',
        phone: '+420 987 654 321',
        address: 'Brno, Masarykova 25',
        status: 'Nabídka',
        value: 320000,
        date: '2024-01-20',
        description: 'Uhlíková infra folie pro kancelářské prostory',
        salesRep: 'Anna Nováková'
      },
      {
        id: 3,
        name: 'Tomáš Dvořák',
        company: 'Dvořák stavební',
        email: 'tomas.dvorak@email.cz',
        phone: '+420 555 123 456',
        address: 'Ostrava, Horní 10',
        status: 'Nabídka',
        value: 680000,
        date: '2024-01-25',
        description: 'Kompletní systém tepelného čerpadla pro výrobní halu',
        salesRep: 'Petr Svoboda'
      }
    ];

    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
    setIsLoading(false);
  }, []);

  // Filtrování podle vyhledávacího termínu
  useEffect(() => {
    const filtered = leads.filter(lead => 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  // Generování PDF faktury
  const generateInvoice = (lead) => {
    // Zobrazí HTML fakturu v modalu nebo novém okně
    setSelectedLead(lead);
  };

  // Zobrazení detailu poptávky
  const viewLeadDetails = (lead) => {
    alert(`Detail poptávky:\n\nJméno: ${lead.name}\nSpolečnost: ${lead.company}\nEmail: ${lead.email}\nTelefon: ${lead.phone}\nAdresa: ${lead.address}\nHodnota: ${lead.value.toLocaleString('cs-CZ')} Kč\nPopis: ${lead.description}\nObchodník: ${lead.salesRep}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <FaFileInvoice className="text-primary-600 text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fakturace</h1>
            <p className="text-gray-600">Poptávky připravené k fakturací</p>
          </div>
        </motion.div>

        {/* Statistiky */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Celkem poptávek</p>
                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaFileInvoice className="text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Celková hodnota</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString('cs-CZ')} Kč
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Průměrná hodnota</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(leads.reduce((sum, lead) => sum + lead.value, 0) / leads.length).toLocaleString('cs-CZ')} Kč
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vyhledávání a filtry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
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
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <FaFilter />
              <span>Filtry</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Seznam poptávek */}
      <div className="grid gap-6">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-gray-600">{lead.company}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaEnvelope />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaPhone />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{lead.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {lead.value.toLocaleString('cs-CZ')} Kč
                    </p>
                    <p className="text-sm text-gray-500">Hodnota poptávky</p>
                    <div className="flex items-center justify-end space-x-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lead.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 mb-4">{lead.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                    <span className="font-medium">Obchodník:</span> {lead.salesRep} | 
                    <span className="font-medium ml-2">Datum:</span> {new Date(lead.date).toLocaleDateString('cs-CZ')}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewLeadDetails(lead)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaEye />
                      <span>Detail</span>
                    </button>
                    <button
                      onClick={() => generateInvoice(lead)}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FaDownload />
                      <span>Generovat fakturu</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FaFileInvoice className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Žádné poptávky k fakturací</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Nebyly nalezeny žádné poptávky odpovídající vašemu vyhledávání.' : 'Momentálně nejsou žádné poptávky ve stavu "Nabídka".'}
          </p>
        </motion.div>
      )}

      {/* Modal pro zobrazení faktury */}
      {selectedLead && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedLead(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#F97316',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
            <InvoiceHTML lead={selectedLead} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
