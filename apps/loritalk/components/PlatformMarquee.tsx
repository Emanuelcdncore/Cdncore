"use client";

import { useTranslation } from "react-i18next";

type PlatformId = "instagram" | "linkedin" | "x" | "youtube" | "threads" | "facebook" | "telegram";

const ICONS: Record<PlatformId, { bg: string; path: string }> = {
  instagram: {
    bg: "linear-gradient(135deg,#f58529,#dd2a7b 50%,#8134af)",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 5.3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.4a2.9 2.9 0 110-5.8 2.9 2.9 0 010 5.8zm5.7-7.6a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z",
  },
  linkedin: {
    bg: "#0a66c2",
    path: "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z",
  },
  x: {
    bg: "#000",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  youtube: {
    bg: "#ff0000",
    path: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6z",
  },
  threads: {
    bg: "#000",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.749-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.143 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 00-2.215-.221z",
  },
  facebook: {
    bg: "#1877f2",
    path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0022 12z",
  },
  telegram: {
    bg: "#26a5e4",
    path: "M12 0a12 12 0 100 24 12 12 0 000-24zm5.6 8.2L15.7 17c-.1.6-.5.8-1 .5l-2.8-2-1.3 1.3c-.2.2-.3.3-.6.3l.2-2.8 5.2-4.7c.2-.2 0-.3-.3-.1l-6.4 4-2.8-.9c-.6-.2-.6-.6.1-.9l11-4.3c.5-.2 1 .1.8.9z",
  },
};

const KEYS: PlatformId[] = ["instagram", "linkedin", "x", "youtube", "threads", "facebook", "telegram"];

function PlatformIcon({ id, size = 18 }: { id: PlatformId; size?: number }) {
  return (
    <span
      className="inline-grid place-items-center rounded-md text-white flex-shrink-0"
      style={{ width: size + 8, height: size + 8, background: ICONS[id].bg }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size * 0.6, height: size * 0.6, color: "#fff" }}>
        <path d={ICONS[id].path} />
      </svg>
    </span>
  );
}

export default function PlatformMarquee() {
  const { t } = useTranslation();
  const items = [...KEYS, ...KEYS];

  return (
    <div className="overflow-hidden border-t" style={{ borderColor: "var(--border-default)", padding: "20px 0", background: "#fff" }}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "scrollMarquee 30s linear infinite", width: "max-content" }}
      >
        {items.map((id, i) => (
          <span key={`${id}-${i}`} className="inline-flex items-center gap-2.5 font-semibold" style={{ fontSize: 14, color: "var(--ink-2)" }}>
            <PlatformIcon id={id} size={14} />
            {t(`hero.marquee.${id}`)}
            <span className="uppercase font-medium" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-tertiary)", letterSpacing: "0.1em" }}>
              {t(`hero.marquee.${id}Tag`)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
