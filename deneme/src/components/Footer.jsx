import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ lang }) {
  const T = {
    tr: {
      tagline: 'E-spor dünyasında yeni bir devir. FTNCC ile zafer kaçınılmazdır.',
      links: 'Hızlı Linkler',
      contact: 'İletişim',
      follow: 'Takip Et',
      home: 'Anasayfa', comp: 'Mücadeleler', about: 'Hakkımızda',
      privacy: 'Gizlilik Politikası', terms: 'Kullanım Şartları',
      rights: 'Tüm Hakları Saklıdır.',
    },
    en: {
      tagline: 'A new era in esports. With FTNCC, victory is inevitable.',
      links: 'Quick Links',
      contact: 'Contact',
      follow: 'Follow Us',
      home: 'Home', comp: 'Competitions', about: 'About Us',
      privacy: 'Privacy Policy', terms: 'Terms of Use',
      rights: 'All Rights Reserved.',
    },
  }[lang];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              <img src={logo} alt="FTNCC" />
              <span className="footer-brand-text">FTNCC</span>
            </div>
            <p className="footer-tagline">{T.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <p className="footer-col-title">{T.links}</p>
            <ul className="footer-links">
              <li><Link to="/">{T.home}</Link></li>
              <li><Link to="/competitions">{T.comp}</Link></li>
              <li><Link to="/about">{T.about}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-col-title">{T.contact}</p>
            <div className="footer-contact-item"><Mail size={14} /> info@ftncc.com</div>
            <div className="footer-contact-item"><Phone size={14} /> +90 310 44 32</div>
            <div className="footer-contact-item"><MapPin size={14} /> İstanbul, Türkiye</div>
          </div>

          {/* Social */}
          <div>
            <p className="footer-col-title">{T.follow}</p>
            <div className="footer-social">
              {['TW', 'IG', 'YT', 'DC'].map((s) => (
                <a key={s} href="#" className="social-btn">{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 FTNCC E-Sports — {T.rights}</p>
          <div className="footer-legal">
            <a href="#">{T.privacy}</a>
            <a href="#">{T.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
