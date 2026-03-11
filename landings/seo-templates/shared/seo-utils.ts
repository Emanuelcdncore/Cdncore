/**
 * SEO UTILITY FUNCTIONS
 * ======================
 * Place in: lib/seo-utils.ts
 *
 * Shared utility functions used across all SEO templates.
 */

/**
 * Estimate reading time from content (HTML or plain text)
 * @param content - Article content (may contain HTML)
 * @returns Reading time in minutes
 */
export function estimateReadingTime(content: string): number {
  const text = stripHtml(content);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Count words in content
 */
export function countWords(content: string): number {
  return stripHtml(content).split(/\s+/).filter(Boolean).length;
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a maximum length, respecting word boundaries
 * Useful for meta descriptions (recommended 150-160 chars)
 */
export function truncateText(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.8) {
    return truncated.slice(0, lastSpace) + '...';
  }
  return truncated + '...';
}

/**
 * Generate meta description from article content
 * Strips HTML, truncates to optimal length
 */
export function generateMetaDescription(
  content: string,
  maxLength: number = 155,
): string {
  const plainText = stripHtml(content);
  return truncateText(plainText, maxLength);
}

/**
 * Format date for structured data (ISO 8601)
 */
export function formatDateISO(date: string | Date): string {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return new Date(date).toISOString();
}

/**
 * Format date for display in Portuguese
 */
export function formatDatePT(date: string | Date): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate canonical URL (ensures trailing slash consistency)
 */
export function canonicalUrl(baseUrl: string, path: string = ''): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}

/**
 * Build absolute URL from base URL and path
 */
export function absoluteUrl(baseUrl: string, path: string): string {
  if (path.startsWith('http')) return path;
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  return `${cleanBase}/${cleanPath}`;
}

/**
 * Generate article keywords from title, category, and tags
 * Useful for the keywords meta tag
 */
export function generateArticleKeywords(
  tags: string[],
  category: string,
  siteKeywords: string[] = [],
): string[] {
  const keywords = new Set<string>();

  // Add article tags first (most relevant)
  tags.forEach((tag) => keywords.add(tag.toLowerCase()));

  // Add category
  keywords.add(category.toLowerCase());

  // Add top site keywords (limit to avoid keyword stuffing)
  siteKeywords.slice(0, 5).forEach((kw) => keywords.add(kw.toLowerCase()));

  return Array.from(keywords);
}

/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string, siteUrl: string): boolean {
  try {
    const urlObj = new URL(url);
    const siteObj = new URL(siteUrl);
    return urlObj.hostname !== siteObj.hostname;
  } catch {
    return false;
  }
}

/**
 * Generate alternate language URLs
 */
export function generateAlternates(
  siteUrl: string,
  path: string,
  languages: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [lang, baseUrl] of Object.entries(languages)) {
    result[lang] = canonicalUrl(baseUrl, path);
  }
  return result;
}
