import React from 'react';
import './Players.css';

const PLAYERS = [
  { name: 'Mustafa Arda Gürlü', role: 'Captain' },
  { name: 'Emir Alkan', role: 'Entry Fragger' },
  { name: 'Selim Aksoy', role: 'Support' },
  { name: 'Tolga Çamlı', role: 'IGL' },
  { name: 'Can Ekinci', role: 'Lurker' }
];

export default function Players({ lang }) {
  const T = {
    tr: { title: 'Ana', accent: 'Kadro', role: 'Oyuncu' },
    en: { title: 'Main', accent: 'Roster', role: 'Player' }
  }[lang];

  return (
    <section className="players-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            {T.title} <span className="section-accent">{T.accent}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="players-grid">
          {PLAYERS.map(player => (
            <div key={player.name} className="player-card">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random&color=fff&size=128&rounded=true`} 
                alt={player.name} 
                className="player-avatar"
              />
              <h3 className="player-name">{player.name}</h3>
              <p className="player-role">{player.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
