import { getPool } from '@cdn/email';
import type { NewsRow } from './types';

export async function getPublishedNews(website: string): Promise<NewsRow[]> {
  const pool = getPool();
  const result = await pool.query<NewsRow>(
    'SELECT * FROM news WHERE website = $1 AND published = true ORDER BY created_at DESC',
    [website]
  );
  return result.rows;
}

export async function getNewsBySlug(website: string, slug: string): Promise<NewsRow | null> {
  const pool = getPool();
  const result = await pool.query<NewsRow>(
    'SELECT * FROM news WHERE website = $1 AND slug = $2 AND published = true',
    [website, slug]
  );
  return result.rows[0] || null;
}

export async function getNewsById(id: string): Promise<NewsRow | null> {
  const pool = getPool();
  const result = await pool.query<NewsRow>(
    'SELECT * FROM news WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function createNews(data: {
  website: string;
  title: string;
  subtitle?: string;
  content: string;
  image_url?: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
}): Promise<NewsRow> {
  const pool = getPool();
  const result = await pool.query<NewsRow>(
    `INSERT INTO news (website, title, subtitle, content, image_url, slug, meta_title, meta_description, tags)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.website,
      (data.title || '').slice(0, 500),
      (data.subtitle || '').slice(0, 1000) || null,
      data.content,
      data.image_url || null,
      (data.slug || '').slice(0, 500),
      (data.meta_title || '').slice(0, 500) || null,
      (data.meta_description || '').slice(0, 1000) || null,
      data.tags || [],
    ]
  );
  return result.rows[0];
}

export async function unpublishNews(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    'UPDATE news SET published = false, updated_at = now() WHERE id = $1',
    [id]
  );
}

export async function getMetrics(id: string): Promise<{
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
} | null> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT views, likes, comments, shares, clicks FROM news WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function incrementViews(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    'UPDATE news SET views = views + 1 WHERE id = $1',
    [id]
  );
}
