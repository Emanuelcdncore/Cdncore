// Tiny client-side loaders for third-party <script>/<link> assets.
// Each URL is loaded at most once per page; concurrent callers share the same Promise.

type Loader = Promise<void>;

const scriptPromises = new Map<string, Loader>();
const stylePromises = new Map<string, Loader>();

export function loadScript(src: string): Loader {
  if (typeof window === 'undefined') return Promise.resolve();
  const cached = scriptPromises.get(src);
  if (cached) return cached;

  const p = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-loader="${src}"]`);
    if (existing) {
      if ((existing as any)._loaded) return resolve();
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error(`script load failed: ${src}`)), { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.loader = src;
    s.addEventListener('load', () => { (s as any)._loaded = true; resolve(); }, { once: true });
    s.addEventListener('error', () => reject(new Error(`script load failed: ${src}`)), { once: true });
    document.head.appendChild(s);
  });

  scriptPromises.set(src, p);
  return p;
}

export function loadStyle(href: string): Loader {
  if (typeof window === 'undefined') return Promise.resolve();
  const cached = stylePromises.get(href);
  if (cached) return cached;

  const p = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLLinkElement>(`link[data-loader="${href}"]`);
    if (existing) return resolve();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.loader = href;
    link.addEventListener('load', () => resolve(), { once: true });
    link.addEventListener('error', () => reject(new Error(`style load failed: ${href}`)), { once: true });
    document.head.appendChild(link);
  });

  stylePromises.set(href, p);
  return p;
}

export function loadAllScripts(srcs: string[]): Promise<void> {
  return srcs.reduce<Promise<void>>((acc, src) => acc.then(() => loadScript(src)), Promise.resolve());
}
