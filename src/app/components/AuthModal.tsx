'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login } = useAuth();

  // 'login' | 'signup'
  const [view, setView] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPass, setShowSignupPass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    // For now, parse first name from email prefix as demo
    const namePart = loginEmail.split('@')[0];
    const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    login({ firstName, lastName: '', email: loginEmail });
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    login({ firstName, lastName, email: signupEmail });
    onClose();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        .aq-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,5,3,0.72);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: aqFadeIn 0.22s ease;
        }

        @keyframes aqFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .aq-modal {
          position: relative;
          width: min(480px, 92vw);
          background: rgba(26,14,10,0.97);
          border: 1px solid rgba(216,154,91,0.22);
          border-radius: 18px;
          padding: 48px 44px 40px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          animation: aqSlideUp 0.28s ease;
        }

        @keyframes aqSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .aq-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(216,154,91,0.2);
          background: transparent;
          color: rgba(216,154,91,0.7);
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .aq-close:hover {
          background: rgba(216,154,91,0.12);
          color: #d89a5b;
        }

        .aq-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #faf0e4;
          text-align: center;
          margin: 0 0 6px;
          letter-spacing: 0.01em;
        }

        .aq-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(250,240,228,0.45);
          text-align: center;
          margin: 0 0 32px;
          letter-spacing: 0.04em;
        }

        .aq-divider {
          width: 40px;
          height: 1px;
          background: rgba(216,154,91,0.3);
          margin: 0 auto 28px;
        }

        .aq-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(216,154,91,0.7);
          margin-bottom: 8px;
        }

        .aq-field-wrap {
          position: relative;
          margin-bottom: 20px;
        }

        .aq-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(216,154,91,0.18);
          border-radius: 10px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #faf0e4;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }

        .aq-input::placeholder {
          color: rgba(250,240,228,0.2);
        }

        .aq-input:focus {
          border-color: rgba(216,154,91,0.55);
          box-shadow: 0 0 0 3px rgba(216,154,91,0.08);
        }

        .aq-pass-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(216,154,91,0.5);
          cursor: pointer;
          font-size: 15px;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .aq-pass-toggle:hover { color: #d89a5b; }

        .aq-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
        }

        .aq-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(250,240,228,0.5);
          cursor: pointer;
          user-select: none;
        }

        .aq-remember input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #d89a5b;
          cursor: pointer;
        }

        .aq-forgot {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #d89a5b;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
        }
        .aq-forgot:hover { opacity: 0.75; }

        .aq-btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #d89a5b 0%, #c4813f 100%);
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a0e0a;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(216,154,91,0.28);
          margin-bottom: 24px;
        }
        .aq-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(216,154,91,0.38);
        }
        .aq-btn-primary:active {
          transform: translateY(0);
        }

        .aq-or {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .aq-or-line {
          flex: 1;
          height: 1px;
          background: rgba(216,154,91,0.15);
        }
        .aq-or-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(250,240,228,0.3);
        }

        .aq-social {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .aq-social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border: 1px solid rgba(216,154,91,0.18);
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          color: rgba(250,240,228,0.7);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .aq-social-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(216,154,91,0.35);
        }

        .aq-switch {
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(250,240,228,0.45);
        }

        .aq-switch-link {
          color: #d89a5b;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .aq-switch-link:hover { opacity: 0.8; }

        .aq-name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 480px) {
          .aq-modal {
            padding: 36px 24px 32px;
          }
          .aq-name-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="aq-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="aq-modal" role="dialog" aria-modal="true">
          <button className="aq-close" onClick={onClose} aria-label="Close">✕</button>

          {view === 'login' ? (
            <>
              <h2 className="aq-title">Welcome Back</h2>
              <p className="aq-subtitle">Sign in to your account</p>
              <div className="aq-divider" />

              <form onSubmit={handleLogin}>
                <div className="aq-field-wrap">
                  <label className="aq-label" htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    className="aq-input"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="aq-field-wrap">
                  <label className="aq-label" htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type={showLoginPass ? 'text' : 'password'}
                    className="aq-input"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    style={{ paddingRight: '44px' }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="aq-pass-toggle"
                    onClick={() => setShowLoginPass((p) => !p)}
                    aria-label={showLoginPass ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPass ? '🙈' : '👁'}
                  </button>
                </div>

                <div className="aq-row">
                  <label className="aq-remember">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="aq-forgot">Forgot Password?</a>
                </div>

                <button type="submit" className="aq-btn-primary">Login</button>
              </form>

              <div className="aq-or">
                <div className="aq-or-line" />
                <span className="aq-or-text">Or login with</span>
                <div className="aq-or-line" />
              </div>

              <div className="aq-social">
                <a href="/api/auth/google" className="aq-social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </a>
                <a href="/api/auth/facebook" className="aq-social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </div>

              <p className="aq-switch">
                Don't have an account?
                <span className="aq-switch-link" onClick={() => setView('signup')}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <h2 className="aq-title">Create Account</h2>
              <p className="aq-subtitle">Join Saqafat Bakery & Cafe</p>
              <div className="aq-divider" />

              <form onSubmit={handleSignup}>
                <div className="aq-name-row">
                  <div className="aq-field-wrap">
                    <label className="aq-label" htmlFor="signup-fname">First Name</label>
                    <input
                      id="signup-fname"
                      type="text"
                      className="aq-input"
                      placeholder="Hira"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="aq-field-wrap">
                    <label className="aq-label" htmlFor="signup-lname">Last Name</label>
                    <input
                      id="signup-lname"
                      type="text"
                      className="aq-input"
                      placeholder="Safdar"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="aq-field-wrap">
                  <label className="aq-label" htmlFor="signup-email">Email</label>
                  <input
                    id="signup-email"
                    type="email"
                    className="aq-input"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="aq-field-wrap">
                  <label className="aq-label" htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type={showSignupPass ? 'text' : 'password'}
                    className="aq-input"
                    placeholder="Min 8 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={8}
                    style={{ paddingRight: '44px' }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="aq-pass-toggle"
                    onClick={() => setShowSignupPass((p) => !p)}
                    aria-label={showSignupPass ? 'Hide password' : 'Show password'}
                  >
                    {showSignupPass ? '🙈' : '👁'}
                  </button>
                </div>

                <button type="submit" className="aq-btn-primary" style={{ marginTop: '6px' }}>
                  Create Account
                </button>
              </form>

              <div className="aq-or">
                <div className="aq-or-line" />
                <span className="aq-or-text">Or sign up with</span>
                <div className="aq-or-line" />
              </div>

              <div className="aq-social">
                <a href="/api/auth/google" className="aq-social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </a>
                <a href="/api/auth/facebook" className="aq-social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </div>

              <p className="aq-switch">
                Already have an account?
                <span className="aq-switch-link" onClick={() => setView('login')}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
