/** Equal chance per category, then uniform within category. */

export function balancedRandomIndex(deck, exclude = -1) {
  if (!deck?.length) return 0;
  if (deck.length === 1) return 0;

  const byCat = new Map();
  deck.forEach((it, idx) => {
    if (idx === exclude) return;
    if (!byCat.has(it.cat)) byCat.set(it.cat, []);
    byCat.get(it.cat).push(idx);
  });

  const pools = [...byCat.values()].filter((a) => a.length);
  if (!pools.length) return exclude === 0 ? 1 : 0;

  const catPool = pools[Math.floor(Math.random() * pools.length)];
  return catPool[Math.floor(Math.random() * catPool.length)];
}
