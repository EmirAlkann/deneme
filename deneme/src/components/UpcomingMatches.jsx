import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function UpcomingMatches({ lang }) {
  const T = {
    tr: {
      title: 'Önümüzdeki',
      accent: 'Maçlar',
      viewAll: 'Tümünü Gör',
      matches: [
        {
          id: 1,
          tournament: 'ESL Pro League S19',
          opponent: 'Natus Vincere',
          date: '20 Mayıs 2024',
          time: '20:00',
          game: 'CS2',
          type: 'BO3'
        },
        {
          id: 2,
          tournament: 'LEC Summer Split',
          opponent: 'G2 Esports',
          date: '22 Mayıs 2024',
          time: '19:00',
          game: 'LoL',
          type: 'BO1'
        },
        {
          id: 3,
          tournament: 'ALGS Pro League',
          opponent: 'TSM',
          date: '25 Mayıs 2024',
          time: '21:30',
          game: 'Apex',
          type: 'Finals'
        }
      ]
    },
    en: {
      title: 'Upcoming',
      accent: 'Matches',
      viewAll: 'View All',
      matches: [
        {
          id: 1,
          tournament: 'ESL Pro League S19',
          opponent: 'Natus Vincere',
          date: 'May 20, 2024',
          time: '20:00',
          game: 'CS2',
          type: 'BO3'
        },
        {
          id: 2,
          tournament: 'LEC Summer Split',
          opponent: 'G2 Esports',
          date: 'May 22, 2024',
          time: '19:00',
          game: 'LoL',
          type: 'BO1'
        },
        {
          id: 3,
          tournament: 'ALGS Pro League',
          opponent: 'TSM',
          date: 'May 25, 2024',
          time: '21:30',
          game: 'Apex',
          type: 'Finals'
        }
      ]
    }
  }[lang];

  return (
    <section className="matches-section">
      <div className="section-container">
        <div className="section-header-flex">
          <div className="section-header-text">
            <h2 className="section-title">
              {T.title} <span className="section-accent">{T.accent}</span>
            </h2>
            <div className="section-divider" style={{ margin: '0' }} />
          </div>
          <button className="btn-text">
            {T.viewAll} <ChevronRight size={16} />
          </button>
        </div>

        <div className="matches-grid">
          {T.matches.map((match, i) => (
            <motion.div 
              key={match.id} 
              className="match-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="match-game-tag">{match.game}</div>
              <div className="match-tournament">{match.tournament}</div>
              
              <div className="match-vs-area">
                <div className="match-team">
                  <div className="team-logo-box">
                    <img src={logo} alt="FTNCC" className="team-logo-img" />
                  </div>
                  <span className="team-name">FTNCC</span>
                </div>
                <div className="match-vs-divider">VS</div>
                <div className="match-team">
                  <div className="team-logo-placeholder opponent">{match.opponent.substring(0, 1)}</div>
                  <span className="team-name">{match.opponent}</span>
                </div>
              </div>

              <div className="match-footer">
                <div className="match-info">
                  <Calendar size={14} />
                  <span>{match.date}</span>
                </div>
                <div className="match-info">
                  <Clock size={14} />
                  <span>{match.time}</span>
                </div>
                <div className="match-type-badge">{match.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
