import React from 'react';
import Hero from '../components/Hero';

export default function Home({ lang }) {
  const T = {
    tr: { ctaTitle: 'Turnuvaya Hazır mısın?', ctaDesc: 'FTNCC seçmeleri başlıyor. Takıma katılmak için hemen başvur.', ctaBtn: 'Şimdi Başvur' },
    en: { ctaTitle: 'Ready for the Tournament?', ctaDesc: 'FTNCC tryouts are starting. Apply now to join the team.', ctaBtn: 'Apply Now' },
  }[lang];

  return (
    <div>
      <Hero lang={lang} />

      <section className="home-cta-section">
        <div className="home-cta-box">
          <div className="home-cta-card">
            <div>
              <h2 className="home-cta-title">{T.ctaTitle}</h2>
              <p className="home-cta-desc">{T.ctaDesc}</p>
            </div>
            <button className="btn-primary">{T.ctaBtn}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
