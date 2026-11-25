import { useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | '/'
  | '/servicios'
  | '/blog'
  | '/premios-y-trayectoria'
  | '/contacto'
  | '/info'
  | '/info/impresion'
  | '/info/experiencias'
  | '/info/imagen-de-marca';

export interface RouteState {
  path: AppRoute;
  params: Record<string, string>;
  hash: string;
}

function parseLocation(): RouteState {
  if (typeof window === 'undefined') {
    return { path: '/', params: {}, hash: '' };
  }

  const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  let path: AppRoute = '/';
  if (rawPath === '/servicios') path = '/servicios';
  else if (rawPath === '/blog') path = '/blog';
  else if (rawPath === '/premios-y-trayectoria' || rawPath === '/premios') path = '/premios-y-trayectoria';
  else if (rawPath === '/contacto') path = '/contacto';
  else if (rawPath === '/info') path = '/info';
  else if (rawPath === '/info/impresion') path = '/info/impresion';
  else if (rawPath === '/info/experiencias') path = '/info/experiencias';
  else if (rawPath === '/info/imagen-de-marca') path = '/info/imagen-de-marca';

  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    params[key] = val;
  });

  const hash = window.location.hash.replace(/^#/, '');

  return { path, params, hash };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(() => parseLocation());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    if (typeof window === 'undefined') return;

    // Separate path, search, and hash
    const url = new URL(to, window.location.origin);
    const targetPath = (url.pathname.replace(/\/+$/, '') || '/') as AppRoute;

    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    setRoute(parseLocation());

    if (options?.scroll !== false) {
      if (!url.hash && !url.searchParams.get('section')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  return { route, navigate, currentPath: route.path, params: route.params, hash: route.hash };
}
