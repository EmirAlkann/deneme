import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import './NewsPage.css';
import lolLogo from '../assets/lol-logo.png';
import cs2Logo from '../assets/cs2-logo.png';
import apexLogo from '../assets/apex-logo.png';

// Custom high-quality inline SVG Logos for games
const LoLIcon = () => (
  <img src={lolLogo} alt="League of Legends" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

const CS2Icon = () => (
  <img src={cs2Logo} alt="Counter-Strike 2" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

const ApexIcon = () => (
  <img src={apexLogo} alt="Apex Legends" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
);

// High-fidelity social media SVGs
const TwitterSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '20px', height: '20px' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '20px', height: '20px' }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.52 3.545 12 3.545 12 3.545s-7.52 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.868.508 9.388.508 9.388.508s7.52 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '20px', height: '20px' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', width: '20px', height: '20px' }}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);


export default function NewsPage({ lang }) {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const T = {
    tr: {
      title: 'HABERLERİ',
      subtitle: 'GÜNCEL YAYINLAR',
      desc: 'FTNCC Espor takımlarından en son haberler, maç analizleri, transferler ve özel röportajlar.',
      all: 'HEPSİ',
      readTime: 'dk okuma',
      comments: 'Yorum',
      emptyTitle: 'Haber Bulunamadı',
      emptyDesc: 'Seçtiğiniz kategori için şu anda güncel bir haber bulunmuyor.',
      newsletterTitle: 'BÜLTENE ABONE OL',
      newsletterDesc: 'Kulübümüzden en güncel espor haberlerini, çekilişleri ve özel indirimleri kaçırmamak için bültenimize kaydolun.',
      newsletterPlaceholder: 'E-posta adresiniz',
      newsletterBtn: 'KAYDOL',
      newsletterSuccess: 'Aramıza Hoş Geldin! Başarıyla Abone Oldun.',
      trendingTitle: 'POPÜLER HABERLER',
      socialsTitle: 'BİZİ TAKİP EDİN',
    },
    en: {
      title: 'CLUB NEWS',
      subtitle: 'PUBLICATIONS',
      desc: 'The latest news, match analysis, roster updates, and exclusive interviews from FTNCC Esports teams.',
      all: 'ALL',
      readTime: 'min read',
      comments: 'Comments',
      emptyTitle: 'No Publications Found',
      emptyDesc: 'There are currently no active news articles in the selected category.',
      newsletterTitle: 'SUBSCRIBE TO NEWSLETTER',
      newsletterDesc: 'Subscribe to our newsletter to receive the latest esports updates, giveaways, and exclusive discounts.',
      newsletterPlaceholder: 'Your email address',
      newsletterBtn: 'SUBSCRIBE',
      newsletterSuccess: 'Welcome to the pack! Successfully subscribed.',
      trendingTitle: 'TRENDING PUBLICATIONS',
      socialsTitle: 'FOLLOW US',
    }
  }[lang];

  // News dataset with full English and Turkish support
  const newsData = [
    {
      id: 1,
      game: 'lol',
      gameLabel: 'League of Legends',
      category: { tr: 'Turnuva', en: 'Tournament' },
      date: '18.05.2024',
      title: {
        tr: 'FTNCC Academy LoL Takımımız Büyük Finale Yükseldi!',
        en: 'FTNCC Academy LoL Team Advances to the Grand Finals!'
      },
      desc: {
        tr: 'Genç yeteneklerimizden oluşan LoL akademi kadromuz, yarı finaldeki 3-1\'lik baskın galibiyetin ardından adını büyük finale yazdırmayı başardı.',
        en: 'Our LoL academy roster composed of young talents has managed to secure a spot in the grand finals after a dominant 3-1 victory in the semi-finals.'
      },
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
      readTime: '5',
      comments: 12
    },
    {
      id: 2,
      game: 'cs',
      gameLabel: 'Counter-Strike 2',
      category: { tr: 'Turnuva', en: 'Tournament' },
      date: '17.05.2024',
      title: {
        tr: 'CS2 Kadromuz ESL Challenger Kupasında Şampiyonluğa Koşuyor!',
        en: 'Our CS2 Roster Runs Towards Championship in ESL Challenger Cup!'
      },
      desc: {
        tr: 'ESL Challenger elemelerinde yenilgisiz ilerleyen CS2 takımımız, play-off aşamasında ezeli rakibi NAVI\'yi geride bırakarak finale yükseldi.',
        en: 'Undefeated in ESL Challenger qualifiers, our CS2 team has knocked out arch-rival NAVI in the play-offs to book a grand finals ticket.'
      },
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop',
      readTime: '6',
      comments: 24
    },
    {
      id: 3,
      game: 'apex',
      gameLabel: 'Apex Legends',
      category: { tr: 'Maç Analizi', en: 'Match Analysis' },
      date: '15.05.2024',
      title: {
        tr: 'ALGS Pro League\'de Muhteşem Geri Dönüş: Haftayı Lider Tamamladık!',
        en: 'Amazing Comeback in ALGS Pro League: We Finished the Week on Top!'
      },
      desc: {
        tr: 'Apex Legends takımımız, son iki haritadaki inanılmaz rotasyonları ve yüksek skorlu zaferleriyle haftalık puan tablosunda 1. sıraya oturdu.',
        en: 'Our Apex Legends squad secured the 1st position in the weekly standings after incredible rotations and high-kill wins in the final two maps.'
      },
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
      readTime: '4',
      comments: 8
    },
    {
      id: 4,
      game: 'lol',
      gameLabel: 'League of Legends',
      category: { tr: 'Kadro', en: 'Roster' },
      date: '12.05.2024',
      title: {
        tr: 'Yaz Mevsimi Öncesi LoL Kadrosunda Sürpriz Revizyon!',
        en: 'Surprise Roster Revision in LoL Ahead of the Summer Split!'
      },
      desc: {
        tr: 'Şampiyonluk Ligi Yaz Mevsimi hedeflerimiz doğrultusunda, orta koridor pozisyonu için tecrübeli oyuncu transferi resmen tamamlandı.',
        en: 'In line with our Championship League Summer Split goals, the transfer of a highly experienced veteran player for the mid lane is officially completed.'
      },
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop',
      readTime: '7',
      comments: 18
    },
    {
      id: 5,
      game: 'cs',
      gameLabel: 'Counter-Strike 2',
      category: { tr: 'Strateji', en: 'Strategy' },
      date: '10.05.2024',
      title: {
        tr: 'CS2 Ekibimizin Yeni Antrenman Metotları ve Analiz Laboratuvarı',
        en: 'Our CS2 Team\'s New Practice Routines and Analysis Lab'
      },
      desc: {
        tr: 'Takım koçumuz, oyuncuların refleks ve pozisyonel doğruluklarını artırmak için devreye soktuğumuz yapay zeka destekli yeni antrenman programını anlattı.',
        en: 'Our team coach explained the new AI-powered training system implemented to boost reflex speed and tactical positioning accuracy.'
      },
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
      readTime: '5',
      comments: 15
    },
    {
      id: 6,
      game: 'apex',
      gameLabel: 'Apex Legends',
      category: { tr: 'Söyleşi', en: 'Interview' },
      date: '08.05.2024',
      title: {
        tr: 'Apex Legends Takım Kaptanımız ile Özel Söyleşi: "Hedef Dünya Kupası"',
        en: 'Exclusive Interview with Our Apex Legends Captain: "Targeting World Cup"'
      },
      desc: {
        tr: 'Bölgesel şampiyonlukların ardından kaptanımız, takımın şu anki kimyası, antrenman kampları ve önümüzdeki küresel hedefler hakkında sorularımızı yanıtladı.',
        en: 'Following regional triumphs, our captain shared insights on team synergy, training bootcamps, and upcoming global tournament goals.'
      },
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
      readTime: '8',
      comments: 31
    }
  ];

  // Filtered news based on selected game button
  const filteredNews = selectedGame === 'all'
    ? newsData
    : newsData.filter(item => item.game === selectedGame);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/register', { state: { prefilledEmail: email } });
    }
  };

  return (
    <div className="news-page page">
      <div className="news-container">
        {/* Main Column (70%) */}
        <div className="news-main-col">
          <header className="news-header">
            <span className="about-story-eyebrow">{T.subtitle}</span>
            <h1 className="news-title">
              FTNCC <span className="news-title-accent">{T.title}</span>
            </h1>
            <p className="news-desc">{T.desc}</p>
          </header>

          {/* Game Selection Buttons Bar with customized SVGs */}
          <div className="news-filters-bar">
            <button
              onClick={() => setSelectedGame('all')}
              className={`news-filter-btn news-filter-btn-text ${selectedGame === 'all' ? 'active-all' : ''}`}
            >
              {T.all}
            </button>

            <button
              onClick={() => setSelectedGame('lol')}
              className={`news-filter-btn news-filter-btn-icon ${selectedGame === 'lol' ? 'active-lol' : ''}`}
              title="League of Legends"
            >
              <LoLIcon />
            </button>

            <button
              onClick={() => setSelectedGame('cs')}
              className={`news-filter-btn news-filter-btn-icon ${selectedGame === 'cs' ? 'active-cs' : ''}`}
              title="Counter-Strike 2"
            >
              <CS2Icon />
            </button>

            <button
              onClick={() => setSelectedGame('apex')}
              className={`news-filter-btn news-filter-btn-icon ${selectedGame === 'apex' ? 'active-apex' : ''}`}
              title="Apex Legends"
            >
              <ApexIcon />
            </button>
          </div>

          {/* News Cards list with Framer Motion transitions */}
          <div className="news-list">
            <AnimatePresence mode="popLayout">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <motion.article
                    key={news.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="news-card"
                  >
                    {/* Left 16:9 Image wrapper */}
                    <div className="news-card-img-wrap">
                      <img src={news.image} alt={news.title[lang]} className="news-card-img" />

                      {/* Game Circle badge */}
                      <div className="news-card-game-badge">
                        {news.game === 'lol' && <LoLIcon />}
                        {news.game === 'cs' && <CS2Icon />}
                        {news.game === 'apex' && <ApexIcon />}
                      </div>
                    </div>

                    {/* Right Info Section */}
                    <div className="news-card-content">
                      <div className="news-card-meta">
                        <span className={`meta-game game-${news.game}`}>{news.gameLabel}</span>
                        <span className="meta-divider"></span>
                        <span className="meta-category">{news.category[lang]}</span>
                        <span className="meta-date">
                          <Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                          {news.date}
                        </span>
                      </div>

                      <h2 className="news-card-title">{news.title[lang]}</h2>
                      <p className="news-card-desc">{news.desc[lang]}</p>

                      <div className="news-card-footer">
                        <span className="news-card-read-time">
                          <Clock size={12} />
                          {news.readTime} {T.readTime}
                        </span>

                        <span className="news-card-comments">
                          <MessageSquare size={12} />
                          {news.comments} {T.comments}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="news-empty-state"
                >
                  <h3 className="empty-state-title">{T.emptyTitle}</h3>
                  <p className="empty-state-desc">{T.emptyDesc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Column (30%) */}
        <aside className="news-sidebar">
          {/* Newsletter subscription widget */}
          <div className="news-sidebar-widget">
            <h3 className="widget-title">{T.newsletterTitle}</h3>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="newsletter-success"
                style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'center', padding: '10px 0' }}
              >
                {T.newsletterSuccess}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <p className="newsletter-desc">{T.newsletterDesc}</p>
                <input
                  type="email"
                  required
                  placeholder={T.newsletterPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-submit-btn">
                  {T.newsletterBtn}
                </button>
              </form>
            )}
          </div>

          {/* Trending widget */}
          <div className="news-sidebar-widget">
            <h3 className="widget-title">{T.trendingTitle}</h3>
            <div className="trending-list">
              {newsData.slice(0, 3).map((item, index) => (
                <div key={item.id} className="trending-item" onClick={() => setSelectedGame(item.game)}>
                  <span className="trending-num">0{index + 1}</span>
                  <div className="trending-item-content">
                    <div className="trending-meta">
                      <span className={`meta-game game-${item.game}`}>{item.gameLabel}</span>
                    </div>
                    <h4 className="trending-title">{item.title[lang]}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us widget */}
          <div className="news-sidebar-widget">
            <h3 className="widget-title">{T.socialsTitle}</h3>
            <div className="socials-grid">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="socials-widget-btn">
                <TwitterSVG />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="socials-widget-btn">
                <YoutubeSVG />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="socials-widget-btn">
                <InstagramSVG />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="socials-widget-btn">
                <DiscordSVG />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
