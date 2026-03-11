'use client';

import React, { useState, useEffect } from 'react';
import FinalFloatingNav from './FinalFloatingNav';
import MobileNav from './MobileNav';

const NavigationWrapper: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile ? <MobileNav /> : <FinalFloatingNav />;
};

export default NavigationWrapper;
