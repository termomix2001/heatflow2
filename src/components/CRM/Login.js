import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulace přihlášení
    setTimeout(() => {
      if (formData.email === 'admin@heatflow.cz' && formData.password === 'admin123') {
        onLogin({
          id: 1,
          name: 'Administrátor',
          email: 'admin@heatflow.cz',
          role: 'admin'
        });
      } else if (formData.email === 'petr@heatflow.cz' && formData.password === 'petr123') {
        onLogin({
          id: 2,
          name: 'Petr Svoboda',
          email: 'petr@heatflow.cz',
          role: 'sales'
        });
      } else if (formData.email === 'anna@heatflow.cz' && formData.password === 'anna123') {
        onLogin({
          id: 3,
          name: 'Anna Nováková',
          email: 'anna@heatflow.cz',
          role: 'sales'
        });
      } else {
        setError('Neplatné přihlašovací údaje');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4 login-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo a nadpis */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-2xl">H</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HeatFlow CRM</h1>
            <p className="text-gray-600">Přihlaste se do systému</p>
          </div>

          {/* Login formulář */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="vas@email.cz"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heslo
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Vaše heslo"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>Přihlásit se</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Demo účty */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo účty:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Admin:</span>
                <span className="text-gray-900">admin@heatflow.cz / admin123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Obchodník:</span>
                <span className="text-gray-900">petr@heatflow.cz / petr123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Obchodník:</span>
                <span className="text-gray-900">anna@heatflow.cz / anna123</span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>© 2024 HeatFlow. Všechna práva vyhrazena.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
