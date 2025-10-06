import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaAward, 
  FaUsers, 
  FaClock, 
  FaShieldAlt, 
  FaLeaf, 
  FaHandshake 
} from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaUsers, number: '500+', label: 'Spokojených zákazníků' },
    { icon: FaClock, number: '15+', label: 'Let zkušeností' },
    { icon: FaAward, number: '50+', label: 'Certifikovaných techniků' },
    { icon: FaLeaf, number: '1000+', label: 'Instalovaných systémů' },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: 'Kvalita a spolehlivost',
      description: 'Používáme pouze osvědčené komponenty od renomovaných výrobců s dlouhodobou zárukou.'
    },
    {
      icon: FaHandshake,
      title: 'Osobní přístup',
      description: 'Každý projekt řešíme individuálně s důrazem na potřeby a požadavky zákazníka.'
    },
    {
      icon: FaLeaf,
      title: 'Eko-friendly řešení',
      description: 'Přispíváme k ochraně životního prostředí instalací energeticky úsporných systémů.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              O společnosti HeatFlow
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Více než 15 let{' '}
              <span className="text-primary-500">zkušeností</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
              HeatFlow je přední česká společnost specializující se na instalaci, 
              servis a údržbu uhlíkových infra folií. Naše zkušenosti a odbornost 
              zaručují nejvyšší kvalitu služeb a spokojenost zákazníků.
            </p>

            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Spolupracujeme s předními výrobci infra systémů a máme 
              certifikované techniky pro všechny typy instalací. Naším cílem 
              je poskytovat energeticky úsporná řešení, která šetří peníze 
              a chrání životní prostředí.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Stats and Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-primary-50 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-primary-600 text-2xl" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <FaAward className="text-6xl text-primary-600 mx-auto mb-4" />
                  <p className="text-primary-700 font-semibold text-lg">Certifikovaní technici</p>
                  <p className="text-primary-600 text-sm">15+ let zkušeností</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Záruka 5 let</p>
                    <p className="text-sm text-gray-600">na všechny instalace</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaLeaf className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Eko-friendly</p>
                    <p className="text-sm text-gray-600">100% obnovitelná energie</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
