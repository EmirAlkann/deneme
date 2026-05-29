import React from 'react';

const SPONSORS = [
  { name: 'Red Bull',    src: 'https://upload.wikimedia.org/wikipedia/commons/6/62/RED_BULL_LOGO_2026.svg' },
  { name: 'Logitech G',  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logitech_G_logo_horiz_white.svg/330px-Logitech_G_logo_horiz_white.svg.png' },
  { name: 'Monster',     src: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Logo_Monster_Energy.webp' },
  { name: 'Secretlab',   src: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Transparent_SecretLab_Logo%28black_font%29%281%29.png' },
];

export default function Sponsors({ lang }) {
  const T = {
    tr: {
      label: 'Resmi Sponsorlarımız',
      partnerTitle: 'Ortağımız Olun',
      partnerDesc: 'Markanızı e-sporun dinamik dünyasına taşıyın. Sponsorluk fırsatları için bizimle iletişime geçin.',
      partnerBtn: 'İletişime Geç',
    },
    en: {
      label: 'Our Official Sponsors',
      partnerTitle: 'Become a Partner',
      partnerDesc: 'Bring your brand to the dynamic world of esports. Contact us for sponsorship opportunities.',
      partnerBtn: 'Get in Touch',
    },
  }[lang];

  return (
    <section className="sponsors-section">
      <div className="section-container">
        <div className="sponsors-grid-container">
          
          {/* Left Side: Sponsors logos */}
          <div className="sponsors-left-block">
            <p className="sponsors-section-label">{T.label}</p>
            <div className="sponsors-logos-grid">
              {SPONSORS.map((s) => (
                <div key={s.name} className="sponsor-logo-card">
                  <img
                    src={s.src}
                    alt={s.name}
                    className="sponsor-logo"
                    style={s.name === 'Secretlab' ? { filter: 'invert(1) brightness(2)' } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Become a partner card */}
          <div className="sponsors-right-block">
            <div className="sponsors-partner-homepage-card">
              <div className="sponsors-partner-card-glow"></div>
              <h3 className="sponsors-partner-title">{T.partnerTitle}</h3>
              <p className="sponsors-partner-desc">{T.partnerDesc}</p>
              <a href="mailto:info@ftncc.com" className="btn-primary sponsors-partner-btn">
                {T.partnerBtn}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
