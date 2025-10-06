import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaThermometerHalf, FaLeaf, FaEuroSign } from 'react-icons/fa';

const Hero = () => {
  const features = [
    { icon: FaThermometerHalf, text: 'Úspora až 60% nákladů' },
    { icon: FaLeaf, text: 'Eko-friendly řešení' },
    { icon: FaEuroSign, text: 'Rychlá návratnost' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              <FaCheckCircle className="mr-2" />
              Certifikované tepelné čerpadla
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              Moderní uhlíkové{' '}
              <span className="text-primary-500">infra folie</span>
              <br />
              pro váš domov
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed"
            >
              Ušetřete až 60% nákladů na vytápění s našimi vysoce účinnými uhlíkovými infra foliemi. 
              Rychlá instalace, nízké provozní náklady a okamžitý komfort.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <feature.icon className="text-primary-600 text-xl" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Získat bezplatnou nabídku</span>
                <FaArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Prohlédnout realizace
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex items-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>15+ let zkušeností</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ spokojených zákazníků</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main video */}
              <div className="w-full h-[441px] lg:h-[575px] shadow-2xl overflow-hidden rounded-xl bg-black flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/LjiA2Eejrg4?autoplay=1&mute=1&loop=1&playlist=LjiA2Eejrg4&controls=0&showinfo=0&rel=0&modestbranding=1&fs=1&wmode=transparent"
                  title="HeatFlow uhlíkové infra folie"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Úspora 60%</p>
                    <p className="text-sm text-gray-600">nákladů na vytápění</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaEuroSign className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rychlá návratnost</p>
                    <p className="text-sm text-gray-600">3-5 let</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
