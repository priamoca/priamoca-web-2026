import React, { useState } from 'react';
import { Eye, X, ArrowUpRight } from 'lucide-react';
import type { AppRoute } from '../../utils/router';

interface AiStudioPreviewAccessProps {
  currentPath: AppRoute;
  onNavigate: (to: string) => void;
}

const PREVIEW_ROUTES: { label: string; path: AppRoute }[] = [
  { label: '/info', path: '/info' },
  { label: 'Impresión', path: '/info/impresion' },
  { label: 'Experiencias', path: '/info/experiencias' },
  { label: 'Marca', path: '/info/imagen-de-marca' },
];

export const AiStudioPreviewAccess: React.FC<AiStudioPreviewAccessProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [dismissed, setDismissed] = useState(false);

  const isPreviewHost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('ais-dev-'));

  if (!isPreviewHost || dismissed) {
    return null;
  }

  const isInInfo = currentPath === '/info' || currentPath.startsWith('/info/');

  return (
    <div
      data-aistudio-preview-bar="true"
      className="fixed bottom-4 left-4 z-[70] flex flex-wrap items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#07182B]/95 text-white border border-[#21E45B]/45 shadow-xl backdrop-blur-md text-[11px] font-bold"
    >
      <span className="inline-flex items-center gap-1.5 px-1.5 text-[#21E45B] uppercase tracking-[0.12em]">
        <Eye className="w-3.5 h-3.5" />
        Preview AI Studio
      </span>

      {isInInfo && (
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          ← Web Principal (/)
        </button>
      )}

      {PREVIEW_ROUTES.map((item) => {
        const active = currentPath === item.path;
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => onNavigate(item.path)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              active
                ? 'bg-[#21E45B] text-[#07182B] font-extrabold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {item.label}
            {!isInInfo && item.path === '/info' && <ArrowUpRight className="w-3 h-3" />}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Ocultar barra de vista previa"
        className="ml-0.5 p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        title="Ocultar temporalmente"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
