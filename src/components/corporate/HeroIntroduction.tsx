import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Printer } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface HeroIntroductionProps {
  onQuoteClick: () => void;
  onExploreProjects: () => void;
}

export const HeroIntroduction: React.FC<HeroIntroductionProps> = ({
  onQuoteClick,
  onExploreProjects,
}) => {
  // Animated trajectory counter (0 to 10 over ~1.8s once visible)
  const [counterValue, setCounterValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const duration = 1800; // 1.8 seconds duration
          const start = performance.now();
          const target = 10;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            // Smooth ease-out cubic interpolation
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setCounterValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounterValue(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="nosotros" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#07090D] overflow-hidden transition-colors duration-200">
      {/* Background glow and subtle geometry */}
      <div className="absolute top-1/4 -right-36 w-96 h-96 bg-[#21E45B]/15 dark:bg-[#21E45B]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-36 w-96 h-96 bg-[#00D2FF]/15 dark:bg-[#00D2FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-neutral-200 dark:border-white/10">
          <ScrollReveal variant="clip" delay={0}>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-3">
              <span>NUESTRA ESENCIA</span>
              <span>·</span>
              <span>PRIAMO PUBLICIDAD 2026</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase max-w-3xl leading-[1.05]">
              TU IDEA <br />
              <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">HECHA VISIBLE</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={120} className="flex flex-col items-start md:items-end gap-3 text-left md:text-right">
            <div className="flex items-center gap-3">
              <span
                ref={counterRef}
                className="text-5xl sm:text-6xl font-black text-[#0F172A] dark:text-white tracking-tighter tabular-nums dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {counterValue}+
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold tracking-wider text-[#0B7E32] dark:text-[#21E45B] uppercase">Años</span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase">De Trayectoria</span>
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs">
              En publicidad, comunicación visual, artes gráficas y diseño estructural en Venezuela.
            </p>
          </ScrollReveal>
        </div>

        {/* Narrative & Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Statement Card */}
          <ScrollReveal variant="scale" delay={80} className="lg:col-span-7 h-full">
            <div className="h-full bg-[#F8FAFC] dark:bg-[#102744]/40 border border-neutral-200 dark:border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden shadow-sm dark:shadow-none">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs font-mono uppercase mb-6">
                  <span>Visión y Producción Integral</span>
                </div>
                <p className="text-lg sm:text-2xl text-neutral-700 dark:text-neutral-200 font-light leading-relaxed">
                  En <strong className="text-[#0F172A] dark:text-white font-bold">PRIAMO Publicidad</strong> desarrollamos proyectos de imagen corporativa mediante impresión en gran formato y soluciones de producción publicitaria de alta gama.
                </p>
                <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Acompañamos cada proyecto desde el concepto inicial hasta la instalación final para transformar ideas en piezas, espacios de marca y experiencias visuales memorables.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-neutral-200 dark:border-white/10 relative z-10">
                <div>
                  <span className="block text-xs font-mono text-[#0B7E32] dark:text-[#21E45B] mb-1">01 / DISEÑO</span>
                  <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">Asesoría visual y planos</span>
                </div>
                <div>
                  <span className="block text-xs font-mono text-[#0284C7] dark:text-[#00D2FF] mb-1">02 / PRODUCCIÓN</span>
                  <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">Tecnología Roland TrueVIS</span>
                </div>
                <div>
                  <span className="block text-xs font-mono text-[#C8005F] dark:text-[#FF007A] mb-1">03 / INSTALACIÓN</span>
                  <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">Cuadrillas certificadas</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Roland Technology Card */}
          <ScrollReveal variant="scale" delay={180} className="lg:col-span-5 h-full">
            <div className="h-full bg-gradient-to-br from-[#F0FDF4] to-[#F8FAFC] dark:from-[#07182B] dark:to-[#0A111C] border border-[#0B7E32]/25 dark:border-[#21E45B]/30 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-[0_0_30px_rgba(33,228,91,0.1)]">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" />
                    TECNOLOGÍA ROLAND
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-500 uppercase px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                    PRECISIÓN 1440 DPI
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white mb-3">
                  Calidad de Impresión Incomparable
                </h3>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Trabajamos con equipos Roland de última generación para la impresión digital de piezas publicitarias. La elección rigurosa del material, la preparación del diseño y los acabados premium forman parte de una buena solución.
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  {[
                    'Tintas ecológicas de alta resistencia UV',
                    'Corte computarizado integrado (Print & Cut)',
                    'Sustratos homologados para intemperie y tráfico severo',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <ShieldCheck className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">¿Tienes un proyecto en puerta?</span>
                <button
                  onClick={onQuoteClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B7E32] dark:text-[#21E45B] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Cotizar ahora</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
