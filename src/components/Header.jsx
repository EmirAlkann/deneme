import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header({ lang, setLang, onOpenMembership }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const T = {
    tr: { home: 'Anasayfa', comp: 'Mücadeleler', about: 'Hakkımızda', spon: 'Sponsorluklar', join: 'Giriş Yap' },
    en: { home: 'Home', comp: 'Competitions', about: 'About Us', spon: 'Sponsorships', join: 'Login' },
  }[lang];

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="FTNCC" />
          <span className="header-logo-text">FTNCC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {[['/', T.home], ['/competitions', T.comp], ['/about', T.about], ['/sponsors', T.spon]].map(([path, label]) => (
            <Link key={path} to={path} className={`nav-link${pathname === path ? ' active' : ''}`}>{label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>
            <Globe size={15} />
            {lang.toUpperCase()}
          </button>
          <button className="btn-join" onClick={onOpenMembership}>
            <User size={14} />
            {T.join}
          </button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {[['/', T.home], ['/competitions', T.comp], ['/about', T.about], ['/sponsors', T.spon]].map(([path, label]) => (
            <Link key={path} to={path} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
