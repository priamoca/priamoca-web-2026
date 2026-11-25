import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { INFO_VERTICAL_LIST, type InfoRoutePath, type InfoVerticalSlug } from '../../data/infoLandingData';

interface InfoThreeColumnsProps {
  onNavigate: (route: InfoRoutePath) => void;
}

/* Crisp corporate top-left geometric symbols derived from PRIAMO print, spatial direction, and brand framing */
const ColumnTopSymbol: React.FC<{ slug: InfoVerticalSlug; className?: string }> = ({
  slug,
  className = '',
}) => {
  if (slug === 'impresion') {
    return (
      <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
        <path
          d="M2 2H20C23.3137 2 26 4.68629 26 8V26H2V2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (slug === 'experiencias') {
    return (
      <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
        <path
          d="M6 2H26V22H20.5V11.389L7.444 24.444L3.556 20.556L16.611 7.5H6V2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2H20C23.3137 2 26 4.68629 26 8V26H2V2ZM8.5 8.5V19.5H19.5V10.5C19.5 9.39543 18.6046 8.5 17.5 8.5H8.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

/* Subtle bottom-right interactive radial mark matching the clean studio reference */
const InteractiveCornerMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M10 1.5V18.5M1.5 10H18.5M3.99 3.99L16.01 16.01M16.01 3.99L3.99 16.01"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

/* Outlined diagonal arrow inside the expanded green panel */
const OutlinedDiagonalArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <path
      d="M11 6H34V29H27.5V16.8L11.6 32.7L7.3 28.4L23.2 12.5H11V6Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="miter"
    />
  </svg>
);

export const InfoThreeColumns: React.FC<InfoThreeColumnsProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState<InfoVerticalSlug | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const sync = () => setIsTouchDevice(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  const handleColumnClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: InfoVerticalSlug,
    route: InfoRoutePath
  ) => {
    e.preventDefault();
    if (isTouchDevice) {
      if (activeSlug !== slug) {
        setActiveSlug(slug);
        return;
      }
    }
    onNavigate(route);
  };

  return (
    <section
      aria-label="Áreas principales de PRIAMO Publicidad"
      className="pt-24 w-full min-h-[100dvh] lg:h-[100dvh] flex flex-col bg-white dark:bg-[#07090D]"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#0B7E32]/25 dark:divide-[#21E45B]/30 border-b border-[#0B7E32]/25 dark:border-[#21E45B]/30">
        {INFO_VERTICAL_LIST.map((col) => {
          const isActive = activeSlug === col.slug;
          const panelDuration = prefersReducedMotion
            ? 'duration-0'
            : isActive
            ? 'duration-[650ms]'
            : 'duration-[500ms]';

          return (
            <a
              key={col.slug}
              href={col.route}
              onClick={(e) => handleColumnClick(e, col.slug, col.route)}
              onMouseEnter={() => {
                if (!isTouchDevice) setActiveSlug(col.slug);
              }}
              onMouseLeave={() => {
                if (!isTouchDevice) {
                  setActiveSlug((prev) => (prev === col.slug ? null : prev));
                }
              }}
              onFocus={() => setActiveSlug(col.slug)}
              onBlur={() => setActiveSlug((prev) => (prev === col.slug ? null : prev))}
              aria-expanded={isActive}
              className="group relative overflow-hidden min-h-[30dvh] lg:min-h-0 h-full flex flex-col justify-between px-6 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B7E32] dark:focus-visible:ring-[#21E45B]"
            >
              {/* Initial Layer: Minimal Top Glyph + Vast Negative Space + Bottom Label */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[#0B7E32] dark:text-[#21E45B]">
                  <ColumnTopSymbol slug={col.slug} className="w-6 h-6 sm:w-7 sm:h-7" />
                </span>
                <span className="text-[11px] font-medium tracking-[0.22em] text-[#262D38]/45 dark:text-[#F5F7FA]/45">
                  {col.index}
                </span>
              </div>

              <div className="relative z-10 flex items-end justify-between gap-4 pt-8 lg:pt-0">
                <div>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-[#0B7E32]/75 dark:text-[#21E45B]/75 mb-1.5">
                    {col.index}
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-[1.35rem] xl:text-[1.65rem] 2xl:text-[1.85rem] font-light tracking-[-0.02em] leading-[1.1] text-[#0B7E32] dark:text-[#21E45B]">
                    {col.columnLabel}
                  </h2>
                </div>
                <InteractiveCornerMark className="w-4 h-4 shrink-0 text-[#0B7E32]/75 dark:text-[#21E45B]/75 mb-1" />
              </div>

              {/* Ascending Solid Corporate Green Panel (Stays strictly inside column bounds) */}
              <div
                style={{
                  transform: isActive ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 102%, 0)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className={`absolute inset-x-0 bottom-0 top-1.5 lg:top-3 z-20 bg-[#0A8A37] dark:bg-[#0D963F] text-white px-5 sm:px-8 lg:px-10 py-4 sm:py-9 lg:py-12 flex flex-col justify-between transition-transform ${panelDuration} will-change-transform pointer-events-none`}
              >
                {/* Upper & Middle Hierarchy: Giant Title -> Thin Horizontal Rule -> 2-3 Line Description */}
                <div>
                  <h3
                    style={{
                      transform: isActive ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 14px, 0)',
                      opacity: isActive ? 1 : 0,
                      transitionDelay: isActive && !prefersReducedMotion ? '140ms' : '0ms',
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className={`text-2xl sm:text-4xl xl:text-[2.85rem] font-normal tracking-[-0.025em] leading-[1.06] text-white transition-all ${
                      prefersReducedMotion ? 'duration-0' : 'duration-300'
                    }`}
                  >
                    {col.panelTitle}
                  </h3>

                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transitionDelay: isActive && !prefersReducedMotion ? '170ms' : '0ms',
                    }}
                    className={`h-px w-full bg-white/45 my-2.5 sm:my-6 transition-opacity ${
                      prefersReducedMotion ? 'duration-0' : 'duration-300'
                    }`}
                  />

                  <p
                    style={{
                      transform: isActive ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 12px, 0)',
                      opacity: isActive ? 1 : 0,
                      transitionDelay: isActive && !prefersReducedMotion ? '210ms' : '0ms',
                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className={`text-xs sm:text-[15px] font-light leading-snug sm:leading-relaxed text-white/95 max-w-md transition-all ${
                      prefersReducedMotion ? 'duration-0' : 'duration-300'
                    }`}
                  >
                    {col.panelDescription}
                  </p>
                </div>

                {/* Bottom Outlined Diagonal Arrow */}
                <div
                  style={{
                    transform: isActive ? 'translate3d(0, 0px, 0)' : 'translate3d(0, 10px, 0)',
                    opacity: isActive ? 1 : 0,
                    transitionDelay: isActive && !prefersReducedMotion ? '240ms' : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={`flex items-center justify-between pt-2 sm:pt-6 transition-all ${
                    prefersReducedMotion ? 'duration-0' : 'duration-300'
                  }`}
                >
                  <OutlinedDiagonalArrow className="w-6 h-6 sm:w-9 sm:h-9 text-white" />
                  {isTouchDevice && isActive && (
                    <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
                      Toca de nuevo para entrar
                    </span>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
