import React, { useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface RolandPrinterSceneProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;
  tiltY: number;
  onExploreProjects: () => void;
  onRequestQuote: () => void;
}

export const RolandPrinterScene: React.FC<RolandPrinterSceneProps> = ({
  progress,
  tiltX,
  tiltY,
  onExploreProjects,
  onRequestQuote,
}) => {
  // Active from progress 0.68 to 1.0
  const isVisible = progress >= 0.66;

  // Scene Opacity
  const sceneOpacity = useMemo(() => {
    if (progress < 0.68) return 0;
    if (progress < 0.74) return (progress - 0.68) / (0.74 - 0.68);
    return 1;
  }, [progress]);

  // Scene 07: 0.70 to 0.82 (Macro close-up on Roland printhead carriage)
  // Scene 08: 0.82 to 0.92 (Camera pulls back, full machine reveal, banner rolls out)
  // Scene 09: 0.92 to 1.00 (Priamito finale, convergence of lights, message and CTAs)

  // Camera scale: extreme zoom-in (3.6x) at 0.70 -> pulls back to 1.0x by 0.90
  const zoomOutProgress = Math.min(1, Math.max(0, (progress - 0.72) / (0.90 - 0.72)));
  const scale = 3.6 - Math.pow(zoomOutProgress, 0.9) * 2.6; // from 3.6 down to 1.0

  // Focus point translation (from top printhead down to full printer view)
  const translateY = (1 - zoomOutProgress) * -18; // shifts upward when zoomed into printhead

  // Printhead carriage horizontal sweep (Scene 07)
  // Generates oscillating sweep synchronized with progress
  const carriageSweep = Math.sin(progress * 70) * 120;

  // Banner print advance (rolls down as scroll progresses)
  const printAdvance = Math.min(1, Math.max(0, (progress - 0.70) / (0.94 - 0.70)));

  // Scene 09 Finale Reveal (0.91 to 1.00)
  const finaleProgress = Math.min(1, Math.max(0, (progress - 0.91) / (0.99 - 0.91)));

  // Parallax tilt
  const perspectiveX = tiltX * 15;
  const perspectiveY = tiltY * 10;

  if (!isVisible && sceneOpacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center select-none bg-white dark:bg-[#07090D] transition-all duration-200"
      style={{ opacity: sceneOpacity }}
    >
      {/* Floor lighting and reflections */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft overhead light bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-neutral-200/50 dark:from-white/10 to-transparent blur-xl" />
        {/* Neon floor underglow */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-[#21E45B]/15 dark:bg-[#21E45B]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#07090D] via-transparent to-transparent z-10" />
      </div>

      {/* Main Plotter Composition Container */}
      <div
        className="relative w-full h-full max-w-[1400px] flex items-center justify-center will-change-transform"
        style={{
          transform: `scale(${scale}) translate3d(${perspectiveX}px, ${translateY + perspectiveY}px, 0)`,
          transformOrigin: '50% 38%', // focuses on the printhead rail initially
        }}
      >
        {/* Close-Up Mechanical Printhead Elements (Rendered during Scene 07) */}
        {zoomOutProgress < 0.6 && (
          <div
            className="absolute z-20 pointer-events-none transition-opacity duration-200"
            style={{
              top: '32%',
              left: '50%',
              transform: `translateX(-50%) translateX(${carriageSweep}px)`,
              opacity: Math.max(0, 1 - zoomOutProgress * 1.8),
            }}
          >
            {/* Macro Printhead Carriage Box */}
            <div className="w-56 h-36 bg-gradient-to-b from-[#2A2E35] to-[#12151B] rounded-md border border-white/20 shadow-2xl relative flex flex-col justify-between p-3">
              {/* Roland Logo & Status */}
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[10px] tracking-widest text-[#00D2FF] font-bold">
                  Roland TrueVIS VG3
                </span>
                <span className="w-2 h-2 rounded-full bg-[#21E45B] shadow-[0_0_8px_#21E45B]" />
              </div>

              {/* Ink Tubes & Delivery lines */}
              <div className="flex justify-between items-center px-1 my-1">
                {['#00D2FF', '#FF007A', '#FFD200', '#07090D', '#FF6B00', '#21E45B'].map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div className="w-2 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                    <span className="text-[7px] text-neutral-400">CH{i + 1}</span>
                  </div>
                ))}
              </div>

              {/* Optical Rail & UV LED Curing Light Beam */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <div className="text-[8px] text-neutral-400">PRECISION HEAD · 1440 DPI</div>
                <div className="text-[8px] text-[#21E45B] animate-pulse">ACTIVE PRINT</div>
              </div>

              {/* UV Curing Light emitting from bottom */}
              <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-b from-[#00D2FF]/40 to-transparent blur-sm pointer-events-none" />
            </div>

            {/* Precision Optical Rail behind carriage */}
            <div className="absolute top-1/2 -left-[500px] -right-[500px] h-3 bg-gradient-to-b from-[#555E6D] to-[#1F242D] -z-10 shadow-lg border-y border-white/20" />
          </div>
        )}

        {/* Real Full Roland TrueVIS VG3-540 Machine (`Impresora_Roland_TrueVIS_con_banner_azul_286c8d4c.png`) */}
        <div className="relative w-full max-w-[1100px] flex items-center justify-center px-4">
          <img
            src="/assets/aistudio/Impresora_Roland_TrueVIS_con_banner_azul_286c8d4c.png"
            alt="Roland TrueVIS Plotter de Gran Formato - Priamo Publicidad"
            className="w-full object-contain filter drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
          />

          {/* Dynamic Printed Banner Extension matching scroll progression (Hidden completely when finale activates) */}
          {finaleProgress <= 0.02 && (
            <div
              className="absolute bottom-8 left-[23%] right-[23%] pointer-events-none overflow-hidden transition-all duration-75"
              style={{
                height: `${printAdvance * 140}px`,
                maxHeight: '140px',
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#181C22] to-[#0D1016] border-x border-b border-white/20 shadow-xl p-3 flex flex-col justify-end">
                <div className="text-[11px] text-neutral-300 flex items-center justify-between">
                  <span className="text-[#21E45B] font-bold">#CREAMOSBUENAIMPRESIÓN</span>
                  <span className="text-[9px] text-neutral-500">ROLAND HIGH DEF</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCENE 09: CINEMATIC FINALE OVERLAY (Progress 0.91 to 1.00) */}
      {finaleProgress > 0.05 && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 lg:px-8 bg-white/95 dark:bg-[#07090D]/95 backdrop-blur-md transition-all duration-300"
          style={{ opacity: finaleProgress }}
        >
          {/* Priamito Character Host in Finale — tucked minimally down so cut legs hide cleanly behind Universo Priamo 2026 */}
          <div
            className="relative z-10 -mb-[24px] sm:-mb-[26px] will-change-transform flex items-center justify-center"
            style={{
              transform: `translateY(${(1 - finaleProgress) * 40}px) scale(${0.85 + finaleProgress * 0.15})`,
            }}
          >
            <div className="relative">
              {/* Backlight halo around Priamito */}
              <div className="absolute inset-0 bg-[#21E45B]/25 dark:bg-[#21E45B]/30 blur-2xl rounded-full" />
              <img
                src="/assets/aistudio/priamo-publicidad-priamito_b23a6c51.png"
                alt="Priamito - Tu Guía Creativo"
                className="h-44 sm:h-56 md:h-64 object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(15,23,42,0.16)] dark:drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Slogan and Call to Action Typography (kept strictly in front of Priamito) */}
          <div className="relative z-20 text-center w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECFDF3] dark:bg-[#091811] border border-[#0B7E32]/30 dark:border-[#21E45B]/30 text-[#0B7E32] dark:text-[#21E45B] text-xs font-bold tracking-widest uppercase mb-3 shadow-md dark:shadow-[0_4px_16px_rgba(7,9,13,0.9)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Universo Priamo 2026</span>
            </div>

            {/* Main Headline */}
            <h2 className="w-full text-[clamp(1.18rem,5.4vw,4.55rem)] font-black tracking-tight text-[#262D38] dark:text-white uppercase leading-[1.06] drop-shadow-sm dark:drop-shadow-lg">
              <span className="block whitespace-nowrap">IMPRESIONES DIGITALES</span>
              <span className="block whitespace-nowrap text-[#0B7E32] dark:text-[#21E45B] neon-text-glow">DE GRAN FORMATO</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-neutral-700 dark:text-neutral-300 font-medium max-w-2xl">
              ¿Qué proyecto tienes en mente?
            </p>

            <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg">
              De la idea al gran formato. Diseñamos, producimos e instalamos piezas publicitarias de alto impacto para las marcas más exigentes.
            </p>

            {/* Action Buttons (Strictly functional, zero blue outline/rectangle) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onExploreProjects}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#262D38] dark:text-white border border-neutral-300 dark:border-white/20 dark:hover:border-white/40 transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl outline-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none select-none [-webkit-tap-highlight-color:transparent] cursor-pointer"
              >
                <span>Explorar Proyectos</span>
                <ChevronDown className="w-4 h-4 text-[#0B7E32] dark:text-[#21E45B]" />
              </button>

              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-black text-sm uppercase tracking-wider bg-[#21E45B] text-[#262D38] hover:bg-[#1ED153] dark:hover:bg-[#2bf56b] shadow-[0_6px_20px_rgba(33,228,91,0.3)] dark:shadow-[0_0_25px_rgba(33,228,91,0.4)] hover:shadow-[0_0_35px_rgba(33,228,91,0.6)] transition-all flex items-center justify-center gap-2 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none select-none [-webkit-tap-highlight-color:transparent] cursor-pointer"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
