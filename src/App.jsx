import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p>Designed & Built with ❤️ — Update content in <code>src/data/portfolioData.js</code></p>
      </footer>
    </div>
  );
}

export default App;
