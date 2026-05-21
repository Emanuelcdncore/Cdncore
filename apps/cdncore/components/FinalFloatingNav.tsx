'use client';

import React, { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconHome, IconCode, IconNews, IconHeart, IconMessage, IconPackage } from '@tabler/icons-react';
import './css/FloatingNav.css';

const navItems = [
  { icon: IconHome, label: 'Home', href: '/', section: 'hero' },
  { icon: IconCode, label: 'Services', href: '/#capabilities', section: 'capabilities' },
  { icon: IconPackage, label: 'Products', href: '/products' },
  { icon: IconNews, label: 'News', href: '/news' },
  { icon: IconHeart, label: 'Commitments', href: '/commitments' },
  { icon: IconMessage, label: 'Contact', href: '/contact' },
];

const FinalFloatingNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

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
  }, [pathname, router]);

  return (
    <nav className="floating-nav">
      {navItems.map((item, i) => (
        <a
          key={item.label}
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
    </nav>
  );
};

export default FinalFloatingNav;
