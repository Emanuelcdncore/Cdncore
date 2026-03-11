import { NextResponse } from 'next/server';
import { unpublishNews, validateNewsSecret, unauthorizedResponse } from '@cdn/news';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateNewsSecret(request)) return unauthorizedResponse();

  const { id } = await params;
  await unpublishNews(id);
  return NextResponse.json({ success: true });
}
