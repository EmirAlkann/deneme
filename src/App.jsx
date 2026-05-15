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
  const [modal, setModal] = useState(false);

  const T = {
    tr: { modalTitle: 'Aileye Katıl', emailLabel: 'E-posta Adresi', passLabel: 'Şifre', emailPh: 'ornek@ftncc.com', passPh: '••••••••', btn: 'Giriş Yap', signupMsg: 'Hesabın yok mu?', signup: 'Kayıt Ol' },
    en: { modalTitle: 'Join The Family', emailLabel: 'Email Address', passLabel: 'Password', emailPh: 'example@ftncc.com', passPh: '••••••••', btn: 'Login', signupMsg: "Don't have an account?", signup: 'Sign Up' },
  }[lang];

  return (
    <div className="app-shell">
      <Header lang={lang} setLang={setLang} onOpenMembership={() => setModal(true)} />

      <main className="app-main">
        <Routes>
          <Route path="/"            element={<Home           lang={lang} />} />
          <Route path="/competitions" element={<CompetitionsPage lang={lang} />} />
          <Route path="/about"        element={<AboutPage        lang={lang} />} />
          <Route path="/sponsors"     element={<SponsorsPage     lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} />

      {/* Membership Modal */}
      {modal && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            <h2 className="modal-title">{T.modalTitle}</h2>

            <div className="modal-field">
              <label className="modal-label">{T.emailLabel}</label>
              <input type="email" placeholder={T.emailPh} className="modal-input" />
            </div>
            <div className="modal-field">
              <label className="modal-label">{T.passLabel}</label>
              <input type="password" placeholder={T.passPh} className="modal-input" />
            </div>

            <button className="modal-submit">{T.btn}</button>
            <p className="modal-footer-text">
              {T.signupMsg}{' '}
              <span className="modal-footer-link">{T.signup}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
