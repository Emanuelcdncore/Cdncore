/**
 * ORGANIZATION SCHEMA COMPONENT
 * ==============================
 * Place in: components/seo/organization-schema.tsx
 *
 * Renders Schema.org Organization structured data as JSON-LD.
 * Include this in your root layout <head> or body.
 *
 * Usage:
 *   import { OrganizationSchema } from '@/components/seo/organization-schema';
 *   <OrganizationSchema />
 */

// import { siteConfig } from '@/lib/seo-config';
import type { SiteConfig } from '../../configs/seo-config.types';

interface OrganizationSchemaProps {
  config: SiteConfig;
}

export function OrganizationSchema({ config }: OrganizationSchemaProps) {
  const socialLinks = Object.values(config.social).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': config.organizationType || 'Organization',
    '@id': `${config.siteUrl}/#organization`,
    name: config.companyName,
    legalName: config.companyLegalName,
    url: config.siteUrl,
    description: config.description,
    logo: {
      '@type': 'ImageObject',
      url: `${config.siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${config.siteUrl}/opengraph-image.jpg`,
    email: config.contact.email,
    telephone: config.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address.streetAddress,
      addressLocality: config.contact.address.addressLocality,
      addressRegion: config.contact.address.addressRegion,
      postalCode: config.contact.address.postalCode,
      addressCountry: config.contact.address.addressCountry,
    },
    sameAs: socialLinks,
    ...(config.foundingDate
      ? { foundingDate: config.foundingDate }
      : {}),
    areaServed: {
      '@type': 'Country',
      name: config.areaServed,
    },
    knowsAbout: config.industryKeywords,
    slogan: config.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
