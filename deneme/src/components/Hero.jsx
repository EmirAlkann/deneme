import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroArena from '../assets/hero-arena.png';

export default function Hero({ lang }) {
  const T = {
    tr: {
      eyebrow: 'Premium Esports Takımı',
      subtitle: 'Dünya 1.si',
      desc: 'FTNCC E-sports: Hırs, Tutku ve Zafer.',
      explore: 'Keşfet',
      stats: [{ v: '25+', l: 'Kupa' }, { v: '50+', l: 'Oyuncu' }, { v: '#1', l: 'Global' }],
    },
    en: {
      eyebrow: 'Premium Esports Team',
      subtitle: 'World 1st',
      desc: 'FTNCC E-sports: Ambition, Passion, and Victory.',
      explore: 'Explore',
      stats: [{ v: '25+', l: 'Trophies' }, { v: '50+', l: 'Players' }, { v: '#1', l: 'Global' }],
    },
  }[lang];

  return (
    <section className="hero">
      {/* Background */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroArena})` }}
      />
      <div className="hero-overlay-1" />
      <div className="hero-overlay-2" />

      {/* Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">{T.eyebrow}</span>
        </div>

        <h1 className="hero-title">
          FTNCC
        </h1>

        <p className="hero-subtitle">{T.subtitle}</p>
        <p className="hero-desc">{T.desc}</p>

        <div className="hero-btns">
          <Link to="/about" className="btn-primary">
            {T.explore}
          </Link>
        </div>

        <div className="hero-stats">
          {T.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-value">{s.v}</div>
              <div className="hero-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
