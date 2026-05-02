'use client';

// ─────────────────────────────────────────────────────────────────────────────
// ClientShell.tsx
// Place at: src/components/ClientShell.tsx
//
// Flow (SRS §3.1 → §3.2 → §3.3):
//   1. LoadingAnimation (3s, once per session)
//   2. SelectionFunnel modal
//   3. Header + page content + Footer
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ── Static imports — always needed ───────────────────────────────────────────
import Header from './layout/Header';
import Footer from './layout/Footer';

// ── Dynamic imports — loaded only when needed (SRS §4.1 performance) ─────────
const LoadingAnimation = dynamic(
  () => import('./LoadingAnimation'),
  { ssr: false }
);

const SelectionFunnel = dynamic(
  () => import('./SelectionFunnel'),
  { ssr: false }
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Step = 'loading' | 'funnel' | 'site';

interface ClientShellProps {
  children: React.ReactNode;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ClientShell({ children }: ClientShellProps) {
  const [step, setStep] = useState<Step>('loading');

  useEffect(() => {
    // Check what's already been completed this session
    const loadingPlayed = sessionStorage.getItem('saqafat_loading_played');
    const funnelDone    = sessionStorage.getItem('saqafat_funnel_done');

    if (loadingPlayed && funnelDone) {
      // Both done — go straight to site (page navigation, refreshes)
      setStep('site');
    } else if (loadingPlayed) {
      // Animation played but funnel not done yet
      setStep('funnel');
    }
    // else stay on 'loading' — LoadingAnimation will call onComplete
  }, []);

  return (
    <>
      {/* ── STEP 1: Loading animation ──────────────────────────────────
          Renders over everything. Calls onComplete when done.
          sessionStorage prevents replay on same session.
      ── */}
      {step === 'loading' && (
        <LoadingAnimation
          onComplete={() => setStep('funnel')}
        />
      )}

      {/* ── STEP 2: Selection Funnel ────────────────────────────────────
          Modal overlay. Saves branch/location to localStorage.
          Header location pin can reopen this at any time.
      ── */}
      {step === 'funnel' && (
        <SelectionFunnel
          onComplete={() => {
            sessionStorage.setItem('saqafat_funnel_done', '1');
            setStep('site');
          }}
        />
      )}

      {/* ── STEP 3: Full site ───────────────────────────────────────────
          Header sticks to top. Footer at bottom.
          <main> wraps page content for landmark accessibility.
      ── */}
      {step === 'site' && (
        <>
          <Header />
          <main
            id="main-content"
            style={{ paddingTop: '72px' }}  // offset for fixed 72px header
          >
            {children}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}