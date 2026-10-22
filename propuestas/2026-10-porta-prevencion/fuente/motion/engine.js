// Motor de animación determinista: cada cuadro se calcula con seek(t). Sin dependencias.
// tw(el, t0, t1, {o:[0,1], x:[..], y:[..], s:[..], r:[..], b:[..], cl:[[t,r,b,l],[t,r,b,l]], w:[..]}, ease)
(function () {
  const E = {
    lin: t => t,
    out: t => 1 - Math.pow(1 - t, 3),
    in: t => t * t * t,
    io: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    back: t => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  };
  const DEF = { o: 1, x: 0, y: 0, s: 1, r: 0, b: 0, cl: null, w: null };
  const tracks = new Map();   // el -> {prop -> [tween]}
  const ticks = [];
  const $ = s => typeof s === 'string' ? document.querySelector(s) : s;
  function tw(sel, t0, t1, props, ease = 'out') {
    const els = typeof sel === 'string' ? document.querySelectorAll(sel) : [sel];
    els.forEach(el => {
      if (!tracks.has(el)) tracks.set(el, {});
      const tr = tracks.get(el);
      for (const k in props) (tr[k] = tr[k] || []).push({ t0, t1, a: props[k][0], b: props[k][1], e: E[ease] || ease });
    });
  }
  const lerp = (a, b, k) => Array.isArray(a) ? a.map((v, i) => v + (b[i] - v) * k) : a + (b - a) * k;
  function val(list, t, def) {
    list.sort((p, q) => p.t0 - q.t0);
    let v = def;
    for (let i = 0; i < list.length; i++) {
      const w = list[i];
      if (t < w.t0) { if (i === 0) v = w.a; break; }
      const k = w.t1 === w.t0 ? 1 : Math.min(1, (t - w.t0) / (w.t1 - w.t0));
      v = lerp(w.a, w.b, w.e(k));
    }
    return v;
  }
  function seek(t) {
    for (const [el, tr] of tracks) {
      const g = k => tr[k] ? val(tr[k], t, DEF[k]) : DEF[k];
      const o = g('o'), x = g('x'), y = g('y'), s = g('s'), r = g('r'), b = g('b');
      el.style.opacity = o;
      el.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
      el.style.transform = `translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`;
      el.style.filter = b > 0.01 ? `blur(${b}px)` : '';
      if (tr.cl) { const c = g('cl'); el.style.clipPath = `inset(${c[0]}% ${c[1]}% ${c[2]}% ${c[3]}%)`; }
      if (tr.w) el.style.width = g('w') + '%';
    }
    for (const f of ticks) f(t);
  }
  // escena: aparece con fundido en t0 y desaparece en t1
  function scene(sel, t0, t1, fin = .6, fout = .6) {
    tw(sel, t0, t0 + fin, { o: [0, 1] }, 'io');
    tw(sel, t1 - fout, t1, { o: [1, 0] }, 'io');
  }
  // Ken Burns sobre una imagen
  function kb(sel, t0, t1, s0, s1, x0 = 0, x1 = 0, y0 = 0, y1 = 0) { tw(sel, t0, t1, { s: [s0, s1], x: [x0, x1], y: [y0, y1] }, 'lin'); }
  // entrada de texto: sube y aparece
  function rise(sel, t, d = .8, dy = 40) { tw(sel, t, t + d, { o: [0, 1], y: [dy, 0] }, 'out'); }
  function tick(f) { ticks.push(f); }
  window.M = { tw, seek, scene, kb, rise, tick, E, $ };
  window.seek = seek;
})();
