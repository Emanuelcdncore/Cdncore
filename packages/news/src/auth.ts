export function validateNewsSecret(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === 'CortexHub2025!cdnlandings';
}

export function unauthorizedResponse(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
