export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function fixUrl(url) {
  if (url.startsWith('https=//')) {
    return url.replace('https=//', 'https://');
  }
  return url;
}
