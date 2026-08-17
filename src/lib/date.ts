const WEEK = 7 * 24 * 60 * 60 * 1000;

export function formatPostDate(iso: string, now = new Date()) {
  const date = new Date(iso);
  const elapsed = now.getTime() - date.getTime();

  if (elapsed < WEEK) {
    const days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    return `${days} days ago`;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function absoluteDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
