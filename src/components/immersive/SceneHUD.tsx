import React from 'react';
import { ChevronDown, Compass, Layers } from 'lucide-react';
import { SCENES, SceneDef } from '../../types';

interface SceneHUDProps {
  progress: number;
  currentScene: SceneDef;
  onJumpToProgress: (target: number) => void;
  onStartAutoScroll?: () => void;
}

export const SceneHUD: React.FC<SceneHUDProps> = ({
  progress,
  currentScene,
  onJumpToProgress,
  onStartAutoScroll,
}) => {
  // Show the prominent "DESLIZA PARA ENTRAR" at 0%, and fade it out smoothly starting at 3% (0.03 to 0.05)
  const promptOpacity = Math.max(0, 1 - Math.max(0, (progress - 0.03) / (0.05 - 0.03)));

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex flex-col justify-between p-3 sm:p-6 lg:p-8 pb-3 sm:pb-6">
      {/* Top HUD Row: Exploration Marker & Current Scene Title */}
      <div className="flex items-start justify-between">
        {/* Current Scene Badge & Concept */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 dark:bg-[#07090D]/80 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border border-neutral-200 dark:border-white/10 shadow-lg transition-colors">
          <div className="w-2 h-2 rounded-full bg-[#21E45B] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
              FASE 0{currentScene.id} · {currentScene.concept}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#262D38] dark:text-white tracking-wide">
              {currentScene.title}
            </span>
          </div>
        </div>

        {/* Minimalist Coordinate & Exploration Crosshairs */}
        <div className="hidden md:flex flex-col items-end gap-1 text-[10px] tabular-nums text-neutral-500">
          <div className="flex items-center gap-2">
            <Compass className="w-3 h-3 text-[#0B7E32] dark:text-[#21E45B]" />
            <span>POS: {(progress * 100).toFixed(1)}%</span>
            <span>·</span>
            <span>CAM Z: {(-progress * 100).toFixed(0)}m</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-600">
            <span>PRIAMO ENGINE</span>
            <span>[60 FPS]</span>
          </div>
        </div>
      </div>

      {/* Center Cinematic Prompt: "DESLIZA PARA ENTRAR" visible at 0%, fades out starting at 3% */}
      {promptOpacity > 0 && (
        <div
          className="self-center flex flex-col items-center gap-3 text-center transition-opacity"
          style={{ opacity: promptOpacity }}
        >
          <button
            onClick={() => onStartAutoScroll?.()}
            className="pointer-events-auto px-5 py-2.5 rounded-full bg-white/95 dark:bg-[#07090D]/90 backdrop-blur-md border border-[#0B7E32]/40 dark:border-[#21E45B]/40 shadow-[0_0_25px_rgba(33,228,91,0.3)] hover:shadow-[0_0_35px_rgba(33,228,91,0.5)] hover:border-[#21E45B] transition-all flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#21E45B] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#262D38] dark:text-white group-hover:text-[#0B7E32] dark:group-hover:text-[#21E45B] transition-colors">
              DESLIZA PARA ENTRAR
            </span>
            <span className="w-2 h-2 rounded-full bg-[#21E45B] animate-pulse" />
          </button>
          <ChevronDown className="w-5 h-5 text-[#21E45B] animate-bounce" />
        </div>
      )}

      {/* Bottom Scene Scrubber / Quick Director Timeline (Clickable & Interactive) */}
      <div className="self-center w-full max-w-2xl bg-white/90 dark:bg-[#07090D]/85 backdrop-blur-lg px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 shadow-xl dark:shadow-2xl pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#0B7E32] dark:text-[#21E45B]" />
          <span className="hidden sm:inline">ESCENAS:</span>
        </div>

        {/* 9 Scene Selector Buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 flex-1 justify-center overflow-x-auto no-scrollbar">
          {SCENES.map((scene) => {
            const isActive = currentScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => onJumpToProgress(scene.startProgress + 0.01)}
                title={`Escena ${scene.id}: ${scene.title}`}
                className={`group relative py-1 px-1 sm:px-2 rounded text-[9px] sm:text-[10px] tabular-nums transition-all focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#21E45B] text-[#262D38] font-black shadow-[0_0_10px_rgba(33,228,91,0.5)]'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-[#262D38] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10'
                }`}
              >
                <span>0{scene.id}</span>
                {/* Micro tooltip on hover */}
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 text-white text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10">
                  {scene.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress Percentage Display */}
        <div className="text-[11px] tabular-nums text-[#0B7E32] dark:text-[#21E45B] font-bold shrink-0">
          {(progress * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
};
