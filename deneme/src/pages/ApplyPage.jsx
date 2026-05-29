import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Calendar, AtSign, ShieldAlert, Award, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import './ApplyPage.css';
import '../pages/RegisterPage.css'; // Reuses sharing classes for layout consistency

// Custom high-quality inline SVG Logos for games (matching NewsPage)
const LoLIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
    <path d="M50 5 L88 27 L88 73 L50 95 L12 73 L12 27 Z" stroke="#c89b3c" strokeWidth="6" fill="rgba(200, 155, 60, 0.1)" strokeLinejoin="round" />
    <path d="M40 32 H54 V58 H68 V68 H40 Z" fill="#c89b3c" />
    <path d="M48 22 H52 V28 H48 Z" fill="#c89b3c" />
  </svg>
);

const CS2Icon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
    <circle cx="50" cy="50" r="40" stroke="#f3a01a" strokeWidth="6" fill="rgba(243, 160, 26, 0.1)" />
    <line x1="50" y1="10" x2="50" y2="28" stroke="#f3a01a" strokeWidth="6" strokeLinecap="round" />
    <line x1="50" y1="72" x2="50" y2="90" stroke="#f3a01a" strokeWidth="6" strokeLinecap="round" />
    <line x1="10" y1="50" x2="28" y2="50" stroke="#f3a01a" strokeWidth="6" strokeLinecap="round" />
    <line x1="72" y1="50" x2="90" y2="50" stroke="#f3a01a" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="50" r="10" fill="#f3a01a" />
  </svg>
);

const ApexIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
    <path d="M50 8L8 85 H32 L50 43 L68 85 H92 L50 8Z" fill="#ff2a2a" />
    <path d="M50 56L38 80 H62 L50 56 Z" fill="#030305" />
  </svg>
);

export default function ApplyPage({ lang, currentUser }) {
  const navigate = useNavigate();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login?redirect=/apply');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // prevent flash flicker
  }

  // Multi-step Page States
  const [step, setStep] = useState(1); // 1: Game Selection, 2: Form
  const [selectedGame, setSelectedGame] = useState('lol'); // 'lol', 'cs', 'apex'

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [discord, setDiscord] = useState('');
  const [ign, setIgn] = useState('');
  const [rank, setRank] = useState('');
  const [message, setMessage] = useState('');

  // Page submission states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);

  // Autofill form inputs if user session is active
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.ad_soyad || '');
      setEmail(currentUser.eposta || '');
      setPhone(currentUser.telefon || '');
      setDob(currentUser.dogum_tarihi || '');
    } else {
      setFullName('');
      setEmail('');
      setPhone('');
      setDob('');
    }
  }, [currentUser]);

  // Set default rank choice when game shifts
  useEffect(() => {
    const ranks = {
      lol: 'Challenger',
      cs: 'Faceit Level 10',
      apex: 'Apex Predator'
    }[selectedGame];
    setRank(ranks);
  }, [selectedGame]);

  // Handle countdown on success
  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [success, navigate]);

  const T = {
    tr: {
      selectTitle: 'AKADEMİ SEÇMELERİ',
      selectSubtitle: 'OYUNUNU SEÇ',
      selectDesc: 'Yeteneklerini sergilemek istediğin espor branşını seç, FTNCC Akademi kadrolarına katılma şansını yakala.',
      formSubtitle: 'AKADEMİ BAŞVURU FORMU',
      backBtn: 'Geri Dön',
      lolTitle: 'League of Legends',
      lolDesc: 'Vadiye adım at. Stratejini ve reflekslerini takım oyununda birleştirerek zafere ulaş.',
      lolCta: 'VADİYE ADIM AT',
      csTitle: 'Counter-Strike 2',
      csDesc: 'Tetiği çek. Kusursuz aimini, taktiksel bomba setlerini ve liderliğini göster.',
      csCta: 'TETİĞİ ÇEK',
      apexTitle: 'Apex Legends',
      apexDesc: 'Arenanın lideri ol. Yüksek tempolu battle royale yeteneklerinle şampiyonluğa koş.',
      apexCta: 'LİDERLİĞE YÜRÜ',
      
      // Form Labels
      nameLabel: 'Ad Soyad',
      emailLabel: 'E-Posta Adresi',
      phoneLabel: 'Telefon Numarası',
      dobLabel: 'Doğum Tarihi',
      discordLabel: 'Discord Kullanıcı Adı',
      ignLol: 'IGN / Riot ID',
      ignCs: 'IGN / Steam ID',
      ignApex: 'IGN / Origin - EA ID',
      rankLabel: 'Oyun İçi Rank / Derece',
      messageLabel: 'Espor Deneyiminiz & Neden FTNCC?',
      placeholderMessage: 'Daha önce katıldığınız turnuvalar, takımlar ve FTNCC ailesine katılarak hedefleriniz nelerdir?',
      submitBtn: 'BAŞVURUYU GÖNDER',
      submitting: 'BAŞVURU İLETİLİYOR...',
      
      // Success Overlay
      successTitle: 'BAŞVURU ALINDI!',
      successDesc: 'FTNCC Akademi seçmeleri için başvurunuz başarıyla alındı. Koordinatörlerimiz en kısa sürede sizinle iletişime geçecektir.',
      redirectText: 'saniye içinde anasayfaya yönlendiriliyorsunuz',
    },
    en: {
      selectTitle: 'ACADEMY TRYOUTS',
      selectSubtitle: 'CHOOSE YOUR GAME',
      selectDesc: 'Select the esports division you wish to show your skills in, and secure your spot inside FTNCC Academy.',
      formSubtitle: 'ACADEMY APPLICATION FORM',
      backBtn: 'Go Back',
      lolTitle: 'League of Legends',
      lolDesc: 'Enter the Rift. Combine strategy and lightning reflexes in professional team play.',
      lolCta: 'ENTER THE RIFT',
      csTitle: 'Counter-Strike 2',
      csDesc: 'Pull the trigger. Show your pristine raw aim, tactical utility setups, and clutch leadership.',
      csCta: 'PULL THE TRIGGER',
      apexTitle: 'Apex Legends',
      apexDesc: 'Become the Apex Predator. Dominate the fast-paced arena battle royale.',
      apexCta: 'DOMINATE THE ARENA',
      
      // Form Labels
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      dobLabel: 'Date of Birth',
      discordLabel: 'Discord Username',
      ignLol: 'IGN / Riot ID',
      ignCs: 'IGN / Steam ID',
      ignApex: 'IGN / Origin - EA ID',
      rankLabel: 'In-Game Rank / Elo',
      messageLabel: 'Esports Experience & Why FTNCC?',
      placeholderMessage: 'List your previous teams, tournaments participated in, and goals with FTNCC...',
      submitBtn: 'SUBMIT APPLICATION',
      submitting: 'SUBMITTING APPLICATION...',
      
      // Success Overlay
      successTitle: 'APPLICATION RECEIVED!',
      successDesc: 'Your application for the FTNCC Academy tryouts has been received. Our coordinators will contact you soon.',
      redirectText: 'seconds, you are being redirected to home',
    }
  }[lang];

  // Specific ranks array based on selected game
  const rankOptions = {
    lol: ['Challenger', 'Grandmaster', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver'],
    cs: ['Faceit Level 10', 'Faceit Level 9', 'Faceit Level 8', 'Faceit Level 7 / Lower', 'Global Elite', 'Supreme Master First Class', 'Legendary Eagle Master'],
    apex: ['Apex Predator', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver']
  }[selectedGame];

  const handleSelectGame = (gameKey) => {
    setSelectedGame(gameKey);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const gameNames = {
      lol: 'League of Legends',
      cs: 'Counter-Strike 2',
      apex: 'Apex Legends'
    };

    // Construct the single sentence summarizing all fields
    const singleSentence = `${fullName} (${email}, Tel: ${phone}, D.Tarihi: ${dob}) isimli oyuncu, ${gameNames[selectedGame] || selectedGame.toUpperCase()} oyunu için Akademi Başvurusu yaptı. [IGN: ${ign}, Derece: ${rank}, Discord: ${discord}, Mesaj: ${message}]`;

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': import.meta.env.VITE_BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: 'FTNCC Academy',
            email: 'emiralkan@gmail.com'
          },
          to: [
            {
              email: 'emiralkan@gmail.com',
              name: 'Emir Alkan'
            }
          ],
          subject: `Yeni Akademi Başvurusu: ${fullName}`,
          htmlContent: `
            <html>
              <head>
                <style>
                  body { font-family: 'Outfit', sans-serif; background-color: #030305; color: #fff; padding: 20px; }
                  .container { border: 1px solid rgba(255,255,255,0.08); background: #0a0a0f; padding: 30px; border-radius: 12px; }
                  h2 { color: #00f2ff; text-transform: uppercase; margin-bottom: 20px; }
                  p { font-size: 1.1rem; line-height: 1.6; color: #e2e8f0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2>Yeni Akademi Başvurusu Alındı</h2>
                  <p>${singleSentence}</p>
                </div>
              </body>
            </html>
          `
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'E-posta gönderimi başarısız oldu.');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Brevo API Error:', err);
      setError(lang === 'tr' ? 'E-posta gönderimi başarısız oldu: ' + err.message : 'Email delivery failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-page page">
      <div className="apply-container">
        
        <AnimatePresence mode="wait">
          
          {step === 1 ? (
            
            /* STEP 1: Game Selection Screen */
            <motion.div
              key="step-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <header className="register-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="about-story-eyebrow">{T.selectTitle}</span>
                <h1 className="register-title">
                  FTNCC <span className="register-title-accent">{T.selectSubtitle}</span>
                </h1>
                <p className="register-subtitle" style={{ margin: '0 auto', maxWidth: '650px' }}>{T.selectDesc}</p>
              </header>

              <div className="apply-select-grid">
                
                {/* League of Legends Card */}
                <div className="apply-game-card game-card-lol" onClick={() => handleSelectGame('lol')}>
                  <div className="game-card-icon-wrap">
                    <LoLIcon />
                  </div>
                  <h3 className="game-card-title">{T.lolTitle}</h3>
                  <p className="game-card-desc">{T.lolDesc}</p>
                  <button className="game-card-btn">{T.lolCta}</button>
                </div>

                {/* Counter-Strike 2 Card */}
                <div className="apply-game-card game-card-cs" onClick={() => handleSelectGame('cs')}>
                  <div className="game-card-icon-wrap">
                    <CS2Icon />
                  </div>
                  <h3 className="game-card-title">{T.csTitle}</h3>
                  <p className="game-card-desc">{T.csDesc}</p>
                  <button className="game-card-btn">{T.csCta}</button>
                </div>

                {/* Apex Legends Card */}
                <div className="apply-game-card game-card-apex" onClick={() => handleSelectGame('apex')}>
                  <div className="game-card-icon-wrap">
                    <ApexIcon />
                  </div>
                  <h3 className="game-card-title">{T.apexTitle}</h3>
                  <p className="game-card-desc">{T.apexDesc}</p>
                  <button className="game-card-btn">{T.apexCta}</button>
                </div>

              </div>
            </motion.div>
          ) : (
            
            /* STEP 2: Academy Application Form */
            <motion.div
              key="step-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="apply-form-container"
            >
              <button className="apply-back-btn" onClick={() => setStep(1)}>
                <ArrowLeft size={16} />
                <span>{T.backBtn}</span>
              </button>

              <div className={`apply-form-card form-theme-${selectedGame}`}>
                
                {!success ? (
                  <>
                    <header className="register-header">
                      {/* Game Badge Indicator */}
                      <div className="apply-game-header-badge">
                        <div className="badge-icon">
                          {selectedGame === 'lol' && <LoLIcon />}
                          {selectedGame === 'cs' && <CS2Icon />}
                          {selectedGame === 'apex' && <ApexIcon />}
                        </div>
                        <span className="badge-text">
                          {selectedGame === 'lol' && T.lolTitle}
                          {selectedGame === 'cs' && T.csTitle}
                          {selectedGame === 'apex' && T.apexTitle}
                        </span>
                      </div>
                      
                      <h1 className="register-title" style={{ fontSize: '1.8rem' }}>
                        AKADEMİ <span className="register-title-accent">BAŞVURU FORMU</span>
                      </h1>
                    </header>

                    {error && (
                      <div className="error-banner" style={{ marginBottom: '20px' }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                      <div className="register-form-grid">
                        
                        {/* Name Field (Autofilled if logged in) */}
                        <div className="form-group">
                          <label className="form-label">{T.nameLabel}</label>
                          <div className="form-input-wrap">
                            <User size={16} className="form-input-icon" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="form-input"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        {/* Email Field (Autofilled if logged in) */}
                        <div className="form-group">
                          <label className="form-label">{T.emailLabel}</label>
                          <div className="form-input-wrap">
                            <Mail size={16} className="form-input-icon" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-input"
                              placeholder="example@email.com"
                            />
                          </div>
                        </div>

                        {/* Phone Field (Autofilled if logged in) */}
                        <div className="form-group">
                          <label className="form-label">{T.phoneLabel}</label>
                          <div className="form-input-wrap">
                            <Phone size={16} className="form-input-icon" />
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-input"
                              placeholder="+90 (555) 123 4567"
                            />
                          </div>
                        </div>

                        {/* Date of Birth Field (Autofilled if logged in) */}
                        <div className="form-group">
                          <label className="form-label">{T.dobLabel}</label>
                          <div className="form-input-wrap">
                            <Calendar size={16} className="form-input-icon" />
                            <input
                              type="date"
                              required
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </div>

                        {/* Discord Username */}
                        <div className="form-group">
                          <label className="form-label">{T.discordLabel}</label>
                          <div className="form-input-wrap">
                            <AtSign size={16} className="form-input-icon" />
                            <input
                              type="text"
                              required
                              value={discord}
                              onChange={(e) => setDiscord(e.target.value)}
                              className="form-input"
                              placeholder="username#1234 / username"
                            />
                          </div>
                        </div>

                        {/* In-Game Name / ID (Tailored placeholder based on game) */}
                        <div className="form-group">
                          <label className="form-label">
                            {selectedGame === 'lol' && T.ignLol}
                            {selectedGame === 'cs' && T.ignCs}
                            {selectedGame === 'apex' && T.ignApex}
                          </label>
                          <div className="form-input-wrap">
                            <ShieldAlert size={16} className="form-input-icon" />
                            <input
                              type="text"
                              required
                              value={ign}
                              onChange={(e) => setIgn(e.target.value)}
                              className="form-input"
                              placeholder={
                                selectedGame === 'lol' ? 'Faker#KR1' :
                                selectedGame === 'cs' ? 's1mple' : 'ImperialHal'
                              }
                            />
                          </div>
                        </div>

                        {/* Rank dropdown options (Tailored based on game) */}
                        <div className="form-group form-group-full">
                          <label className="form-label">{T.rankLabel}</label>
                          <div className="form-input-wrap">
                            <Award size={16} className="form-input-icon" />
                            <select
                              required
                              value={rank}
                              onChange={(e) => setRank(e.target.value)}
                              className="form-input"
                            >
                              {rankOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Message field */}
                        <div className="form-group form-group-full">
                          <label className="form-label">{T.messageLabel}</label>
                          <div className="form-input-wrap">
                            <MessageSquare size={16} className="form-input-icon" style={{ alignSelf: 'flex-start', marginTop: '12px' }} />
                            <textarea
                              required
                              rows={5}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="form-input"
                              placeholder={T.placeholderMessage}
                              style={{ paddingLeft: '45px', paddingTop: '12px', resize: 'vertical', minHeight: '120px' }}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Submit button */}
                      <button type="submit" disabled={loading} className="apply-submit-btn">
                        {loading ? (
                          <>
                            <div className="btn-spinner" style={{ borderColor: '#000', borderTopColor: 'transparent' }}></div>
                            <span>{T.submitting}</span>
                          </>
                        ) : (
                          <span>{T.submitBtn}</span>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  
                  /* Success Overlay state */
                  <div className="register-success-card">
                    <div className="success-icon-wrap" style={{ borderColor: 'var(--active-glow)', color: 'var(--active-glow)', boxShadow: '0 0 30px rgba(var(--active-glow-rgb), 0.25)' }}>
                      <div className="success-pulse" style={{ borderColor: 'var(--active-glow)' }}></div>
                      <CheckCircle size={48} />
                    </div>
                    <h2 className="success-title">{T.successTitle}</h2>
                    <p className="success-desc">{T.successDesc}</p>
                    
                    {/* Circle redirect countdown */}
                    <div className="success-timer">
                      <div className="success-timer-circle" style={{ color: 'var(--active-glow)', boxShadow: '0 0 15px rgba(var(--active-glow-rgb), 0.1)' }}>
                        {countdown}
                      </div>
                      <span className="success-timer-text">
                        {T.redirectText}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
