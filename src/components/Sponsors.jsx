import React from 'react';

const SPONSORS = [
  { name: 'Red Bull',      src: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_Antonin.svg/1200px-Red_Bull_Antonin.svg.png' },
  { name: 'Logitech G',   src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/2560px-Logitech_logo.svg.png' },
  { name: 'Monster',      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Monster_Energy_logo.svg/1200px-Monster_Energy_logo.svg.png' },
  { name: 'Secretlab',   src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Secretlab_Logo.svg/2560px-Secretlab_Logo.svg.png' },
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
