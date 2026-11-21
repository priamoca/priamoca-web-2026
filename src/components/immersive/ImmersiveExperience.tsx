import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SCENES, SceneDef } from '../../types';
import { BoothScene } from './BoothScene';
import { TunnelScene3D } from './TunnelScene3D';
import { PriamitoActor } from './PriamitoActor';
import { RolandPrinterScene } from './RolandPrinterScene';
import { SceneHUD } from './SceneHUD';

interface ImmersiveExperienceProps {
  onExploreProjects: () => void;
  onRequestQuote: () => void;
  tiltActive: boolean;
  onScrollProgressChange?: (progress: number) => void;
  isProgrammaticNavigating?: boolean;
  resetTrigger?: number;
}

export const ImmersiveExperience: React.FC<ImmersiveExperienceProps> = ({
  onExploreProjects,
  onRequestQuote,
  tiltActive,
  onScrollProgressChange,
  isProgrammaticNavigating = false,
  resetTrigger = 0,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [currentScene, setCurrentScene] = useState<SceneDef>(SCENES[0]);

  // Continuous bidirectional auto-scroll controller:
  // - Direction: 1 (forward) or -1 (backward)
  // - Never pauses permanently: only pauses while user is actively interacting (touching, scrolling)
  // - Scrolling forward auto-advances forward; scrolling backward auto-retrocedes backward
  const autoScrollDirectionRef = useRef<1 | -1>(1);
  const isAutoScrollingRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const isProgrammaticNavRef = useRef(isProgrammaticNavigating);
  isProgrammaticNavRef.current = isProgrammaticNavigating;

  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Speed: fluid, cinematic traversal (~324px per second)
  const AUTO_SCROLL_SPEED = 324;

  // C1-smooth scroll-time bijection:
  // 1) Back-floating bridge travel tramo (20%..64%) keeps +12.9% duration slowdown
  // 2) El Ávila + front-facing Priamito tramo (64.2%..68.0%) slows smoothly so user can appreciate both before returning to exact original speed at 68% for the Roland plotter
  const TRAMO_SLOWDOWN = 0.135;
  const AVILA_SLOWDOWN = 1.5;
  const TRAMO_W_TOTAL = 1 + 0.42 * TRAMO_SLOWDOWN + 0.031 * AVILA_SLOWDOWN; // 1.1032

  const canonicalToRawRatio = useCallback((p: number): number => {
    const clampedP = Math.min(1, Math.max(0, p));
    let extra = 0;

    // 1) Bridge travel tramo slowdown (0.20..0.64)
    if (clampedP > 0.2 && clampedP <= 0.22) {
      const t = (clampedP - 0.2) / 0.02;
      extra += 0.02 * TRAMO_SLOWDOWN * (t * t * t - 0.5 * t * t * t * t);
    } else if (clampedP > 0.22 && clampedP <= 0.62) {
      extra += 0.01 * TRAMO_SLOWDOWN + TRAMO_SLOWDOWN * (clampedP - 0.22);
    } else if (clampedP > 0.62 && clampedP < 0.64) {
      const t = (clampedP - 0.62) / 0.02;
      extra +=
        0.41 * TRAMO_SLOWDOWN +
        0.02 * TRAMO_SLOWDOWN * (t - (t * t * t - 0.5 * t * t * t * t));
    } else if (clampedP >= 0.64) {
      extra += 0.42 * TRAMO_SLOWDOWN;
    }

    // 2) El Ávila + front-facing Priamito slowdown (0.642..0.680) -> returns to exact 1.0x original speed at 0.680 (start of Roland plotter transition)
    if (clampedP > 0.642 && clampedP <= 0.649) {
      const t = (clampedP - 0.642) / 0.007;
      extra += 0.007 * AVILA_SLOWDOWN * (t * t * t - 0.5 * t * t * t * t);
    } else if (clampedP > 0.649 && clampedP <= 0.673) {
      extra += 0.0035 * AVILA_SLOWDOWN + AVILA_SLOWDOWN * (clampedP - 0.649);
    } else if (clampedP > 0.673 && clampedP < 0.68) {
      const t = (clampedP - 0.673) / 0.007;
      extra +=
        0.0275 * AVILA_SLOWDOWN +
        0.007 * AVILA_SLOWDOWN * (t - (t * t * t - 0.5 * t * t * t * t));
    } else if (clampedP >= 0.68) {
      extra += 0.031 * AVILA_SLOWDOWN;
    }

    return (clampedP + extra) / TRAMO_W_TOTAL;
  }, []);

  const rawRatioToCanonical = useCallback(
    (raw: number): number => {
      const target = Math.min(1, Math.max(0, raw));
      if (target <= 0) return 0;
      if (target >= 1) return 1;
      let lo = 0;
      let hi = 1;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) * 0.5;
        if (canonicalToRawRatio(mid) < target) lo = mid;
        else hi = mid;
      }
      return (lo + hi) * 0.5;
    },
    [canonicalToRawRatio]
  );

  // Check if current scroll position is strictly inside the 3D tunnel range
  const isInImmersiveViewport = useCallback(() => {
    if (!trackRef.current) return false;
    const rect = trackRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return false;
    const prog = -rect.top / totalScrollable;
    return prog >= -0.01 && prog < 0.98;
  }, []);

  // Handle programmatic navigation lock: immediately halt any auto-scroll
  useEffect(() => {
    if (isProgrammaticNavigating) {
      isAutoScrollingRef.current = false;
      isUserInteractingRef.current = false;
    }
  }, [isProgrammaticNavigating]);

  // Handle Inicio click / reset signal: return to 0 with auto-scroll ready for first scroll
  useEffect(() => {
    if (resetTrigger > 0) {
      isAutoScrollingRef.current = false;
      isUserInteractingRef.current = false;
      autoScrollDirectionRef.current = 1;
      setProgress(0);
      onScrollProgressChange?.(0);
      setCurrentScene(SCENES[0]);
    }
  }, [resetTrigger, onScrollProgressChange]);

  // Start / Resume automatic advance in a specific direction
  const triggerAutoScroll = useCallback((dir: 1 | -1 = 1) => {
    // Respect user reduced-motion preference or programmatic lock
    if (isProgrammaticNavRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    autoScrollDirectionRef.current = dir;
    isAutoScrollingRef.current = true;
    isUserInteractingRef.current = false;
  }, []);

  // Main continuous render & auto-advance loop
  useEffect(() => {
    let lastTime = performance.now();

    const autoScrollLoop = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 1000;
      lastTime = now;

      // Never auto-scroll if programmatic navigation is active or outside immersive section
      if (
        isAutoScrollingRef.current &&
        !isUserInteractingRef.current &&
        !isProgrammaticNavRef.current &&
        trackRef.current
      ) {
        const rect = trackRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        const currentProg = rawRatioToCanonical(-rect.top / totalScrollable);
        const dir = autoScrollDirectionRef.current;

        // Boundary checks within the immersive experience container:
        if (dir === 1 && currentProg >= 0.98) {
          // Reached end of immersion -> allow normal manual browsing into corporate sections
          isAutoScrollingRef.current = false;
        } else if (dir === -1 && currentProg <= 0.002) {
          // Reached 0% cover -> stop at origin
          isAutoScrollingRef.current = false;
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        } else {
          // Continuous smooth motion in current direction
          const deltaPx = AUTO_SCROLL_SPEED * dt * dir;
          window.scrollBy({ top: deltaPx, left: 0, behavior: 'instant' as ScrollBehavior });
        }
      }

      rafIdRef.current = requestAnimationFrame(autoScrollLoop);
    };

    rafIdRef.current = requestAnimationFrame(autoScrollLoop);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };
  }, [rawRatioToCanonical]);

  // Interaction Listeners:
  // Detects scroll direction, pauses motion ONLY while actively interacting,
  // and immediately resumes auto-scroll in that direction upon release.
  // CRITICAL: Ignores programmatic navigations and gestures outside the immersive 3D viewport.
  useEffect(() => {
    const markInteraction = (dir?: 1 | -1, resumeDelay = 180) => {
      // If programmatic navigation is taking place, ignore completely
      if (isProgrammaticNavRef.current) {
        isAutoScrollingRef.current = false;
        return;
      }

      // If user is already browsing normal corporate content (Nosotros, etc.), do not auto-scroll
      if (!isInImmersiveViewport()) {
        isAutoScrollingRef.current = false;
        return;
      }

      if (dir !== undefined) {
        autoScrollDirectionRef.current = dir;
        isAutoScrollingRef.current = true;
      }
      isUserInteractingRef.current = true;

      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }

      interactionTimerRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, resumeDelay);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      markInteraction(dir, 190);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      if (isInImmersiveViewport()) {
        isUserInteractingRef.current = true;
      }
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current !== null) {
        const delta = touchStartYRef.current - e.touches[0].clientY;
        if (Math.abs(delta) > 3) {
          const dir: 1 | -1 = delta > 0 ? 1 : -1; // delta > 0: swiping up -> scroll down -> forward
          markInteraction(dir, 180);
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
      interactionTimerRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 80);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', 'Down'].includes(e.key)) {
        markInteraction(1, 200);
      } else if (['ArrowUp', 'PageUp', 'Up'].includes(e.key)) {
        markInteraction(-1, 200);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInImmersiveViewport]);

  // Mouse tilt parallax as desktop fallback
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tiltActive) return; // Gyroscope has priority when active
    const { clientWidth, clientHeight } = document.documentElement;
    const x = (e.clientX / clientWidth) * 2 - 1; // -1 to 1
    const y = (e.clientY / clientHeight) * 2 - 1; // -1 to 1
    setTilt({ x: x * 0.4, y: y * 0.3 });
  }, [tiltActive]);

  // Handle DeviceOrientation for iPhone / Mobile tilt
  useEffect(() => {
    if (!tiltActive || typeof window === 'undefined') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0;
      const beta = (e.beta || 0) - 45;

      const clampedX = Math.min(1, Math.max(-1, gamma / 30));
      const clampedY = Math.min(1, Math.max(-1, beta / 30));

      setTilt({ x: clampedX * 0.6, y: clampedY * 0.4 });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [tiltActive]);

  // Compute scroll progress directly from the pinning container
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) return;
          const rect = trackRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable <= 0) return;

          // Normalized progress strictly in [0, 1] with smooth time dilation on back-floating tramo (20%..64%)
          const rawRatio = Math.min(1, Math.max(0, -rect.top / totalScrollable));
          const clamped = rawRatioToCanonical(rawRatio);

          setProgress(clamped);
          onScrollProgressChange?.(clamped);

          // Update current scene definition
          const active = SCENES.find(
            (s) => clamped >= s.startProgress && clamped <= s.endProgress
          ) || SCENES[SCENES.length - 1];
          setCurrentScene(active);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollProgressChange, rawRatioToCanonical]);

  // Click handler to scrub / jump directly to any scene's progress
  const handleJumpToProgress = (targetProgress: number) => {
    isAutoScrollingRef.current = false;
    isUserInteractingRef.current = false;
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const rawTarget = canonicalToRawRatio(targetProgress);
    const targetScrollTop = window.scrollY + rect.top + rawTarget * totalScrollable;
    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={trackRef}
      id="inicio"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[597vh] bg-white dark:bg-[#07090D] transition-colors duration-200"
    >
      {/* Sticky Fullscreen 100vh Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Scene 01, 02: Architectural Booth & TV Portal */}
        <BoothScene
          progress={progress}
          tiltX={tilt.x}
          tiltY={tilt.y}
        />

        {/* Scene 03, 04, 05, 06: Three.js 3D Futuristic Architectural Tunnel & CMYK Rupture */}
        <TunnelScene3D
          progress={progress}
          tiltX={tilt.x}
          tiltY={tilt.y}
        />

        {/* Priamito Master Actor Layer: Synchronized 2D Alpha PNG sequence across 11% to 70% */}
        <PriamitoActor
          progress={progress}
          tiltX={tilt.x}
          tiltY={tilt.y}
        />

        {/* Scene 07, 08, 09: Roland TrueVIS Printhead, Full Machine & Finale */}
        <RolandPrinterScene
          progress={progress}
          tiltX={tilt.x}
          tiltY={tilt.y}
          onExploreProjects={onExploreProjects}
          onRequestQuote={onRequestQuote}
        />

        {/* Cinematic Interactive HUD Overlay with single "DESLIZA PARA ENTRAR" at 0% (No pause/resume buttons) */}
        <SceneHUD
          progress={progress}
          currentScene={currentScene}
          onJumpToProgress={handleJumpToProgress}
          onStartAutoScroll={() => triggerAutoScroll(1)}
        />
      </div>
    </div>
  );
};
