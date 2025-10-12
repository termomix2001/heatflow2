import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileInvoice, 
  FaUpload, 
  FaDownload, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaFilePdf,
  FaFileWord,
  FaFileExcel
} from 'react-icons/fa';

const DocumentsTab = ({ formData }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Smlouva o dodávce',
      type: 'contract',
      status: 'signed',
      size: '2.4 MB',
      date: '2024-01-15',
      fileType: 'pdf'
    },
    {
      id: 2,
      name: 'Smlouva o dílo',
      type: 'work_contract',
      status: 'pending',
      size: '1.8 MB',
      date: '2024-01-16',
      fileType: 'pdf'
    },
    {
      id: 3,
      name: 'Faktura č. 2024-001',
      type: 'invoice',
      status: 'rejected',
      size: '0.9 MB',
      date: '2024-01-17',
      fileType: 'pdf'
    },
    {
      id: 4,
      name: 'Technická specifikace',
      type: 'technical',
      status: 'signed',
      size: '3.2 MB',
      date: '2024-01-18',
      fileType: 'pdf'
    }
  ]);

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
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

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-green-500" />;
      default:
        return <FaFileInvoice className="text-gray-500" />;
    }
  };

  const handleUpload = () => {
    // Zde by se implementovala funkce pro upload souborů
    console.log('Upload document');
  };

  const handleDownload = (document) => {
    // Zde by se implementovala funkce pro stažení souboru
    console.log('Download document:', document.name);
  };

  const handleView = (document) => {
    // Zde by se implementovala funkce pro zobrazení souboru
    console.log('View document:', document.name);
  };

  const handleDelete = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaFileInvoice className="mr-3 text-primary-600" />
          Dokumenty
        </h2>
        <button
          onClick={handleUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FaUpload />
          <span>Nahrát dokument</span>
        </button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Smlouvy</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaFileInvoice className="text-blue-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-500">Faktury</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaFileInvoice className="text-green-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-500">Technické</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaFileInvoice className="text-purple-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-500">Celkem</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FaFileInvoice className="text-gray-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Documents List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Seznam dokumentů</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getFileIcon(document.fileType)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{document.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{document.size}</span>
                      <span className="text-xs text-gray-500">{document.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(document.status)}
                      <span>
                        {document.status === 'signed' ? 'Podepsáno' : 
                         document.status === 'pending' ? 'Čeká' : 'Zamítnuto'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleView(document)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Zobrazit"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Stáhnout"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Smazat"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      >
        <FaUpload className="text-gray-400 text-4xl mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nahrát nový dokument</h3>
        <p className="text-gray-500 mb-4">Přetáhněte soubory sem nebo klikněte pro výběr</p>
        <button
          onClick={handleUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto"
        >
          <FaPlus />
          <span>Vybrat soubory</span>
        </button>
        <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX, XLS, XLSX (max 10MB)</p>
      </motion.div>
    </div>
  );
};

export default DocumentsTab;



