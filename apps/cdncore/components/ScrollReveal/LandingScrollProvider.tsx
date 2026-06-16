'use client';

import React from 'react';
import { useLandingScrollRefresh } from './useLandingScrollRefresh';

export function LandingScrollProvider({ children }: { children: React.ReactNode }) {
  useLandingScrollRefresh();
  return <>{children}</>;
}
