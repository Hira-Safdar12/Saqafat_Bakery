'use client';

import { useState, useEffect } from 'react';
import './SelectionFunnel.css';

interface SelectionFunnelProps {
  onComplete: () => void;
}

interface FunnelState {
  branch:   string;
  location: string;
  mood:     string;
}

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
  'Satellite Town - Sgd':    ['Satellite Town', 'Block A', 'Block B', 'Block C'],
  'Zafar Ullah Chowk - Sgd': ['Zafar Ullah Chowk', 'Kutchery Road', 'Railway Road'],
  'City Road - Sgd':         ['City Road', 'Adalat Road', 'Cantt'],
  'Shaheed Road - Bhalwal':  ['Shaheed Road', 'Main Bhalwal', 'Chak 73'],
};

const moods = [
  { value: 'yes',    label: "Yes! 😋"          },
  { value: 'yayyyy', label: "Yayyyy! 🎉"        },
  { value: 'no',     label: "No (I'm lying) 😏" },
];

export default function SelectionFunnel({ onComplete }: SelectionFunnelProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [form, setForm] = useState<FunnelState>({
    branch:   '',
    location: '',
    mood:     'yes',
  });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => { setLeaving(false); setVisible(true); };
    window.addEventListener('saqafat:open-funnel', handler);
    return () => window.removeEventListener('saqafat:open-funnel', handler);
  }, []);

  const handleContinue = () => {
    localStorage.setItem('branch',   form.branch);
    localStorage.setItem('location', form.location);
    localStorage.setItem('mood',     form.mood);
    setLeaving(true);
    setTimeout(() => onComplete(), 480);
  };

  const locations = form.branch ? locationsByBranch[form.branch] || [] : [];

  const cardClass = [
    'sf-card',
    visible ? 'sf-card-in'  : '',
    leaving ? 'sf-card-out' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`sf-page${leaving ? ' sf-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sf-title"
    >
      {/* ── Logo only — no text beneath ── */}
      <div className="sf-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/saqafatlogo.png" alt="Saqafat Bakery & Cafe" className="sf-logo" />
      </div>

      {/* ── Slide-up card ── */}
      <div className={cardClass}>

        <h2 id="sf-title" className="sf-title">Welcome to Saqafat</h2>

        {/* Field 1 — Location (required) */}
        <div className="sf-field">
          <label className="sf-label" htmlFor="sf-branch">
            Location <span className="sf-required">*</span>
          </label>
          <div className="sf-select-wrap">
            <select
              id="sf-branch"
              className="sf-input"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value, location: '' })}
              aria-required="true"
            >
              <option value="" disabled>Select your nearest branch</option>
              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* Field 2 — Area (optional) */}
        <div className="sf-field">
          <label className="sf-label" htmlFor="sf-location">
            Area <span className="sf-required">*</span>
            <span className="sf-optional">optional</span>
          </label>
          <div className="sf-select-wrap">
            <select
              id="sf-location"
              className="sf-input"
              value={form.location}
              disabled={!form.branch}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            >
              <option value="">
                {form.branch ? 'Select your area' : 'Select a location first'}
              </option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Field 3 — Mood (no asterisk) */}
        <div className="sf-field">
          <span className="sf-question-label">
            Are you ready to Saqafatify your tastebuds?
          </span>
          <div className="sf-select-wrap sf-select-wrap--no-chevron">
            <select
              id="sf-mood"
              className="sf-input"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
            >
              {moods.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
        </div>

        {/* CTA */}
        <button
          className="sf-btn"
          disabled={!form.branch}
          onClick={handleContinue}
          aria-label="Continue to Saqafat"
        >
          {form.branch
            ? `Let's Go ${form.mood === 'yes' ? '😋' : form.mood === 'yayyyy' ? '🎉' : '😏'} →`
            : 'Select a location to continue'
          }
        </button>

        {/* Skip */}
        <button className="sf-skip" onClick={handleContinue}>
          Skip for now — just let me browse
        </button>

      </div>
    </div>
  );
}
