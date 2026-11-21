import React from 'react';
import { COMPANY_INFO } from '../../data/companyData';
import { ArrowUp, Instagram, Mail, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigateSection }) => {
  return (
    <footer className="bg-[#F1F5F9] dark:bg-[#05070B] border-t border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <ScrollReveal variant="up" threshold={0.05} delay={0}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-neutral-200 dark:border-white/10">
            {/* Brand Logo centered over Slogan */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5">
              <img
                src="/assets/aistudio/logo-priamo_9af7d3f3.png"
                alt="Priamo Publicidad"
                className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(11,126,50,0.16)] dark:drop-shadow-[0_0_12px_rgba(33,228,91,0.4)]"
              />
              <span className="text-xs font-bold tracking-wider text-[#0B7E32] dark:text-[#21E45B] block">
                #CreamosBuenaImpresión
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider">
              <button onClick={() => onNavigateSection('inicio')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Inicio
              </button>
              <button onClick={() => onNavigateSection('servicios')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Servicios
              </button>
              <button onClick={() => onNavigateSection('blog')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Blog
              </button>
              <button onClick={() => onNavigateSection('premios-y-trayectoria')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Premios y Trayectoria
              </button>
              <button onClick={() => onNavigateSection('nosotros')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Nosotros
              </button>
              <button onClick={() => onNavigateSection('como-trabajamos')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Cómo Trabajamos
              </button>
              <button onClick={() => onNavigateSection('contacto')} className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors cursor-pointer">
                Contacto
              </button>
            </div>

            {/* Back to top */}
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-700 dark:text-neutral-300 hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors p-2 rounded-lg bg-white dark:bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 shadow-xs dark:shadow-none cursor-pointer"
            >
              <span>Volver al Inicio</span>
              <ArrowUp className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" />
            </button>
          </div>
        </ScrollReveal>

        {/* Legal and RIF */}
        <ScrollReveal variant="fade" threshold={0.05} delay={90}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              © 2026 {COMPANY_INFO.name} · RIF {COMPANY_INFO.rif}. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B7E32] dark:hover:text-[#25D366] text-[#0E8A38] dark:text-[#25D366]/90 transition-colors flex items-center gap-1.5"
              >
                <span>WhatsApp: {COMPANY_INFO.whatsappDisplay}</span>
              </a>
              <span>·</span>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.instagram}</span>
              </a>
              <span>·</span>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-[#0B7E32] dark:hover:text-[#21E45B] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
