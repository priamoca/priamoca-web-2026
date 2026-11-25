import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from './utils/router';
import { Navigation } from './components/Navigation';
import { ImmersiveExperience } from './components/immersive/ImmersiveExperience';
import { HeroIntroduction } from './components/corporate/HeroIntroduction';
import { FeaturedProjects } from './components/corporate/FeaturedProjects';
import { HowWeWork } from './components/corporate/HowWeWork';
import { TrustTrajectory } from './components/corporate/TrustTrajectory';
import { Footer } from './components/corporate/Footer';
import { ServiciosPage } from './pages/ServiciosPage';
import { BlogPage } from './pages/BlogPage';
import { PremiosTrayectoriaPage } from './pages/PremiosTrayectoriaPage';
import { ContactoPage } from './pages/ContactoPage';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { InfoRouterShell } from './components/info/InfoRouterShell';
import { AiStudioPreviewAccess } from './components/info/AiStudioPreviewAccess';

export default function App() {
  const { currentPath, navigate, params, hash } = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tiltActive, setTiltActive] = useState(false);
  const [isProgrammaticNavigating, setIsProgrammaticNavigating] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Handle phone tilt toggle with iOS DeviceOrientation permission handling
  const handleToggleTilt = useCallback(() => {
    if (typeof window === 'undefined') return;

    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (DeviceOrientation && typeof DeviceOrientation.requestPermission === 'function') {
      DeviceOrientation.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            setTiltActive((prev) => !prev);
          } else {
            setTiltActive(false);
          }
        })
        .catch(() => {
          setTiltActive(false);
        });
    } else {
      setTiltActive((prev) => !prev);
    }
  }, []);

  // Reset to initial Home state: position at top (0%), TV standby ready for first intentional scroll
  const handleResetToHome = useCallback(() => {
    setIsProgrammaticNavigating(true);
    setActiveSection('inicio');
    setResetTrigger((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsProgrammaticNavigating(false);
    }, 600);
  }, []);

  // Section scrolling on Home: supports instant (on cross-page entry) or smooth (same-page click)
  const scrollToSection = useCallback((sectionId: string, instant = false) => {
    if (sectionId === 'inicio') {
      handleResetToHome();
      return;
    }
    setIsProgrammaticNavigating(true);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' });
    }
    setTimeout(() => {
      setIsProgrammaticNavigating(false);
    }, instant ? 120 : 800);
  }, [handleResetToHome]);

  // Deep linking scroll when arriving at Home with a hash or ?section= param
  // Directly places viewport at target section without showing or scrolling through tunnel
  useEffect(() => {
    if (currentPath === '/') {
      const target = hash || params.section;
      if (target === 'nosotros' || target === 'como-trabajamos' || target === 'proyectos') {
        const timer = setTimeout(() => {
          scrollToSection(target, true);
        }, 60);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPath, hash, params.section, scrollToSection]);

  // Active section spy while scrolling naturally on Home
  useEffect(() => {
    if (currentPath !== '/') return;

    const updateActiveSection = () => {
      if (isProgrammaticNavigating) return;

      const nosotrosEl = document.getElementById('nosotros');
      const comoTrabajamosEl = document.getElementById('como-trabajamos');

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (comoTrabajamosEl && scrollY + windowHeight * 0.4 >= comoTrabajamosEl.offsetTop) {
        setActiveSection('como-trabajamos');
      } else if (nosotrosEl && scrollY + windowHeight * 0.4 >= nosotrosEl.offsetTop) {
        setActiveSection('nosotros');
      } else {
        setActiveSection('inicio');
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [currentPath, isProgrammaticNavigating]);

  // Route 0: Public Editorial Landing (/info & /info/*)
  if (
    currentPath === '/info' ||
    currentPath === '/info/impresion' ||
    currentPath === '/info/experiencias' ||
    currentPath === '/info/imagen-de-marca'
  ) {
    return (
      <>
        <InfoRouterShell currentPath={currentPath} onNavigate={navigate} />
        <WhatsAppFloatingButton visible={currentPath !== '/info'} />
        <AiStudioPreviewAccess currentPath={currentPath} onNavigate={navigate} />
      </>
    );
  }

  // Route 1: Servicios Page (/servicios)
  if (currentPath === '/servicios') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] transition-colors duration-200">
        <Navigation
          currentPath="/servicios"
          scrollProgress={1}
          isImmersiveActive={false}
          tiltActive={false}
          onToggleTilt={handleToggleTilt}
          onNavigate={navigate}
          onNavigateSection={scrollToSection}
          onResetToHome={handleResetToHome}
        />
        <ServiciosPage
          onNavigate={navigate}
          onSelectServiceForQuote={(serviceTitle) => {
            navigate(`/contacto?servicio=${encodeURIComponent(serviceTitle)}`);
          }}
        />
        <WhatsAppFloatingButton visible={true} />
      </div>
    );
  }

  // Route 2: Blog Page (/blog)
  if (currentPath === '/blog') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] transition-colors duration-200">
        <Navigation
          currentPath="/blog"
          scrollProgress={1}
          isImmersiveActive={false}
          tiltActive={false}
          onToggleTilt={handleToggleTilt}
          onNavigate={navigate}
          onNavigateSection={scrollToSection}
          onResetToHome={handleResetToHome}
        />
        <BlogPage onNavigate={navigate} />
        <WhatsAppFloatingButton visible={true} />
      </div>
    );
  }

  // Route 3: Premios y Trayectoria Page (/premios-y-trayectoria)
  if (currentPath === '/premios-y-trayectoria') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] transition-colors duration-200">
        <Navigation
          currentPath="/premios-y-trayectoria"
          scrollProgress={1}
          isImmersiveActive={false}
          tiltActive={false}
          onToggleTilt={handleToggleTilt}
          onNavigate={navigate}
          onNavigateSection={scrollToSection}
          onResetToHome={handleResetToHome}
        />
        <PremiosTrayectoriaPage onNavigate={navigate} />
        <WhatsAppFloatingButton visible={true} />
      </div>
    );
  }

  // Route 4: Contacto Page (/contacto)
  if (currentPath === '/contacto') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] transition-colors duration-200">
        <Navigation
          currentPath="/contacto"
          scrollProgress={1}
          isImmersiveActive={false}
          tiltActive={false}
          onToggleTilt={handleToggleTilt}
          onNavigate={navigate}
          onNavigateSection={scrollToSection}
          onResetToHome={handleResetToHome}
        />
        <ContactoPage
          onNavigate={navigate}
          initialService={params.servicio}
          initialProject={params.proyecto}
        />
        <WhatsAppFloatingButton visible={true} />
      </div>
    );
  }

  // Route 4: Home Page (/) — Immersive Experience & Corporate Showcase
  // Note: Servicios and Contacto are removed from Home as requested
  return (
    <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] selection:bg-[#21E45B]/30 selection:text-[#262D38] dark:selection:text-white transition-colors duration-200">
      {/* Sleek Top Navigation */}
      <Navigation
        currentPath="/"
        scrollProgress={scrollProgress}
        isImmersiveActive={scrollProgress < 0.98}
        tiltActive={tiltActive}
        activeSection={activeSection}
        onToggleTilt={handleToggleTilt}
        onNavigate={navigate}
        onNavigateSection={scrollToSection}
        onResetToHome={handleResetToHome}
      />

      {/* Main Full-Scale Immersive Experience (Scenes 01 to 09) */}
      <main>
        <ImmersiveExperience
          onExploreProjects={() => scrollToSection('proyectos')}
          onRequestQuote={() => navigate('/contacto')}
          tiltActive={tiltActive}
          onScrollProgressChange={setScrollProgress}
          isProgrammaticNavigating={isProgrammaticNavigating}
          resetTrigger={resetTrigger}
        />

        {/* Corporate Sections (Unlocked following the immersive journey) */}
        <div className="relative z-20 bg-white dark:bg-[#07090D] transition-colors duration-200">
          {/* Section A: Presentación de Priamo & Trayectoria 12+ */}
          <HeroIntroduction
            onQuoteClick={() => navigate('/contacto')}
            onExploreProjects={() => scrollToSection('proyectos')}
          />

          {/* Section B: Proyectos Destacados (Real Photo Portfolio) */}
          <FeaturedProjects
            onSelectProjectForQuote={(projectTitle) => {
              navigate(`/contacto?proyecto=${encodeURIComponent(projectTitle)}`);
            }}
          />

          {/* Section C: Cómo Trabajamos (6-Stage Methodology) */}
          <HowWeWork
            onStartProject={() => navigate('/contacto')}
          />

          {/* Section D: Trayectoria y Confianza (Client Registry) */}
          <TrustTrajectory />
        </div>
      </main>

      {/* Footer with Legal Info, RIF & #CreamosBuenaImpresión */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateSection={(idOrPath) => {
          if (idOrPath === 'servicios') {
            navigate('/servicios');
          } else if (idOrPath === 'blog') {
            navigate('/blog');
          } else if (idOrPath === 'premios-y-trayectoria') {
            navigate('/premios-y-trayectoria');
          } else if (idOrPath === 'contacto') {
            navigate('/contacto');
          } else {
            scrollToSection(idOrPath);
          }
        }}
      />

      {/* Floating WhatsApp Button: Active everywhere EXCEPT during the 3D immersive animation */}
      <WhatsAppFloatingButton visible={scrollProgress >= 0.98} />

      {/* Exclusive AI Studio / localhost quick preview bar to jump directly to /info */}
      <AiStudioPreviewAccess currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}
