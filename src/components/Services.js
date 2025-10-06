import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaThermometerHalf, 
  FaWrench, 
  FaShieldAlt, 
  FaChartLine, 
  FaTools, 
  FaHeadset 
} from 'react-icons/fa';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: FaThermometerHalf,
      title: 'Uhlíkové infra folie',
      description: 'Nejmodernější řešení pro podlahové vytápění. Rychlá instalace a okamžitý komfort.',
      features: ['Úspora až 60% nákladů', 'Rychlá instalace', 'Nízké provozní náklady'],
      price: 'od 800 Kč/m²'
    },
    {
      icon: FaWrench,
      title: 'Stropní infra panely',
      description: 'Elegantní řešení pro stropní vytápění s vysokou účinností a moderním designem.',
      features: ['Vysoká účinnost', 'Moderní design', 'Dlouhá životnost'],
      price: 'od 1 200 Kč/m²'
    },
    {
      icon: FaShieldAlt,
      title: 'Servis a údržba',
      description: 'Kompletní servisní služby pro zajištění optimálního výkonu vašich infra systémů.',
      features: ['Pravidelná údržba', '24/7 servis', 'Záruční opravy'],
      price: 'od 500 Kč/rok'
    },
    {
      icon: FaChartLine,
      title: 'Energetické audity',
      description: 'Komplexní analýza energetické náročnosti vašeho domu a doporučení optimalizace.',
      features: ['Detailní analýza', 'Úsporná doporučení', 'Výpočet návratnosti'],
      price: 'od 3 000 Kč'
    },
    {
      icon: FaTools,
      title: 'Instalace a montáž',
      description: 'Profesionální instalace infra systémů s kompletním zapojením a nastavením.',
      features: ['Certifikovaní technici', 'Kompletní montáž', 'Testování systému'],
      price: 'od 5 000 Kč'
    },
    {
      icon: FaHeadset,
      title: 'Poradenství a konzultace',
      description: 'Odborné poradenství při výběru nejvhodnějšího řešení pro váš domov.',
      features: ['Bezplatná konzultace', 'Individuální řešení', 'Výpočet úspor'],
      price: 'Zdarma'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="services" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
          >
            Naše služby
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Kompletní řešení pro{' '}
            <span className="text-primary-500">infra vytápění</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Od návrhu a instalace až po servis a údržbu. Poskytujeme kompletní služby 
            pro uhlíkové infra folie a stropní panely všech typů a velikostí.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                  <service.icon className="text-2xl text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Získat nabídku
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-primary-600 rounded-2xl p-8 lg:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Potřebujete poradit s výběrem?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Naši odborníci vám pomohou vybrat nejvhodnější řešení pro váš domov. 
            Bezplatná konzultace a návštěva na místě.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Zavolat odborníka
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-300"
            >
              Získat katalog
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
