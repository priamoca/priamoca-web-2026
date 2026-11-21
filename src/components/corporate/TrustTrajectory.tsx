import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const TrustTrajectory: React.FC = () => {
  const topBrands = [
    'Síragon',
    'Centro Comercial City Market',
    'Forum Super Mayorista',
    'Calzados Mega',
    'Corporación Suiche 7B',
    'Thundernet',
    'Bancamiga',
    'Seguros Horizonte',
  ];

  const bottomBrands = [
    'Hotel Humboldt',
    'Restaurant Sottovoce',
    'Unidad Vascular de Caracas',
    'OdontoSpa Las Mercedes',
    'Cruz Roja de Venezuela',
    'CANTV',
    'Metro de Caracas',
    'SENIAT',
  ];

  const renderBrandSequence = (brands: string[], keyPrefix: string) =>
    brands.map((brand, idx) => (
      <div key={`${keyPrefix}-${idx}`} className="flex items-center gap-6 sm:gap-9 pr-6 sm:pr-9 shrink-0">
        <span className="text-base sm:text-xl font-black tracking-wide uppercase text-[#262D38] dark:text-neutral-100 whitespace-nowrap select-none">
          {brand}
        </span>
        <img
          src="/assets/aistudio/Isotipo_verde_eda054df.PNG"
          alt=""
          aria-hidden="true"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0 select-none"
          draggable={false}
        />
      </div>
    ));

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#090D15] border-t border-neutral-200 dark:border-white/10 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Centered Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14 flex flex-col items-center">
          <ScrollReveal variant="clip" delay={0}>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
              <span>RELACIONES QUE RESPALDAN EL TRABAJO</span>
              <span>·</span>
              <span>CONFIANZA Y TRAYECTORIA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#262D38] dark:text-white uppercase leading-none">
              MARCAS E INSTITUCIONES <br />
              <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">QUE HAN CONFIADO</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Algunas de las empresas, marcas de consumo e instituciones presentes en nuestros 12 años de trayectoria de producción publicitaria.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Dual Continuous Animated Brand Ribbons */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-5">
        {/* Top Ribbon: Left -> Right */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0D1522] py-4 sm:py-5 shadow-sm dark:shadow-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max items-center animate-priamo-marquee-ltr">
            {renderBrandSequence(topBrands, 'top-a')}
            {renderBrandSequence(topBrands, 'top-b')}
          </div>
        </div>

        {/* Bottom Ribbon: Right -> Left */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0D1522] py-4 sm:py-5 shadow-sm dark:shadow-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max items-center animate-priamo-marquee-rtl">
            {renderBrandSequence(bottomBrands, 'bottom-a')}
            {renderBrandSequence(bottomBrands, 'bottom-b')}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="scale" delay={120}>
          <div className="mt-12 sm:mt-14 flex justify-center w-full">
            <img
              src="/assets/aistudio/priamo-publicidad-stickers_122ffc93.png"
              alt="Sticker circular de Priamo Publicidad con Priamito"
              className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[330px] h-auto object-contain select-none drop-shadow-[0_10px_24px_rgba(15,23,42,0.12)] dark:drop-shadow-none"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
