/** Deep links: #s=year|cat|title */

export function itemKey(item) {
  return `${item.year}|${item.cat}|${item.title}`;
}

export function hashForItem(item) {
  return `#s=${encodeURIComponent(itemKey(item))}`;
}

export function shareUrlForItem(item) {
  const base = location.href.split('#')[0].split('?')[0];
  return `${base}${hashForItem(item)}`;
}

export function parseShareHash(rawHash) {
  const hash = String(rawHash || location.hash || '').replace(/^#/, '');
  if (!hash.startsWith('s=')) return null;
  const payload = decodeURIComponent(hash.slice(2));
  const parts = payload.split('|');
  if (parts.length < 3) return null;
  const year = Number(parts[0]);
  if (!year) return null;
  return { year, cat: parts[1], title: parts.slice(2).join('|') };
}

export function findItem(items, ref) {
  if (!ref) return null;
  return items.find((it) => it.year === ref.year && it.cat === ref.cat && it.title === ref.title) || null;
}

export function syncHash(item) {
  if (!item) return;
  const next = hashForItem(item);
  if (location.hash === next) return;
  history.replaceState(null, '', next);
}
