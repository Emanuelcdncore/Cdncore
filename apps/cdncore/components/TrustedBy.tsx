'use client';

import { useTranslation } from 'react-i18next';
import LogoLoop from './ReactBits/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiLinux,
  SiPython,
  SiKubernetes,
} from 'react-icons/si';

const bp = process.env.BASE_PATH || '';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiNginx />, title: 'Nginx', href: 'https://nginx.org' },
  { node: <SiLinux />, title: 'Linux', href: 'https://www.linux.org' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiKubernetes />, title: 'Kubernetes', href: 'https://kubernetes.io' },
];

const clientLogos = [
  { src: `${bp}/Hiscox.png`, alt: 'Hiscox', title: 'Hiscox', href: 'https://www.hiscox.com' },
];

const allLogos = [...clientLogos, ...techLogos];

export default function TrustedBy() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(153, 69, 255, 0.1)',
        borderBottom: '1px solid rgba(153, 69, 255, 0.1)',
        padding: '48px 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.28)',
            margin: 0,
          }}
        >
          {t('capabilities.trustedby_label', 'TRUSTED BY')}
        </p>

        <div style={{ width: '100%', height: '48px' }}>
          <LogoLoop
            logos={allLogos}
            speed={60}
            direction="left"
            logoHeight={36}
            gap={56}
            hoverSpeed={0}
            fadeOut={true}
            fadeOutColor="#000000"
            scaleOnHover={true}
            ariaLabel="Clients and technologies"
          />
        </div>
      </div>
    </section>
  );
}
