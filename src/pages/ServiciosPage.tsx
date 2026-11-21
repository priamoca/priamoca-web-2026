import React, { useState } from 'react';
import { SERVICES } from '../data/companyData';
import { SolutionsServices } from '../components/corporate/SolutionsServices';
import { Footer } from '../components/corporate/Footer';
import { 
  Printer, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Award,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { ScrollReveal } from '../components/corporate/ScrollReveal';

interface ServiciosPageProps {
  onNavigate: (to: string) => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServiciosPage: React.FC<ServiciosPageProps> = ({
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gran-escala' | 'comercial' | 'merchandising'>('all');

  const filteredServices = SERVICES.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'gran-escala') {
      return s.featured || s.id === 'impresion-gran-formato' || s.id === 'stands-exhibiciones';
    }
    if (activeFilter === 'comercial') {
      return s.id === 'fachadas-espacios' || s.id === 'avisos-corporeos' || s.id === 'rotulacion-vehicular' || s.id === 'publicidad-eventos';
    }
    if (activeFilter === 'merchandising') {
      return s.id === 'stickers-etiquetas' || s.id === 'productos-personalizados' || s.id === 'papeleria-impresa';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] pt-24 selection:bg-[#21E45B]/30 selection:text-[#262D38] dark:selection:text-white transition-colors duration-200">
      {/* Header / Breadcrumb Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-white/10 bg-gradient-to-b from-[#F0FDF4]/60 via-white to-white dark:from-[#0B1524] dark:via-[#07090D] dark:to-[#07090D] overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#21E45B]/15 dark:bg-[#21E45B]/10 blur-[140px] rounded-full pointer-events-none" />
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
            <span className="text-[#0B7E32] dark:text-[#21E45B]">Líneas de Servicio</span>
            <span>·</span>
            <span>Catálogo 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <ScrollReveal variant="clip" delay={0} className="lg:col-span-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>11 Categorías Especializadas de Producción</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#262D38] dark:text-white leading-[1.08]">
                  SERVICIOS DE PRODUCCIÓN <br />
                  <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">PUBLICITARIA INTEGRAL</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl font-light leading-relaxed">
                  Desde gigantografías urbanas y pabellones arquitectónicos de feria, hasta avisos corpóreos tridimensionales con iluminación LED, flotas vehiculares y artículos de marca con acabado premium.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={120} className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <button
                onClick={() => onNavigate('/contacto')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_4px_18px_rgba(33,228,91,0.3)] dark:shadow-[0_0_25px_rgba(33,228,91,0.35)] hover:shadow-[0_0_35px_rgba(33,228,91,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Presupuesto Formal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center lg:text-right">
                Asesoría técnica y levantamiento en sitio disponible
              </span>
            </ScrollReveal>
          </div>

          {/* Pillars Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300">
            <ScrollReveal variant="up" delay={0}>
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-[#0B7E32] dark:text-[#21E45B] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#262D38] dark:text-white uppercase">Roland TrueVIS</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">1440 dpi Print & Cut</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="up" delay={70}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0284C7] dark:text-[#00D2FF] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#262D38] dark:text-white uppercase">Tintas UV Ecológicas</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Resistencia Intemperie</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="up" delay={140}>
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#C8005F] dark:text-[#FF007A] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#262D38] dark:text-white uppercase">Sustratos Homologados</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Materiales certificables</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="up" delay={210}>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#B45309] dark:text-[#FFD200] shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#262D38] dark:text-white uppercase">Cuadrillas Propias</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Instalación técnica</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Services Interactive Component (All 11 Categories Preserved) */}
      <main>
        <SolutionsServices
          onSelectServiceForQuote={(title) => {
            onSelectServiceForQuote(title);
            onNavigate(`/contacto?servicio=${encodeURIComponent(title)}`);
          }}
        />

        {/* Quality & Production Guarantees Section */}
        <section className="pt-10 sm:pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-[#07090D] transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal variant="scale" delay={60}>
              <div className="flex justify-center w-full mb-10 sm:mb-12">
                <img
                  src="/assets/aistudio/priamo-publicidad-creamos-buena-impresion_f6c2493b.png"
                  alt="Creamos buena impresión"
                  className="w-full max-w-[230px] sm:max-w-[275px] md:max-w-[310px] h-auto object-contain select-none"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="clip" delay={0}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ECFDF3] dark:bg-white/5 border border-[#0B7E32]/25 dark:border-white/10 text-[#0B7E32] dark:text-[#21E45B] text-xs uppercase mb-3">
                  <span>ESTÁNDARES DE FABRICACIÓN PRIAMO</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#262D38] dark:text-white uppercase tracking-tight">
                  CÓMO ASEGURAMOS UNA <span className="text-[#0B7E32] dark:text-[#21E45B]">BUENA IMPRESIÓN</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                  Cada pieza publicitaria cumple con rigurosos controles de colorimetría, resistencia mecánica y acabados de montaje.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal variant="scale" delay={0} className="h-full">
                <div className="h-full p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D121D] border border-neutral-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div>
                    <span className="text-xs text-[#0B7E32] dark:text-[#21E45B] uppercase block mb-3">01 / CALIBRACIÓN CROMÁTICA</span>
                    <h3 className="text-lg font-bold text-[#262D38] dark:text-white mb-2">Fidelidad de Color Roland</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Perfiles de color certificados que garantizan la correspondencia exacta con el manual de identidad de tu marca, eliminando variaciones tonales entre diferentes sustratos.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" />
                    <span>Pruebas de color previas a producción</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" delay={90} className="h-full">
                <div className="h-full p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D121D] border border-neutral-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div>
                    <span className="text-xs text-[#0284C7] dark:text-[#00D2FF] uppercase block mb-3">02 / LEVANTAMIENTO EN SITIO</span>
                    <h3 className="text-lg font-bold text-[#262D38] dark:text-white mb-2">Precisión Estructural</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Evaluación de vanos, anclajes, exposición a vientos y líneas eléctricas antes de confeccionar bastidores o avisos corpóreos, evitando contratiempos durante la instalación.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] dark:text-[#00D2FF]" />
                    <span>Inspección técnica y planos 3D</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" delay={180} className="h-full">
                <div className="h-full p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D121D] border border-neutral-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-none">
                  <div>
                    <span className="text-xs text-[#C8005F] dark:text-[#FF007A] uppercase block mb-3">03 / SOPORTE Y POST-VENTA</span>
                    <h3 className="text-lg font-bold text-[#262D38] dark:text-white mb-2">Garantía Operativa</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Todos nuestros trabajos cuentan con garantía de adherencia, resistencia a la intemperie y funcionamiento de sistemas eléctricos LED.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C8005F] dark:text-[#FF007A]" />
                    <span>Atención prioritaria y mantenimiento</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Call to Action */}
            <ScrollReveal variant="up" delay={100}>
              <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] dark:from-[#102744] dark:via-[#0B1524] dark:to-[#102744] border border-[#0B7E32]/25 dark:border-[#21E45B]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-[0_0_30px_rgba(33,228,91,0.15)]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#262D38] dark:text-white uppercase">
                    ¿Necesitas una solución publicitaria a medida?
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    Conversa directamente con un asesor técnico de Priamo para evaluar tu proyecto.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('/contacto')}
                  className="px-6 py-3.5 rounded-xl bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-md dark:shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Ir al Formulario de Contacto</span>
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
          if (idOrPath === 'servicios') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (idOrPath === 'blog') {
            onNavigate('/blog');
          } else if (idOrPath === 'premios-y-trayectoria') {
            onNavigate('/premios-y-trayectoria');
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
