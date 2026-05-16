import React from 'react';
import Sponsors from '../components/Sponsors';

export default function SponsorsPage({ lang }) {
  const T = {
    tr: {
      title: 'Sponsorluklar',
      desc: 'FTNCC ailesinin bir parçası olan ve başarılarımızı destekleyen değerli iş ortaklarımız.',
      partnerTitle: 'Ortağımız Olun',
      partnerDesc: 'Markanızı e-sporun dinamik dünyasına taşıyın. Sponsorluk fırsatları için bizimle iletişime geçin.',
      partnerBtn: 'İletişime Geç',
    },
    en: {
      title: 'Sponsorships',
      desc: 'Our valued business partners who are part of the FTNCC family and support our success.',
      partnerTitle: 'Become a Partner',
      partnerDesc: 'Bring your brand to the dynamic world of esports. Contact us for sponsorship opportunities.',
      partnerBtn: 'Get in Touch',
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

      <Sponsors lang={lang} />

      <div className="sponsors-partner-section">
        <div className="sponsors-partner-card">
          <h2 className="sponsors-partner-title">{T.partnerTitle}</h2>
          <p className="sponsors-partner-desc">{T.partnerDesc}</p>
          <button className="btn-primary">{T.partnerBtn}</button>
        </div>
      </div>
    </div>
  );
}
