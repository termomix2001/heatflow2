import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import heatflowLogo from '../heatflowlogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll',  handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Domů', href: '#home' },
    { name: 'Služby', href: '#services' },
    { name: 'O nás', href: '#about' },
    { name: 'Realizace', href: '#projects' },
    { name: 'Srovnání', href: '#heating-comparison' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-white" />
                <span className="text-white">+420 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-white" />
                <span className="text-white">info@heatflow.cz</span>
              </div>
            </div>
            <div className="text-white">
              Pracovní doba: Po-Pá 8:00-16:00
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-gray-900 shadow-sm">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={heatflowLogo} 
                  alt="HeatFlow Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">HeatFlow</h1>
                <p className="text-sm text-gray-300">Uhlíkové infra folie</p>
              </div>
            </motion.div>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-primary-500 font-medium transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/crm'}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              >
                Přihlásit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Získat nabídku
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-gray-800 border-t border-gray-700"
        >
          <div className="container-custom py-4">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20 
                }}
                transition={{ delay: index * 0.1 }}
                className="block py-3 text-gray-300 hover:text-primary-500 font-medium border-b border-gray-700 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20 
              }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                window.location.href = '/crm';
                setIsMenuOpen(false);
              }}
              className="bg-gray-100 text-gray-700 w-full py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Přihlásit
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20 
              }}
              transition={{ delay: 0.5 }}
              className="btn-primary w-full mt-2"
            >
              Získat nabídku
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
