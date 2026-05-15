import React from 'react';
import { motion } from 'framer-motion';
import heroArena from '../assets/hero-arena.png';

export default function Hero({ lang }) {
  const T = {
    tr: {
      eyebrow: 'Premium Esports Takımı',
      subtitle: 'Zirveye Giden Yol',
      desc: 'FTNCC E-sports: Hırs, Tutku ve Zafer.',
      cta: 'Takıma Katıl',
      explore: 'Keşfet',
      stats: [{ v: '25+', l: 'Kupa' }, { v: '50+', l: 'Oyuncu' }, { v: '#12', l: 'Global' }],
    },
    en: {
      eyebrow: 'Premium Esports Team',
      subtitle: 'Road to the Top',
      desc: 'FTNCC E-sports: Ambition, Passion, and Victory.',
      cta: 'Join The Team',
      explore: 'Explore',
      stats: [{ v: '25+', l: 'Trophies' }, { v: '50+', l: 'Players' }, { v: '#12', l: 'Global' }],
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
          <span className="hero-title-accent">ELITE</span>
        </h1>

        <p className="hero-subtitle">{T.subtitle}</p>
        <p className="hero-desc">{T.desc}</p>

        <div className="hero-btns">
          <button className="btn-primary">{T.cta}</button>
          <button className="btn-secondary">{T.explore}</button>
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
