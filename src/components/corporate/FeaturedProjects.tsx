import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../../data/companyData';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Eye, X, CheckCircle, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FeaturedProjectsProps {
  onSelectProjectForQuote: (projectTitle: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProjectForQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close modal handler: restores background scroll and focus
  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
    setTimeout(() => {
      lastFocusedElementRef.current?.focus();
    }, 50);
  }, []);

  // Handle open modal
  const handleOpenProject = useCallback((project: ProjectItem) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  // Listen for Escape key and manage focus on mount
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Autofocus the close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [selectedProject, handleCloseModal]);

  const categories = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'Stands y exhibiciones', label: 'Stands & Exhibiciones' },
    { id: 'Fachadas y espacios comerciales', label: 'Fachadas Comerciales' },
    { id: 'Impresión en gran formato', label: 'Gran Formato' },
    { id: 'Avisos corpóreos y señalética', label: 'Avisos & Señalética' },
    { id: 'Merchandising & Artículos', label: 'Merchandising & Stickers' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07090D] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal variant="clip" delay={0}>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
              <span>PORTAFOLIO SELECCIONADO</span>
              <span>·</span>
              <span>REGISTRO REAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase leading-none">
              DE LA IMAGEN <br />
              <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">AL ESPACIO COMPLETO</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Distintas escalas y aplicaciones con un mismo cuidado por la presencia de marca. Proyectos desarrollados con tecnología Roland y producción in-house.
            </p>
          </ScrollReveal>
        </div>

        {/* Filter Pills / Tabs */}
        <ScrollReveal variant="fade" delay={130}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap focus:outline-none cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#21E45B] text-[#07090D] shadow-[0_4px_14px_rgba(33,228,91,0.28)] dark:shadow-[0_0_15px_rgba(33,228,91,0.3)]'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Creative Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <ScrollReveal
                key={project.id}
                variant="scale"
                delay={(index % 3) * 90}
                className={isFeatured ? 'md:col-span-2 lg:col-span-2 h-full' : 'h-full'}
              >
              <div
                className="h-full group relative rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 overflow-hidden hover:border-[#0B7E32]/50 dark:hover:border-[#21E45B]/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-none"
              >
                {/* Image Container with zoom effect */}
                <div className={`relative w-full overflow-hidden bg-neutral-100 dark:bg-black/60 ${isFeatured ? 'h-72 sm:h-96' : 'h-64 sm:h-72'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-black/25 dark:from-[#0D1522] dark:via-transparent dark:to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-white/90 dark:bg-[#07090D]/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 text-[10px] font-mono tracking-wider uppercase text-[#0F172A] dark:text-neutral-300">
                      {project.client}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#ECFDF3]/95 dark:bg-[#21E45B]/20 backdrop-blur-md border border-[#0B7E32]/35 dark:border-[#21E45B]/40 text-[10px] font-mono tracking-wider uppercase text-[#0B7E32] dark:text-[#21E45B] font-bold">
                      {project.badge}
                    </span>
                  </div>

                  {/* Quick View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={() => handleOpenProject(project)}
                      className="px-4 py-2 rounded-lg bg-[#21E45B] text-[#07090D] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Ficha Técnica</span>
                    </button>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-mono text-[#0284C7] dark:text-[#00D2FF] uppercase tracking-wider block mb-1">
                      {project.category} · {project.year}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white group-hover:text-[#0B7E32] dark:group-hover:text-[#21E45B] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 italic truncate max-w-[240px]">
                      {project.impact}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProjectForQuote(project.title)}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-white/5 hover:bg-[#21E45B] hover:text-[#07090D] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                      title="Cotizar solución similar"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Project Lightbox & Technical Sheet Modal (Portaled to document.body above all headers/layers) */}
      {selectedProject &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            onClick={handleCloseModal}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-black/70 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg sm:max-w-xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-[#21E45B]/40 rounded-2xl overflow-hidden shadow-2xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col cursor-default"
            >
              {/* Modal Header with Always-Visible Accessible X Button in top-right */}
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3 border-b border-neutral-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#07090D] shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-mono text-[#0B7E32] dark:text-[#21E45B] uppercase font-bold truncate">
                    {selectedProject.client}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500 shrink-0">·</span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase shrink-0">{selectedProject.year}</span>
                </div>

                {/* Prominent Visible X Close Button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseModal}
                  className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-100 dark:bg-white/15 hover:bg-[#21E45B] text-[#0F172A] dark:text-white hover:text-[#07090D] border border-neutral-300 dark:border-white/25 hover:border-[#21E45B] transition-all shadow-sm dark:shadow-md focus:outline-none focus:ring-2 focus:ring-[#21E45B] cursor-pointer"
                  aria-label="Cerrar ficha técnica (Escape)"
                  title="Cerrar (Escape)"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Modal Body - Compact spacing so entire sheet fits cleanly on desktop & mobile */}
              <div className="overflow-y-auto p-3.5 sm:p-5 flex flex-col gap-3 sm:gap-3.5 flex-1 min-h-0">
                {/* Image Frame */}
                <div className="w-full h-36 sm:h-48 shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-black flex items-center justify-center border border-neutral-200 dark:border-white/10">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <div>
                    <span className="text-[11px] font-mono text-[#0284C7] dark:text-[#00D2FF] uppercase tracking-wider block mb-0.5">
                      {selectedProject.category}
                    </span>
                    <h3 id="modal-project-title" className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white leading-snug mb-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Impact Statement */}
                  <div className="p-2.5 sm:p-3 rounded-lg bg-[#F0FDF4] dark:bg-[#102744]/60 border border-[#0B7E32]/20 dark:border-[#21E45B]/20 text-xs text-neutral-800 dark:text-neutral-200 leading-snug">
                    <strong className="text-[#0B7E32] dark:text-[#21E45B] font-mono uppercase block mb-0.5 text-[11px]">
                      Resultado & Impacto:
                    </strong>
                    {selectedProject.impact}
                  </div>

                  {/* Technical Specs List */}
                  <div>
                    <h4 className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                      Especificaciones y Materiales Técnicos:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedProject.specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0B7E32] dark:text-[#21E45B] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-t border-neutral-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#07090D] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 hidden sm:inline">
                  ¿Deseas una producción como esta?
                </span>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-white/20 text-xs uppercase font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProject.title;
                      handleCloseModal();
                      onSelectProjectForQuote(title);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#21E45B] text-[#07090D] font-bold text-xs uppercase tracking-wider hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] transition-colors cursor-pointer flex-1 sm:flex-initial text-center"
                  >
                    Solicitar Cotización
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
