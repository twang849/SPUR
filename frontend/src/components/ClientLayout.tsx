'use client';

import { useState, useEffect } from 'react';
import TermsModal from './TermsModal';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('ClientLayout mounted');
    setIsMounted(true);
    // Always show terms on page load
    setTermsAccepted(false);
  }, []);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  if (!isMounted) {
    console.log('ClientLayout not mounted yet');
    return children;
  }

  return (
    <>
      {!termsAccepted && <TermsModal onAccept={handleAcceptTerms} />}
      {children}
    </>
  );
}
