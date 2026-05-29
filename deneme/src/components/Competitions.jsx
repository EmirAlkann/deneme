import React from 'react';
import { Users } from 'lucide-react';
import lolLogo from '../assets/lol-logo.png';
import cs2Logo from '../assets/cs2-logo.png';
import apexLogo from '../assets/apex-logo.png';

const icons = [
  <img src={cs2Logo} alt="Counter-Strike 2" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />,
  <img src={lolLogo} alt="League of Legends" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />,
  <img src={apexLogo} alt="Apex Legends" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
];

export default function Competitions({ lang }) {
  const T = {
    tr: {
      title: 'Mücadele Ettiğimiz',
      accent: 'Ligler',
      leagues: [
        { name: 'Counter-Strike 2', region: 'Global', status: 'Aktif' },
        { name: 'League of Legends', region: 'Türkiye', status: 'Sezon Arası' },
        { name: 'Apex Legends', region: 'Global', status: 'Aktif' },
      ],
    },
    en: {
      title: 'Leagues We',
      accent: 'Compete In',
      leagues: [
        { name: 'Counter-Strike 2', region: 'Global', status: 'Active' },
        { name: 'League of Legends', region: 'Turkey', status: 'Off-Season' },
        { name: 'Apex Legends', region: 'Global', status: 'Active' },
      ],
    },
  }[lang];

  return (
    <section className="competitions-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            {T.title} <span className="section-accent">{T.accent}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="competitions-grid">
          {T.leagues.map((league, i) => (
            <div key={i} className="competition-card">
              <div className="competition-icon">{icons[i]}</div>
              <p className="competition-name">{league.name}</p>
              <div className="competition-footer">
                <span className="competition-region">{league.region}</span>
                <span className="competition-badge">{league.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
