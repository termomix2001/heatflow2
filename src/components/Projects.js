import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaMapMarkerAlt, FaHome, FaBuilding } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Všechny projekty', icon: FaHome },
    { id: 'residential', name: 'Rodinné domy', icon: FaHome },
    { id: 'commercial', name: 'Komerční objekty', icon: FaBuilding },
  ];

  const projects = [
    {
      id: 1,
      category: 'residential',
      title: 'Rodinný dům - Praha',
      location: 'Praha 6',
      type: 'Uhlíkové infra folie',
      savings: 'Úspora 60% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Instalace uhlíkových infra folií pro rodinný dům o ploše 150m². Systém zahrnuje podlahové vytápění s okamžitým komfortem.'
    },
    {
      id: 2,
      category: 'residential',
      title: 'Vila - Brno',
      location: 'Brno - Černovice',
      type: 'Stropní infra panely',
      savings: 'Úspora 65% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Elegantní řešení pro vilu s moderními stropními infra panely. Vysoká účinnost a moderní design.'
    },
    {
      id: 3,
      category: 'commercial',
      title: 'Kancelářská budova',
      location: 'Ostrava',
      type: 'Uhlíkové infra folie',
      savings: 'Úspora 55% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Instalace infra folií pro kancelářskou budovu o ploše 800m². Systém zajišťuje komfortní vytápění.'
    },
    {
      id: 4,
      category: 'residential',
      title: 'Rodinný dům - Plzeň',
      location: 'Plzeň - Bolevec',
      type: 'Uhlíkové infra folie',
      savings: 'Úspora 60% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Moderní rodinný dům s uhlíkovými infra foliemi. Rychlá instalace a okamžitý komfort.'
    },
    {
      id: 5,
      category: 'commercial',
      title: 'Výrobní hala',
      location: 'České Budějovice',
      type: 'Stropní infra panely',
      savings: 'Úspora 70% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Velkokapacitní infra panely pro výrobní halu. Systém zajišťuje efektivní vytápění velkých prostor.'
    },
    {
      id: 6,
      category: 'residential',
      title: 'Bytový dům',
      location: 'Hradec Králové',
      type: 'Uhlíkové infra folie',
      savings: 'Úspora 50% nákladů',
      image: '/api/placeholder/400/300',
      description: 'Centrální infra systém pro bytový dům s 24 byty. Systém zahrnuje individuální regulaci pro každý byt.'
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            Naše realizace
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Úspěšné projekty{' '}
            <span className="text-primary-500">po celé ČR</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Podívejte se na naše nejnovější realizace uhlíkových infra folií. 
            Každý projekt je jedinečný a přizpůsobený konkrétním potřebám zákazníka.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              <category.icon className="text-lg" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHome className="text-6xl text-primary-600" />
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                  {project.savings}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <FaMapMarkerAlt />
                  <span>{project.location}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">
                  {project.type}
                </p>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Zobrazit detail</span>
                  <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Chcete podobné řešení?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a my vám připravíme individuální nabídku 
              na míru vašim potřebám.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Získat nabídku
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Prohlédnout všechny projekty
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
