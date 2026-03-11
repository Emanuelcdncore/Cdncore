/**
 * BREADCRUMB SCHEMA COMPONENT
 * ============================
 * Place in: components/seo/breadcrumb-schema.tsx
 *
 * Renders Schema.org BreadcrumbList structured data as JSON-LD.
 * Use on all pages with a breadcrumb trail.
 *
 * Usage:
 *   import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
 *   <BreadcrumbSchema items={[
 *     { name: 'Inicio', url: 'https://example.com' },
 *     { name: 'Blog', url: 'https://example.com/blog' },
 *     { name: 'Article Title', url: 'https://example.com/blog/article-slug' },
 *   ]} />
 */

import type { BreadcrumbItem } from '../../configs/seo-config.types';

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}

/**
 * Visual breadcrumb component with built-in schema
 * Optional - use if you also want a visual breadcrumb navigation
 */
interface VisualBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function VisualBreadcrumb({ items, className = '' }: VisualBreadcrumbProps) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol
          role="list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '0.875rem',
          }}
        >
          {items.map((item, index) => (
            <li
              key={item.url}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {index > 0 && (
                <span aria-hidden="true" style={{ color: '#9ca3af' }}>
                  /
                </span>
              )}
              {index === items.length - 1 ? (
                <span aria-current="page" style={{ color: '#6b7280' }}>
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  style={{ color: '#3b82f6', textDecoration: 'none' }}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
