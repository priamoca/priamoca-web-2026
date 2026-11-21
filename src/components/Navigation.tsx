import React, { useState } from 'react';
import { Smartphone, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/theme';

interface NavigationProps {
  currentPath: string;
  scrollProgress: number; // 0 to 1
  isImmersiveActive: boolean;
  tiltActive: boolean;
  activeSection?: string;
  onToggleTilt: () => void;
  onNavigate: (to: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onResetToHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  scrollProgress,
  isImmersiveActive,
  tiltActive,
  activeSection,
  onToggleTilt,
  onNavigate,
  onNavigateSection,
  onResetToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  type NavLinkItem =
    | { label: string; id: 'inicio'; type: 'home'; path: string }
    | { label: string; id: 'servicios' | 'blog' | 'premios-y-trayectoria' | 'contacto'; type: 'page'; path: string };

  const navLinks: NavLinkItem[] = [
    { label: 'Inicio', id: 'inicio', type: 'home', path: '/' },
    { label: 'Servicios', id: 'servicios', type: 'page', path: '/servicios' },
    { label: 'Blog', id: 'blog', type: 'page', path: '/blog' },
    { label: 'Premios y Trayectoria', id: 'premios-y-trayectoria', type: 'page', path: '/premios-y-trayectoria' },
    { label: 'Contacto', id: 'contacto', type: 'page', path: '/contacto' },
  ];

  const handleLinkClick = (link: NavLinkItem) => {
    setMobileMenuOpen(false);
    if (link.type === 'home') {
      if (currentPath === '/') {
        onResetToHome?.();
        window.history.pushState({}, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onNavigate('/');
        onResetToHome?.();
      }
    } else if (link.type === 'page') {
      onNavigate(link.path);
    }
  };

  const isLinkActive = (link: NavLinkItem) => {
    if (link.id === 'inicio') {
      return currentPath === '/';
    }
    if (link.type === 'page') {
      return currentPath === link.path;
    }
    return false;
  };

  return (
    <>
      {/* Top Fixed Header with Symmetrical 3-Column Balance */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-white/90 dark:bg-[#07090D]/85 backdrop-blur-md border-b border-neutral-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-[88px] lg:h-24 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Column: Brand Logo */}
          <div className="2xl:flex-1 flex items-center justify-start min-w-0 shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPath === '/') {
                  onResetToHome?.();
                  window.history.pushState({}, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  onNavigate('/');
                  onResetToHome?.();
                }
              }}
              className="flex items-center justify-center group text-left focus:outline-none cursor-pointer shrink-0 py-1"
              aria-label="Priamo Publicidad Inicio"
            >
              <img
                src="/assets/aistudio/logo-priamo_9af7d3f3.png"
                alt="Priamo Publicidad"
                className="h-14 sm:h-[68px] md:h-[74px] lg:h-[82px] w-auto aspect-square object-contain drop-shadow-[0_2px_10px_rgba(11,126,50,0.22)] dark:drop-shadow-[0_0_18px_rgba(33,228,91,0.55)] group-hover:scale-105 transition-transform"
              />
            </button>
          </div>

          {/* Center Column: Centered Desktop Navigation Buttons */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 shrink-0">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`text-xs xl:text-[13px] font-bold tracking-[0.12em] xl:tracking-[0.14em] uppercase transition-colors relative py-1.5 px-1 group focus:outline-none whitespace-nowrap cursor-pointer ${
                    active
                      ? 'text-[#0B7E32] dark:text-[#21E45B]'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#0B7E32] dark:hover:text-[#21E45B]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#0B7E32] dark:bg-[#21E45B] transition-all duration-200 ${
                      active ? 'w-full dark:shadow-[0_0_8px_rgba(33,228,91,0.8)]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Column: Theme Switch, Tilt Sensor, Quote Button, Mobile Menu */}
          <div className="2xl:flex-1 flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            {/* Tactile Theme Switch (Dark <-> Light Mode) */}
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'light'}
              aria-label={isDark ? 'Cambiar a versión clara' : 'Cambiar a versión oscura'}
              title={isDark ? 'Cambiar a versión clara' : 'Cambiar a versión oscura'}
              onClick={toggleTheme}
              className={`relative inline-flex items-center w-[52px] h-7 sm:w-[58px] sm:h-8 rounded-full p-1 transition-colors duration-200 border shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21E45B] ${
                isDark
                  ? 'bg-white/10 border-white/15 hover:border-[#21E45B]/50'
                  : 'bg-neutral-200/90 border-neutral-300 hover:border-[#0B7E32]/50'
              }`}
            >
              {/* Track background icons */}
              <span className="flex items-center justify-between w-full px-1 pointer-events-none">
                <Moon className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-0' : 'text-neutral-500 opacity-70'}`} />
                <Sun className={`w-3 h-3 transition-opacity ${isDark ? 'text-neutral-400 opacity-70' : 'opacity-0'}`} />
              </span>

              {/* Sliding knob */}
              <span
                className={`absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ease-out ${
                  isDark
                    ? 'translate-x-0 bg-[#0D1522] border border-[#21E45B]/50 text-[#21E45B]'
                    : 'translate-x-5 sm:translate-x-[26px] bg-white border border-neutral-200 text-amber-500'
                }`}
              >
                {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              </span>
            </button>

            {/* Tilt Sensor Toggle Button (available on Home where 3D scene exists) */}
            {currentPath === '/' && (
              <button
                onClick={onToggleTilt}
                title={tiltActive ? 'Perspectiva por inclinación activada' : 'Activar inclinación de cámara'}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-wider uppercase border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  tiltActive
                    ? 'bg-[#21E45B]/20 text-[#0B7E32] dark:text-[#21E45B] border-[#0B7E32]/50 dark:border-[#21E45B]/60 dark:shadow-[0_0_12px_rgba(33,228,91,0.3)]'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:text-[#262D38] dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/10'
                }`}
              >
                <Smartphone className={`w-3.5 h-3.5 ${tiltActive ? 'text-[#0B7E32] dark:text-[#21E45B]' : ''}`} />
                <span className="hidden xl:inline">Inclinación</span>
              </button>
            )}

            {/* Primary Action Button -> Navigates to independent /contacto page */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/contacto');
              }}
              className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-bold tracking-wider uppercase bg-[#21E45B] text-[#262D38] hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_4px_14px_rgba(33,228,91,0.28)] dark:shadow-[0_0_20px_rgba(33,228,91,0.35)] hover:shadow-[0_0_30px_rgba(33,228,91,0.5)] transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Cotizar Proyecto</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-[#262D38] dark:hover:text-white cursor-pointer shrink-0"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Real Scroll Progress Indicator Bar (on Home) */}
        {currentPath === '/' && (
          <div className="w-full h-[2px] bg-neutral-200 dark:bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#21E45B] via-[#00D2FF] to-[#FF007A] transition-all duration-75 ease-out dark:shadow-[0_0_8px_rgba(33,228,91,0.8)]"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-[#07090D]/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 divide-y divide-neutral-200 dark:divide-white/10">
            <div className="flex flex-col gap-4 pt-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className={`text-left py-2.5 text-lg font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                      active
                        ? 'text-[#0B7E32] dark:text-[#21E45B]'
                        : 'text-[#262D38] dark:text-neutral-200 hover:text-[#0B7E32] dark:hover:text-[#21E45B]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#21E45B] shadow-[0_0_8px_rgba(33,228,91,0.8)]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex flex-col gap-4">
              {/* Theme toggle inside mobile menu */}
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'light'}
                onClick={toggleTheme}
                className="flex items-center justify-between p-3 rounded-lg border bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-[#262D38] dark:text-neutral-200 text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  {isDark ? <Moon className="w-4 h-4 text-[#21E45B]" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  Visión de la Página
                </span>
                <span className="text-xs uppercase px-2.5 py-1 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-white/10 font-bold">
                  {isDark ? 'Oscura' : 'Clara'}
                </span>
              </button>

              {currentPath === '/' && (
                <button
                  onClick={onToggleTilt}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm font-semibold ${
                    tiltActive
                      ? 'bg-[#21E45B]/20 text-[#0B7E32] dark:text-[#21E45B] border-[#0B7E32]/40 dark:border-[#21E45B]/60'
                      : 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Giroscopio / Inclinación
                  </span>
                  <span className="text-xs uppercase px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-neutral-200 dark:border-transparent">
                    {tiltActive ? 'Activado' : 'Desactivado'}
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/contacto');
                }}
                className="w-full mt-2 py-3.5 rounded-lg bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-center text-sm shadow-[0_0_20px_rgba(33,228,91,0.4)]"
              >
                Cotizar Proyecto Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
