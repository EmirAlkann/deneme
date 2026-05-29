import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header({ lang, setLang, showNewsTab, currentUser, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      // Hide when scrolling DOWN past 120px, show when scrolling UP
      if (currentY > 120) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const T = {
    tr: {
      home: 'Anasayfa',
      comp: 'Mücadeleler',
      news: 'Haberler',
      about: 'Hakkımızda',
      spon: 'Sponsorluklar',
      store: 'Mağaza',
      login: 'Giriş Yap',
      register: 'Kayıt Ol',
      logout: 'Çıkış Yap'
    },
    en: {
      home: 'Home',
      comp: 'Competitions',
      news: 'News',
      about: 'About Us',
      spon: 'Sponsorships',
      store: 'Store',
      login: 'Log In',
      register: 'Register',
      logout: 'Log Out'
    },
  }[lang];

  const navItems = [
    ['/', T.home],
    ['/competitions', T.comp],
    ...(showNewsTab ? [['/news', T.news]] : []),
    ['/store', T.store],
    ['/about', T.about]
  ];

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${hidden ? ' header-hidden' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="FTNCC" />
          <span className="header-logo-text">FTNCC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className={`nav-link${pathname === path ? ' active' : ''}`}>{label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>
            <Globe size={15} />
            {lang.toUpperCase()}
          </button>

          {/* Desktop Auth Section */}
          <div className="header-auth">
            {currentUser ? (
              <div className="user-profile-wrap">
                <div className="user-profile-info">
                  <User size={14} className="user-profile-icon" />
                  <span className="user-profile-name" title={currentUser.ad_soyad}>
                    {currentUser.ad_soyad}
                  </span>
                </div>
                <button className="logout-btn" onClick={onLogout}>
                  {T.logout}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="login-nav-btn">
                  {T.login}
                </Link>
                <Link to="/register" className="register-nav-btn">
                  {T.register}
                </Link>
              </>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}

          <div className="mobile-menu-divider"></div>

          <div className="mobile-menu-auth">
            {currentUser ? (
              <div className="mobile-user-profile">
                <div className="mobile-user-info">
                  <User size={18} className="user-profile-icon" />
                  <span className="mobile-user-name">{currentUser.ad_soyad}</span>
                </div>
                <button className="mobile-logout-btn" onClick={() => { setMenuOpen(false); onLogout(); }}>
                  {T.logout}
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-login-btn" onClick={() => setMenuOpen(false)}>
                  {T.login}
                </Link>
                <Link to="/register" className="mobile-register-btn" onClick={() => setMenuOpen(false)}>
                  {T.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
