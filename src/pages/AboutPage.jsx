import React from 'react';

export default function AboutPage({ lang }) {
  const T = {
    tr: {
      title: 'Hakkımızda',
      desc: 'FTNCC\'nin kuruluşundan bugüne olan yolculuğu.',
      eyebrow: 'Hikayemiz',
      storyTitle: 'FTNCC Kimdir?',
      p1: 'FTNCC, e-sporun sadece bir oyun değil, bir yaşam biçimi olduğuna inanan tutkulu oyuncular tarafından kuruldu. Rekabetçi bir zihin yapısı ve dayanışma ruhuyla şekillenen takımımız kısa sürede zirveye ulaştı.',
      p2: 'Kısa sürede Türkiye\'nin en prestijli takımları arasına girerek global arenada söz sahibi olmayı başardık. Hedefimiz sadece kazanmak değil, e-spor kültürünü yeni bir seviyeye taşımak.',
      s1l: 'Kuruluş', s2l: 'Şampiyonluk', s3l: 'Takipçi',
    },
    en: {
      title: 'About Us',
      desc: 'The journey of FTNCC from its founding to today.',
      eyebrow: 'Our Story',
      storyTitle: 'Who Is FTNCC?',
      p1: 'FTNCC was founded by passionate players who believe that esports is not just a game, but a lifestyle. Shaped by a competitive mindset and team spirit, we quickly rose to the top.',
      p2: 'In a short time, we became one of Turkey\'s most prestigious teams and made our mark on the global stage. Our goal is not just to win, but to take esports culture to a new level.',
      s1l: 'Founded', s2l: 'Championships', s3l: 'Followers',
    },
  }[lang];

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-inner">
          <h1 className="page-title">{T.title}</h1>
          <p className="page-desc">{T.desc}</p>
        </div>
      </div>

      <section className="about-section">
        <div className="about-grid">
          <div className="about-video-box">FTNCC</div>
          <div>
            <p className="about-story-eyebrow">{T.eyebrow}</p>
            <h2 className="about-story-title">{T.storyTitle}</h2>
            <p className="about-story-text">{T.p1}</p>
            <p className="about-story-text">{T.p2}</p>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-value">2024</div>
            <div className="about-stat-label">{T.s1l}</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value secondary">12</div>
            <div className="about-stat-label">{T.s2l}</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-value">500K+</div>
            <div className="about-stat-label">{T.s3l}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
