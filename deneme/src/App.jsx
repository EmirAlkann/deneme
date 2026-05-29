import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompetitionsPage from './pages/CompetitionsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApplyPage from './pages/ApplyPage';
import StorePage from './pages/StorePage';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('tr');
  const [showNewsTab, setShowNewsTab] = useState(() => {
    return window.location.pathname === '/news' || localStorage.getItem('showNewsTab') === 'true';
  });

  // Central Authentication Session State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ftncc_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (window.location.pathname === '/news') {
      setShowNewsTab(true);
      localStorage.setItem('showNewsTab', 'true');
    }
  }, []);

  const handleBrowseNews = () => {
    setShowNewsTab(true);
    localStorage.setItem('showNewsTab', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('ftncc_user');
    setCurrentUser(null);
  };

  return (
    <div className="app-shell">
      <Header
        lang={lang}
        setLang={setLang}
        showNewsTab={showNewsTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="app-main">
        <Routes>
          <Route path="/"            element={<Home           lang={lang} onBrowseNews={handleBrowseNews} />} />
          <Route path="/competitions" element={<CompetitionsPage lang={lang} />} />
          <Route path="/news"         element={<NewsPage         lang={lang} />} />
          <Route path="/register"     element={<RegisterPage     lang={lang} setCurrentUser={setCurrentUser} />} />
          <Route path="/login"        element={<LoginPage        lang={lang} setCurrentUser={setCurrentUser} />} />
          <Route path="/apply"        element={<ApplyPage        lang={lang} currentUser={currentUser} />} />
          <Route path="/about"        element={<AboutPage        lang={lang} />} />
          <Route path="/store"        element={<StorePage        lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

