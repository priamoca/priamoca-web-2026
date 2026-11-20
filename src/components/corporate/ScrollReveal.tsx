import React, { useEffect, useRef, useState } from 'react';

export type ScrollRevealVariant = 'up' | 'scale' | 'clip' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  threshold = 0.08,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [effectiveDelay, setEffectiveDelay] = useState(delay);

  useEffect(() => {
    if (isVisible) return;
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // On narrow mobile screens, keep stagger brisk so stacked cards feel agile
    const mobileCap = window.innerWidth < 768 ? Math.min(delay, 150) : delay;
    setEffectiveDelay(mobileCap);

    // If element was already scrolled past above the viewport (e.g. deep link), show immediately without animation delay
    const initialRect = el.getBoundingClientRect();
    if (initialRect.bottom < 0) {
      setEffectiveDelay(0);
      setIsVisible(true);
      return;
    }

    // If already visible inside the viewport on initial load (e.g. /servicios or /contacto hero), glide in on next paint frame
    if (initialRect.top < window.innerHeight * 0.96) {
      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.96) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -32px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, isVisible, threshold]);

  const variantClass =
    variant === 'scale'
      ? 'priamo-reveal-scale'
      : variant === 'clip'
      ? 'priamo-reveal-clip'
      : variant === 'fade'
      ? 'priamo-reveal-fade'
      : 'priamo-reveal-up';

  return (
    <div
      ref={ref}
      className={`priamo-reveal ${variantClass} ${isVisible ? 'is-revealed' : ''} ${className}`}
      style={effectiveDelay > 0 && isVisible ? { transitionDelay: `${effectiveDelay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
