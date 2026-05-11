export function joinUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}
