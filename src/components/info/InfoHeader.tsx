import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../utils/theme';
import { INFO_VERTICAL_LIST, type InfoRoutePath } from '../../data/infoLandingData';

interface InfoHeaderProps {
  currentPath: InfoRoutePath;
  onNavigate: (to: string) => void;
  onScrollToContact: () => void;
}

export const InfoHeader: React.FC<InfoHeaderProps> = ({
  currentPath,
  onNavigate,
  onScrollToContact,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentPath === '/info';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-24 transition-colors duration-300 ${
          isLanding
            ? 'bg-white/95 dark:bg-[#07090D]/95 backdrop-blur-sm'
            : 'bg-white/92 dark:bg-[#07090D]/92 backdrop-blur-md border-b border-slate-200/70 dark:border-white/10'
        }`}
      >
        <div className="w-full h-full px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Official PRIAMO Logo */}
          <a
            href="/info"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/info');
            }}
            className="inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7E32] dark:focus-visible:ring-[#21E45B] rounded py-1"
            aria-label="PRIAMO Publicidad — Portada /info"
          >
            <img
              src="/assets/aistudio/logo-priamo_9af7d3f3.png"
              alt="PRIAMO Publicidad"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </a>

          {/* Center: Three Categories (Shown cleanly on interior subpages) */}
          {!isLanding && (
            <nav
              className="hidden md:flex items-center justify-center gap-8 lg:gap-12"
              aria-label="Áreas de PRIAMO"
            >
              {INFO_VERTICAL_LIST.map((item) => {
                const active = currentPath === item.route;
                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.route);
                    }}
                    className={`relative py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? 'text-[#0B7E32] dark:text-[#21E45B]'
                        : 'text-[#262D38]/75 dark:text-[#F5F7FA]/75 hover:text-[#262D38] dark:hover:text-white'
                    }`}
                  >
                    {item.navLabel}
                    {active && (
                      <motion.span
                        layoutId="info-interior-nav-indicator"
                        className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#0B7E32] dark:bg-[#21E45B]"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          )}

          {/* Right: CONTACTO + Discrete Theme Switch + Mobile Menu Trigger on Interior */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={onScrollToContact}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B7E32] dark:text-[#21E45B] hover:opacity-75 transition-opacity cursor-pointer py-1"
            >
              CONTACTO
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
              className="p-1.5 rounded-md text-[#262D38]/70 dark:text-[#F5F7FA]/70 hover:text-[#262D38] dark:hover:text-white transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {!isLanding && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-1.5 text-[#262D38] dark:text-[#F5F7FA] cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Interior Navigation Drawer */}
      <AnimatePresence>
        {!isLanding && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#07090D] pt-28 pb-10 px-6 flex flex-col justify-between md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navegación de áreas"
          >
            <nav className="flex flex-col divide-y divide-slate-200 dark:divide-white/10 border-t border-b border-slate-200 dark:border-white/10">
              <a
                href="/info"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/info');
                  setMobileMenuOpen(false);
                }}
                className="py-5 text-xl font-light uppercase tracking-[0.12em] text-[#262D38] dark:text-white"
              >
                00 — Portada /info
              </a>
              {INFO_VERTICAL_LIST.map((item) => {
                const active = currentPath === item.route;
                return (
                  <a
                    key={item.route}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-5 text-xl font-light uppercase tracking-[0.12em] ${
                      active
                        ? 'text-[#0B7E32] dark:text-[#21E45B]'
                        : 'text-[#262D38] dark:text-white'
                    }`}
                  >
                    {item.index} — {item.navLabel}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToContact();
              }}
              className="w-full py-4 border border-[#0B7E32] dark:border-[#21E45B] text-[#0B7E32] dark:text-[#21E45B] text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer"
            >
              CONTACTO DIRECTO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
