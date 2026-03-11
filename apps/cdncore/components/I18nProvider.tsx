'use client';

import { useEffect, useState } from 'react';
import '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
