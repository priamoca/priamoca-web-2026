import React, { useEffect, useState } from 'react';
import { QuoteContactForm } from '../components/corporate/QuoteContactForm';
import { Footer } from '../components/corporate/Footer';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Mail, 
  Instagram, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  MessageSquare,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../components/corporate/ScrollReveal';

interface ContactoPageProps {
  onNavigate: (to: string) => void;
  initialService?: string;
  initialProject?: string;
}

export const ContactoPage: React.FC<ContactoPageProps> = ({
  onNavigate,
  initialService,
  initialProject,
}) => {
  // Read query parameters if available
  const [selectedService, setSelectedService] = useState<string | undefined>(initialService);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(initialProject);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const serv = params.get('servicio');
      const proj = params.get('proyecto');
      if (serv) setSelectedService(serv);
      if (proj) setSelectedProject(proj);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA] pt-24 selection:bg-[#21E45B]/30 selection:text-[#262D38] dark:selection:text-white transition-colors duration-200">
      {/* Header / Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-white/10 bg-gradient-to-b from-[#F0FDF4]/60 via-white to-white dark:from-[#0B1524] dark:via-[#07090D] dark:to-[#07090D] overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#21E45B]/15 dark:bg-[#21E45B]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[450px] h-[450px] bg-[#00D2FF]/15 dark:bg-[#00D2FF]/10 blur-[130px] rounded-full pointer-events-none" />

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
            <span className="text-[#0B7E32] dark:text-[#21E45B]">Contacto & Cotizaciones</span>
            <span>·</span>
            <span>Atención Directa</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <ScrollReveal variant="clip" delay={0} className="lg:col-span-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs uppercase mb-4">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Atención Técnica Especializada</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#262D38] dark:text-white leading-[1.08]">
                  COTIZA TU PROYECTO <br />
                  <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">PUBLICITARIO CON PRIAMO</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl font-light leading-relaxed">
                  Cuéntanos tu requerimiento o solicita asesoría técnica para evaluar materiales, medidas y cronograma de producción e instalación. Respondemos con una propuesta formal adaptada a tus objetivos.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={110} className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0D121D] border border-neutral-200 dark:border-white/10 flex items-center gap-3 shadow-xs dark:shadow-none">
                <Clock className="w-5 h-5 text-[#0B7E32] dark:text-[#21E45B] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#262D38] dark:text-white font-bold block uppercase">Tiempo de Respuesta</span>
                  <span className="text-neutral-600 dark:text-neutral-400">Menos de 24 horas hábiles</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#0D121D] border border-neutral-200 dark:border-white/10 flex items-center gap-3 shadow-xs dark:shadow-none">
                <ShieldCheck className="w-5 h-5 text-[#0284C7] dark:text-[#00D2FF] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#262D38] dark:text-white font-bold block uppercase">Asesoría de Producción</span>
                  <span className="text-neutral-600 dark:text-neutral-400">Levantamiento y planos en sitio</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Direct Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-white/10">
            <ScrollReveal variant="scale" delay={0}>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-[#0B7E32]/40 dark:hover:border-[#21E45B]/40 hover:bg-[#ECFDF3]/50 dark:hover:bg-[#21E45B]/5 transition-all flex items-center gap-3 group h-full shadow-xs dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF3] dark:bg-[#21E45B]/10 flex items-center justify-center text-[#0B7E32] dark:text-[#21E45B] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Correo Oficial</span>
                  <span className="text-xs font-bold text-[#262D38] dark:text-white truncate block">{COMPANY_INFO.email}</span>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={75}>
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-[#0284C7]/40 dark:hover:border-[#00D2FF]/40 hover:bg-[#EFF6FF]/60 dark:hover:bg-[#00D2FF]/5 transition-all flex items-center gap-3 group h-full shadow-xs dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] dark:bg-[#00D2FF]/10 flex items-center justify-center text-[#0284C7] dark:text-[#00D2FF] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Instagram</span>
                  <span className="text-xs font-bold text-[#262D38] dark:text-white truncate block">{COMPANY_INFO.instagram}</span>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={150}>
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center gap-3 h-full shadow-xs dark:shadow-none">
                <div className="w-10 h-10 rounded-lg bg-[#FCE7F3] dark:bg-[#FF007A]/10 flex items-center justify-center text-[#C8005F] dark:text-[#FF007A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Ubicación</span>
                  <span className="text-xs font-bold text-[#262D38] dark:text-white block">Caracas, Venezuela</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale" delay={225}>
              <a
                href="https://wa.me/584126026814?text=Hola%2C%20quisiera%20cotizar%20un%20proyecto%20con%20Priamo%20Publicidad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp a Priamo Publicidad (+58 412-6026814)"
                className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-[#0E8A38]/50 dark:hover:border-[#25D366]/50 hover:bg-[#ECFDF3]/60 dark:hover:bg-[#25D366]/10 transition-all flex items-center gap-3 group cursor-pointer h-full shadow-xs dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] dark:bg-[#25D366]/15 flex items-center justify-center text-[#0E8A38] dark:text-[#25D366] group-hover:scale-105 transition-transform dark:shadow-[0_0_12px_rgba(37,211,102,0.25)]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">WhatsApp Directo</span>
                  <span className="text-xs font-bold text-[#262D38] dark:text-white group-hover:text-[#0E8A38] dark:group-hover:text-[#25D366] transition-colors block">
                    +58 412-6026814
                  </span>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Quote & Brief Form (All fields & functionality intact) */}
      <main>
        <QuoteContactForm
          initialService={selectedService}
          initialProject={selectedProject}
        />
      </main>

      {/* Footer with #CreamosBuenaImpresión */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateSection={(idOrPath) => {
          if (idOrPath === 'contacto') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (idOrPath === 'servicios') {
            onNavigate('/servicios');
          } else if (idOrPath === 'blog') {
            onNavigate('/blog');
          } else if (idOrPath === 'premios-y-trayectoria') {
            onNavigate('/premios-y-trayectoria');
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
