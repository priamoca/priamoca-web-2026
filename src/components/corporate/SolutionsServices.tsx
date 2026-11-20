import React, { useState } from 'react';
import { SERVICES } from '../../data/companyData';
import { ServiceCategory } from '../../types';
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SolutionsServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const SolutionsServices: React.FC<SolutionsServicesProps> = ({
  onSelectServiceForQuote,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(SERVICES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="servicios" className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#0A0D14] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal variant="clip" delay={0}>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
                <span>CATÁLOGO PRIAMO 2026</span>
                <span>·</span>
                <span>11 CATEGORÍAS INTEGRALES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase leading-none">
                SOLUCIONES Y <br />
                <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">LÍNEAS DE PRODUCCIÓN</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Desde estructuras monumentales de feria y fachadas completas hasta papelería fina, etiquetas troqueladas y artículos de marca.
            </p>
          </ScrollReveal>
        </div>

        {/* Services List / Grid */}
        <div className="flex flex-col gap-4">
          {SERVICES.map((service, idx) => {
            const isExpanded = expandedId === service.id;
            return (
              <ScrollReveal key={service.id} variant="scale" delay={(idx % 4) * 65}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isExpanded
                      ? 'bg-white dark:bg-[#102744]/50 border-[#0B7E32]/45 dark:border-[#21E45B]/50 shadow-md dark:shadow-[0_0_30px_rgba(33,228,91,0.1)]'
                      : 'bg-white dark:bg-[#0D121D] border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 shadow-xs dark:shadow-none'
                  }`}
                >
                {/* Main Row / Accordion Trigger */}
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span className="font-mono text-lg sm:text-2xl font-black text-[#0B7E32]/85 dark:text-[#21E45B]/70 shrink-0">
                      {service.index}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                          {service.title}
                        </h3>
                        {service.featured && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#ECFDF3] dark:bg-[#21E45B]/15 text-[#0B7E32] dark:text-[#21E45B] border border-[#0B7E32]/30 dark:border-[#21E45B]/30">
                            Alta Escala
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1 max-w-2xl">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectServiceForQuote(service.title);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#21E45B] text-[#07090D] font-bold text-xs uppercase tracking-wider hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] transition-all flex items-center gap-1.5 shadow-sm dark:shadow-md cursor-pointer"
                    >
                      <span>Cotizar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-neutral-200 dark:border-white/10 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-3">
                      {/* Left: Key Applications */}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-[#0284C7] dark:text-[#00D2FF] tracking-wider mb-2">
                          Aplicaciones Principales:
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {service.keyApplications.map((app, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                              <Check className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B] shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Materials and Specs */}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-[#0B7E32] dark:text-[#21E45B] tracking-wider mb-2">
                          Sustratos y Acabados Habituales:
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {service.materials.map((mat, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 font-mono"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">¿Requieres medidas o asesoría técnica?</span>
                          <button
                            onClick={() => onSelectServiceForQuote(service.title)}
                            className="text-xs font-bold uppercase text-[#0B7E32] dark:text-[#21E45B] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Iniciar consulta</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
