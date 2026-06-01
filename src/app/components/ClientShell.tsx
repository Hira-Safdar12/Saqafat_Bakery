'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Header from './layout/Header';
import Footer from './layout/Footer';
import AIChatbot from './AIChatbot';

const LoadingAnimation = dynamic(
  () => import('./LoadingAnimation'),
  { ssr: false }
);

const SelectionFunnel = dynamic(
  () => import('./SelectionFunnel'),
  { ssr: false }
);

type Step = 'loading' | 'funnel' | 'site';

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({
  children,
}: ClientShellProps) {
  const [step, setStep] = useState<Step>('loading');

  useEffect(() => {
    const loadingPlayed = sessionStorage.getItem(
      'saqafat_loading_played'
    );

    const funnelDone = sessionStorage.getItem(
      'saqafat_funnel_done'
    );

    if (loadingPlayed && funnelDone) {
      setStep('site');
    } else if (loadingPlayed) {
      setStep('funnel');
    }
  }, []);

  return (
    <>
      {step === 'loading' && (
        <LoadingAnimation
          onComplete={() => setStep('funnel')}
        />
      )}

      {step === 'funnel' && (
        <SelectionFunnel
          onComplete={() => {
            sessionStorage.setItem(
              'saqafat_funnel_done',
              '1'
            );

            setStep('site');
          }}
        />
      )}

      {step === 'site' && (
        <>
          <Header />

          <main
            id="main-content"
            style={{
              paddingTop: '72px',
            }}
          >
            {children}
          </main>

          <Footer />

          {/* AI Chatbot */}
          <AIChatbot />
        </>
      )}
    </>
  );
}