import React from 'react';
import { AWARDS, MILESTONES } from '../data/awardsData';
import { Footer } from '../components/corporate/Footer';
import { ScrollReveal } from '../components/corporate/ScrollReveal';
import { ArrowRight, Award, Calendar, ChevronRight, Flag, ShieldCheck, Trophy } from 'lucide-react';

interface PremiosTrayectoriaPageProps {
  onNavigate: (to: string) => void;
}

export const PremiosTrayectoriaPage: React.FC<PremiosTrayectoriaPageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] pt-24 selection:bg-[#21E45B]/30 selection:text-[#262D38] dark:selection:text-white transition-colors duration-200 flex flex-col">
      {/* Header / Breadcrumb Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-white/10 bg-gradient-to-b from-[#F0FDF4]/60 via-white to-white dark:from-[#0B1524] dark:via-[#07090D] dark:to-[#07090D] overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 right-1/4 w-[460px] h-[460px] bg-[#21E45B]/15 dark:bg-[#21E45B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-[#00D2FF]/15 dark:bg-[#00D2FF]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-6">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
            <span className="text-[#0B7E32] dark:text-[#21E45B]">Premios y Trayectoria</span>
            <span>·</span>
            <span>Desde 2014</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <ScrollReveal variant="clip" delay={0} className="lg:col-span-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs uppercase tracking-wider mb-4">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Trayectoria & Distinciones</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#262D38] dark:text-white leading-[1.08]">
                  PREMIOS Y <br />
                  <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">TRAYECTORIA PRIAMO</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl font-light leading-relaxed">
                  12 años impulsando marcas e instituciones con producción publicitaria integral, reconocimientos al estándar gráfico y evolución tecnológica constante.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={120} className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <button
                onClick={() => onNavigate('/contacto')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_4px_18px_rgba(33,228,91,0.3)] dark:shadow-[0_0_25px_rgba(33,228,91,0.35)] hover:shadow-[0_0_35px_rgba(33,228,91,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Cotizar un Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center lg:text-right">
                Respaldo técnico desde el plano hasta la instalación
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Section 1: Premios y Reconocimientos */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#0A0D14] border-b border-neutral-200 dark:border-white/10 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal variant="clip" delay={0}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
                    <span>DISTINCIONES Y AVALES</span>
                    <span>·</span>
                    <span>CALIDAD CERTIFICADA</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#262D38] dark:text-white uppercase leading-none">
                    PREMIOS Y <span className="text-[#0B7E32] dark:text-[#21E45B]">RECONOCIMIENTOS</span>
                  </h2>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                  Logros y distinciones obtenidos en calidad de impresión, arquitectura ferial y cumplimiento corporativo.
                </p>
              </div>
            </ScrollReveal>

            {AWARDS.length === 0 ? (
              <div className="p-10 rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 text-center">
                <Award className="w-8 h-8 text-[#0B7E32] dark:text-[#21E45B] mx-auto mb-3" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Próximamente se incorporarán nuevos premios y distinciones corporativas.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {AWARDS.map((award, index) => (
                  <ScrollReveal key={award.id} variant="scale" delay={(index % 3) * 90} className="h-full">
                    <article className="h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 hover:border-[#0B7E32]/45 dark:hover:border-[#21E45B]/45 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-none">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold tabular-nums text-[#0B7E32] dark:text-[#21E45B]">
                            <Award className="w-4 h-4" />
                            <span>{award.year}</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-[#ECFDF3] dark:bg-[#21E45B]/15 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[10px] font-bold uppercase tracking-wider text-[#0B7E32] dark:text-[#21E45B]">
                            {award.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[#262D38] dark:text-white leading-snug mb-2">
                          {award.title}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] dark:text-[#00D2FF] mb-3">
                          {award.issuer}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {award.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                        <ShieldCheck className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B] shrink-0" />
                        <span>Estándar Priamo Verificado</span>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Hitos por Año */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07090D] transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal variant="clip" delay={0}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
                    <span>EVOLUCIÓN CRONOLÓGICA</span>
                    <span>·</span>
                    <span>HITOS POR AÑO</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#262D38] dark:text-white uppercase leading-none">
                    HITOS DE NUESTRA <span className="text-[#0B7E32] dark:text-[#21E45B]">HISTORIA</span>
                  </h2>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                  Cada etapa ha sumado capacidad instalada, precisión técnica y confianza de marcas líderes.
                </p>
              </div>
            </ScrollReveal>

            {MILESTONES.length === 0 ? (
              <div className="p-10 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 text-center">
                <Calendar className="w-8 h-8 text-[#0B7E32] dark:text-[#21E45B] mx-auto mb-3" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Línea cronológica en actualización.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {MILESTONES.map((milestone, idx) => (
                  <ScrollReveal key={milestone.id} variant="scale" delay={(idx % 3) * 85} className="h-full">
                    <div className="h-full p-7 sm:p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 hover:border-[#0B7E32]/40 dark:hover:border-[#21E45B]/40 transition-all duration-300 flex flex-col justify-between shadow-sm dark:shadow-none">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-200 dark:border-white/10">
                          <span className="text-3xl font-black tabular-nums text-[#0B7E32] dark:text-[#21E45B]">
                            {milestone.year}
                          </span>
                          {milestone.tag && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] dark:text-[#00D2FF]">
                              <Flag className="w-3 h-3" />
                              <span>{milestone.tag}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#262D38] dark:text-white leading-snug mb-3">
                          {milestone.title}
                        </h3>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Bottom Call to Action */}
            <ScrollReveal variant="up" delay={120}>
              <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] dark:from-[#102744] dark:via-[#0B1524] dark:to-[#102744] border border-[#0B7E32]/25 dark:border-[#21E45B]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-[0_0_30px_rgba(33,228,91,0.15)]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#262D38] dark:text-white uppercase">
                    Hagamos que tu marca forme parte del próximo hito
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    Conversemos sobre tu proyecto de gran formato, exhibición o presencia corporativa.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('/contacto')}
                  className="px-6 py-3.5 rounded-xl bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-md dark:shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Footer with #CreamosBuenaImpresión */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateSection={(idOrPath) => {
          if (idOrPath === 'premios-y-trayectoria') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (idOrPath === 'servicios') {
            onNavigate('/servicios');
          } else if (idOrPath === 'blog') {
            onNavigate('/blog');
          } else if (idOrPath === 'contacto') {
            onNavigate('/contacto');
          } else if (idOrPath === 'inicio') {
            onNavigate('/');
          } else {
            onNavigate(`/#${idOrPath}`);
          }
        }}
      />
    </div>
  );
};
