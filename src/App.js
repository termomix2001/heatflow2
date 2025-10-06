import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import HeatingComparison from './components/HeatingComparison';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CRMApp from './components/CRM/CRMApp';

function App() {
  const [showCRM, setShowCRM] = useState(false);

  // Zkontroluj URL pro CRM
  React.useEffect(() => {
    if (window.location.pathname === '/crm') {
      setShowCRM(true);
    }
  }, []);

  if (showCRM) {
    return <CRMApp />;
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <HeatingComparison />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
