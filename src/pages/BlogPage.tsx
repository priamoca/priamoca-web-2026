import React from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { Footer } from '../components/corporate/Footer';
import { ScrollReveal } from '../components/corporate/ScrollReveal';
import { ArrowRight, BookOpen, Calendar, ChevronRight, FileText } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (to: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
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
            <span className="text-[#0B7E32] dark:text-[#21E45B]">Blog</span>
            <span>·</span>
            <span>Actualidad & Criterios Técnicos</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <ScrollReveal variant="clip" delay={0} className="lg:col-span-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs uppercase tracking-wider mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Publicaciones Priamo 2026</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#262D38] dark:text-white leading-[1.08]">
                  BLOG DE PRODUCCIÓN <br />
                  <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">Y PRESENCIA DE MARCA</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl font-light leading-relaxed">
                  Artículos, guías técnicas y criterios aplicados sobre impresión en gran formato, materiales publicitarios, señalética corporativa y montaje de exhibiciones.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={120} className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <button
                onClick={() => onNavigate('/contacto')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#21E45B] text-[#262D38] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_4px_18px_rgba(33,228,91,0.3)] dark:shadow-[0_0_25px_rgba(33,228,91,0.35)] hover:shadow-[0_0_35px_rgba(33,228,91,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Consultar un Proyecto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center lg:text-right">
                Asesoría técnica en materiales e instalación
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Blog Entries Grid */}
      <main className="flex-1 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#0A0D14] transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          {BLOG_POSTS.length === 0 ? (
            <ScrollReveal variant="fade" delay={0}>
              <div className="max-w-2xl mx-auto text-center p-10 sm:p-14 rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF3] dark:bg-[#21E45B]/10 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] flex items-center justify-center mx-auto mb-5">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#262D38] dark:text-white mb-3">
                  Próximas Publicaciones
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  Estamos preparando nuevas notas técnicas y casos editoriales sobre producción publicitaria, acabados y montaje de marca.
                </p>
                <button
                  onClick={() => onNavigate('/servicios')}
                  className="px-6 py-3 rounded-lg bg-[#21E45B] text-[#262D38] font-bold text-xs uppercase tracking-wider hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] transition-colors cursor-pointer"
                >
                  Explorar Líneas de Servicio
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {BLOG_POSTS.map((post, index) => (
                <ScrollReveal key={post.id} variant="scale" delay={(index % 3) * 90} className="h-full">
                  <article className="h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 hover:border-[#0B7E32]/45 dark:hover:border-[#21E45B]/45 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-none">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-200 dark:border-white/10">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-3.5 h-3.5 text-[#0B7E32] dark:text-[#21E45B]" />
                          <time>{post.date}</time>
                        </span>
                        {post.category && (
                          <span className="px-2.5 py-0.5 rounded bg-[#ECFDF3] dark:bg-[#21E45B]/15 border border-[#0B7E32]/25 dark:border-[#21E45B]/30 text-[10px] font-bold uppercase tracking-wider text-[#0B7E32] dark:text-[#21E45B]">
                            {post.category}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-[#262D38] dark:text-white leading-snug mb-3">
                        {post.title}
                      </h2>

                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider">
                        Priamo Editorial
                      </span>
                      <button
                        type="button"
                        onClick={() => onNavigate('/contacto')}
                        className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#0B7E32] dark:text-[#21E45B] hover:text-[#262D38] dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Asesoría</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Bottom Call to Action */}
          <ScrollReveal variant="up" delay={120}>
            <div className="mt-16 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#F0FDF4] via-white to-[#EFF6FF] dark:from-[#102744] dark:via-[#0B1524] dark:to-[#102744] border border-[#0B7E32]/25 dark:border-[#21E45B]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-[0_0_30px_rgba(33,228,91,0.15)]">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#262D38] dark:text-white uppercase">
                  ¿Tienes una idea o requerimiento técnico?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  Conversa con nuestro equipo para definir materiales, medidas y tiempos de entrega.
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
      </main>

      {/* Footer with #CreamosBuenaImpresión */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateSection={(idOrPath) => {
          if (idOrPath === 'blog') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (idOrPath === 'servicios') {
            onNavigate('/servicios');
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
