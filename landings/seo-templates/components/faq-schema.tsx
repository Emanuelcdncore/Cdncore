/**
 * FAQ SCHEMA COMPONENT
 * =====================
 * Place in: components/seo/faq-schema.tsx
 *
 * Renders Schema.org FAQPage structured data as JSON-LD.
 * Use on pages that have a FAQ section.
 *
 * Google uses FAQ structured data to show rich results with
 * expandable questions and answers directly in search results.
 *
 * Usage:
 *   import { FAQSchema } from '@/components/seo/faq-schema';
 *   <FAQSchema items={[
 *     { question: 'What is...?', answer: 'It is...' },
 *     { question: 'How does...?', answer: 'It works by...' },
 *   ]} />
 */

import type { FAQItem } from '../../configs/seo-config.types';

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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
 * Visual FAQ component with built-in schema
 * Renders both the structured data and a visual FAQ section
 */
interface VisualFAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function VisualFAQ({
  items,
  title = 'Perguntas Frequentes',
  className = '',
}: VisualFAQProps) {
  return (
    <>
      <FAQSchema items={items} />
      <section className={className} aria-labelledby="faq-title">
        <h2 id="faq-title">{title}</h2>
        <dl>
          {items.map((item, index) => (
            <div key={index}>
              <dt>
                <strong>{item.question}</strong>
              </dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
