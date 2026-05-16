import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function UpcomingMatches({ lang }) {
  const T = {
    tr: {
      title: 'MAÇ GEÇMİŞİ & PROGRAM_',
      matches: [
        { id: 1, tournament: 'ESL PRO LEAGUE S19', date: '20.05.2024', t1: 'FTNC', t2: 'NAVI', score: '20:00', status: 'UPCOMING' },
        { id: 2, tournament: 'LEC SUMMER SPLIT', date: '18.05.2024', t1: 'G2', t2: 'FTNC', score: '1 : 2', status: 'WIN' },
        { id: 3, tournament: 'ALGS PRO LEAGUE', date: '15.05.2024', t1: 'FTNC', t2: 'TSM', score: '0 : 2', status: 'LOSS' },
        { id: 4, tournament: 'PGL MAJOR COPENHAGEN', date: '12.05.2024', t1: 'FAZE', t2: 'FTNC', score: '2 : 1', status: 'LOSS' },
      ]
    },
    en: {
      title: 'MATCH HISTORY & SCHEDULE_',
      matches: [
        { id: 1, tournament: 'ESL PRO LEAGUE S19', date: '20.05.2024', t1: 'FTNC', t2: 'NAVI', score: '20:00', status: 'UPCOMING' },
        { id: 2, tournament: 'LEC SUMMER SPLIT', date: '18.05.2024', t1: 'G2', t2: 'FTNC', score: '1 : 2', status: 'WIN' },
        { id: 3, tournament: 'ALGS PRO LEAGUE', date: '15.05.2024', t1: 'FTNC', t2: 'TSM', score: '0 : 2', status: 'LOSS' },
        { id: 4, tournament: 'PGL MAJOR COPENHAGEN', date: '12.05.2024', t1: 'FAZE', t2: 'FTNC', score: '2 : 1', status: 'LOSS' },
      ]
    }
  }[lang];

  return (
    <section className="aurora-section">
      <div className="section-container">
        <div className="aurora-panel">
          <div className="aurora-header">
            <h2 className="aurora-title">{T.title}</h2>
          </div>

          <div className="aurora-list">
            {T.matches.map((match, i) => (
              <motion.div 
                key={match.id} 
                className="aurora-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aurora-col-info">
                  <div className="aurora-tourney">{match.tournament}</div>
                  <div className="aurora-date">{match.date}</div>
                </div>

                <div className="aurora-col-matchup">
                  <div className="aurora-team left">
                    <span className="name">{match.t1}</span>
                    <div className="mini-logo">{match.t1 === 'FTNC' ? <img src={logo} alt="L" /> : match.t1[0]}</div>
                  </div>

                  <div className={`aurora-score ${match.status.toLowerCase()}`}>
                    {match.score}
                  </div>

                  <div className="aurora-team right">
                    <div className="mini-logo opponent">{match.t2 === 'FTNC' ? <img src={logo} alt="L" /> : match.t2[0]}</div>
                    <span className="name">{match.t2}</span>
                  </div>
                </div>

                <div className="aurora-col-status">
                  <span className={`status-badge ${match.status.toLowerCase()}`}>
                    {match.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="aurora-footer">
            <button className="btn-aurora-link">TÜMÜNÜ GÖR</button>
          </div>
        </div>
      </div>
    </section>
  );
}
