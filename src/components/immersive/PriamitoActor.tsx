import React, { useMemo } from 'react';
import { getPriamitoState, UNIQUE_FRAME_SRCS } from '../../data/priamitoFrames';

interface PriamitoActorProps {
  progress: number; // 0.0 to 1.0
  tiltX: number;    // -1 to 1
  tiltY: number;    // -1 to 1
}

export const PriamitoActor: React.FC<PriamitoActorProps> = ({
  progress,
  tiltX,
  tiltY,
}) => {
  // Deterministic calculation from normalized scroll progress
  // frame = round(t * (N - 1))
  const state = useMemo(() => getPriamitoState(progress), [progress]);

  // Responsive viewport check for mobile (must be called before any conditional return)
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Overall actor visibility:
  // Appears at 11% (0.11), remains active through 70% (0.70)
  if (progress < 0.11 || progress >= 0.702) {
    return (
      <div className="hidden" aria-hidden="true">
        {/* Preload all 60 unique frames into browser cache */}
        {UNIQUE_FRAME_SRCS.map((src) => (
          <img key={src} src={src} alt="" loading="eager" decoding="async" />
        ))}
      </div>
    );
  }

  // Center alignment starts aligned with laptop screen center (49.97% X, 44.75% Y)
  // And centers smoothly into 50% 50% as camera penetrates into the tunnel
  const tunnelBlend = Math.min(1, Math.max(0, (progress - 0.12) / (0.18 - 0.12)));
  const anchorX = 49.97 + tunnelBlend * 0.03; // 49.97% -> 50%
  const anchorY = 44.75 + tunnelBlend * 5.25; // 44.75% -> 50%

  // Proportional scale factor: on mobile portrait, 0.88 prevents Priamito from crowding narrow screens
  const actorScale = state.scale * (isMobile ? 0.88 : 1.0);

  // Parallax tilt from gyro/mouse (damped on mobile for visual stability)
  const pX = tiltX * (isMobile ? 10 : 16 + (1 - state.depthZ) * 12);
  const pY = tiltY * (isMobile ? 8 : 12 + (1 - state.depthZ) * 8);

  // Continuous flight bob/drift shared across 05_flotacion_espalda and 06_ruptura
  const floatBobY = Math.sin(state.floatT * Math.PI * 3) * (isMobile ? 10 : 16);
  const floatDriftX = Math.sin(state.floatT * Math.PI * 2) * (isMobile ? 6 : 14);
  const floatTilt = Math.sin(state.floatT * Math.PI * 2) * 3;

  // Dynamic transforms per segment:
  let customTransform = '';
  let imgClasses = 'h-auto max-h-[50dvh] max-w-[80vw] sm:max-h-[58vh] sm:max-w-[85vw] object-contain drop-shadow-[0_0_30px_rgba(33,228,91,0.45)] select-none pointer-events-none will-change-transform';

  if (state.segmentId === '01_aparicion') {
    // 11% to 14%: Looking directly at visitor, scale strictly 1.0
    customTransform = `scale(${actorScale}) translate3d(${pX}px, ${pY}px, 0)`;
  } else if (state.segmentId === '02_invitacion') {
    // 14% to 17%: Invites with hand WITHOUT increasing in size ("sin aumentar de tamaño")
    const inviteScale = isMobile ? 0.88 : 1.0;
    customTransform = `scale(${inviteScale}) translate3d(${pX + state.posX * (isMobile ? 2.5 : 4)}px, ${pY}px, 0)`;
  } else if (state.segmentId === '03_giro') {
    // 17% to 20%: Completes turn and faces away (0% to 19% completely unchanged)
    customTransform = `scale(${actorScale}) translate3d(${pX + state.posX * (isMobile ? 2.5 : 4)}px, ${pY + state.posY * (isMobile ? 2.5 : 4)}px, 0)`;
  } else if (state.segmentId === '05_flotacion_espalda') {
    // 20% to 64%: Continuous horizontal flight along tunnel
    customTransform = `scale(${actorScale}) translate3d(${pX + floatDriftX}px, ${pY + floatBobY}px, 0) rotate(${floatTilt}deg)`;
    imgClasses = 'h-auto max-h-[46dvh] max-w-[76vw] sm:max-h-[62vh] sm:max-w-[62vh] aspect-square object-contain drop-shadow-[0_0_35px_rgba(0,210,255,0.4)] select-none pointer-events-none will-change-transform';
  } else if (state.segmentId === '06_ruptura') {
    // 64% to 70%: Reuses existing front-facing flight smoothly coupled to continuous float motion
    const settleFactor = 1 - state.localT * 0.35;
    customTransform = `scale(${actorScale}) translate3d(${pX + floatDriftX * settleFactor}px, ${pY + floatBobY * settleFactor}px, 0) rotate(${floatTilt * settleFactor}deg)`;
    // Explicit viewport-matched height keeps character height identical between IMG_2615 and 06_ruptura on both mobile & desktop
    imgClasses = 'h-[min(46dvh,76vw)] sm:h-[62vh] w-auto max-w-none object-contain drop-shadow-[0_0_35px_rgba(0,210,255,0.42)] select-none pointer-events-none will-change-transform';
  }

  // Deterministic luminous light-barrier transition centered at 20% (0.184 to 0.218) — untouched
  const barrierBurst =
    progress >= 0.184 && progress <= 0.218
      ? Math.exp(-Math.pow((progress - 0.20) / 0.0085, 2))
      : 0;
  const barrierExpandT = Math.min(1, Math.max(0, (progress - 0.184) / (0.218 - 0.184)));

  // Subtle depth light-barrier flash starting at 63% (0.626 to 0.658), preparing screen shatter
  const screenFlashBurst =
    progress >= 0.626 && progress <= 0.658
      ? Math.exp(-Math.pow((progress - 0.638) / 0.0082, 2))
      : 0;
  const screenFlashExpandT = Math.min(1, Math.max(0, (progress - 0.626) / (0.658 - 0.626)));

  // Deterministic translucent screen-shatter shards: emerge breaking toward camera at 64%-65%, dissolve progressively 65%-70%
  const shardTimeline = Math.min(1, Math.max(0, (progress - 0.638) / (0.70 - 0.638)));
  const shardEmerge = Math.min(1, Math.max(0, (progress - 0.638) / (0.650 - 0.638)));
  const shardDissolve = progress <= 0.65 ? 1 : Math.max(0, 1 - (progress - 0.650) / (0.700 - 0.650));
  const shardLayerOpacity = shardEmerge * shardDissolve;

  const screenShards = [
    { x: -1, y: -1.1, rot: -26, w: 18, h: 14, poly: '12% 0%, 96% 18%, 74% 94%, 0% 68%' },
    { x: 1.05, y: -1.0, rot: 22, w: 16, h: 15, poly: '0% 15%, 88% 0%, 100% 82%, 18% 96%' },
    { x: -1.35, y: -0.25, rot: -18, w: 20, h: 13, poly: '8% 12%, 100% 4%, 82% 90%, 0% 76%' },
    { x: 1.38, y: -0.18, rot: 24, w: 19, h: 13, poly: '4% 22%, 92% 0%, 100% 78%, 16% 100%' },
    { x: -1.18, y: 0.92, rot: -32, w: 17, h: 14, poly: '14% 0%, 100% 24%, 70% 100%, 0% 72%' },
    { x: 1.15, y: 0.96, rot: 30, w: 18, h: 14, poly: '0% 10%, 94% 18%, 78% 100%, 12% 84%' },
    { x: -0.45, y: -1.32, rot: -14, w: 14, h: 11, poly: '20% 0%, 100% 12%, 80% 96%, 0% 80%' },
    { x: 0.48, y: 1.28, rot: 16, w: 15, h: 11, poly: '10% 8%, 96% 0%, 84% 100%, 0% 82%' },
    { x: -0.62, y: 0.38, rot: -20, w: 12, h: 10, poly: '0% 25%, 86% 0%, 100% 75%, 18% 100%' },
    { x: 0.65, y: -0.45, rot: 19, w: 12, h: 10, poly: '18% 0%, 100% 22%, 82% 100%, 0% 74%' },
  ];

  // Back-flight layer transform used only during 64%-65% cross-blend
  const backBlendTransform = state.crossfadeBack
    ? `scale(${state.crossfadeBack.scale * (isMobile ? 0.88 : 1.0)}) translate3d(${pX + floatDriftX}px, ${pY + floatBobY}px, 0) rotate(${floatTilt}deg)`
    : '';

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-20 flex items-center justify-center overflow-hidden"
    >
      {/* Backlight Depth Halo for 20% Light Barrier Crossing (untouched) */}
      {barrierBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: barrierBurst * 0.92 }}
        >
          {/* Expanding Luminous Portal Ring */}
          <div
            className="rounded-full border-2 border-[#b8fff2]/80"
            style={{
              width: `${34 + barrierExpandT * 88}vmin`,
              height: `${34 + barrierExpandT * 88}vmin`,
              boxShadow:
                '0 0 60px rgba(0, 210, 255, 0.85), inset 0 0 45px rgba(33, 228, 91, 0.65)',
            }}
          />
          {/* Volumetric Radial Glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${65 + barrierExpandT * 95}vmin`,
              height: `${65 + barrierExpandT * 95}vmin`,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.88) 0%, rgba(165,255,230,0.62) 22%, rgba(0,210,255,0.34) 48%, rgba(33,228,91,0.12) 70%, transparent 88%)',
              filter: 'blur(14px)',
            }}
          />
        </div>
      )}

      {/* Subtle Backlight Depth Flash preparing Screen Shatter at 63%-65.5% */}
      {screenFlashBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: screenFlashBurst * 0.44 }}
        >
          <div
            className="rounded-full border border-[#9fffe8]/70"
            style={{
              width: `${30 + screenFlashExpandT * 74}vmin`,
              height: `${30 + screenFlashExpandT * 74}vmin`,
              boxShadow:
                '0 0 42px rgba(0, 210, 255, 0.65), inset 0 0 32px rgba(33, 228, 91, 0.45)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: `${52 + screenFlashExpandT * 78}vmin`,
              height: `${52 + screenFlashExpandT * 78}vmin`,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.72) 0%, rgba(155,255,235,0.45) 26%, rgba(0,210,255,0.22) 52%, transparent 82%)',
              filter: 'blur(12px)',
            }}
          />
        </div>
      )}

      {/* Outgoing 05_flotacion_espalda cross-blend layer across 64%-65% */}
      {state.crossfadeBack && state.crossfadeBack.opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: `${anchorX}%`,
            top: `${anchorY}%`,
            transform: 'translate(-50%, -50%)',
            opacity: state.crossfadeBack.opacity,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{ transform: backBlendTransform }}
          >
            <img
              src={state.crossfadeBack.frameSrc}
              alt="Priamito - vuelo de espaldas"
              className="h-auto max-h-[46dvh] max-w-[76vw] sm:max-h-[62vh] sm:max-w-[62vh] aspect-square object-contain drop-shadow-[0_0_35px_rgba(0,210,255,0.4)] select-none pointer-events-none will-change-transform"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Positioned wrapper with exact visual anchor */}
      <div
        className="absolute"
        style={{
          left: `${anchorX}%`,
          top: `${anchorY}%`,
          transform: 'translate(-50%, -50%)',
          opacity: state.opacity,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ transform: customTransform }}
        >
          <img
            src={state.frameSrc}
            alt={`Priamito - ${state.segmentId} frame ${state.frameNumber}`}
            className={imgClasses}
            draggable={false}
          />
        </div>
      </div>

      {/* Translucent Screen-Shatter Fragments breaking toward the camera (64%-65%) and dissolving progressively (65%-70%) */}
      {shardLayerOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ opacity: shardLayerOpacity * 0.9 }}
        >
          {screenShards.map((s, idx) => {
            const spread = isMobile ? 16 : 22;
            const tx = s.x * (6 + shardTimeline * spread);
            const ty = s.y * (5 + shardTimeline * spread);
            const sc = 0.52 + shardTimeline * 1.38;
            const rot = s.rot * (0.25 + shardTimeline * 0.95);
            return (
              <div
                key={idx}
                className="absolute pointer-events-none"
                style={{
                  width: `${s.w}vmin`,
                  height: `${s.h}vmin`,
                  clipPath: `polygon(${s.poly})`,
                  transform: `translate3d(${tx}vmin, ${ty}vmin, 0) scale(${sc}) rotate(${rot}deg)`,
                  background:
                    idx % 2 === 0
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(0,210,255,0.18) 55%, rgba(33,228,91,0.12) 100%)'
                      : 'linear-gradient(145deg, rgba(220,255,248,0.26) 0%, rgba(33,228,91,0.16) 55%, rgba(0,210,255,0.14) 100%)',
                  boxShadow:
                    'inset 0 0 12px rgba(255,255,255,0.35), 0 0 14px rgba(0,210,255,0.25)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Foreground Luminous Light-Barrier Flash & Anamorphic Streak at 20% (untouched) */}
      {barrierBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: barrierBurst * 0.58 }}
        >
          <div
            className="w-full h-36 sm:h-48"
            style={{
              transform: `scaleX(${0.5 + barrierExpandT * 1.1}) scaleY(${0.6 + barrierBurst * 0.8})`,
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(155,255,230,0.55) 28%, rgba(0,210,255,0.22) 55%, transparent 80%)',
              filter: 'blur(10px)',
            }}
          />
          <div
            className="absolute w-[90vw] h-[3px] rounded-full"
            style={{
              transform: `scaleX(${0.4 + barrierExpandT * 0.9})`,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(0,210,255,0.8) 25%, rgba(255,255,255,0.98) 50%, rgba(33,228,91,0.8) 75%, transparent 100%)',
              boxShadow: '0 0 24px rgba(180,255,245,0.9)',
            }}
          />
        </div>
      )}

      {/* Subtle Foreground Depth Streak at 63%-65.5% */}
      {screenFlashBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: screenFlashBurst * 0.28 }}
        >
          <div
            className="w-full h-24 sm:h-32"
            style={{
              transform: `scaleX(${0.45 + screenFlashExpandT * 0.95}) scaleY(${0.5 + screenFlashBurst * 0.55})`,
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(0,210,255,0.32) 38%, transparent 78%)',
              filter: 'blur(9px)',
            }}
          />
        </div>
      )}

      {/* Preload all unique frames in the DOM background so scroll scrub is 100% instant */}
      <div className="hidden" aria-hidden="true">
        {UNIQUE_FRAME_SRCS.map((src) => (
          <img key={src} src={src} alt="" loading="eager" decoding="async" />
        ))}
      </div>
    </div>
  );
};
