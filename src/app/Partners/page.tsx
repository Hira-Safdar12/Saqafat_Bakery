'use client';

import { useState } from 'react';
import Image from 'next/image';
import './partners.css';

// =============================================================================
// TYPES
// =============================================================================
type PartnerType = 'franchise' | 'catering' | 'investor' | null;

interface FormState {
  name:        string;
  email:       string;
  phone:       string;
  company:     string;
  city:        string;
  message:     string;
  partnerType: string;
}

// =============================================================================
// DATA
// =============================================================================
const partnerCards = [
  {
    id:      'franchise' as PartnerType,
    icon:    '🏪',
    title:   'Franchise Opportunities',
    text:    'Open your own Saqafat branch and be part of our growing family.',
    cta:     'Become a Franchisee',
    color:   '#5C2E0E',
  },
  {
    id:      'catering' as PartnerType,
    icon:    '💼',
    title:   'Corporate Catering',
    text:    'Let Saqafat cater your next corporate event or office meal.',
    cta:     'Request Catering Services',
    color:   '#A0673A',
  },
  {
    id:      'investor' as PartnerType,
    icon:    '🤝',
    title:   'Investor Inquiries',
    text:    "Interested in investing in Pakistan's fastest-growing food brand?",
    cta:     'Contact Us',
    color:   '#C97B3A',
  },
];

const stats = [
  { value: '10+',    label: 'Branches Nationwide', icon: '🏪' },
  { value: '50,000+',label: 'Happy Customers',     icon: '😋' },
  { value: '4.8/5',  label: 'Average Rating',      icon: '⭐' },
  { value: '15 Yrs', label: 'Of Excellence',        icon: '🏆' },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function PartnersPage() {
  const [modalType, setModalType] = useState<PartnerType>(null);

  return (
    <div className="pp-root">

      {/* ── HERO — SRS §3.8.1 ── */}
      <section className="pp-hero" aria-label="Partners hero">
        {/* Background image */}
        <div className="pp-hero-img-wrap">
          <Image
            src="/images/partners-hero.jpg"
            alt="Saqafat franchise location"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Overlays */}
        <div className="pp-hero-overlay" />
        <div className="pp-hero-vignette" />
        <div className="pp-hero-glow" />

        {/* Content */}
        <div className="pp-hero-content">
          <div className="pp-eyebrow">
            <span className="pp-eyebrow-line" />
            <span className="pp-eyebrow-text">Grow With Us</span>
            <span className="pp-eyebrow-line" />
          </div>

          {/* SRS §3.8.1 exact headline */}
          <h1 className="pp-hero-h1">
            Join the Saqafat{' '}
            <span className="pp-hero-accent">Revolution</span>
          </h1>

          {/* SRS §3.8.1 exact subheadline */}
          <p className="pp-hero-sub">
            Partner with us to bring authentic flavors to your city
          </p>

          <button
            className="pp-hero-cta"
            onClick={() => {
              document.getElementById('pp-cards')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="pp-btn-inner">
              Explore Opportunities
              <span className="pp-btn-arrow">↓</span>
            </span>
            <span className="pp-btn-shine" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ── STATS — SRS §3.8.4 ── */}
      <section className="pp-stats" aria-label="Why partner with Saqafat">
        <div className="pp-stats-inner">
          <div className="pp-section-head">
            <div className="pp-eyebrow">
              <span className="pp-eyebrow-line" />
              <span className="pp-eyebrow-text">Why Saqafat</span>
              <span className="pp-eyebrow-line" />
            </div>
            <h2 className="pp-section-title">
              A Brand Built on{' '}
              <span className="pp-accent">Trust & Taste</span>
            </h2>
            <p className="pp-section-sub">
              Backed by 15 years of excellence and thousands of loyal customers across Pakistan.
            </p>
          </div>

          <div className="pp-stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="pp-stat-card">
                <span className="pp-stat-icon">{s.icon}</span>
                <span className="pp-stat-value">{s.value}</span>
                <span className="pp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP CARDS — SRS §3.8.2 ── */}
      <section className="pp-cards-section" id="pp-cards" aria-label="Partnership types">
        <div className="pp-section-head">
          <div className="pp-eyebrow">
            <span className="pp-eyebrow-line" />
            <span className="pp-eyebrow-text">Partnership Options</span>
            <span className="pp-eyebrow-line" />
          </div>
          <h2 className="pp-section-title">
            Choose Your{' '}
            <span className="pp-accent">Path</span>
          </h2>
          <p className="pp-section-sub">
            Three ways to be part of Pakistan's fastest-growing bakery brand.
          </p>
        </div>

        <div className="pp-cards-grid">
          {partnerCards.map((card) => (
            <div key={card.id} className="pp-card">
              {/* Icon circle */}
              <div
                className="pp-card-icon"
                style={{ background: `${card.color}18`, border: `1.5px solid ${card.color}30` }}
              >
                <span>{card.icon}</span>
              </div>

              <h3 className="pp-card-title">{card.title}</h3>
              <p className="pp-card-text">{card.text}</p>

              <button
                className="pp-card-btn"
                onClick={() => setModalType(card.id)}
                aria-label={`${card.cta} — opens inquiry form`}
              >
                <span className="pp-btn-inner">
                  {card.cta}
                  <span className="pp-btn-arrow">→</span>
                </span>
                <span className="pp-btn-shine" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM MODAL — SRS §3.8.3 ── */}
      {modalType && (
        <ContactModal
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}

    </div>
  );
}

// =============================================================================
// CONTACT MODAL — SRS §3.8.3
// =============================================================================
function ContactModal({
  type,
  onClose,
}: {
  type:    NonNullable<PartnerType>;
  onClose: () => void;
}) {
  const card = partnerCards.find((c) => c.id === type)!;

  const [form, setForm] = useState<FormState>({
    name:        '',
    email:       '',
    phone:       '',
    company:     '',
    city:        '',
    message:     '',
    partnerType: card.title, // auto-filled per SRS §3.8.3
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading  ] = useState(false);
  const [errors,    setErrors   ] = useState<Partial<FormState>>({});

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    if (!form.phone.trim())   e.phone   = 'Phone is required';
    if (!form.city.trim())    e.city    = 'City is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const body =
`New ${form.partnerType} Inquiry

Name:         ${form.name}
Email:        ${form.email}
Phone:        ${form.phone}
Company:      ${form.company || 'N/A'}
City:         ${form.city}
Partner Type: ${form.partnerType}

Message:
${form.message}`;

    // Send email to partners — SRS §3.8.3
    window.location.href =
      `mailto:partners@saqafatbakery.com?subject=${encodeURIComponent(`${form.partnerType} Inquiry — ${form.name}`)}&body=${encodeURIComponent(body)}`;

    setLoading(false);
    setSubmitted(true);
  };

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="pp-overlay"
      onClick={handleOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pp-modal-title"
    >
      <div className="pp-modal">

        {/* Modal header */}
        <div className="pp-modal-header">
          <div className="pp-modal-header-glow" aria-hidden="true" />
          <span className="pp-modal-icon">{card.icon}</span>
          <h2 id="pp-modal-title" className="pp-modal-title">{card.title}</h2>
          <p className="pp-modal-sub">Fill in your details and we'll get back to you within 48 hours.</p>
          <button
            className="pp-modal-close"
            onClick={onClose}
            aria-label="Close form"
          >✕</button>
        </div>

        {/* Success state — SRS §3.8.3 */}
        {submitted ? (
          <div className="pp-success">
            <div className="pp-success-icon">✓</div>
            <h3 className="pp-success-title">Thank You!</h3>
            {/* SRS §3.8.3 exact confirmation message */}
            <p className="pp-success-msg">
              We'll reach out within 48 hours to discuss your{' '}
              <strong>{card.title.toLowerCase()}</strong> inquiry.
            </p>
            <button className="pp-card-btn" onClick={onClose} style={{ marginTop: '8px' }}>
              <span className="pp-btn-inner">Close</span>
              <span className="pp-btn-shine" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <form className="pp-form" onSubmit={handleSubmit} noValidate>

            {/* Partnership type — auto-filled, read-only (SRS §3.8.3) */}
            <div className="pp-field">
              <label className="pp-label">Partnership Type</label>
              <input
                className="pp-input pp-input-readonly"
                value={form.partnerType}
                readOnly
                aria-label="Partnership type (auto-filled)"
              />
            </div>

            {/* Row: Name + Email */}
            <div className="pp-field-row">
              <div className="pp-field">
                <label className="pp-label" htmlFor="pp-name">
                  Full Name <span className="pp-required">*</span>
                </label>
                <input
                  id="pp-name"
                  className={`pp-input${errors.name ? ' pp-input-error' : ''}`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
                {errors.name && <span className="pp-error-msg">{errors.name}</span>}
              </div>

              <div className="pp-field">
                <label className="pp-label" htmlFor="pp-email">
                  Email <span className="pp-required">*</span>
                </label>
                <input
                  id="pp-email"
                  className={`pp-input${errors.email ? ' pp-input-error' : ''}`}
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
                {errors.email && <span className="pp-error-msg">{errors.email}</span>}
              </div>
            </div>

            {/* Row: Phone + City */}
            <div className="pp-field-row">
              <div className="pp-field">
                <label className="pp-label" htmlFor="pp-phone">
                  Phone Number <span className="pp-required">*</span>
                </label>
                <input
                  id="pp-phone"
                  className={`pp-input${errors.phone ? ' pp-input-error' : ''}`}
                  placeholder="03XX XXXXXXX"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
                {errors.phone && <span className="pp-error-msg">{errors.phone}</span>}
              </div>

              <div className="pp-field">
                <label className="pp-label" htmlFor="pp-city">
                  City / Location <span className="pp-required">*</span>
                </label>
                <input
                  id="pp-city"
                  className={`pp-input${errors.city ? ' pp-input-error' : ''}`}
                  placeholder="Your city"
                  value={form.city}
                  onChange={set('city')}
                  autoComplete="address-level2"
                />
                {errors.city && <span className="pp-error-msg">{errors.city}</span>}
              </div>
            </div>

            {/* Company — optional per SRS §3.8.3 */}
            <div className="pp-field">
              <label className="pp-label" htmlFor="pp-company">
                Company
                <span className="pp-optional">(optional)</span>
              </label>
              <input
                id="pp-company"
                className="pp-input"
                placeholder="Company or organisation name"
                value={form.company}
                onChange={set('company')}
                autoComplete="organization"
              />
            </div>

            {/* Message */}
            <div className="pp-field">
              <label className="pp-label" htmlFor="pp-message">
                Message / Inquiry Details <span className="pp-required">*</span>
              </label>
              <textarea
                id="pp-message"
                className={`pp-input pp-textarea${errors.message ? ' pp-input-error' : ''}`}
                placeholder="Tell us about your interest, investment capacity, city you're targeting, etc."
                rows={4}
                value={form.message}
                onChange={set('message')}
              />
              {errors.message && <span className="pp-error-msg">{errors.message}</span>}
            </div>

            {/* Actions */}
            <div className="pp-form-actions">
              <button
                type="submit"
                className="pp-submit-btn"
                disabled={loading}
                aria-label="Submit inquiry"
              >
                <span className="pp-btn-inner" style={{ position:'relative', zIndex:1 }}>
                  {loading ? 'Sending…' : 'Submit Inquiry'}
                  {!loading && <span className="pp-btn-arrow">→</span>}
                </span>
                <span className="pp-btn-shine" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="pp-cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}