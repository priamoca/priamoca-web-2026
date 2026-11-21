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

  // Center alignment: grounded over the Bridge centerline (50% X, 53% Y) when appearing/inviting,
  // smoothly centering to (50% X, 50% Y) as Priamito launches into flight along the bridge and through El Ávila
  const flightBlend = Math.min(1, Math.max(0, (progress - 0.17) / (0.21 - 0.17)));
  const anchorX = 50;
  const anchorY = 53 - flightBlend * 3; // 53% -> 50%

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
  let imgClasses = 'h-auto max-h-[50dvh] max-w-[80vw] sm:max-h-[58vh] sm:max-w-[85vw] object-contain drop-shadow-[0_14px_26px_rgba(7,12,22,0.42)] select-none pointer-events-none will-change-transform';

  if (state.segmentId === '01_aparicion') {
    // 11% to 14%: Looking directly at visitor, scale strictly 1.0
    customTransform = `scale(${actorScale}) translate3d(${pX}px, ${pY}px, 0)`;
  } else if (state.segmentId === '02_invitacion') {
    // 14% to 17%: Invites with hand WITHOUT increasing in size ("sin aumentar de tamaño")
    const inviteScale = isMobile ? 0.88 : 1.0;
    customTransform = `scale(${inviteScale}) translate3d(${pX + state.posX * (isMobile ? 2.5 : 4)}px, ${pY}px, 0)`;
  } else if (state.segmentId === '03_giro') {
    // 17% to 20%: Completes turn and faces away
    customTransform = `scale(${actorScale}) translate3d(${pX + state.posX * (isMobile ? 2.5 : 4)}px, ${pY + state.posY * (isMobile ? 2.5 : 4)}px, 0)`;
  } else if (state.segmentId === '05_flotacion_espalda') {
    // 20% to 64%: Continuous horizontal flight along the bridge toward the central tower
    customTransform = `scale(${actorScale}) translate3d(${pX + floatDriftX}px, ${pY + floatBobY}px, 0) rotate(${floatTilt}deg)`;
    imgClasses = 'h-auto max-h-[46dvh] max-w-[76vw] sm:max-h-[62vh] sm:max-w-[62vh] aspect-square object-contain drop-shadow-[0_16px_28px_rgba(7,12,22,0.45)] select-none pointer-events-none will-change-transform';
  } else if (state.segmentId === '06_ruptura') {
    // 64% to 70%: Reuses existing front-facing flight smoothly coupled to continuous float motion over El Ávila
    const settleFactor = 1 - state.localT * 0.35;
    customTransform = `scale(${actorScale}) translate3d(${pX + floatDriftX * settleFactor}px, ${pY + floatBobY * settleFactor}px, 0) rotate(${floatTilt * settleFactor}deg)`;
    // Explicit viewport-matched height keeps character height identical between IMG_2615 and 06_ruptura on both mobile & desktop
    imgClasses = 'h-[min(46dvh,76vw)] sm:h-[62vh] w-auto max-w-none object-contain drop-shadow-[0_16px_30px_rgba(7,12,22,0.48)] select-none pointer-events-none will-change-transform';
  }

  // Deterministic luminous light-barrier transition centered at 20% (0.184 to 0.218) — untouched
  const barrierBurst =
    progress >= 0.184 && progress <= 0.218
      ? Math.exp(-Math.pow((progress - 0.20) / 0.0085, 2))
      : 0;
  const barrierExpandT = Math.min(1, Math.max(0, (progress - 0.184) / (0.218 - 0.184)));

  // Pure-white radiant beam transition envelope (61.8% to 65.8%, peak at ~64.0%)
  const whiteBeamBurst =
    progress >= 0.618 && progress <= 0.658
      ? Math.exp(-Math.pow((progress - 0.640) / 0.0095, 2))
      : 0;
  const whiteBeamExpandT = Math.min(1, Math.max(0, (progress - 0.618) / (0.658 - 0.618)));

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

      {/* Concentric Pure-White Light Tunnel Rings behind Priamito across 61.8%-65.8% */}
      {whiteBeamBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: whiteBeamBurst * 0.88 }}
        >
          <div
            className="rounded-full border-2 border-white/90"
            style={{
              width: `${34 + whiteBeamExpandT * 105}vmin`,
              height: `${34 + whiteBeamExpandT * 105}vmin`,
              boxShadow: '0 0 70px rgba(255, 255, 255, 0.95), inset 0 0 55px rgba(255, 255, 255, 0.8)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: `${75 + whiteBeamExpandT * 120}vmin`,
              height: `${75 + whiteBeamExpandT * 120}vmin`,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 36%, rgba(255,255,255,0.42) 66%, transparent 92%)',
              filter: 'blur(16px)',
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

      {/* Fullscreen Radiant White Light Beam Bloom wrapping the screen cleanly at 61.8%-65.8% */}
      {whiteBeamBurst > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: Math.min(1, whiteBeamBurst * 0.72),
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 38%, rgba(255,255,255,0.52) 100%)',
          }}
        >
          <div
            className="w-full h-36 sm:h-52"
            style={{
              transform: `scaleX(${0.6 + whiteBeamExpandT * 1.15}) scaleY(${0.7 + whiteBeamBurst * 0.9})`,
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.58) 42%, transparent 82%)',
              filter: 'blur(12px)',
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
