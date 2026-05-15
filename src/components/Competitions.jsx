import React from 'react';
import { Trophy, Target, Users, Zap } from 'lucide-react';

const icons = [<Target size={28} />, <Trophy size={28} />, <Zap size={28} />, <Users size={28} />];

export default function Competitions({ lang }) {
  const T = {
    tr: {
      title: 'Mücadele Ettiğimiz',
      accent: 'Ligler',
      leagues: [
        { name: 'Valorant Champions Tour', region: 'EMEA', status: 'Aktif' },
        { name: 'League of Legends TCL', region: 'Türkiye', status: 'Sezon Arası' },
        { name: 'Counter-Strike 2 Major', region: 'Global', status: 'Katılımcı' },
        { name: 'PUBG Mobile Pro League', region: 'Avrupa', status: 'Finalist' },
      ],
    },
    en: {
      title: 'Leagues We',
      accent: 'Compete In',
      leagues: [
        { name: 'Valorant Champions Tour', region: 'EMEA', status: 'Active' },
        { name: 'League of Legends TCL', region: 'Turkey', status: 'Off-Season' },
        { name: 'Counter-Strike 2 Major', region: 'Global', status: 'Participant' },
        { name: 'PUBG Mobile Pro League', region: 'Europe', status: 'Finalist' },
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
