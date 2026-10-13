/** Category branding + random 90s comic / catchphrase wipes. */

export const SECTION = {
  cartoon: { vault: 'SATURDAY AM ATTACK', chip: 'TOON FRENZY', drawer: 'SATURDAY AM ATTACK' },
  movie: { vault: 'MULTIPLEX MAYHEM', chip: 'RENTAL AISLE', drawer: 'MULTIPLEX MAYHEM' },
  music: { vault: 'WALKMAN WORSHIP', chip: 'HITS', drawer: 'WALKMAN WORSHIP' },
  game: { vault: 'INSERT COIN ZONE', chip: 'QUARTERS', drawer: 'INSERT COIN ZONE' },
  fad: { vault: 'LUNCHBOX LEGENDS', chip: 'MALL FLEX', drawer: 'LUNCHBOX LEGENDS' },
};

const VIBE_SIGN = {
  toon: 'cartoon',
  movie: 'movie',
  jam: 'music',
  cart: 'game',
  fad: 'fad',
};

export function syncWorldSigns() {
  document.querySelectorAll('.world[data-vibe]').forEach((el) => {
    const cat = VIBE_SIGN[el.dataset.vibe];
    const sign = el.querySelector('.sign');
    if (cat && sign) sign.textContent = SECTION[cat]?.vault || sign.textContent;
  });
}

const CHIP_QUIPS = {
  cartoon: ['AFTER-SCHOOL', 'DON\'T TOUCH THAT DIAL', 'ANIMATED ATTITUDE', 'CARTOON CHEMICALS', 'TOON TORNADO'],
  movie: ['BE KIND REWIND', 'NEW RELEASE', 'BLOCKBUSTER BRAIN', 'POPCORN READY', 'TWO THUMBS UP'],
  music: ['TAPE DECK ON', 'HITS DON\'T LIE', 'SING ALONG', 'LOUDER PLEASE', 'B-side ENERGY'],
  game: ['CONTINUE?', 'NO GUIDE BOOK', 'FINAL BOSS', 'TWO PLAYER', 'CHEAT CODE VIBES'],
  fad: ['AS SEEN ON TV', 'COLLECT \'EM ALL', 'LIMITED EDITION', 'MOM SAID NO', 'TRADING AT RECESS'],
};

export function chipQuip(cat) {
  const list = CHIP_QUIPS[cat] || CHIP_QUIPS.cartoon;
  return list[Math.floor(Math.random() * list.length)];
}

const COMIC_WORDS = ['KAPOW!', 'BOOM!', 'BAM!', 'ZAP!', 'POW!', 'WHAM!', 'SPLAT!', 'KABLAM!'];
const CATCH_WORDS = [
  'AS IF!', 'BOOYAH!', 'PSYCH!', 'NOT!', 'ALL THAT!', 'WHASSUP?', 'DA BOMB', 'HOME SKILLET',
  'TALK TO THE HAND', 'GO HOME ROGER', 'NO DOUBT', 'MY BAD', 'WORD UP', 'HASTA LA VISTA',
];
const VHS_WORDS = ['TRACKING…', 'BE KIND REWIND', 'PLEASE STAND BY', 'SPICY STATIC'];
const SCRATCH_WORDS = ['SKRRRT', 'SPIN IT', 'HOT MIX', 'VINYL ATTACK'];
const CHANNEL_WORDS = ['CHANNEL SURF!', 'UP NEXT!', 'WE\'RE LIVE', 'CUT TO:'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @returns {{ style: string, word: string, channel: string|null, scratch: boolean }}
 */
export function pickWipe({ genreChange = false, musicOrGame = false } = {}) {
  const styles = [];
  const push = (style, words, extra = {}) => {
    styles.push({ style, words, ...extra });
  };

  push('kapow', COMIC_WORDS);
  push('boom', ['BOOM!', 'WHAM!', 'POW!', 'BOOM SHAKE SHAKE!']);
  push('zap', ['ZAP!', 'SPLAT!', 'KABLAM!', 'ZOWIE!']);
  push('catch', CATCH_WORDS, { phrase: true });
  push('vhs', VHS_WORDS, { vhs: true });
  push('scratch', SCRATCH_WORDS, { scratch: true });
  push('channel', CHANNEL_WORDS, { channel: true });

  let bag = styles;
  if (genreChange) {
    bag = [...styles.filter((s) => s.channel || s.vhs), ...styles];
  } else if (musicOrGame) {
    bag = [...styles.filter((s) => s.scratch), ...styles];
  }

  const chosen = pick(bag);
  const word = pick(chosen.words);
  const channelNum = chosen.channel
    ? String(Math.floor(Math.random() * 89) + 3).padStart(2, '0')
    : null;

  return {
    style: chosen.style,
    word,
    channel: channelNum,
    scratch: Boolean(chosen.scratch),
    phrase: Boolean(chosen.phrase),
    vhs: Boolean(chosen.vhs),
  };
}

