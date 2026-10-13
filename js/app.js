import { ITEMS, CATALOG_V } from './catalog.js';
import { portrait } from './art.js';
import { youtubeUrl } from './wiki.js';
import { Boombox } from './sound.js';
import { createWormholeTunnel } from './wormhole-tunnel.js';
import { SECTION, pickWipe, chipQuip, syncWorldSigns } from './transitions.js';

const $ = (id) => document.getElementById(id);
const VIBE = { cartoon: 'toon', movie: 'movie', music: 'jam', game: 'cart', fad: 'fad' };

const boom = new Boombox();
let deck = ITEMS.slice();
let i = 0;
let yearFilter = '';
let catFilter = '';
let artTok = 0;
let wipeLock = false;
let coolUntil = 0;
let showRound = Math.floor(Math.random() * 900) + 100;

function randomDeckIndex(exclude = -1) {
  if (deck.length <= 1) return 0;
  let pick = exclude;
  while (pick === exclude) pick = Math.floor(Math.random() * deck.length);
  return pick;
}

function wikiSearch(item) {
  const q = item.query || item.title;
  return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`;
}

function paintWorld(cat) {
  const vibe = VIBE[cat] || 'toon';
  document.body.dataset.vibe = vibe;
  document.querySelectorAll('.world').forEach((el) => {
    el.classList.toggle('is-on', el.dataset.vibe === vibe);
  });
  const worlds = $('worlds');
  if (worlds) {
    worlds.classList.remove('shift');
    void worlds.offsetWidth;
    worlds.classList.add('shift');
    clearTimeout(paintWorld.t);
    paintWorld.t = setTimeout(() => worlds.classList.remove('shift'), 520);
  }
}

function staticFrame(ctx, w, h) {
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let p = 0; p < d.length; p += 4) {
    const v = Math.random() * 255;
    d[p] = d[p + 1] = d[p + 2] = v;
    d[p + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function vhsFrame(ctx, w, h) {
  ctx.fillStyle = '#1a1a22';
  ctx.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 3) {
    const v = 40 + Math.random() * 200;
    ctx.fillStyle = `rgb(${v},${v},${v + 10})`;
    ctx.fillRect(0, y, w, 2);
  }
  const bandY = (performance.now() / 8) % h;
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(0, bandY, w, h * 0.08);
}

function wipeTransition(opts = {}) {
  const fx = pickWipe(opts);
  const el = $('wipe');
  const canvas = $('wipeFx');
  const word = $('wipeWord');
  const channel = $('wipeChannel');
  const fxEl = $('fx');
  el.className = '';
  el.classList.add('go', fx.style, 'slime');
  if (fx.phrase) el.classList.add('phrase');
  if (fx.vhs) el.classList.add('vhs');
  if (fx.scratch) el.classList.add('scratch');
  if (fx.channel) el.classList.add('channel');
  document.body.classList.add('is-wiping');
  fxEl?.classList.add('slime-burst');
  word.textContent = fx.word;
  if (channel) {
    if (fx.channel) {
      channel.hidden = false;
      channel.textContent = `CH ${fx.channel}`;
    } else {
      channel.hidden = true;
    }
  }
  const ctx = canvas.getContext('2d', { alpha: false });
  const full = fx.vhs || fx.channel;
  const w = canvas.width = full ? innerWidth : Math.min(innerWidth, 640);
  const h = canvas.height = full ? innerHeight : Math.min(innerHeight, 360);
  let n = 0;
  const frames = full ? 18 : 14;
  const tick = () => {
    if (fx.vhs) vhsFrame(ctx, w, h);
    else staticFrame(ctx, w, h);
    if (++n < frames) requestAnimationFrame(tick);
  };
  tick();
  boom.slimeSplat();
  if (fx.scratch) boom.scratch();
  else if (fx.style === 'kapow' || fx.style === 'boom' || fx.style === 'zap') boom.comicHit();
  else boom.staticBurst();
  clearTimeout(wipeTransition.t);
  wipeTransition.t = setTimeout(() => {
    el.className = '';
    document.body.classList.remove('is-wiping');
    document.body.classList.add('slime-wiped');
    fx?.classList.remove('slime-burst');
    const sticker = $('sticker');
    sticker?.classList.remove('land');
    void sticker?.offsetWidth;
    sticker?.classList.add('land');
    setTimeout(() => document.body.classList.remove('slime-wiped'), 520);
  }, 480);
}

let lastYear = null;

function render(item) {
  const sec = SECTION[item.cat] || { vault: item.cat.toUpperCase(), chip: item.cat.toUpperCase() };
  $('magSection').textContent = sec.vault;
  const yearEl = $('magYear');
  yearEl.textContent = String(item.year);
  if (lastYear !== null && lastYear !== item.year) {
    yearEl.classList.remove('year-zap');
    void yearEl.offsetWidth;
    yearEl.classList.add('year-zap');
  }
  lastYear = item.year;
  const quip = chipQuip(item.cat);
  $('tag').textContent = `${item.year} · ${sec.chip}`;
  $('title').textContent = item.title;
  $('note').textContent = item.note;
  $('stickerTag').textContent = quip;
  showRound = Math.floor(Math.random() * 900) + 100;
  $('pos').textContent = `ROUND ${showRound} · ${deck.length} IN PLAY`;
  $('ytLink').href = youtubeUrl(item);
  $('wikiLink').href = wikiSearch(item);
  paintWorld(item.cat);

  const tok = ++artTok;
  const img = $('art');
  img.removeAttribute('src');
  img.alt = item.title;
  portrait(item).then((url) => {
    if (tok !== artTok) return;
    if (url) img.src = url;
  }).catch(() => {});
}

function prefetchRandom() {
  if (deck.length < 2) return;
  const a = deck[randomDeckIndex(i)];
  const b = deck[randomDeckIndex(i)];
  portrait(a).catch(() => {});
  portrait(b).catch(() => {});
  boom.lookup(a).catch(() => {});
}

function landOn(pick) {
  if (!deck.length) return false;
  const prevCat = deck[i]?.cat;
  i = (pick + deck.length) % deck.length;
  const item = deck[i];
  const genreChange = Boolean(prevCat && prevCat !== item.cat);
  const musicOrGame = item.cat === 'music' || item.cat === 'game';
  wipeTransition({ genreChange, musicOrGame });
  render(item);
  if (prevCat && prevCat !== item.cat) boom.channelSurf(item.cat);
  else boom.slideLand();
  boom.crowdCheer();
  prefetchRandom();
  return item;
}

async function spinRandom() {
  if (!deck.length) return;
  const tries = Math.min(64, Math.max(16, deck.length));
  for (let n = 0; n < tries; n++) {
    const pick = randomDeckIndex(i);
    const item = deck[pick];
    if (!(await boom.hasPreview(item))) continue;
    landOn(pick);
    await boom.play(item);
    return;
  }
  $('note').textContent = 'Couldn’t lock a preview — tap again.';
}

async function step() {
  if (wipeLock || Date.now() < coolUntil) return;
  wipeLock = true;
  try { navigator.vibrate?.(14); } catch {}
  try {
    await spinRandom();
  } finally {
    setTimeout(() => { wipeLock = false; }, 320);
  }
}

function applyFilters() {
  const q = ($('search').value || '').trim().toLowerCase();
  deck = ITEMS.filter((it) => {
    if (yearFilter && String(it.year) !== yearFilter) return false;
    if (catFilter && it.cat !== catFilter) return false;
    if (!q) return true;
    return `${it.title} ${it.meta} ${it.note}`.toLowerCase().includes(q);
  });
  $('dbCount').textContent = `${deck.length} hits · every slide has a real cue`;
  $('results').innerHTML = deck.slice(0, 80).map((it, n) => (
    `<li data-i="${n}"><b>${it.title}</b><span>${it.year} · ${it.cat}</span></li>`
  )).join('');
  if (!deck.length) {
    $('title').textContent = 'No hits';
    $('note').textContent = 'Try another year or vibe.';
    return;
  }
  i = Math.min(i, deck.length - 1);
}

function openDrawer() {
  $('drawer').hidden = false;
  $('drawer').removeAttribute('inert');
  applyFilters();
  $('search').focus();
}

function closeDrawer() {
  $('drawer').hidden = true;
  $('drawer').setAttribute('inert', '');
}

function boot() {
  const ver = $('verBadge');
  if (ver) ver.textContent = `v${CATALOG_V}`;
  document.title = `NOSTALMANAC · v${CATALOG_V}`;

  const years = $('years');
  years.innerHTML = `<button type="button" data-year="" class="on">ALL</button>`
    + Array.from({ length: 10 }, (_, n) => 1990 + n).map((y) => `<button type="button" data-year="${y}">${y}</button>`).join('');
  $('cats').innerHTML = [['', 'ALL'], ...Object.entries(SECTION).map(([id, s]) => [id, s.drawer])]
    .map(([id, label], n) => `<button type="button" data-cat="${id}" class="${n === 0 ? 'on' : ''}">${label}</button>`).join('');
  syncWorldSigns();

  years.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    yearFilter = b.dataset.year;
    years.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    applyFilters();
  });
  $('cats').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    catFilter = b.dataset.cat;
    $('cats').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    applyFilters();
  });
  $('search').addEventListener('input', applyFilters);
  $('results').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const picked = deck[Number(li.dataset.i)];
    $('search').value = '';
    applyFilters();
    const idx = picked ? deck.findIndex((it) => it.title === picked.title && it.cat === picked.cat) : 0;
    i = idx < 0 ? 0 : idx;
    closeDrawer();
    (async () => {
      if (await boom.hasPreview(deck[i])) {
        landOn(i);
        await boom.play(deck[i]);
      } else {
        await spinRandom();
      }
    })();
  });

  $('btnSearch').addEventListener('click', openDrawer);
  $('btnClose').addEventListener('click', closeDrawer);
  $('drawer').addEventListener('click', (e) => { if (e.target.id === 'drawer') closeDrawer(); });

  $('btnMute').addEventListener('click', () => {
    const next = !boom.muted;
    boom.setMuted(next);
    $('btnMute').textContent = next ? 'SOUND OFF' : 'SOUND ON';
    $('btnMute').classList.toggle('is-off', next);
  });

  boom.onLabel = (t) => { $('nowplay').textContent = t; };

  $('prev').addEventListener('click', () => step());
  $('next').addEventListener('click', () => step());

  let sx = 0;
  let sy = 0;
  document.addEventListener('touchstart', (e) => {
    sx = e.changedTouches[0].clientX;
    sy = e.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
    step();
  }, { passive: true });

  document.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < 12) return;
    step();
  }, { passive: true });

  let started = false;
  const stopTunnel = createWormholeTunnel($('bootFx'));
  const start = async () => {
    if (started) return;
    started = true;
    coolUntil = Date.now() + 2200;
    boom.unlock();
    const connect = $('connect');
    connect.classList.add('booting', 'tunnel-on');
    await boom.dialUp((s) => { if (s) $('bootStatus').textContent = s; });
    connect.classList.add('exit');
    document.body.classList.add('is-live');
    await new Promise((r) => setTimeout(r, 780));
    stopTunnel();
    connect.classList.add('gone');
    connect.classList.remove('tunnel-on');
    coolUntil = Date.now() + 500;
    document.body.classList.add('game-show');
    boom.gameShowStinger();
    await spinRandom();
  };
  ['pointerdown', 'touchstart', 'click'].forEach((ev) => {
    $('connect').addEventListener(ev, start, { passive: true });
  });
}

boot();
