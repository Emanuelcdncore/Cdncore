/**
 * SITE-WIDE OG IMAGE (STATIC)
 * =============================
 * Place this file at: app/opengraph-image.tsx
 *
 * This generates the default OG image for the entire site.
 * Used when a page does not have its own opengraph-image.
 *
 * For static pages, this is preferable to a static image file
 * because it can be dynamically branded and always up to date.
 */

import { ImageResponse } from 'next/og';
// import { siteConfig } from '@/lib/seo-config';

export const alt = 'Site image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// ============================================================
// CUSTOMIZE THESE PER SITE
// ============================================================
const BRAND = {
  name: 'SITE_NAME',
  tagline: 'Company tagline here',
  primaryColor: '#3b82f6',
  gradientFrom: '#3b82f6',
  gradientTo: '#0f172a',
  textColor: '#ffffff',
};

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${BRAND.gradientFrom} 0%, ${BRAND.gradientTo} 100%)`,
          color: BRAND.textColor,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: BRAND.primaryColor,
            display: 'flex',
          }}
        />

        {/* Logo / Company name */}
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {BRAND.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 400,
            opacity: 0.85,
            maxWidth: '600px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {BRAND.tagline}
        </div>

        {/* Decorative bottom element */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: 16,
            opacity: 0.5,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '2px',
              background: BRAND.textColor,
              display: 'flex',
            }}
          />
          <span>{BRAND.name.toLowerCase()}.pt</span>
          <div
            style={{
              width: '40px',
              height: '2px',
              background: BRAND.textColor,
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
