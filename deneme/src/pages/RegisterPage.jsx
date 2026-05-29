import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, User, Lock, Phone, Calendar, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './RegisterPage.css';

// Zero-dependency secure password hashing using standard Web Crypto API
async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function RegisterPage({ lang, setCurrentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Prefilled email sent in React Router navigation state
  const prefilledEmail = location.state?.prefilledEmail || '';

  // Form Fields State
  const [email, setEmail] = useState(prefilledEmail);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  // Page States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const T = {
    tr: {
      title: 'AİLESİNE KATIL',
      subtitle: 'KAYIT FORMU',
      desc: 'FTNCC dünyasına adım at. Profilini oluştur, espor heyecanını yerinde yaşa.',
      emailLabel: 'E-Posta Adresi',
      nameLabel: 'Ad Soyad',
      passLabel: 'Şifre',
      phoneLabel: 'Telefon Numarası',
      dobLabel: 'Doğum Tarihi',
      submitBtn: 'KAYIT OL',
      submitting: 'KAYIT YAPILIYOR...',
      successTitle: 'KAYIT BAŞARILI!',
      successDesc: 'FTNCC ailemize hoş geldin! Hesabın başarıyla oluşturuldu. Profilin aktif edildi.',
      redirectText: 'saniye içinde anasayfaya yönlendiriliyorsunuz',
      duplicateErr: 'Bu e-posta adresi ile daha önce kayıt yapılmış!',
      genericErr: 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.',
    },
    en: {
      title: 'JOIN THE CLUB',
      subtitle: 'REGISTRATION FORM',
      desc: 'Step into the FTNCC universe. Create your profile, experience the esports thrill live.',
      emailLabel: 'Email Address',
      nameLabel: 'Full Name',
      passLabel: 'Password',
      phoneLabel: 'Phone Number',
      dobLabel: 'Date of Birth',
      submitBtn: 'REGISTER NOW',
      submitting: 'REGISTERING...',
      successTitle: 'REGISTRATION SUCCESSFUL!',
      successDesc: 'Welcome to the FTNCC pack! Your account has been created and activated successfully.',
      redirectText: 'seconds, you are being redirected to home',
      duplicateErr: 'This email address is already registered!',
      genericErr: 'Registration failed. Please try again.',
    }
  }[lang];

  // Auto-redirection countdown on registration success
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Generate SHA-256 hex string of the password
      const hashedPassword = await hashPassword(password);

      // 2. Perform insertion into the Supabase 'kullanicilar' table
      const { data, error: dbError } = await supabase
        .from('kullanicilar')
        .insert([
          {
            eposta: email,
            sifre_hash: hashedPassword,
            ad_soyad: fullName,
            telefon: phone,
            dogum_tarihi: dob
          }
        ])
        .select();

      if (dbError) throw dbError;

      // Auto login on successful registration
      if (data && data.length > 0 && setCurrentUser) {
        const registeredUser = data[0];
        setCurrentUser(registeredUser);
        localStorage.setItem('ftncc_user', JSON.stringify(registeredUser));
      }

      // 3. Trigger success screen
      setSuccess(true);
    } catch (err) {
      console.error('Registration API Error:', err);
      // Intercept PostgreSQL unique violation constraint error (23505) or general duplicate warnings
      if (
        err.code === '23505' ||
        err.message?.toLowerCase().includes('unique') ||
        err.message?.toLowerCase().includes('duplicate')
      ) {
        setError(T.duplicateErr);
      } else {
        setError(err.message || T.genericErr);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page page">
      <div className="register-container">

        {/* Animated layout block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="register-card"
        >
          {!success ? (
            <>
              {/* Form State */}
              <header className="register-header">
                <span className="about-story-eyebrow">{T.subtitle}</span>
                <h1 className="register-title">
                  FTNCC <span className="register-title-accent">{T.title}</span>
                </h1>
                <p className="register-subtitle">{T.desc}</p>
              </header>

              {/* Error Banner */}
              {error && (
                <div className="register-error-banner">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="register-form">
                <div className="register-form-grid">

                  {/* Prefilled Email (Editable in case they want to change it) */}
                  <div className="form-group form-group-full">
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

                  {/* Full Name */}
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

                  {/* Password with Visibility Toggle */}
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

                  {/* Phone */}
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

                  {/* Date of Birth */}
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

                </div>

                {/* Submit Action Button */}
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
            </>
          ) : (

            /* Success State */
            <div className="register-success-card">
              <div className="success-icon-wrap">
                <div className="success-pulse"></div>
                <CheckCircle size={48} />
              </div>
              <h2 className="success-title">{T.successTitle}</h2>
              <p className="success-desc">{T.successDesc}</p>

              {/* Circular timeline redirection */}
              <div className="success-timer">
                <div className="success-timer-circle">
                  {countdown}
                </div>
                <span className="success-timer-text">
                  {T.redirectText}
                </span>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
