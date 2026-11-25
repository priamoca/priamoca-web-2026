import React from 'react';
import { InfoThreeColumns } from '../../components/info/InfoThreeColumns';
import { InfoClosingSection } from '../../components/info/InfoClosingSection';
import type { InfoRoutePath } from '../../data/infoLandingData';

interface InfoLandingPageProps {
  onNavigate: (to: string) => void;
}

export const InfoLandingPage: React.FC<InfoLandingPageProps> = ({ onNavigate }) => {
  const handleNavigateRoute = (route: InfoRoutePath) => {
    onNavigate(route);
  };

  return (
    <div className="bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA]">
      {/* Above-the-fold: 100% viewport 3 equal columns with ascending green panel */}
      <InfoThreeColumns onNavigate={handleNavigateRoute} />

      {/* Below-the-fold: Monumental closing poster block & ¿CREAMOS JUNTOS? contact form */}
      <InfoClosingSection
        contextLabel="Portada /info"
        whatsappPrefill="Hola PRIAMO, visité /info y quiero consultar sobre un proyecto publicitario."
        onNavigate={onNavigate}
      />
    </div>
  );
};
