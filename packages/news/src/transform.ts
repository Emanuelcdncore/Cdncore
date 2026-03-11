import type { NewsRow, NewsArticle } from './types';

export function extractTitle(text: string): string {
  // Try to extract from <h1>, <h2>, or <h3> tags first
  const headingMatch = text.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/i);
  if (headingMatch) {
    return headingMatch[1].replace(/<[^>]*>/g, '').trim() || 'Untitled';
  }
  // Fallback: first line, strip markdown # and HTML
  const firstLine = text.split('\n').find((line) => line.trim().length > 0) || '';
  return firstLine.replace(/^#+\s*/, '').replace(/<[^>]*>/g, '').trim() || 'Untitled';
}

export function extractDescription(html: string): string {
  // Remove headings first so description doesn't repeat the title
  const withoutHeadings = html.replace(/<h[1-3][^>]*>.*?<\/h[1-3]>/gi, '');
  const text = withoutHeadings.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 200) return text;
  const truncated = text.slice(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

export function calculateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, ' ');
  const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateSlug(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
}

export function toNewsArticle(row: NewsRow): NewsArticle {
  const title = stripHtml(row.title || extractTitle(row.content));
  const subtitle = stripHtml(row.subtitle || extractDescription(row.content));
  return {
    slug: row.slug,
    title,
    subtitle,
    content: row.content,
    date: formatDate(row.created_at),
    isoDate: row.created_at.toISOString(),
    readTime: calculateReadTime(row.content),
    imageUrl: row.image_url || '',
    metaTitle: row.meta_title || title,
    metaDescription: row.meta_description || subtitle,
    tags: row.tags || [],
  };
}
