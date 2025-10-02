import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaLinkedin, 
  FaInstagram,
  FaArrowUp,
  FaShieldAlt,
  FaAward,
  FaLeaf
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Vzduch-voda tepelná čerpadla', href: '#services' },
      { name: 'Země-voda tepelná čerpadla', href: '#services' },
      { name: 'Servis a údržba', href: '#services' },
      { name: 'Energetické audity', href: '#services' },
      { name: 'Instalace a montáž', href: '#services' },
    ],
    company: [
      { name: 'O nás', href: '#about' },
      { name: 'Realizace', href: '#projects' },
      { name: 'Kariéra', href: '#career' },
      { name: 'Kontakt', href: '#contact' },
      { name: 'Certifikace', href: '#certifications' },
    ],
    support: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Technická podpora', href: '#support' },
      { name: 'Záruční podmínky', href: '#warranty' },
      { name: 'Reklamace', href: '#complaints' },
      { name: 'Dokumentace', href: '#docs' },
      { name: 'CRM Systém', href: '/crm' },
    ]
  };

  const certifications = [
    { icon: FaShieldAlt, text: 'Certifikované instalace' },
    { icon: FaAward, text: 'ISO 9001:2015' },
    { icon: FaLeaf, text: 'Eko-friendly řešení' },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">HeatFlow</h3>
                  <p className="text-gray-400 text-sm">Uhlíkové infra folie</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Více než 15 let zkušeností v oblasti uhlíkových infra folií. 
                Poskytujeme kompletní služby od návrhu až po servis.
              </p>

              {/* Certifications */}
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <cert.icon className="text-primary-400 text-lg" />
                    <span className="text-gray-300 text-sm">{cert.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Služby</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Společnost</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-400" />
                <div>
                  <p className="text-gray-300 text-sm">+420 123 456 789</p>
                  <p className="text-gray-300 text-sm">+420 987 654 321</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400" />
                <div>
                  <p className="text-gray-300 text-sm">info@heatflow.cz</p>
                  <p className="text-gray-300 text-sm">servis@heatflow.cz</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">Václavské náměstí 1</p>
                  <p className="text-gray-300 text-sm">110 00 Praha 1</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold mb-4">Sledujte nás</h5>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                >
                  <FaInstagram />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 HeatFlow. Všechna práva vyhrazena.
              </p>
              <div className="flex space-x-6">
                <a href="#privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Ochrana údajů
                </a>
                <a href="#terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Obchodní podmínky
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                  Cookies
                </a>
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
            >
              <FaArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
