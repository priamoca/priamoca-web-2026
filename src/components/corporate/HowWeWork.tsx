import React from 'react';
import { PROCESS_STAGES } from '../../data/companyData';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface HowWeWorkProps {
  onStartProject: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onStartProject }) => {
  return (
    <section id="como-trabajamos" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07090D] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal variant="clip" delay={0}>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
              <span>DEL REQUERIMIENTO A LA ENTREGA</span>
              <span>·</span>
              <span>PROCESO METÓDICO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase leading-none">
              UN PROYECTO CLARO, <br />
              <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">DESDE EL INICIO</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Definimos contigo las necesidades y el alcance técnico para coordinar cada etapa del trabajo sin sorpresas ni retrasos.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Stage Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STAGES.map((stage, idx) => (
            <ScrollReveal key={stage.number} variant="scale" delay={(idx % 3) * 90} className="h-full">
              <div
                className="h-full p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 hover:border-[#0B7E32]/40 dark:hover:border-[#21E45B]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-[#0B7E32] dark:text-[#21E45B] group-hover:scale-110 transition-transform block">
                      {stage.number}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20 group-hover:bg-[#21E45B] transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3 group-hover:text-[#0B7E32] dark:group-hover:text-[#21E45B] transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Deliverable badge */}
                <div className="pt-4 border-t border-neutral-200 dark:border-white/5 relative z-10">
                  <span className="text-[10px] font-mono text-[#0284C7] dark:text-[#00D2FF] uppercase tracking-wider block mb-1">
                    Entregable de la etapa:
                  </span>
                  <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    {stage.deliverable}
                  </span>
                </div>

                {/* Subtle background glow on hover */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#21E45B]/10 dark:bg-[#21E45B]/5 rounded-full blur-2xl group-hover:bg-[#21E45B]/20 dark:group-hover:bg-[#21E45B]/15 transition-all" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <ScrollReveal variant="up" delay={100}>
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] dark:from-[#102744] dark:via-[#0D1522] dark:to-[#07182B] border border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
            <div>
              <h4 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1">
                ¿Listo para dar el paso de la idea al plano?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Nuestro equipo técnico está listo para evaluar tus medidas, artes y fechas requeridas.
              </p>
            </div>
            <button
              onClick={onStartProject}
              className="px-6 py-3.5 rounded-lg bg-[#21E45B] text-[#07090D] font-bold text-xs uppercase tracking-wider hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] transition-all flex items-center gap-2 whitespace-nowrap shadow-[0_4px_14px_rgba(33,228,91,0.28)] dark:shadow-[0_0_20px_rgba(33,228,91,0.3)] shrink-0 cursor-pointer"
            >
              <span>Iniciemos tu próximo proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
