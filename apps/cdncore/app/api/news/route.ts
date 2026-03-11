import { NextResponse } from 'next/server';
import {
  getPublishedNews,
  createNews,
  extractTitle,
  generateSlug,
  toNewsArticle,
  validateNewsSecret,
  unauthorizedResponse,
} from '@cdn/news';

const WEBSITE = 'cdncore';

export async function GET() {
  const rows = await getPublishedNews(WEBSITE);
  const articles = rows.map(toNewsArticle);
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  if (!validateNewsSecret(request)) return unauthorizedResponse();

  const body = await request.json();
  const { title: bodyTitle, subtitle, text, imageUrl, metaTitle, metaDescription, tags } = body;

  if (!text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }

  const title = bodyTitle || extractTitle(text);
  const slug = generateSlug(title);

  const row = await createNews({
    website: WEBSITE,
    title,
    subtitle,
    content: text,
    image_url: imageUrl,
    slug,
    meta_title: metaTitle,
    meta_description: metaDescription,
    tags: tags || [],
  });

  return NextResponse.json({ id: row.id, slug: row.slug, url: `/news/${row.slug}` }, { status: 201 });
}
