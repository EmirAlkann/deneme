import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import heroNew from '../assets/hero-new.png';

export default function Hero({ lang, onBrowseNews }) {
  const navigate = useNavigate();
  const T = {
    tr: {
      tag: 'CANLI',
      title: 'FTNCC\nESPORTS',
      desc: 'Sınırları Zorlayan Performans. Geleceğin Şampiyonları Burada Yetişiyor.',
      cta: 'HABERLERE GÖZ AT',
      featured: [
        { title: 'MAÇ GÜNÜ', subtitle: 'FTNC vs NAVI', time: 'BUGÜN 20:00' },
        { title: 'YENİ FORMA', subtitle: '2026 SEZONU', time: 'ŞİMDİ AL' },
        { title: 'AKADEMİ', subtitle: 'BAŞVURULAR', time: 'AÇIK' }
      ]
    },
    en: {
      tag: 'LIVE',
      title: 'FTNCC\nESPORTS',
      desc: 'Pushing the boundaries of performance. Future champions are made here.',
      cta: 'BROWSE NEWS',
      featured: [
        { title: 'MATCH DAY', subtitle: 'FTNC vs NAVI', time: 'TODAY 20:00' },
        { title: 'NEW JERSEY', subtitle: '2024 SEASON', time: 'BUY NOW' },
        { title: 'ACADEMY', subtitle: 'APPLICATIONS', time: 'OPEN' }
      ]
    },
  }[lang];

  return (
    <section className="hero-navi">
      <div className="hero-navi-main">
        <div className="hero-navi-bg-wrap">
          <img src={heroNew} alt="Background" className="hero-navi-bg" />
          <div className="hero-navi-gradient" />
        </div>

        <div className="hero-navi-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-navi-tag">
              <span className="dot" /> {T.tag}
            </div>
            <h1 className="hero-navi-title">{T.title}</h1>
            <p className="hero-navi-desc">{T.desc}</p>
            <button
              onClick={() => {
                onBrowseNews();
                navigate('/news');
              }}
              className="btn-navi-yellow"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              {T.cta}
            </button>
          </motion.div>
        </div>
      </div>


      <div className="hero-navi-grid">
        {T.featured.map((item, i) => (
          <motion.div
            key={i}
            className="hero-navi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{ cursor: (i === 1 || i === 2) ? 'pointer' : 'default' }}
            onClick={() => {
              if (i === 1) {
                navigate('/store');
              } else if (i === 2) {
                navigate('/apply');
              }
            }}
          >
            <div className="card-top">{item.title}</div>
            <div className="card-mid">{item.subtitle}</div>
            <div className="card-bot">{item.time}</div>
            <div className="card-hover-bg" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
