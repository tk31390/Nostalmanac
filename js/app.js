import { ITEMS, CATALOG_V } from './catalog.js';
import { portrait } from './art.js';
import { youtubeUrl } from './wiki.js';
import { Boombox } from './sound.js';

const $ = (id) => document.getElementById(id);
const VIBE = { cartoon: 'toon', movie: 'movie', music: 'jam', game: 'cart', fad: 'fad' };
const SECTION = {
  cartoon: { vault: 'TOON VAULT', chip: 'CARTOONS', drawer: 'TOON VAULT' },
  movie: { vault: 'REEL CULTURE', chip: 'MOVIES', drawer: 'REEL CULTURE' },
  music: { vault: 'CHART CRUSH', chip: 'SONGS', drawer: 'CHART CRUSH' },
  game: { vault: 'PLAY MOUNTAIN', chip: 'GAMES', drawer: 'PLAY MOUNTAIN' },
  fad: { vault: 'MUST-HAVES', chip: 'FADS', drawer: 'MUST-HAVES' },
};

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

function wormholeMatrix(canvas) {
  const ctx = canvas.getContext('2d');
  const kata = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ012345789Z';
  let drops = [];
  let font = 16;
  let live = true;
  const fit = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    font = Math.max(11, Math.floor(innerWidth / 38));
    drops = Array.from({ length: Math.ceil(innerWidth / font) }, () => Math.random() * -50);
  };
  fit();
  window.addEventListener('resize', fit);
  const tick = () => {
    if (!live) return;
    const w = innerWidth;
    const h = innerHeight;
    const cx = w * 0.5;
    const cy = h * 0.44;
    ctx.fillStyle = 'rgba(2,8,4,.28)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${font}px monospace`;
    drops.forEach((y, i) => {
      const x = i * font;
      const py = y * font;
      const dist = Math.hypot(x - cx, py - cy) / Math.max(cx, cy);
      const tunnel = 1 - Math.min(1, dist * 1.05);
      const alpha = 0.08 + tunnel * 0.72;
      const bright = tunnel > 0.55;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = bright ? '#e8fff0' : '#6dff9a';
      ctx.fillText(kata[Math.floor(Math.random() * kata.length)], x, py);
      if (bright) {
        ctx.globalAlpha = alpha * 0.45;
        ctx.fillStyle = '#00ff88';
        ctx.fillText(kata[Math.floor(Math.random() * kata.length)], x + 1, py - font * 0.6);
      }
      const speed = 0.55 + tunnel * 1.35;
      if (py > h + font && Math.random() > 0.96) drops[i] = Math.random() * -20;
      else drops[i] = y + speed;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  tick();
  return () => { live = false; };
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

function wipe(kind) {
  const el = $('wipe');
  const canvas = $('wipeFx');
  const word = $('wipeWord');
  const fx = $('fx');
  el.className = '';
  el.classList.add('go', kind, 'slime');
  document.body.classList.add('is-wiping');
  fx?.classList.add('slime-burst');
  word.textContent = kind === 'scratch' ? 'SKRRRT' : 'SHHH';
  const ctx = canvas.getContext('2d', { alpha: false });
  const w = canvas.width = Math.min(180, innerWidth / 4);
  const h = canvas.height = Math.min(100, innerHeight / 4);
  let n = 0;
  const tick = () => {
    staticFrame(ctx, w, h);
    if (++n < 14) requestAnimationFrame(tick);
  };
  tick();
  boom.staticBurst();
  boom.slimeSplat();
  if (kind === 'scratch') boom.scratch();
  clearTimeout(wipe.t);
  wipe.t = setTimeout(() => {
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

function render(item) {
  const sec = SECTION[item.cat] || { vault: item.cat.toUpperCase(), chip: item.cat.toUpperCase() };
  $('magSection').textContent = sec.vault;
  $('magYear').textContent = String(item.year);
  $('tag').textContent = `${item.year} · ${sec.chip}`;
  $('title').textContent = item.title;
  $('note').textContent = item.note;
  $('stickerTag').textContent = sec.chip;
  showRound = Math.floor(Math.random() * 900) + 100;
  $('pos').textContent = `ROUND ${showRound} · ${deck.length} IN PLAY`;
  $('showBadge')?.classList.add('pop');
  setTimeout(() => $('showBadge')?.classList.remove('pop'), 420);
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

function go(next, fx) {
  if (!deck.length) return;
  const prevCat = deck[i]?.cat;
  i = (next + deck.length) % deck.length;
  const item = deck[i];
  const kind = fx || (item.cat === 'music' || item.cat === 'game' ? 'scratch' : 'static');
  wipe(kind);
  render(item);
  if (prevCat && prevCat !== item.cat) boom.channelSurf(item.cat);
  else boom.slideLand();
  boom.play(item);
  boom.crowdCheer();
  prefetchRandom();
}

function spinRandom(fx) {
  if (!deck.length) return;
  go(randomDeckIndex(i), fx);
}

function step() {
  if (wipeLock || Date.now() < coolUntil) return;
  wipeLock = true;
  try { navigator.vibrate?.(14); } catch {}
  spinRandom();
  setTimeout(() => { wipeLock = false; }, 260);
}

function applyFilters() {
  const q = ($('search').value || '').trim().toLowerCase();
  deck = ITEMS.filter((it) => {
    if (yearFilter && String(it.year) !== yearFilter) return false;
    if (catFilter && it.cat !== catFilter) return false;
    if (!q) return true;
    return `${it.title} ${it.meta} ${it.note}`.toLowerCase().includes(q);
  });
  $('dbCount').textContent = `${deck.length} hits`;
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
  $('cats').innerHTML = [['', 'ALL'], ['cartoon', 'TOON VAULT'], ['movie', 'REEL CULTURE'], ['music', 'CHART CRUSH'], ['game', 'PLAY MOUNTAIN'], ['fad', 'MUST-HAVES']]
    .map(([id, label], n) => `<button type="button" data-cat="${id}" class="${n === 0 ? 'on' : ''}">${label}</button>`).join('');

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
    go(i, picked?.cat === 'music' || picked?.cat === 'game' ? 'scratch' : 'static');
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
  const stopRain = wormholeMatrix($('bootFx'));
  const start = async () => {
    if (started) return;
    started = true;
    coolUntil = Date.now() + 5000;
    boom.unlock();
    const connect = $('connect');
    connect.classList.add('booting');
    await boom.dialUp((s) => { if (s) $('bootStatus').textContent = s; });
    connect.classList.add('exit');
    document.body.classList.add('is-live');
    await new Promise((r) => setTimeout(r, 820));
    stopRain();
    connect.classList.add('gone');
    coolUntil = Date.now() + 500;
    document.body.classList.add('game-show');
    boom.gameShowStinger();
    spinRandom('scratch');
  };
  ['pointerdown', 'touchstart', 'click'].forEach((ev) => {
    $('connect').addEventListener(ev, start, { passive: true });
  });
}

boot();
