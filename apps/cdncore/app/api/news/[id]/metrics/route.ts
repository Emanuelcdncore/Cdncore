import { NextResponse } from 'next/server';
import { getMetrics, validateNewsSecret, unauthorizedResponse } from '@cdn/news';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateNewsSecret(request)) return unauthorizedResponse();

  const { id } = await params;
  const metrics = await getMetrics(id);

  if (!metrics) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(metrics);
}
