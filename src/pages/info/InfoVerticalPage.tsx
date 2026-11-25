import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  INFO_VERTICALS,
  type InfoVerticalSlug,
} from '../../data/infoLandingData';
import { InfoClosingSection } from '../../components/info/InfoClosingSection';

interface InfoVerticalPageProps {
  verticalSlug: InfoVerticalSlug;
  onNavigate: (to: string) => void;
}

export const InfoVerticalPage: React.FC<InfoVerticalPageProps> = ({
  verticalSlug,
  onNavigate,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const data = INFO_VERTICALS[verticalSlug];

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], ['0px', '-14px']);

  const titleScaleClass =
    verticalSlug === 'impresion'
      ? 'text-[clamp(2.6rem,12.6vw,12.5rem)]'
      : verticalSlug === 'experiencias'
      ? 'text-[clamp(2.1rem,9.8vw,9.8rem)]'
      : 'text-[clamp(1.75rem,7.4vw,7.4rem)]';

  return (
    <div className="bg-white dark:bg-[#07090D] text-[#262D38] dark:text-[#F5F7FA]">
      {/* Hero Monumental Title + Concise Intro Paragraph */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <h1
            className={`${titleScaleClass} font-light uppercase tracking-[-0.035em] leading-[0.88] text-[#262D38] dark:text-[#EFEFEF] flex flex-wrap items-center gap-x-4 sm:gap-x-6 select-none`}
          >
            <span>{data.monumentalTitle}</span>
            <img
              src="/assets/aistudio/Isotipo_verde_eda054df.PNG"
              alt=""
              aria-hidden="true"
              className="inline-block h-[0.62em] w-auto object-contain shrink-0 translate-y-[-0.03em]"
            />
          </h1>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-10 max-w-3xl text-lg sm:text-xl lg:text-[1.45rem] font-light leading-[1.45] text-[#262D38] dark:text-[#F5F7FA]/90"
        >
          <span className="text-[#0B7E32] dark:text-[#21E45B] font-normal">
            {data.introHighlight}
          </span>{' '}
          {data.introRest}
        </motion.p>
      </section>

      {/* Editorial Photography Showcase (3 Large Photos in First Row on Desktop) */}
      <section
        ref={galleryRef}
        aria-label={`Proyectos realizados en ${data.navLabel}`}
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-10 sm:gap-y-12">
          {data.projects.map((project, idx) => (
            <motion.figure
              key={`${verticalSlug}-${project.image}-${idx}`}
              style={
                !prefersReducedMotion && idx % 3 === 1
                  ? { y: parallaxSlow }
                  : undefined
              }
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, clipPath: 'inset(12% 0% 0% 0%)', y: 18 }
              }
              whileInView={{
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: (idx % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#102744]">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              </div>

              <figcaption className="mt-3.5 space-y-1">
                <h2 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#262D38] dark:text-white">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-[13px] font-normal text-[#0B7E32] dark:text-[#21E45B]">
                  {project.workType}
                </p>
                <p className="text-xs text-[#262D38]/70 dark:text-slate-400 leading-relaxed">
                  {project.summary}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Closing Corporate Graphic Block + ¿CREAMOS JUNTOS? Contact Form */}
      <InfoClosingSection
        contextLabel={data.navLabel}
        whatsappPrefill={data.whatsappPrefill}
        onNavigate={onNavigate}
      />
    </div>
  );
};
