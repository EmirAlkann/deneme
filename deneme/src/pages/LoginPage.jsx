import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './LoginPage.css';
import './RegisterPage.css'; // Reuses sharing inputs classes

// Zero-dependency secure password hashing using standard Web Crypto API
async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginPage({ lang, setCurrentUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse custom target redirect query parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/';

  // Form Fields State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Page States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3); // Fast 3s redirect on login

  const T = {
    tr: {
      title: 'GİRİŞ YAP',
      subtitle: 'HOŞ GELDİNİZ',
      desc: 'FTNCC hesabına giriş yap, espor dünyasından geri kalma.',
      emailLabel: 'E-Posta Adresi',
      passLabel: 'Şifre',
      submitBtn: 'GİRİŞ YAP',
      submitting: 'GİRİŞ YAPILIYOR...',
      noAccount: 'Henüz hesabınız yok mu?',
      registerLink: 'Kayıt Ol',
      successTitle: 'GİRİŞ BAŞARILI!',
      successDesc: 'Sisteme başarıyla giriş yaptınız. Profilinize yönlendiriliyorsunuz.',
      redirectText: 'saniye içinde anasayfaya yönlendiriliyorsunuz',
      invalidCreds: 'E-posta veya şifre hatalı!',
      genericErr: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    en: {
      title: 'LOG IN',
      subtitle: 'WELCOME BACK',
      desc: 'Log in to your FTNCC account, stay tuned in the esports world.',
      emailLabel: 'Email Address',
      passLabel: 'Password',
      submitBtn: 'LOG IN',
      submitting: 'LOGGING IN...',
      noAccount: "Don't have an account?",
      registerLink: 'Register',
      successTitle: 'LOGIN SUCCESSFUL!',
      successDesc: 'You have logged in successfully. Redirecting to your profile.',
      redirectText: 'seconds, you are being redirected to home',
      invalidCreds: 'Incorrect email or password!',
      genericErr: 'An error occurred. Please try again.',
    }
  }[lang];

  // Auto-redirection countdown on login success
  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate(redirectUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [success, navigate, redirectUrl]);

  const getRedirectMessage = () => {
    if (lang === 'tr') {
      return redirectUrl === '/apply'
        ? 'başvuru sayfasına yönlendiriliyorsunuz'
        : 'anasayfaya yönlendiriliyorsunuz';
    } else {
      return redirectUrl === '/apply'
        ? 'you are being redirected to the application page'
        : 'you are being redirected to home';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Retrieve the user record from the database matching the email
      const { data: user, error: dbError } = await supabase
        .from('kullanicilar')
        .select('*')
        .eq('eposta', email.trim().toLowerCase())
        .maybeSingle();

      if (dbError) throw dbError;

      // 2. Validate row existence
      if (!user) {
        setError(T.invalidCreds);
        setLoading(false);
        return;
      }

      // 3. Generate the SHA-256 hash of the input password
      const hashedPassword = await hashPassword(password);

      // 4. Match hashes client-side
      if (user.sifre_hash !== hashedPassword) {
        setError(T.invalidCreds);
        setLoading(false);
        return;
      }

      // 5. Establish the session
      setCurrentUser(user);
      localStorage.setItem('ftncc_user', JSON.stringify(user));

      // 6. Trigger success view
      setSuccess(true);
    } catch (err) {
      console.error('Login API Error:', err);
      setError(err.message || T.genericErr);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page page">
      <div className="login-container">
        
        {/* Animated layout block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-card"
        >
          {!success ? (
            <>
              {/* Form Header */}
              <header className="login-header">
                <span className="about-story-eyebrow">{T.subtitle}</span>
                <h1 className="login-title">
                  FTNCC <span className="login-title-accent">{T.title}</span>
                </h1>
                <p className="login-subtitle">{T.desc}</p>
              </header>

              {/* Error Banner */}
              {error && (
                <div className="login-error-banner">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                
                {/* Email input */}
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

                {/* Password input with Toggle Eye */}
                <div className="form-group">
                  <label className="form-label">{T.passLabel}</label>
                  <div className="form-input-wrap">
                    <Lock size={16} className="form-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-btn"
                      title={showPassword ? 'Gizle' : 'Göster'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="register-submit-btn"
                >
                  {loading ? (
                    <>
                      <div className="btn-spinner"></div>
                      <span>{T.submitting}</span>
                    </>
                  ) : (
                    <span>{T.submitBtn}</span>
                  )}
                </button>
              </form>

              {/* Toggle to Register page */}
              <div className="form-footer-links">
                <span>{T.noAccount}</span>
                <Link to="/register" className="form-redirect-link">
                  {T.registerLink}
                </Link>
              </div>
            </>
          ) : (
            
            /* Success State */
            <div className="login-success-card">
              <div className="success-icon-wrap">
                <div className="success-pulse"></div>
                <CheckCircle size={48} />
              </div>
              <h2 className="success-title">{T.successTitle}</h2>
              <p className="success-desc">{T.successDesc}</p>
              
              {/* Timeline countdown */}
              <div className="success-timer">
                <div className="success-timer-circle">
                  {countdown}
                </div>
                <span className="success-timer-text">
                  {countdown} {getRedirectMessage()}
                </span>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
