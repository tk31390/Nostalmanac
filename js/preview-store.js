/** Persist iTunes preview hits locally (+ optional session misses). */

const STORE_KEY = 'nostalmanac-previews-v1';
const FAIL_KEY = 'nostalmanac-preview-fail-v1';
const FAIL_TTL_MS = 1000 * 60 * 60 * 24;

export function itemPreviewKey(item) {
  if (!item) return '';
  return `${item.year}|${item.cat}|${item.title}`;
}

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {}
}

function readFails() {
  try {
    return JSON.parse(localStorage.getItem(FAIL_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeFails(data) {
  try {
    localStorage.setItem(FAIL_KEY, JSON.stringify(data));
  } catch {}
}

export function getStoredTrack(item) {
  const key = itemPreviewKey(item);
  if (!key) return null;
  const row = readStore()[key];
  if (!row?.previewUrl) return null;
  return row;
}

export function isVerifiedPreview(item) {
  return Boolean(getStoredTrack(item)?.previewUrl);
}

export function savePreviewHit(item, track) {
  const key = itemPreviewKey(item);
  if (!key || !track?.previewUrl) return;
  const store = readStore();
  store[key] = {
    previewUrl: track.previewUrl,
    trackName: track.trackName || '',
    artistName: track.artistName || '',
    at: Date.now(),
  };
  writeStore(store);
  const fails = readFails();
  delete fails[key];
  writeFails(fails);
}

export function markPreviewMiss(item) {
  const key = itemPreviewKey(item);
  if (!key) return;
  const fails = readFails();
  fails[key] = Date.now();
  writeFails(fails);
}

export function recentPreviewMiss(item) {
  const key = itemPreviewKey(item);
  if (!key) return false;
  const t = readFails()[key];
  if (!t) return false;
  return Date.now() - t < FAIL_TTL_MS;
}
