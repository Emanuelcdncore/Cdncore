'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconHome, IconBulb, IconHeart, IconNews, IconMessage, IconMenu2, IconX, IconPackage } from '@tabler/icons-react';
import './css/MobileNav.css';

const navItems = [
  { icon: IconHome, label: 'Home', href: '/' },
  { icon: IconBulb, label: 'Capabilities', href: '/#capabilities' },
  { icon: IconPackage, label: 'Products', href: '/products' },
  { icon: IconHeart, label: 'Commitments', href: '/commitments' },
  { icon: IconNews, label: 'News', href: '/news' },
  { icon: IconMessage, label: 'Contact', href: '/contact' },
];

const MobileNav: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#') && pathname === '/') {
      const id = href.replace('/#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <button className={`hamburger-btn ${hidden && !isOpen ? 'hamburger-btn-hidden' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobile-nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => handleClick(item.href)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
