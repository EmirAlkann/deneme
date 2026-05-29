import React, { useState } from 'react';
import { Calendar, Clock, Tv, ExternalLink, Shield, Gamepad2, Award } from 'lucide-react';
import './CompetitionsPage.css';
import lolLogo from '../assets/lol-logo.png';
import cs2Logo from '../assets/cs2-logo.png';
import apexLogo from '../assets/apex-logo.png';

// High-quality custom inline SVGs for game titles
const LoLIcon = () => (
  <img src={lolLogo} alt="League of Legends" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

const CS2Icon = () => (
  <img src={cs2Logo} alt="Counter-Strike 2" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

const ApexIcon = () => (
  <img src={apexLogo} alt="Apex Legends" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

// High-fidelity social icons
const TwitterSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '18px', height: '18px' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TwitchSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '18px', height: '18px' }}>
    <path d="M11.571 4.714h1.715v5.143H11.57zm3.002 0H16.29v5.143h-1.717zm5.143-3.002l-3.002 3.002v10.714h-4.714l-2.572 2.571v-2.571H4.286V1.712zm1.286-1.286H2.143A2.14 2.14 0 0 0 0 2.57v12.43a2.14 2.14 0 0 0 2.143 2.142h3.429v3.429l3.428-3.429h4.286L21 8.571V1.286a2.14 2.14 0 0 0-2.143-2.143z" />
  </svg>
);

const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '18px', height: '18px' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export default function CompetitionsPage({ lang }) {
  const [selectedGame, setSelectedGame] = useState('lol');
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' or 'matches'
  const [matchFilter, setMatchFilter] = useState('upcoming'); // 'upcoming' or 'past'

  const T = {
    tr: {
      pageTitle: 'MÜCADELELER & TAKIMLAR',
      pageDesc: 'FTNCC olarak espor dünyasının zirvesinde rekabet eden profesyonel kadrolarımız ve maç takvimimiz.',
      selectTeam: 'TAKIM SEÇİMİ',
      league: 'Mücadele Ettiği Lig',
      status: 'Durum / Sıralama',
      tabRoster: 'TAKIM KADROSU',
      tabMatches: 'MAÇLAR VE MÜSABAKALAR',
      subUpcoming: 'Gelecek Mücadeleler',
      subPast: 'Son Sonuçlar',
      watchLive: 'CANLI İZLE',
      viewStats: 'DETAYLAR',
      win: 'GALİBİYET',
      loss: 'MAĞLUBİYET',
      noUpcoming: 'Yakın zamanda planlanmış bir müsabaka bulunmuyor.',
      noPast: 'Oynanmış bir maç kaydı bulunmuyor.',
      liveBadge: 'CANLI',
      coach: 'Koç',
    },
    en: {
      pageTitle: 'COMPETITIONS & TEAMS',
      pageDesc: 'Discover our elite professional rosters and match schedules competing at the highest levels of global esports.',
      selectTeam: 'SELECT TEAM',
      league: 'Competing League',
      status: 'Status / Placement',
      tabRoster: 'TEAM ROSTER',
      tabMatches: 'MATCHES & TOURNAMENTS',
      subUpcoming: 'Upcoming Matches',
      subPast: 'Recent Results',
      watchLive: 'WATCH LIVE',
      viewStats: 'STATS',
      win: 'WIN',
      loss: 'LOSS',
      noUpcoming: 'No upcoming matches scheduled at this time.',
      noPast: 'No past matches found in the history.',
      liveBadge: 'LIVE',
      coach: 'Coach',
    }
  }[lang];

  // Full high-end dataset structured for translation, custom dynamic styles
  const teamsData = {
    lol: {
      game: 'lol',
      title: 'League of Legends',
      tag: '',
      accent: '#00f867ff',
      accentRgb: '200, 155, 60',
      icon: <LoLIcon />,
      league: {
        tr: 'TCL Türkiye Şampiyonluk Ligi',
        en: 'TCL Turkish Championship League'
      },
      status: {
        tr: '1. Sırada (12-2) - Play-off Garantilendi',
        en: '1st Place (12-2) - Playoffs Secured'
      },
      roster: [
        {
          nickname: 'Mustafa',
          realName: 'Mustafa Arda Gürlü',
          role: { tr: 'Kaptan / Üst Koridor', en: 'Captain / Top Laner' },
          avatar: 'https://ui-avatars.com/api/?name=Mustafa+Arda+Gürlü&background=c89b3c&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Emir',
          realName: 'Emir Alkan',
          role: { tr: 'Saldırı / Ormancı', en: 'Entry / Jungler' },
          avatar: 'https://ui-avatars.com/api/?name=Emir+Alkan&background=c89b3c&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Selim',
          realName: 'Selim Aksoy',
          role: { tr: 'Destek', en: 'Support' },
          avatar: 'https://ui-avatars.com/api/?name=Selim+Aksoy&background=c89b3c&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Tolga',
          realName: 'Tolga Çamlı',
          role: { tr: 'Oyun İçi Lider / Orta Koridor', en: 'IGL / Mid Laner' },
          avatar: 'https://ui-avatars.com/api/?name=Tolga+Çamlı&background=c89b3c&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Can',
          realName: 'Can Ekinci',
          role: { tr: 'Lurker / Alt Koridor', en: 'Lurker / Bot Laner' },
          avatar: 'https://ui-avatars.com/api/?name=Can+Ekinci&background=c89b3c&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        }
      ],
      matches: {
        upcoming: [
          {
            opponent: 'SuperMassive',
            opponentLogo: 'SUP',
            date: '23.05.2024 - 19:00',
            tournament: 'TCL Summer Split',
            live: false,
            streamUrl: 'https://twitch.tv/riotgamesturkish'
          },
          {
            opponent: 'Dark Passage',
            opponentLogo: 'DP',
            date: '24.05.2024 - 21:00',
            tournament: 'TCL Summer Split',
            live: false,
            streamUrl: 'https://twitch.tv/riotgamesturkish'
          }
        ],
        past: [
          {
            opponent: 'Galakticos',
            opponentLogo: 'GAL',
            ftnccScore: 2,
            oppScore: 0,
            result: 'win',
            date: '18.05.2024',
            tournament: 'TCL Summer Split'
          },
          {
            opponent: 'Fut Esports',
            opponentLogo: 'FUT',
            ftnccScore: 1,
            oppScore: 2,
            result: 'loss',
            date: '15.05.2024',
            tournament: 'TCL Summer Split'
          },
          {
            opponent: '5-Ronaldos',
            opponentLogo: '5R',
            ftnccScore: 2,
            oppScore: 0,
            result: 'win',
            date: '11.05.2024',
            tournament: 'TCL Summer Split'
          }
        ]
      }
    },
    cs: {
      game: 'cs',
      title: 'Counter-Strike 2',
      tag: '',
      accent: '#f3a01a',
      accentRgb: '243, 160, 26',
      icon: <CS2Icon />,
      league: {
        tr: 'ESL Pro League Season 19',
        en: 'ESL Pro League Season 19'
      },
      status: {
        tr: 'Play-off Çeyrek Finali Bekleniyor',
        en: 'Awaiting Playoff Quarter-Finals'
      },
      roster: [
        {
          nickname: 'Arda',
          realName: 'Mustafa Arda Gürlü',
          role: { tr: 'Takım Kaptanı', en: 'Team Captain' },
          avatar: 'https://ui-avatars.com/api/?name=Mustafa+Arda+Gürlü&background=f3a01a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Emir',
          realName: 'Emir Alkan',
          role: { tr: 'Entry Fragger', en: 'Entry Fragger' },
          avatar: 'https://ui-avatars.com/api/?name=Emir+Alkan&background=f3a01a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Selim',
          realName: 'Selim Aksoy',
          role: { tr: 'Destek (Support)', en: 'Support' },
          avatar: 'https://ui-avatars.com/api/?name=Selim+Aksoy&background=f3a01a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Tolga',
          realName: 'Tolga Çamlı',
          role: { tr: 'Oyun İçi Lider (IGL)', en: 'IGL' },
          avatar: 'https://ui-avatars.com/api/?name=Tolga+Çamlı&background=f3a01a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Can',
          realName: 'Can Ekinci',
          role: { tr: 'Lurker', en: 'Lurker' },
          avatar: 'https://ui-avatars.com/api/?name=Can+Ekinci&background=f3a01a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        }
      ],
      matches: {
        upcoming: [
          {
            opponent: 'Natus Vincere',
            opponentLogo: 'NAVI',
            date: 'BUGÜN - 20:30',
            tournament: 'ESL Pro League Playoffs',
            live: true,
            streamUrl: 'https://twitch.tv/esl_csgo'
          },
          {
            opponent: 'FaZe Clan',
            opponentLogo: 'FAZE',
            date: '27.05.2024 - 20:45',
            tournament: 'ESL Pro League Playoffs',
            live: false,
            streamUrl: 'https://twitch.tv/esl_csgo'
          }
        ],
        past: [
          {
            opponent: 'Team Vitality',
            opponentLogo: 'VIT',
            ftnccScore: 2,
            oppScore: 1,
            result: 'win',
            date: '17.05.2024',
            tournament: 'ESL Pro League Groups'
          },
          {
            opponent: 'G2 Esports',
            opponentLogo: 'G2',
            ftnccScore: 0,
            oppScore: 2,
            result: 'loss',
            date: '14.05.2024',
            tournament: 'ESL Pro League Groups'
          },
          {
            opponent: 'MOUZ',
            opponentLogo: 'MOUZ',
            ftnccScore: 2,
            oppScore: 0,
            result: 'win',
            date: '10.05.2024',
            tournament: 'ESL Pro League Groups'
          }
        ]
      }
    },
    apex: {
      game: 'apex',
      title: 'Apex Legends',
      tag: '',
      accent: '#ff2a2a',
      accentRgb: '255, 42, 42',
      icon: <ApexIcon />,
      league: {
        tr: 'ALGS Pro League Split 2',
        en: 'ALGS Pro League Split 2'
      },
      status: {
        tr: 'Haftalık Puan Durumunda 2. Sırada',
        en: '2nd Place on Weekly Standings'
      },
      roster: [
        {
          nickname: 'Arda',
          realName: 'Mustafa Arda Gürlü',
          role: { tr: 'Kaptan', en: 'Captain' },
          avatar: 'https://ui-avatars.com/api/?name=Mustafa+Arda+Gürlü&background=ff2a2a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Emir',
          realName: 'Emir Alkan',
          role: { tr: 'Saldırıcı (Fragger)', en: 'Fragger' },
          avatar: 'https://ui-avatars.com/api/?name=Emir+Alkan&background=ff2a2a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Selim',
          realName: 'Selim Aksoy',
          role: { tr: 'Savunmacı (Anchor)', en: 'Anchor' },
          avatar: 'https://ui-avatars.com/api/?name=Selim+Aksoy&background=ff2a2a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Tolga',
          realName: 'Tolga Çamlı',
          role: { tr: 'Oyun İçi Lider (IGL)', en: 'IGL' },
          avatar: 'https://ui-avatars.com/api/?name=Tolga+Çamlı&background=ff2a2a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        },
        {
          nickname: 'Can',
          realName: 'Can Ekinci',
          role: { tr: 'Lurker', en: 'Lurker' },
          avatar: 'https://ui-avatars.com/api/?name=Can+Ekinci&background=ff2a2a&color=fff&size=400',
          socials: { twitter: '#', twitch: '#', instagram: '#' }
        }
      ],
      matches: {
        upcoming: [
          {
            opponent: 'DarkZero Esports',
            opponentLogo: 'DZ',
            date: '28.05.2024 - 15:00',
            tournament: 'ALGS Pro League Split 2',
            live: false,
            streamUrl: 'https://twitch.tv/playapex'
          },
          {
            opponent: 'Alliance Esports',
            opponentLogo: 'ALL',
            date: '30.05.2024 - 17:30',
            tournament: 'ALGS Pro League Split 2',
            live: false,
            streamUrl: 'https://twitch.tv/playapex'
          }
        ],
        past: [
          {
            opponent: 'TSM Squad',
            opponentLogo: 'TSM',
            ftnccScore: '3. Sırada (18 Puan)',
            oppScore: '3rd Place (18 Points)',
            result: 'win',
            date: '16.05.2024',
            tournament: 'ALGS Matchday 4'
          },
          {
            opponent: 'Fnatic Apex',
            opponentLogo: 'FNC',
            ftnccScore: '1. Sırada (25 Puan)',
            oppScore: '1st Place (25 Points)',
            result: 'win',
            date: '13.05.2024',
            tournament: 'ALGS Matchday 3'
          }
        ]
      }
    }
  };

  const activeTeam = teamsData[selectedGame];

  return (
    <div className="page" style={{
      '--game-accent': activeTeam.accent,
      '--game-accent-rgb': activeTeam.accentRgb
    }}>
      {/* Top Title Section */}
      <div className="page-header">
        <div className="page-header-inner">
          <span className="about-story-eyebrow" style={{ color: 'var(--game-accent)' }}>FTNCC ESPORTS</span>
          <h1 className="page-title">{T.pageTitle}</h1>
          <p className="page-desc">{T.pageDesc}</p>
        </div>
      </div>

      <div className="competitions-page-container">
        {/* GAME TAB BAR */}
        <section className="game-selector-row">
          {Object.values(teamsData).map((team) => (
            <button
              key={team.game}
              onClick={() => {
                setSelectedGame(team.game);
                setActiveTab('roster');
              }}
              className={`game-tab-btn ${selectedGame === team.game ? 'active-tab' : ''}`}
              style={{
                '--game-accent': team.accent,
                '--game-accent-rgb': team.accentRgb
              }}
            >
              <div className="game-tab-icon">{team.icon}</div>
              <span className="game-tab-title">{team.title}</span>
            </button>
          ))}
        </section>

        {/* FEATURED TEAM BANNER */}
        <div className="team-banner">
          <div className="team-banner-left">
            <div className="banner-icon-wrap" style={{ borderColor: 'var(--game-accent)' }}>
              {activeTeam.icon}
            </div>
            <div className="banner-meta">
              <span className="banner-team-tag">{activeTeam.tag}</span>
              <h2 className="banner-team-name">{activeTeam.title}</h2>
            </div>
          </div>

          <div className="team-banner-right">
            <div>
              <span className="banner-league-label">{T.league}</span>
              <div className="banner-league-val">{activeTeam.league[lang]}</div>
            </div>
            <div>
              <span className="banner-league-label">{T.status}</span>
              <div className="banner-league-val">{activeTeam.status[lang]}</div>
            </div>
            <div className="banner-status-badge">ACTIVE DIVISION</div>
          </div>
        </div>

        {/* DASHBOARD INNER NAV */}
        <div className="dashboard-tabs">
          <button
            onClick={() => setActiveTab('roster')}
            className={`dash-tab-btn ${activeTab === 'roster' ? 'active-dash-tab' : ''}`}
          >
            <Gamepad2 size={16} />
            {T.tabRoster}
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`dash-tab-btn ${activeTab === 'matches' ? 'active-dash-tab' : ''}`}
          >
            <Tv size={16} />
            {T.tabMatches}
          </button>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'roster' ? (
          <div className="roster-grid">
            {activeTeam.roster.map((player, idx) => (
              <div key={idx} className="player-card">
                <div className="player-avatar-wrap">
                  <img src={player.avatar} alt={player.nickname} className="player-avatar" />
                  <div className="player-avatar-overlay"></div>
                  <span className="player-role-badge">
                    {player.role[lang]}
                  </span>
                </div>
                <div className="player-info-footer">
                  <span className="player-nickname">{player.nickname}</span>
                  <span className="player-realname">{player.realName}</span>
                </div>

                {/* Glassmorphic hover details */}
                <div className="player-social-overlay">
                  <span className="social-overlay-nickname">{player.nickname}</span>
                  <span className="social-overlay-role">{player.role[lang]}</span>
                  <div className="social-icons-row">
                    <a href={player.socials.twitter} className="social-icon-circle" title="Twitter">
                      <TwitterSVG />
                    </a>
                    <a href={player.socials.twitch} className="social-icon-circle" title="Twitch">
                      <TwitchSVG />
                    </a>
                    <a href={player.socials.instagram} className="social-icon-circle" title="Instagram">
                      <InstagramSVG />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="matches-section-container">
            {/* SUBTABS */}
            <div className="matches-subtabs">
              <button
                onClick={() => setMatchFilter('upcoming')}
                className={`subtab-btn ${matchFilter === 'upcoming' ? 'active-subtab' : ''}`}
              >
                {T.subUpcoming}
              </button>
              <button
                onClick={() => setMatchFilter('past')}
                className={`subtab-btn ${matchFilter === 'past' ? 'active-subtab' : ''}`}
              >
                {T.subPast}
              </button>
            </div>

            {/* MATCH CARDS */}
            {matchFilter === 'upcoming' ? (
              <div className="match-rows-list">
                {activeTeam.matches.upcoming.length > 0 ? (
                  activeTeam.matches.upcoming.map((match, idx) => (
                    <div key={idx} className="match-row-card">
                      {/* Left: Tournament & Date */}
                      <div className="match-meta-col">
                        <span className="match-league-name">{match.tournament}</span>
                        <div className="match-date-wrap">
                          <Calendar size={14} className="match-date-icon" />
                          <span>{match.date}</span>
                        </div>
                      </div>

                      {/* Middle: Teams Versus */}
                      <div className="match-versus-col">
                        <div className="vs-team team-home ftncc-team">
                          <span className="vs-team-name">FTNCC</span>
                          <div className="vs-team-logo-circle">FT</div>
                        </div>

                        <div className="vs-score-container">
                          {match.live ? (
                            <div className="match-live-indicator">
                              <span className="live-dot" />
                              <span>{T.liveBadge}</span>
                            </div>
                          ) : (
                            <span className="vs-divider-text">VS</span>
                          )}
                        </div>

                        <div className="vs-team team-away">
                          <div className="vs-team-logo-circle">{match.opponentLogo}</div>
                          <span className="vs-team-name">{match.opponent}</span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="match-action-col">
                        <a href={match.streamUrl} target="_blank" rel="noreferrer" className="btn-match-stream">
                          <Tv size={13} style={{ marginRight: '6px' }} />
                          {T.watchLive}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="matches-empty-state">
                    <p className="empty-state-title">{T.noUpcoming}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="match-rows-list">
                {activeTeam.matches.past.length > 0 ? (
                  activeTeam.matches.past.map((match, idx) => (
                    <div key={idx} className="match-row-card">
                      {/* Left: Tournament & Date */}
                      <div className="match-meta-col">
                        <span className="match-league-name">{match.tournament}</span>
                        <div className="match-date-wrap">
                          <Calendar size={14} className="match-date-icon" />
                          <span>{match.date}</span>
                        </div>
                      </div>

                      {/* Middle: Scores */}
                      <div className="match-versus-col">
                        <div className="vs-team team-home ftncc-team">
                          <span className="vs-team-name">FTNCC</span>
                          <div className="vs-team-logo-circle">FT</div>
                        </div>

                        <div className="vs-score-container">
                          {selectedGame === 'apex' ? (
                            <span className="banner-league-val" style={{ fontSize: '0.85rem', color: 'var(--game-accent)' }}>
                              {lang === 'tr' ? match.ftnccScore : match.oppScore}
                            </span>
                          ) : (
                            <div className="score-box">
                              <span>{match.ftnccScore}</span>
                              <span style={{ color: 'var(--muted)', fontSize: '1rem' }}>:</span>
                              <span>{match.oppScore}</span>
                            </div>
                          )}
                          <span className={match.result === 'win' ? 'score-win-badge' : 'score-loss-badge'}>
                            {match.result === 'win' ? T.win : T.loss}
                          </span>
                        </div>

                        <div className="vs-team team-away">
                          {selectedGame === 'apex' ? (
                            <div className="vs-team-logo-circle" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>AP</div>
                          ) : (
                            <div className="vs-team-logo-circle">{match.opponentLogo}</div>
                          )}
                          <span className="vs-team-name">{match.opponent}</span>
                        </div>
                      </div>

                      {/* Right: Stats CTA */}
                      <div className="match-action-col">
                        <button className="btn-match-stats">
                          {T.viewStats}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="matches-empty-state">
                    <p className="empty-state-title">{T.noPast}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
