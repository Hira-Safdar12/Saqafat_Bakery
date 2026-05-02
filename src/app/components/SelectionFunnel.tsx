'use client';

import { useState, useEffect } from 'react';
import './SelectionFunnel.css';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface SelectionFunnelProps {
  onComplete: () => void;
}

interface FunnelState {
  branch:   string;
  location: string;
  mood:     string;
}

// ─── DATA — SRS §3.2 exact branch list ───────────────────────────────────────
const branches = [
  'Queen Chowk - Sgd',
  'University Road - Sgd',
  'Satellite Town - Sgd',
  'Zafar Ullah Chowk - Sgd',
  'City Road - Sgd',
  'Shaheed Road - Bhalwal',
];

const locationsByBranch: Record<string, string[]> = {
  'Queen Chowk - Sgd':       ['Queen Chowk', 'Peoples Colony', 'Civil Lines', 'Model Town', 'Satellite Town'],
  'University Road - Sgd':   ['University Road', 'Allama Iqbal Colony', 'Gulshan Colony', 'Faisal Colony'],
  'Satellite Town - Sgd':    ['Satellite Town', 'Block A', 'Block B', 'Block C', 'Block D', 'Block E'],
  'Zafar Ullah Chowk - Sgd': ['Zafar Ullah Chowk', 'Kutchery Road', 'Railway Road', 'Iqbal Nagar'],
  'City Road - Sgd':         ['City Road', 'Adalat Road', 'Cantt', 'Sanda Road', 'Liaquat Road'],
  'Shaheed Road - Bhalwal':  ['Shaheed Road', 'Main Bhalwal', 'Chak 73', 'Chak 74'],
};

// SRS §3.2 — exact mood options
const moods = [
  { value: 'yes',    label: "Yes! 😋"          },
  { value: 'yayyyy', label: "Yayyyy! 🎉"        },
  { value: 'no',     label: "No (I'm lying) 😏" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function SelectionFunnel({ onComplete }: SelectionFunnelProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [form,    setForm   ] = useState<FunnelState>({
    branch:   '',
    location: '',
    mood:     moods[0].value,
  });

  // Fade in on mount
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(id);
  }, []);

  // Reopen via header location pin (SRS §3.2)
  useEffect(() => {
    const handler = () => { setLeaving(false); setVisible(true); };
    window.addEventListener('saqafat:open-funnel', handler);
    return () => window.removeEventListener('saqafat:open-funnel', handler);
  }, []);

  const handleContinue = () => {
    // Save to localStorage — persists across pages (SRS §3.2)
    localStorage.setItem('saqafat_branch',   form.branch   || '');
    localStorage.setItem('saqafat_location', form.location || '');
    localStorage.setItem('saqafat_mood',     form.mood);
    setLeaving(true);
    setTimeout(() => onComplete(), 500);
  };

  const locations = form.branch ? locationsByBranch[form.branch] ?? [] : [];

  const overlayClass = [
    'sf-overlay',
    visible ? 'sf-in'  : '',
    leaving ? 'sf-out' : '',
  ].filter(Boolean).join(' ');

  const modalClass = [
    'sf-modal',
    visible ? 'sf-in'  : '',
    leaving ? 'sf-out' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sf-title"
    >
      {/* Floating food illustrations — left (SRS §3.2) */}
      <div className="sf-food-left" aria-hidden="true">
        🍞<br />🥐<br />🎂
      </div>

      {/* Floating food illustrations — right (SRS §3.2) */}
      <div className="sf-food-right" aria-hidden="true">
        ☕<br />🧁<br />🍩
      </div>

      <div className={modalClass}>

        {/* ── Dark branded header ── */}
        <div className="sf-header">
          <div className="sf-header-glow" aria-hidden="true" />
          <div className="sf-logo-text">SAQAFAT</div>
          <div className="sf-logo-sub">Bakery &amp; Cafe</div>
          <div className="sf-header-rule" />
          <h2 id="sf-title">Where are you ordering from?</h2>
          <p>We'll personalise your experience based on your branch.</p>
        </div>

        {/* ── Form body ── */}
        <div className="sf-body">

          {/* Eyebrow — consistent with all sections */}
          <div className="sf-eyebrow">
            <span className="sf-eyebrow-line" />
            <span className="sf-eyebrow-text">3 Quick Questions</span>
            <span className="sf-eyebrow-line" />
          </div>

          {/* ── Q1: Branch (required) — SRS §3.2 ── */}
          <div className="sf-field">
            <label className="sf-label" htmlFor="sf-branch">
              1. Select Branch <span className="sf-required">*</span>
            </label>
            <select
              id="sf-branch"
              className="sf-select"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value, location: '' })}
              aria-required="true"
            >
              {/* SRS §3.2 exact default text */}
              <option value="" disabled>Select your nearest branch.</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* ── Q2: Location (dynamic, optional) — SRS §3.2 ── */}
          <div className="sf-field">
            <label className="sf-label" htmlFor="sf-location">
              2. Delivery Area
              <span className="sf-label-note">(optional)</span>
            </label>
            <select
              id="sf-location"
              className="sf-select"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              disabled={!form.branch}
              aria-label="Select your delivery location"
            >
              {/* SRS §3.2 exact default text */}
              <option value="">
                {form.branch ? 'Select your location' : 'Select a branch first'}
              </option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* ── Q3: Engagement — SRS §3.2 exact question ── */}
          <div className="sf-field">
            <p className="sf-question">
              3. Are you ready to{' '}
              <span className="sf-question-accent">Saqafatify</span>{' '}
              your taste buds?
            </p>
            <select
              id="sf-mood"
              className="sf-select"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
              aria-label="Are you ready to Saqafatify your taste buds?"
            >
              {moods.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* ── Progress dots ── */}
          <div className="sf-dots" aria-hidden="true">
            <div className={`sf-dot${form.branch   ? ' sf-dot-active' : ''}`} />
            <div className={`sf-dot${form.location ? ' sf-dot-active' : ''}`} />
            <div className="sf-dot sf-dot-active" />
          </div>

          {/* ── Continue button — activates after branch selected (SRS §3.2) ── */}
          <button
            className="sf-btn"
            onClick={handleContinue}
            disabled={!form.branch}
            aria-label="Continue to Saqafat"
          >
            <span className="sf-btn-inner">
              {form.branch
                ? `Let's Go! ${
                    form.mood === 'yes'    ? '😋' :
                    form.mood === 'yayyyy' ? '🎉' : '😏'
                  }`
                : 'Select a branch to continue'
              }
              {form.branch && <span className="sf-btn-arrow">→</span>}
            </span>
            <span className="sf-btn-shine" aria-hidden="true" />
          </button>

          {/* ── Skip link (SRS §3.2 — for browsing without ordering) ── */}
          <button
            className="sf-skip"
            onClick={handleContinue}
            aria-label="Skip and browse without selecting a branch"
          >
            Skip for now — just let me browse
          </button>

        </div>
      </div>
    </div>
  );
}