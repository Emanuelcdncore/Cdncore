/**
 * WEBSITE SCHEMA COMPONENT
 * =========================
 * Place in: components/seo/website-schema.tsx
 *
 * Renders Schema.org WebSite structured data with SearchAction.
 * Include in your root layout alongside OrganizationSchema.
 *
 * The SearchAction allows Google to show a Sitelinks Search Box
 * in search results for your site.
 *
 * Usage:
 *   import { WebSiteSchema } from '@/components/seo/website-schema';
 *   <WebSiteSchema
 *     siteUrl="https://example.com"
 *     siteName="SITE_NAME"
 *     description="Site description"
 *     language="pt-PT"
 *   />
 */

interface WebSiteSchemaProps {
  siteUrl: string;
  siteName: string;
  description: string;
  language?: string;
  /** Enable the search action for Sitelinks Search Box */
  searchEnabled?: boolean;
  /** URL template for search - {search_term_string} will be replaced */
  searchUrlTemplate?: string;
}

export function WebSiteSchema({
  siteUrl,
  siteName,
  description,
  language = 'pt-PT',
  searchEnabled = true,
  searchUrlTemplate,
}: WebSiteSchemaProps) {
  const defaultSearchUrl = `${siteUrl}/search?q={search_term_string}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    description,
    inLanguage: language,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  if (searchEnabled) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrlTemplate || defaultSearchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
