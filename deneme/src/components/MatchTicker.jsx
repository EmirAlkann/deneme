import React from 'react';

export default function MatchTicker({ lang }) {
  const matches = [
    { t1: 'FTNC', t2: 'NAVI', score: '2 : 0', status: 'FINAL' },
    { t1: 'G2', t2: 'FTNC', score: '1 : 2', status: 'FINAL' },
    { t1: 'FTNC', t2: 'VITALITY', score: '19:00', status: 'TODAY' },
    { t1: 'FAZE', t2: 'FTNC', score: '1 : 2', status: 'FINAL' },
    { t1: 'FTNC', t2: 'ASTRALIS', score: '2 : 0', status: 'FINAL' },
  ];

  // Repeat for smooth loop
  const loopMatches = [...matches, ...matches, ...matches];

  return (
    <div className="ticker-section">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {loopMatches.map((m, i) => (
            <div key={i} className="ticker-item">
              <div className="ticker-team">
                <span>{m.t1}</span>
                <span className="ticker-vs">{m.score.includes(':') && !m.score.includes(' ') ? 'VS' : m.score}</span>
                <span>{m.t2}</span>
              </div>
              <span className={`ticker-status ${m.status === 'FINAL' ? 'final' : ''}`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
