/** 3D matrix tunnel — CRT wormhole into the almanac. */

export function createWormholeTunnel(canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const glyphs = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@<>[]{}';
  let w = 0;
  let h = 0;
  let dpr = 1;
  let live = true;
  let t0 = performance.now();
  const streams = [];
  const rings = [];

  const fit = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    streams.length = 0;
    rings.length = 0;
    const n = Math.floor((w * h) / 7200);
    for (let i = 0; i < n; i++) {
      streams.push({
        angle: Math.random() * Math.PI * 2,
        z: Math.random(),
        spin: (Math.random() - 0.5) * 0.018,
        speed: 0.006 + Math.random() * 0.022,
        len: 5 + Math.floor(Math.random() * 18),
        col: Math.random() > 0.78 ? '#eafff0' : (Math.random() > 0.45 ? '#5cff9a' : '#00ff88'),
      });
    }
    for (let r = 0; r < 14; r++) {
      rings.push({ z: r / 14, wobble: Math.random() * Math.PI * 2 });
    }
  };

  fit();
  window.addEventListener('resize', fit);

  const tick = (now) => {
    if (!live) return;
    const elapsed = (now - t0) / 1000;
    const rush = 1 + Math.min(2.4, elapsed * 0.35);
    const cx = w * 0.5;
    const cy = h * 0.44;
    const rot = elapsed * (0.28 + rush * 0.12);

    ctx.fillStyle = '#010806';
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.78);
    grad.addColorStop(0, `rgba(120,255,180,${0.14 + rush * 0.04})`);
    grad.addColorStop(0.22, 'rgba(0,80,48,0.45)');
    grad.addColorStop(0.55, 'rgba(0,20,12,0.88)');
    grad.addColorStop(1, 'rgba(0,0,0,0.98)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (const ring of rings) {
      ring.z += 0.004 * rush;
      if (ring.z > 1.02) ring.z = 0.02;
      const depth = 1 - ring.z;
      const radius = Math.min(w, h) * (0.06 + depth * 0.52);
      const alpha = depth * 0.22;
      ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
      ctx.lineWidth = 1 + depth * 2.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.68, rot * 0.2 + ring.wobble, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let s = 0; s < 48; s++) {
      const a = (s / 48) * Math.PI * 2 + rot * 1.1;
      const len = Math.min(w, h) * (0.35 + (s % 7) * 0.04);
      const x0 = cx + Math.cos(a) * len * 0.08;
      const y0 = cy + Math.sin(a) * len * 0.06;
      const x1 = cx + Math.cos(a) * len;
      const y1 = cy + Math.sin(a) * len * 0.72;
      ctx.strokeStyle = `rgba(0,255,120,${0.03 + (s % 5) * 0.012})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    for (const s of streams) {
      s.z += s.speed * rush;
      s.angle += s.spin * rush;
      if (s.z > 1.08) {
        s.z = 0.01;
        s.angle = Math.random() * Math.PI * 2;
      }

      const depth = 1 - s.z;
      const perspective = 0.12 + depth * 0.88;
      const radius = Math.min(w, h) * (0.05 + depth * 0.5);
      const a = s.angle + rot * (0.55 + depth * 0.45);
      const bx = cx + Math.cos(a) * radius * perspective;
      const by = cy + Math.sin(a) * radius * perspective * 0.7;
      const size = Math.max(7, Math.floor(5 + depth * 26));
      const alpha = Math.min(1, depth * 1.25);

      ctx.font = `${size}px monospace`;
      ctx.textAlign = 'center';

      for (let k = 0; k < s.len; k++) {
        const trail = k / s.len;
        const spiral = a + k * 0.08;
        const tx = bx - Math.cos(spiral + Math.PI / 2) * k * size * 0.5;
        const ty = by - Math.sin(spiral + Math.PI / 2) * k * size * 0.32 + k * size * 0.18;
        ctx.globalAlpha = alpha * (1 - trail * 0.82);
        ctx.fillStyle = k === 0 ? '#fff' : s.col;
        ctx.fillText(glyphs[(k + Math.floor(elapsed * 18)) % glyphs.length], tx, ty);
      }
    }

    ctx.globalAlpha = 1;
    const portal = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.18);
    portal.addColorStop(0, `rgba(255,255,255,${0.35 + Math.sin(elapsed * 3) * 0.08})`);
    portal.addColorStop(0.35, 'rgba(0,255,160,0.25)');
    portal.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = portal;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0,255,136,0.18)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.36, h * 0.29, rot * 0.18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.07;
    for (let y = 0; y < h; y += 3) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, y, w, 1);
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
  return () => { live = false; };
}
