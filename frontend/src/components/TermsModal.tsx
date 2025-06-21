'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface TermsModalProps {
  onAccept: () => void;
}

export default function TermsModal({ onAccept }: TermsModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('TermsModal mounted - showing terms');
    // Always show terms on page load
    setIsVisible(true);
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('termsAccepted', 'true');
      }
      setIsVisible(false);
      onAccept();
    } catch (error) {
      console.error('Error accepting terms:', error);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
    setHasScrolled(isAtBottom);
  };

  if (isLoading) {
    console.log('TermsModal loading...');
    return null;
  }

  // Animation variants with proper TypeScript types
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  };

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.97
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring' as const,
        damping: 20,
        stiffness: 250,
        mass: 0.8,
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      transition: { 
        duration: 0.35,
        ease: 'easeIn'
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          <motion.div
            variants={modalVariants}
            className="relative max-h-[60vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl"
          >
            <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">Terms and Conditions</h2>
            </div>
            
            <div 
              className="p-6 overflow-y-auto max-h-[60vh] text-black"
              onScroll={handleScroll}
            >
              <div className="max-w-3xl mx-auto text-black space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Consent, Acknowledgement, and Terms of Use</h3>
                  <p className="mb-6">Welcome to AI-Therapist. Please read the following carefully. By proceeding, you affirm that you fully understand and agree to each of the points below.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">1. Nature of Service</h4>
                    <p>I acknowledge that: This platform is powered by artificial intelligence and not by a human clinician. The AI provides informational guidance and supportive conversation only—it does not diagnose, treat, or cure any mental-health condition. I should not regard its suggestions as medical advice or a substitute for professional therapy.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">2. Privacy & Data Use</h4>
                    <p>I understand and agree that: My chat interactions will be anonymized, encrypted in transit, and stored securely on servers compliant with industry standards (e.g., ISO 27001, SOC 2). De-identified conversation logs may be used for research, service improvement, algorithm training, and quality assurance. No personally identifiable information (PII) will be shared with third parties without my explicit consent, except as required by law.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">3. Cookies & Tracking</h4>
                    <p>I consent to: The use of cookies and similar tracking technologies to maintain session state, remember preferences, and analyze usage patterns. Reviewing the full Cookie Policy for details on how tracking works and how I can manage my preferences.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">4. Terms of Service & Liability</h4>
                    <p>I agree that: I have reviewed the full Terms of Service, including all disclaimers, limitations of liability, and user responsibilities. The service is provided "as is" without warranties of any kind. The developers and operators disclaim liability for any outcomes resulting from my use of the AI's suggestions. Any decisions or actions I take based on AI interactions are my sole responsibility.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">5. Consent Withdrawal & Data Deletion</h4>
                    <p>I acknowledge that: I may withdraw my consent for data collection at any time by visiting Settings → Privacy, or by contacting support. Upon withdrawal, no new chat sessions will be permitted, and I can request deletion or irreversible anonymization of my stored data as described in the Privacy Policy.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">6. Updates to Policies</h4>
                    <p>I understand: The Privacy Policy, Terms of Service, and Cookie Policy may be updated periodically. I will be notified of material changes and may be required to re-consent to continue using the service.</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">7. Emergency & Crisis Disclaimer</h4>
                    <p>I recognize that: This AI-Therapist is not designed or certified for crisis intervention or emergency mental-health care. In the event of self-harm ideation, suicidal thoughts, or any acute mental-health crisis, I will immediately contact local emergency services or a qualified mental-health professional or call a suicide prevention hotline (e.g., 988 in the U.S., or my country's equivalent).</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">8. Contact & Support</h4>
                    <p>For questions about these terms or to exercise any rights (data access, correction, deletion), I may email <a href="mailto:support@ai-therapist.example.com" className="text-blue-600 hover:underline">support@ai-therapist.example.com</a> or visit <a href="http://www.ai-therapist.example.com/contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.ai-therapist.example.com/contact</a>.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 250,
                  damping: 20,
                  mass: 0.8
                }
              }}
            >
              <motion.p 
                className="mb-2 text-black"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: 0.5,
                    duration: 0.4,
                    ease: 'easeOut'
                  }
                }}
              >
                By clicking "I Agree", you confirm that you have read and agree to our terms.
              </motion.p>
              <motion.button
                onClick={handleAccept}
                disabled={!hasScrolled}
                className={`px-6 py-2.5 rounded-md text-white font-medium w-full sm:w-auto ${
                  hasScrolled 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                whileHover={hasScrolled ? { 
                  scale: 1.02,
                  transition: { 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 15,
                    mass: 0.8
                  }
                } : {}}
                whileTap={hasScrolled ? { 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.6,
                    duration: 0.4,
                    ease: 'easeOut'
                  }
                }}
              >
                I Agree
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
