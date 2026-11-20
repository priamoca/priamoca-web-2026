import React from 'react';
import { Building2, Landmark, Store, HeartPulse } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TrustTrajectory: React.FC = () => {
  const sectors = [
    {
      sector: 'Comercio y Consumo',
      icon: Store,
      clients: ['Síragon', 'Centro Comercial City Market', 'Forum Super Mayorista', 'Calzados Mega'],
    },
    {
      sector: 'Empresas y Servicios',
      icon: Building2,
      clients: ['Corporación Suiche 7B', 'Thundernet', 'Bancamiga', 'Seguros Horizonte'],
    },
    {
      sector: 'Hospitalidad y Salud',
      icon: HeartPulse,
      clients: ['Hotel Humboldt', 'Restaurant Sottovoce', 'Unidad Vascular de Caracas', 'OdontoSpa Las Mercedes'],
    },
    {
      sector: 'Instituciones & Sector Público',
      icon: Landmark,
      clients: ['Cruz Roja de Venezuela', 'CANTV', 'Metro de Caracas', 'SENIAT'],
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#090D15] border-t border-neutral-200 dark:border-white/10 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrollReveal variant="clip" delay={0}>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#0B7E32] dark:text-[#21E45B] uppercase mb-2">
              <span>RELACIONES QUE RESPALDAN EL TRABAJO</span>
              <span>·</span>
              <span>CONFIANZA Y TRAYECTORIA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase leading-none">
              MARCAS E INSTITUCIONES <br />
              <span className="text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">QUE HAN CONFIADO</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="up" delay={110}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
              Algunas de las empresas, marcas de consumo e instituciones presentes en nuestros más de 10 años de trayectoria de producción publicitaria.
            </p>
          </ScrollReveal>
        </div>

        {/* Clean, Prestigious Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sec, idx) => {
            const IconComponent = sec.icon;
            return (
              <ScrollReveal key={idx} variant="scale" delay={idx * 85} className="h-full">
                <div
                  className="h-full p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-all flex flex-col justify-between shadow-sm dark:shadow-none"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-[#0284C7] dark:text-[#00D2FF] uppercase tracking-wider mb-6 pb-4 border-b border-neutral-200 dark:border-white/10">
                      <IconComponent className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" />
                      <span>{sec.sector}</span>
                    </div>

                    <ul className="flex flex-col gap-4">
                      {sec.clients.map((client, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0B7E32] dark:bg-[#21E45B]" />
                          <span className="text-base font-bold text-[#0F172A] dark:text-neutral-200 tracking-wide">
                            {client}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-white/5 text-[11px] text-neutral-500 font-mono">
                    PROYECTOS ENTREGADOS
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

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
