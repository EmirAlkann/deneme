import React from 'react';

const SPONSORS = [
  { name: 'Red Bull',      src: 'https://logo.clearbit.com/redbull.com' },
  { name: 'Logitech G',   src: 'https://logo.clearbit.com/logitechg.com' },
  { name: 'Monster',      src: 'https://logo.clearbit.com/monsterenergy.com' },
  { name: 'Secretlab',   src: 'https://logo.clearbit.com/secretlab.co' },
];

export default function Sponsors({ lang }) {
  const label = lang === 'tr' ? 'Resmi Sponsorlarımız' : 'Our Official Sponsors';

  return (
    <section className="sponsors-section">
      <div className="section-container">
        <p className="sponsors-label">{label}</p>
        <div className="sponsors-logos">
          {SPONSORS.map((s) => (
            <img key={s.name} src={s.src} alt={s.name} className="sponsor-logo" />
          ))}
        </div>
      </div>
    </section>
  );
}
