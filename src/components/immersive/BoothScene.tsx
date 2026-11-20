import React, { useMemo, useEffect } from 'react';
import { preloadPriamitoFrames } from '../../data/priamitoFrames';

interface BoothSceneProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;    // -1 to 1
  tiltY: number;    // -1 to 1
}

export const BoothScene: React.FC<BoothSceneProps> = ({
  progress,
  tiltX,
  tiltY,
}) => {
  // Preload all 54 frame assets once on mount
  useEffect(() => {
    preloadPriamitoFrames();
  }, []);

  // Scene Opacity: fully visible from 0.0 to 0.12, smoothly cross-fading into the 3D tunnel up to 0.18
  const sceneOpacity = useMemo(() => {
    if (progress < 0.12) return 1;
    if (progress > 0.18) return 0;
    return 1 - (progress - 0.12) / (0.18 - 0.12);
  }, [progress]);

  // Responsive viewport state so the 1588x990 laptop scene and inner screen share exact coordinates on all devices
  const [viewport, setViewport] = React.useState(() => {
    if (typeof window === 'undefined') return { w: 1440, h: 900 };
    return { w: window.innerWidth, h: Math.max(window.innerHeight, 1) };
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: Math.max(window.innerHeight, 1) });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const IMAGE_ASPECT = 1588 / 990;
  const isMobile = viewport.w < 768 || viewport.w / viewport.h < 0.85;
  const stageWidth = Math.max(viewport.w, viewport.h * IMAGE_ASPECT);

  // On desktop, 1.05 keeps full glowing green framing while absorbing parallax tilt without edge gaps.
  // On mobile/portrait (e.g. 390px), scale so the laptop (52.77% display width) + chassis fit comfortably inside ~84% of viewport width.
  const desktopBaseScale = 1.05;
  const mobileFitScale = Math.min(0.95, Math.max(0.42, (viewport.w * 0.84) / (stageWidth * 0.5277)));
  const baseScale = isMobile ? mobileFitScale : desktopBaseScale;

  const targetZoom = isMobile ? 5.6 : 6.0;
  const zoomProgress = Math.min(1, Math.max(0, (progress - 0.03) / (0.16 - 0.03)));
  // Smooth cinematic dolly-in (gentle ease start + exponential perspective speed) into the laptop screen
  const zoomEase = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
  const scale = baseScale * Math.pow(targetZoom / baseScale, zoomEase);

  // Parallax tilt from gyro or mouse (damped on mobile for stability)
  const perspectiveX = tiltX * (1 - zoomProgress * 0.75) * (isMobile ? 10 : 20);
  const perspectiveY = tiltY * (1 - zoomProgress * 0.75) * (isMobile ? 8 : 14);

  // Screen power state:
  // Laptop screen stays OFF at 0%. From 3% to 11%, camera advances smoothly and screen powers on (0.04 to 0.105)
  const tvPower = Math.min(1, Math.max(0, (progress - 0.04) / (0.105 - 0.04)));

  // Electronic power surge flash right as screen wakes up (7.5% to 10.5%)
  const powerFlash = progress >= 0.075 && progress <= 0.105
    ? Math.sin(((progress - 0.075) / (0.105 - 0.075)) * Math.PI)
    : 0;

  // Soft vertical edge feather only when scene is scaled below viewport height on portrait mobile, fading out once zoomed in
  const showPortraitEdgeFade = isMobile && scale < 0.96;

  if (sceneOpacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-white dark:bg-[#07090D] flex items-center justify-center w-full h-full transition-colors duration-200"
      style={{ opacity: sceneOpacity }}
    >
      {/* Shared 1588:990 Stage Container:
          Both the laptop image and the inner display overlay share the exact same coordinate box
          and zoom origin (49.97% X, 44.75% Y = exact geometric center of the laptop black screen). */}
      <div
        className="relative shrink-0 transition-transform duration-75 ease-out will-change-transform"
        style={{
          width: 'max(100vw, calc(100vh * 1588 / 990))',
          height: 'max(100vh, calc(100vw * 990 / 1588))',
          transform: `translate3d(${perspectiveX}px, ${perspectiveY}px, 0) scale(${scale})`,
          transformOrigin: '49.97% 44.75%',
          WebkitMaskImage: showPortraitEdgeFade
            ? 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
            : undefined,
          maskImage: showPortraitEdgeFade
            ? 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
            : undefined,
        }}
      >
        <img
          src="/assets/aistudio/IMG_2789_33273807.PNG"
          alt="Priamo Estudio Arquitectónico Laptop"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-full h-full object-fill block"
          draggable={false}
        />

        {/* Laptop Screen Overlay: pixel-aligned to inner black display of IMG_2789_33273807.PNG (23.61%..76.38% X, 19.70%..69.90% Y) */}
        <div
          className="absolute rounded-[4px] overflow-hidden bg-black flex items-center justify-center"
          style={{
            left: '23.61%',
            top: '19.70%',
            width: '52.77%',
            height: '50.20%',
            boxShadow: tvPower > 0.05
              ? `0 0 ${tvPower * 45}px rgba(33, 228, 91, ${tvPower * 0.6}), inset 0 0 35px rgba(0, 210, 255, ${tvPower * 0.4})`
              : 'inset 0 0 25px rgba(0,0,0,0.9)',
          }}
        >
          {/* Screen OFF state (0% to 8%): pure black glass with realistic reflections & standby mark */}
          {tvPower < 0.99 && (
            <div
              className="absolute inset-0 bg-[#040608] pointer-events-none transition-opacity duration-150 z-20 flex flex-col justify-between p-3"
              style={{ opacity: 1 - tvPower }}
            >
                {/* Diagonal glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                <div className="flex justify-between items-start opacity-30">
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400">ULTRA HD DISPLAY</span>
                </div>

                <div className="self-end flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  STANDBY
                </div>
              </div>
            )}

            {/* Electronic power boot flash at 9% */}
            {powerFlash > 0 && (
              <div
                className="absolute inset-0 bg-white z-40 pointer-events-none transition-opacity"
                style={{ opacity: powerFlash * 0.9 }}
              />
            )}

            {/* Portal Inside TV (Wakes up at ~9%) */}
            <div
              className="absolute inset-0 overflow-hidden flex items-center justify-center transition-opacity duration-150"
              style={{ opacity: tvPower }}
            >
              {/* Portal corridor background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#07182B] via-[#051120] to-[#07182B]">
                {/* 3D perspective lines inside the TV */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(33, 228, 91, 0.3) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(33, 228, 91, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    transform: 'perspective(320px) rotateX(42deg) scale(1.6)',
                    transformOrigin: '50% 100%',
                    opacity: 0.75,
                  }}
                />

                {/* Concentric Neon Portal Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3, 4].map((ring) => (
                    <div
                      key={ring}
                      className="absolute border border-[#21E45B]/40 rounded-sm"
                      style={{
                        width: `${ring * 23}%`,
                        height: `${ring * 23}%`,
                        boxShadow: '0 0 15px rgba(33, 228, 91, 0.3)',
                        transform: `translateZ(${-ring * 35}px)`,
                      }}
                    />
                  ))}
                </div>

                {/* Scanline sweep */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#21E45B]/15 to-transparent h-12 w-full animate-scanline pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 3px)',
                  }}
                />
              </div>

              {/* Dimensional Vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#07182B] opacity-75 pointer-events-none" />
            </div>
        </div>
      </div>
    </div>
  );
};
