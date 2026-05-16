import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompetitionsPage from './pages/CompetitionsPage';
import AboutPage from './pages/AboutPage';
import SponsorsPage from './pages/SponsorsPage';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('tr');

  return (
    <div className="app-shell">
      <Header lang={lang} setLang={setLang} />

      <main className="app-main">
        <Routes>
          <Route path="/"            element={<Home           lang={lang} />} />
          <Route path="/competitions" element={<CompetitionsPage lang={lang} />} />
          <Route path="/about"        element={<AboutPage        lang={lang} />} />
          <Route path="/sponsors"     element={<SponsorsPage     lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
