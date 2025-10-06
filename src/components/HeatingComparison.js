import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaThermometerHalf, 
  FaEuroSign, 
  FaClock, 
  FaShieldAlt, 
  FaLeaf, 
  FaCheckCircle,
  FaTimes,
  FaCalculator,
  FaChartLine,
  FaHeart,
  FaExclamationTriangle
} from 'react-icons/fa';

const HeatingComparison = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [roomSize, setRoomSize] = useState(50);
  const [heatingHours, setHeatingHours] = useState(8);
  const [electricityPrice, setElectricityPrice] = useState(4.5);

  const heatingTypes = [
    {
      id: 'heatflow',
      name: 'HeatFlow uhlíkové folie',
      icon: FaThermometerHalf,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      installationCost: 800,
      efficiency: 0.95,
      lifespan: 25,
      maintenance: 0,
      healthImpact: 'excellent',
      pros: [
        'Okamžitý komfort - teplo za 2-3 minuty',
        'Úspora až 60% nákladů na vytápění',
        'Zdravé infračervené záření',
        'Rychlá a snadná instalace',
        'Žádná údržba po dobu 25 let',
        'Ekologické řešení',
        'Individuální regulace pro každou místnost'
      ],
      cons: [
        'Vyšší počáteční investice',
        'Vyžaduje kvalitní izolaci'
      ]
    },
    {
      id: 'cables',
      name: 'Topné kabely',
      icon: FaThermometerHalf,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      installationCost: 600,
      efficiency: 0.85,
      lifespan: 15,
      maintenance: 200,
      healthImpact: 'good',
      pros: [
        'Nižší počáteční investice',
        'Dobře zavedená technologie',
        'Dlouhá životnost',
        'Rovnoměrné vytápění'
      ],
      cons: [
        'Pomalé zahřívání (30-60 minut)',
        'Vyšší spotřeba energie',
        'Vyžaduje údržbu',
        'Omezená flexibilita',
        'Vyšší provozní náklady'
      ]
    },
    {
      id: 'mats',
      name: 'Topné rohože',
      icon: FaThermometerHalf,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      installationCost: 700,
      efficiency: 0.80,
      lifespan: 12,
      maintenance: 300,
      healthImpact: 'good',
      pros: [
        'Střední investiční náklady',
        'Rychlejší instalace než kabely',
        'Dobrá účinnost',
        'Vhodné pro menší prostory'
      ],
      cons: [
        'Kratší životnost',
        'Vyšší provozní náklady',
        'Omezená flexibilita',
        'Vyžaduje pravidelnou údržbu',
        'Pomalé zahřívání'
      ]
    },
    {
      id: 'water',
      name: 'Teplovodní podlahové topení',
      icon: FaThermometerHalf,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      installationCost: 1200,
      efficiency: 0.75,
      lifespan: 20,
      maintenance: 500,
      healthImpact: 'good',
      pros: [
        'Tradiční a osvědčené řešení',
        'Dobrá účinnost při správném návrhu',
        'Dlouhá životnost',
        'Vhodné pro velké prostory'
      ],
      cons: [
        'Nejvyšší investiční náklady',
        'Nejpomalejší zahřívání (2-4 hodiny)',
        'Vyžaduje kotel a rozvody',
        'Složitá instalace',
        'Vyšší údržba a servis',
        'Omezená flexibilita regulace',
        'Riziko úniků vody'
      ]
    }
  ];

  const calculateCosts = (heatingType) => {
    const dailyConsumption = (roomSize * heatingHours * 100) / heatingType.efficiency;
    const dailyCost = (dailyConsumption / 1000) * electricityPrice;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = monthlyCost * 12;
    const totalInstallationCost = roomSize * heatingType.installationCost;
    const yearlyMaintenance = heatingType.maintenance;
    const totalYearlyCost = yearlyCost + yearlyMaintenance;
    
    return {
      dailyCost: Math.round(dailyCost),
      monthlyCost: Math.round(monthlyCost),
      yearlyCost: Math.round(yearlyCost),
      totalInstallationCost: Math.round(totalInstallationCost),
      yearlyMaintenance: Math.round(yearlyMaintenance),
      totalYearlyCost: Math.round(totalYearlyCost),
      paybackPeriod: Math.round(totalInstallationCost / (yearlyCost + yearlyMaintenance))
    };
  };

  const getHealthImpactText = (impact) => {
    switch (impact) {
      case 'excellent': return 'Výborný - infračervené záření prospívá zdraví';
      case 'good': return 'Dobrý - standardní vytápění';
      default: return 'Průměrný';
    }
  };

  const getHealthImpactColor = (impact) => {
    switch (impact) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const sortedHeatingTypes = [...heatingTypes].sort((a, b) => {
    const costsA = calculateCosts(a);
    const costsB = calculateCosts(b);
    return costsA.totalYearlyCost - costsB.totalYearlyCost;
  });

  return (
    <section id="heating-comparison" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <FaCalculator className="mr-2" />
            Srovnávací kalkulačka vytápění
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Porovnejte si{' '}
            <span className="text-primary-500">různé typy vytápění</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Zjistěte, které řešení je pro vás nejvýhodnější. Porovnejte náklady, 
            účinnost a zdravotní benefity různých typů vytápění.
          </p>
        </motion.div>

        {/* Input Parameters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaChartLine className="mr-3 text-primary-600" />
            Parametry pro výpočet
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Velikost místnosti (m²)
              </label>
              <input
                type="number"
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="10"
                max="200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doba vytápění (hodin/den)
              </label>
              <input
                type="number"
                value={heatingHours}
                onChange={(e) => setHeatingHours(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
                max="24"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cena elektřiny (Kč/kWh)
              </label>
              <input
                type="number"
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
                max="10"
                step="0.1"
              />
            </div>
          </div>
        </motion.div>

        {/* Comparison Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sortedHeatingTypes.map((heating, index) => {
            const costs = calculateCosts(heating);
            const isHeatFlow = heating.id === 'heatflow';
            
            return (
              <motion.div
                key={heating.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isHeatFlow 
                    ? 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${heating.bgColor}`}>
                      <heating.icon className={`text-2xl ${heating.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isHeatFlow ? 'text-orange-800' : 'text-gray-900'}`}>
                        {heating.name}
                      </h3>
                      {isHeatFlow && (
                        <div className="flex items-center text-orange-600 text-sm font-medium">
                          <FaCheckCircle className="mr-1" />
                          Doporučeno
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isHeatFlow && (
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Nejvýhodnější
                    </div>
                  )}
                </div>

                {/* Cost Summary */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Instalace</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {costs.totalInstallationCost.toLocaleString()} Kč
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Roční náklady</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {costs.totalYearlyCost.toLocaleString()} Kč
                    </div>
                  </div>
                </div>

                {/* Detailed Costs */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Denní spotřeba:</span>
                    <span className="font-semibold">{costs.dailyCost} Kč</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Měsíční náklady:</span>
                    <span className="font-semibold">{costs.monthlyCost} Kč</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Údržba/rok:</span>
                    <span className="font-semibold">{costs.yearlyMaintenance} Kč</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Návratnost:</span>
                    <span className="font-semibold">{costs.paybackPeriod} let</span>
                  </div>
                </div>

                {/* Health Impact */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6 ${getHealthImpactColor(heating.healthImpact)}`}>
                  <FaHeart className="mr-2" />
                  {getHealthImpactText(heating.healthImpact)}
                </div>

                {/* Pros and Cons */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FaCheckCircle className="mr-2 text-green-500" />
                      Výhody
                    </h4>
                    <ul className="space-y-1">
                      {heating.pros.slice(0, 3).map((pro, proIndex) => (
                        <li key={proIndex} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FaExclamationTriangle className="mr-2 text-orange-500" />
                      Nevýhody
                    </h4>
                    <ul className="space-y-1">
                      {heating.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    isHeatFlow
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {isHeatFlow ? 'Získat nabídku HeatFlow' : 'Získat více informací'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Proč je HeatFlow nejvýhodnější?
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              HeatFlow uhlíkové folie kombinují nejlepší vlastnosti všech typů vytápění: 
              rychlost, úspornost, zdravotní benefity a dlouhou životnost.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEuroSign className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Nejnižší náklady</h4>
                <p className="text-orange-100">Úspora až 60% oproti tradičnímu vytápění</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Zdravotní benefity</h4>
                <p className="text-orange-100">Infračervené záření prospívá zdraví</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-2xl" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Okamžitý komfort</h4>
                <p className="text-orange-100">Teplo za 2-3 minuty po zapnutí</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeatingComparison;
