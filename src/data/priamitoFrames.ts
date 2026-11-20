/**
 * PRIAMO PUBLICIDAD — Priamito Animation Engine & Frame Sequences
 * 
 * Timeline strictly specified by user:
 * - 0% to 3%: TV off, "Desliza para entrar" displayed.
 * - 3%: Cinematic zoom starts, prompt message fades out.
 * - 3% to 11%: Camera advances towards TV and screen powers on.
 * - 11%: Priamito appears looking directly at visitor (01_aparicion: 11% to 14%).
 *        Smooth auto-scroll starts, immediately cancelled on any user interaction.
 * - 14%: Priamito invites with hand WITHOUT increasing in size (02_invitacion: 14% to 17%).
 * - 17% to 20%: Completes turn facing away from visitor (03_giro).
 * - 20%: Cinematic luminous light-barrier flash & depth transition into the tunnel.
 * - 20% to 68% (fully settled in flight by 21%-22%): Floats horizontally from behind
 *        advancing continuously through blue & green 3D depth tunnel
 *        (using the 6 user-provided back-view PNGs: IMG_2620 to IMG_2615),
 *        while POP advertising materials appear progressively on both sides.
 * - 68%: Prepares transition to plotter scene.
 * - 70%: Cinematic transition into the Roland TrueVIS macro printhead scene.
 */

export type PriamitoClipName = 'idle' | 'invite' | 'turn' | 'walk' | 'float_back' | 'break';

export interface PriamitoSegmentDef {
  id: string;
  clipName: PriamitoClipName;
  description: string;
  startPct: number; // in percent
  endPct: number;   // in percent
  frameCount: number;
  aspectRatio: number; // width / height
  frames: string[];
}

export interface PriamitoActorState {
  segmentId: string;
  clipName: PriamitoClipName;
  frameIndex: number;     // 0 to frameCount - 1
  frameNumber: number;   // 1 to frameCount
  frameSrc: string;
  localT: number;        // 0.0 to 1.0 within segment
  globalProgress: number;// 0.0 to 1.0 total scroll progress
  isVisible: boolean;
  
  // Spatial parameters for 2D & Three.js positioning
  depthZ: number;
  scale: number;
  posX: number;
  posY: number;
  opacity: number;
  floatT: number; // Continuous flight phase across 20%..70%
  crossfadeBack?: {
    frameSrc: string;
    scale: number;
    opacity: number;
  };
}

export const BACK_FLOATING_FRAMES: string[] = [
  '/assets/aistudio/IMG_2620_74226311.PNG',
  '/assets/aistudio/IMG_2619_317eb2ad.PNG',
  '/assets/aistudio/IMG_2618_8e8ef92a.PNG',
  '/assets/aistudio/IMG_2617_208a9e9d.PNG',
  '/assets/aistudio/IMG_2616_e5ddcd83.PNG',
  '/assets/aistudio/IMG_2615_7427b925.PNG',
];

// Reference span preserving exact 0%..64% frame & bobbing timing when advancing 06_ruptura to 64%
const BACK_FLIGHT_PHASE_SPAN = 48;

export const PRIAMITO_SEGMENTS: PriamitoSegmentDef[] = [
  {
    id: '01_aparicion',
    clipName: 'idle',
    description: 'Aparece a las 11% mirando al visitante',
    startPct: 11,
    endPct: 14,
    frameCount: 9,
    aspectRatio: 431 / 405,
    frames: [
      '/assets/aistudio/01_aparicion_001_492201b9.png',
      '/assets/aistudio/01_aparicion_002_350a54b4.png',
      '/assets/aistudio/01_aparicion_003_f7c34941.png',
      '/assets/aistudio/01_aparicion_004_9748fdc5.png',
      '/assets/aistudio/01_aparicion_005_fee6c1c7.png',
      '/assets/aistudio/01_aparicion_006_187a3a5b.png',
      '/assets/aistudio/01_aparicion_007_2f815e0c.png',
      '/assets/aistudio/01_aparicion_008_06e7e218.png',
      '/assets/aistudio/01_aparicion_009_fd7c28b6.png',
    ],
  },
  {
    id: '02_invitacion',
    clipName: 'invite',
    description: 'A las 14% invita con la mano sin aumentar de tamaño',
    startPct: 14,
    endPct: 17,
    frameCount: 9,
    aspectRatio: 420 / 415,
    frames: [
      '/assets/aistudio/02_invitacion_001_482c4374.png',
      '/assets/aistudio/02_invitacion_002_c6e1a107.png',
      '/assets/aistudio/02_invitacion_003_c93777a5.png',
      '/assets/aistudio/02_invitacion_004_23c5e469.png',
      '/assets/aistudio/02_invitacion_005_15066b3e.png',
      '/assets/aistudio/02_invitacion_006_57f73cee.png',
      '/assets/aistudio/02_invitacion_007_7740e779.png',
      '/assets/aistudio/02_invitacion_008_6bec733b.png',
      '/assets/aistudio/02_invitacion_009_e4970055.png',
    ],
  },
  {
    id: '03_giro',
    clipName: 'turn',
    description: 'A las 17% completa el giro y queda totalmente de espaldas',
    startPct: 17,
    endPct: 20,
    frameCount: 9,
    aspectRatio: 431 / 405,
    frames: [
      '/assets/aistudio/03_giro_001_dfe5d5c5.png',
      '/assets/aistudio/03_giro_002_38b8661d.png',
      '/assets/aistudio/03_giro_003_be7f0a35.png',
      '/assets/aistudio/03_giro_004_94f5405e.png',
      '/assets/aistudio/03_giro_005_f00584cc.png',
      '/assets/aistudio/03_giro_006_03321348.png',
      '/assets/aistudio/03_giro_007_fb0deda1.png',
      '/assets/aistudio/03_giro_008_e6c69f42.png',
      '/assets/aistudio/03_giro_009_0bac2bdd.png',
    ],
  },
  {
    id: '05_flotacion_espalda',
    clipName: 'float_back',
    description: 'Desde la barrera de luz al 20% hasta el 64% flota horizontalmente de espaldas por el túnel',
    startPct: 20,
    endPct: 64,
    frameCount: 6,
    aspectRatio: 1254 / 1254, // 1:1
    frames: BACK_FLOATING_FRAMES,
  },
  {
    id: '06_ruptura',
    clipName: 'break',
    description: 'Entre 64% y 65% gira hacia el frente entre fragmentos y vuela de frente hasta el 70% hacia el plotter Roland',
    startPct: 64,
    endPct: 70,
    frameCount: 9,
    aspectRatio: 724 / 244,
    frames: [
      '/assets/aistudio/06_ruptura_001_c21fe531.png',
      '/assets/aistudio/06_ruptura_002_b37dbe69.png',
      '/assets/aistudio/06_ruptura_003_6676d708.png',
      '/assets/aistudio/06_ruptura_004_9f3f28be.png',
      '/assets/aistudio/06_ruptura_005_8af78c54.png',
      '/assets/aistudio/06_ruptura_006_15e13adb.png',
      '/assets/aistudio/06_ruptura_007_f45bd5cf.png',
      '/assets/aistudio/06_ruptura_008_2bc41491.png',
      '/assets/aistudio/06_ruptura_009_92a51493.png',
    ],
  },
];

// All frame URLs for preloading into memory/textures
export const ALL_PRIAMITO_FRAME_SRCS = [
  ...PRIAMITO_SEGMENTS.flatMap((s) => s.frames),
  ...BACK_FLOATING_FRAMES,
];

// Deduplicate
export const UNIQUE_FRAME_SRCS = Array.from(new Set(ALL_PRIAMITO_FRAME_SRCS));

/**
 * Pure deterministic calculation: maps normalized scroll progress (0..1)
 * to exact segment, frame, and spatial parameters.
 */
export function getPriamitoState(progress: number): PriamitoActorState {
  const pct = progress * 100;

  // Priamito appears at 11%, and transition to Roland printer occurs at 70%
  if (pct < 11 || pct >= 70) {
    return {
      segmentId: pct < 11 ? '01_aparicion' : '06_ruptura',
      clipName: pct < 11 ? 'idle' : 'break',
      frameIndex: pct < 11 ? 0 : 8,
      frameNumber: pct < 11 ? 1 : 9,
      frameSrc: pct < 11 ? PRIAMITO_SEGMENTS[0].frames[0] : PRIAMITO_SEGMENTS[PRIAMITO_SEGMENTS.length - 1].frames[8],
      localT: pct < 11 ? 0 : 1,
      globalProgress: progress,
      isVisible: false,
      depthZ: pct < 11 ? 0 : 1,
      scale: 1,
      posX: 0,
      posY: 0,
      opacity: 0,
      floatT: pct < 11 ? 0 : (70 - 20) / BACK_FLIGHT_PHASE_SPAN,
    };
  }

  // Find corresponding segment
  let seg = PRIAMITO_SEGMENTS.find((s) => pct >= s.startPct && pct < s.endPct);
  if (!seg) {
    seg = PRIAMITO_SEGMENTS[PRIAMITO_SEGMENTS.length - 1];
  }

  const segmentRange = seg.endPct - seg.startPct;
  // Preserve exact 20%..62% phase & frame progression using BACK_FLIGHT_PHASE_SPAN (48%)
  const phaseDenominator = seg.id === '05_flotacion_espalda' ? BACK_FLIGHT_PHASE_SPAN : segmentRange;
  const localT = Math.min(1, Math.max(0, (pct - seg.startPct) / phaseDenominator));
  const continuousFloatT = Math.max(0, (pct - 20) / BACK_FLIGHT_PHASE_SPAN);

  // Deterministic frame calculation:
  // For 06_ruptura (64%->70%), ease gently past standing frame so by 65% he is already in front-floating flight (frame 003+)
  const frameProgress =
    seg.id === '06_ruptura' ? Math.min(1, 0.08 + localT * 0.92) : localT;
  const frameIndex = Math.min(
    seg.frameCount - 1,
    Math.max(0, Math.round(frameProgress * (seg.frameCount - 1)))
  );
  const frameSrc = seg.frames[frameIndex];

  let scale = 1.0;
  let posX = 0;
  let posY = 0;
  const depthZ = (pct - 11) / (70 - 11);
  let crossfadeBack: PriamitoActorState['crossfadeBack'];

  if (seg.id === '01_aparicion') {
    // 11% to 14%: Looking directly at visitor inside TV, scale steady 1.0
    scale = 1.0;
    posX = 0;
    posY = 0;
  } else if (seg.id === '02_invitacion') {
    // 14% to 17%: Invites with hand WITHOUT increasing in size ("sin aumentar de tamaño")
    scale = 1.0;
    posX = localT * 3;
    posY = 0;
  } else if (seg.id === '03_giro') {
    // 17% to 20%: Completes turn and faces away (0% to 19% completely unchanged)
    scale = 1.0 - localT * 0.08;
    posX = 3 - localT * 3;
    posY = localT * 1.5;
  } else if (seg.id === '05_flotacion_espalda') {
    // 20% to 64%: Identical frame & bobbing behavior up to 62% and cleanly up to 64%
    const charHeights = [0.23, 0.36, 0.68, 0.95, 0.93, 0.94];
    const effectiveScale = 0.56 + localT * 0.09;
    const normFactor = 0.94 / (charHeights[frameIndex] || 0.94);
    scale = effectiveScale * normFactor;

    const floatBob = Math.sin(localT * Math.PI * 3) * 4;
    posX = Math.sin(localT * Math.PI * 2) * 8;
    posY = floatBob;
  } else if (seg.id === '06_ruptura') {
    // 64% to 70%: Reuses existing front-facing floating clip without duplicating clips.
    // Visual character height of 06_ruptura (~0.92 char_h in 62vh box) matches IMG_2615 (0.94 char_h at 0.6425 scale -> 0.656).
    scale = 0.656 + Math.pow(localT, 1.15) * 0.165;
    posX = Math.sin(continuousFloatT * Math.PI * 2) * 8 * (1 - localT * 0.5);
    posY = Math.sin(continuousFloatT * Math.PI * 3) * 4 * (1 - localT * 0.5);

    // Between 64% and 65%, cross-blend seamlessly from back flight (IMG_2615) into front floating (06_ruptura)
    if (pct < 65.0) {
      const blendT = Math.min(1, Math.max(0, pct - 64.0));
      const backScale = 0.56 + continuousFloatT * 0.09;
      crossfadeBack = {
        frameSrc: BACK_FLOATING_FRAMES[BACK_FLOATING_FRAMES.length - 1],
        scale: backScale,
        opacity: 1 - blendT,
      };
    }
  }

  // Smooth opacity curve:
  // - 0%-62% untouched
  // - 64%-65%: front clip fades 0 -> 1 cleanly as back clip fades 1 -> 0
  // - 65%-69.2%: full front floating at 1.0
  // - 69.2%-70%: smooth handoff into Roland TrueVIS scene
  let opacity = 1.0;
  if (pct < 11.4) {
    opacity = (pct - 11) / 0.4;
  } else if (pct >= 19.6 && pct < 20.0) {
    opacity = Math.max(0.25, 1 - (pct - 19.6) / 0.55);
  } else if (pct >= 20.0 && pct < 20.8) {
    opacity = Math.min(1, 0.15 + ((pct - 20.0) / 0.8) * 0.85);
  } else if (pct >= 64.0 && pct < 65.0) {
    opacity = Math.min(1, Math.max(0, pct - 64.0));
  } else if (pct > 69.2) {
    opacity = Math.max(0, 1 - (pct - 69.2) / 0.8);
  }

  return {
    segmentId: seg.id,
    clipName: seg.clipName,
    frameIndex,
    frameNumber: frameIndex + 1,
    frameSrc,
    localT,
    globalProgress: progress,
    isVisible: true,
    depthZ,
    scale,
    posX,
    posY,
    opacity,
    floatT: continuousFloatT,
    crossfadeBack,
  };
}

let isPreloaded = false;
const preloadedImages: HTMLImageElement[] = [];

export function preloadPriamitoFrames(): Promise<void> {
  if (typeof window === 'undefined' || isPreloaded) {
    return Promise.resolve();
  }

  isPreloaded = true;
  const promises = UNIQUE_FRAME_SRCS.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
      preloadedImages.push(img);
    });
  });

  return Promise.all(promises).then(() => {});
}
