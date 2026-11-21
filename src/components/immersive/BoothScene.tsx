import React, { useEffect, useMemo } from 'react';
import { preloadPriamitoFrames } from '../../data/priamitoFrames';

interface BoothSceneProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;    // -1 to 1
  tiltY: number;    // -1 to 1
}

const BRIDGE_BG_SRC = '/assets/aistudio/IMG_3079_3a0611fd.PNG';
const AVILA_BG_SRC = '/assets/aistudio/IMG_3078_98ebca1a.PNG';
const ROLAND_BG_SRC = '/assets/aistudio/Impresora_Roland_TrueVIS_con_banner_azul_286c8d4c.png';

let scenarioAssetsPreloaded = false;
const preloadedScenarioImgs: HTMLImageElement[] = [];

function preloadScenarioAssets() {
  if (typeof window === 'undefined' || scenarioAssetsPreloaded) return;
  scenarioAssetsPreloaded = true;
  [BRIDGE_BG_SRC, AVILA_BG_SRC, ROLAND_BG_SRC].forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    preloadedScenarioImgs.push(img);
  });
}

export const BoothScene: React.FC<BoothSceneProps> = ({
  progress,
  tiltX,
  tiltY,
}) => {
  // Preload all Priamito frames and scenario backgrounds on mount to eliminate flicker
  useEffect(() => {
    preloadPriamitoFrames();
    preloadScenarioAssets();
  }, []);

  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.innerWidth / Math.max(window.innerHeight, 1) < 0.85;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || window.innerWidth / Math.max(window.innerHeight, 1) < 0.85);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bridge backdrop active from 0.00 through peak white-light transition (~0.642)
  const bridgeOpacity = useMemo(() => {
    if (progress <= 0.635) return 1;
    if (progress >= 0.643) return 0;
    return 1 - (progress - 0.635) / (0.643 - 0.635);
  }, [progress]);

  // El Ávila backdrop swaps cleanly underneath the peak white-light veil (~0.637 -> 0.644)
  // and stays fully opaque behind front-facing Priamito until RolandPrinterScene covers at 0.74
  const avilaOpacity = useMemo(() => {
    if (progress < 0.637) return 0;
    if (progress < 0.644) return (progress - 0.637) / (0.644 - 0.637);
    if (progress <= 0.745) return 1;
    if (progress < 0.76) return 1 - (progress - 0.745) / (0.76 - 0.745);
    return 0;
  }, [progress]);

  // Fullscreen pure-white luminous beam transition (61.5% -> 65.8%), peaking solidly at 63.7%..64.4%
  const whiteVeilOpacity = useMemo(() => {
    if (progress <= 0.615 || progress >= 0.658) return 0;
    if (progress < 0.637) {
      const t = (progress - 0.615) / (0.637 - 0.615);
      return t * t * (3 - 2 * t);
    }
    if (progress <= 0.644) return 1;
    const tOut = (progress - 0.644) / (0.658 - 0.644);
    return 1 - tOut * tOut * (3 - 2 * tOut);
  }, [progress]);

  // Bridge progressive camera advance toward the central tower arch vanishing point (50%, 55.2%)
  const advanceT = Math.min(1, Math.max(0, (progress - 0.03) / (0.64 - 0.03)));
  const easedAdvance = advanceT * advanceT * (3 - 2 * advanceT);
  const bridgeBaseScale = 1.05;
  const bridgeScale = bridgeBaseScale + (advanceT * 0.25 + easedAdvance * 0.20); // 1.05 -> 1.50 without pixelation

  // Distant atmospheric parallax shift (kept safely within the 1.05+ bleed margin to guarantee zero edge gaps)
  const bridgePx = tiltX * (isMobile ? 6 : 14);
  const bridgePy = tiltY * (isMobile ? 5 : 10);

  // Subtle sunlit white horizon beam warming up at the bridge arch before full white transition (56% -> 64%)
  const horizonGlowOpacity = Math.min(1, Math.max(0, (progress - 0.56) / (0.637 - 0.56))) * bridgeOpacity;

  // El Ávila gentle spatial reveal motion (settles back smoothly to frame both mountain peak and Caracas skyline)
  const avilaT = Math.min(1, Math.max(0, (progress - 0.637) / (0.74 - 0.637)));
  const avilaScale = 1.11 - avilaT * 0.06; // 1.11 -> 1.05 (always >= 1.05 for safe parallax bleed)
  const avilaPx = tiltX * (isMobile ? 6 : 14);
  const avilaPy = tiltY * (isMobile ? 5 : 10);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#87B5D9] dark:bg-[#07090D]"
      style={{ opacity: progress >= 0.76 ? 0 : 1 }}
    >
      {/* SCENARIO 1: Puente sobre el Lago de Maracaibo (0% Header -> ~64% Transición blanca) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: bridgeOpacity,
          transform: `translate3d(${bridgePx}px, ${bridgePy}px, 0) scale(${bridgeScale})`,
          transformOrigin: '50% 55.2%',
        }}
      >
        <img
          src={BRIDGE_BG_SRC}
          alt="Puente sobre el Lago de Maracaibo - Priamo Publicidad"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-full h-full object-cover object-[50%_55.2%] block"
          draggable={false}
        />

        {/* Pure white radial beam core rising from the bridge portal arch */}
        {horizonGlowOpacity > 0.01 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: horizonGlowOpacity * 0.78,
              background:
                'radial-gradient(circle at 50% 53%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 28%, transparent 64%)',
            }}
          />
        )}
      </div>

      {/* SCENARIO 2: El Ávila (~64% Luz Blanca -> ~74% Plotter Roland) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: avilaOpacity,
          transform: `translate3d(${avilaPx}px, ${avilaPy}px, 0) scale(${avilaScale})`,
          transformOrigin: '50% 45%',
        }}
      >
        <img
          src={AVILA_BG_SRC}
          alt="El Ávila - Caracas, Priamo Publicidad"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-[50%_45%] block"
          draggable={false}
        />
      </div>

      {/* Fullscreen Pure White Luminous Light Transition Veil behind Priamito */}
      {whiteVeilOpacity > 0.005 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: whiteVeilOpacity,
            background:
              'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #FFFFFF 55%, rgba(255,255,255,0.97) 100%)',
          }}
        />
      )}
    </div>
  );
};
