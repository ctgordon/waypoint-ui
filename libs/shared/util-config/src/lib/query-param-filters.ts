export function queryParamOrDefault(
  value: string | null,
  fallback = 'ALL',
): string {
  return value ?? fallback;
}

export function allToNull(value: string): string | null {
  return value === 'ALL' || !value ? null : value;
}

export function emptyToNull(value: string): string | null {
  const trimmed = value.trim();

  return trimmed ? trimmed : null;
}

export function normaliseQuery(value: string): string {
  return value.trim().toLowerCase();
}
