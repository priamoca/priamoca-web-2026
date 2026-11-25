import React, { useCallback } from 'react';
import { MotionConfig, AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { InfoRoutePath } from '../../data/infoLandingData';
import { InfoHeader } from './InfoHeader';
import { InfoLandingPage } from '../../pages/info/InfoLandingPage';
import { InfoVerticalPage } from '../../pages/info/InfoVerticalPage';

interface InfoRouterShellProps {
  currentPath: InfoRoutePath;
  onNavigate: (to: string) => void;
}

export const InfoRouterShell: React.FC<InfoRouterShellProps> = ({
  currentPath,
  onNavigate,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToContact = useCallback(() => {
    document.getElementById('contacto-info')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    if (currentPath === '/info/impresion') {
      return <InfoVerticalPage verticalSlug="impresion" onNavigate={onNavigate} />;
    }
    if (currentPath === '/info/experiencias') {
      return <InfoVerticalPage verticalSlug="experiencias" onNavigate={onNavigate} />;
    }
    if (currentPath === '/info/imagen-de-marca') {
      return <InfoVerticalPage verticalSlug="imagen-de-marca" onNavigate={onNavigate} />;
    }
    return <InfoLandingPage onNavigate={onNavigate} />;
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] selection:bg-[#21E45B]/30 selection:text-[#262D38] dark:selection:text-white transition-colors duration-200">
        <InfoHeader
          currentPath={currentPath}
          onNavigate={onNavigate}
          onScrollToContact={handleScrollToContact}
        />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
};
