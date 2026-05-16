import React from 'react';

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
    <section className="players-section" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            {T.title} <span className="section-accent">{T.accent}</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="players-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '32px' 
        }}>
          {PLAYERS.map(player => (
            <div key={player.name} className="player-card" style={{
              background: 'var(--surface)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--glass)',
              borderRadius: '24px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, borderColor 0.3s'
            }}>
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random&color=fff&size=128&rounded=true`} 
                alt={player.name} 
                style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px', border: '3px solid var(--primary)' }}
              />
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', marginBottom: '8px' }}>{player.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{player.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
