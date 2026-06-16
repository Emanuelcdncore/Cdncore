'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconHome, IconCode, IconNews, IconHeart, IconMessage, IconPackage } from '@tabler/icons-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import './css/FloatingNav.css';

const FinalFloatingNav: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = useMemo(() => [
    { icon: IconHome, label: t('nav.home', 'Home'), href: '/', section: 'hero' },
    { icon: IconCode, label: t('nav.services', 'Services'), href: '/services' },
    { icon: IconPackage, label: t('nav.products', 'Products'), href: '/products' },
    { icon: IconNews, label: t('nav.news', 'News'), href: '/news' },
    { icon: IconHeart, label: t('nav.commitments', 'Commitments'), href: '/commitments' },
    { icon: IconMessage, label: t('nav.contact', 'Contact'), href: '/contact' },
  ], [t]);

  const handleClick = useCallback((item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    if (item.href.startsWith('/#')) {
      const sectionId = item.href.replace('/#', '');
      if (pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.href === '/' && item.section === 'hero') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    } else {
      router.push(item.href);
    }
  }, [pathname, router, t]);

  return (
    <nav className={`floating-nav ${hidden ? 'floating-nav-hidden' : ''}`}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`floating-nav-item ${pathname === item.href ? 'active' : ''}`}
          onClick={(e) => handleClick(item, e)}
        >
          <span className="floating-nav-item-icon">
            <item.icon size={16} />
          </span>
          <span className="floating-nav-item-text">{item.label}</span>
          <span className="floating-nav-item-underline" />
        </a>
      ))}
      <div className="floating-nav-separator" />
      <LanguageSelector />
    </nav>
  );
};

export default FinalFloatingNav;