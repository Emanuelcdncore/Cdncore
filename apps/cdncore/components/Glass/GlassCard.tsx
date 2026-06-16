'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useGlassLight } from './useGlassLight';
import type {
  GlassBorder,
  GlassGlow,
  GlassPadding,
  GlassRadius,
  GlassVariant,
} from './glass.types';
import './GlassCard.css';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: GlassVariant;
  interactive?: boolean;
  glow?: GlassGlow;
  padding?: GlassPadding;
  radius?: GlassRadius;
  border?: GlassBorder;
  as?: 'div' | 'article' | 'section';
}

const glowClass: Record<GlassGlow, string> = {
  purple: 'glass-card--glow-purple',
  cyan: 'glass-card--glow-cyan',
  neutral: 'glass-card--glow-neutral',
  brand: 'glass-card--glow-brand',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'surface',
  interactive = true,
  glow = 'purple',
  padding = 'md',
  radius = 'md',
  border = 'luminous',
  as: Component = 'div',
  className,
  ...rest
}) => {
  const lightRef = useGlassLight(interactive && variant !== 'inset');
  const isInteractive = interactive && variant !== 'inset';

  return (
    <Component
      ref={lightRef as React.Ref<HTMLDivElement>}
      className={cn(
        'glass-card',
        `glass-card--${variant}`,
        glowClass[glow],
        `glass-card--padding-${padding}`,
        radius !== 'md' && `glass-card--radius-${radius}`,
        border !== 'luminous' && `glass-card--border-${border}`,
        isInteractive && 'glass-card--interactive',
        className
      )}
      {...rest}
    >
      <div className="glass-card__backdrop" aria-hidden="true" />
      <div className="glass-card__fill" aria-hidden="true" />
      <div className="glass-card__glow" aria-hidden="true" />
      {isInteractive && <div className="glass-card__ambient" aria-hidden="true" />}
      {border !== 'none' && <div className="glass-card__border" aria-hidden="true" />}
      <div className="glass-card__inner">{children}</div>
    </Component>
  );
};

export default GlassCard;
