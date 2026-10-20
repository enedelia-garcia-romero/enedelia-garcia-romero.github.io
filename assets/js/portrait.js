/*
  ASCII portrait — the opening illustration (same technique as gazijarin.com).
  The cut-out headshot (assets/img/profile.png) is sampled on a monospace grid in
  portrait-data.js; darker spots (hair, eyes, brows) use denser characters from " .:-=+*#%@".
  On load every character starts scattered and springs home while fading in.
  Under the cursor characters are pushed away and drift in a gentle current;
  when the cursor leaves they spring back and settle into the portrait.
*/
(function () {
  "use strict";

  function sizeFor(w) { return w <= 480 ? Math.min(300, w - 40) : w <= 768 ? Math.min(320, w - 60) : 480; }

  function decode(entry, scale) {
    var s = atob(entry.data), pts = [];
    for (var i = 0; i < entry.count; i++) {
      var o = i * 6;
      var x = (s.charCodeAt(o) | (s.charCodeAt(o + 1) << 8)) / 10 * scale;
      var y = (s.charCodeAt(o + 2) | (s.charCodeAt(o + 3) << 8)) / 10 * scale;
      pts.push({ x: x, y: y, c: s.charCodeAt(o + 4), b: s.charCodeAt(o + 5) / 255 });
    }
    return pts;
  }

  function initPortrait(canvas, opts) {
    var data = window.PORTRAIT_DATA;
    if (!canvas || !data) return;
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var ramp = data.ramp.split("");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var size = 0, font = 7, particles = [], start = 0, raf = 0, visible = true;
    var mouse = { x: -1000, y: -1000, active: false }, target = { x: -1000, y: -1000 };

    function build() {
      size = sizeFor(window.innerWidth);
      var key = size >= 480 ? "480" : size > 300 ? "320" : "300";
      var entry = data.sizes[key];
      font = entry.font;
      var pts = decode(entry, size / +key);
      canvas.style.width = size + "px"; canvas.style.height = size + "px";
      var dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr; canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = pts.map(function (p) {
        return {
          x: reduced ? p.x : p.x + (Math.random() - 0.5) * 400,
          y: reduced ? p.y : p.y + (Math.random() - 0.5) * 400,
          tx: p.x, ty: p.y, vx: 0, vy: 0,
          ch: ramp[p.c], base: 0.18 + Math.pow(p.b, 0.85) * 0.82, alpha: 0,
          delay: reduced ? 0 : Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2
        };
      });
      start = performance.now();
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, size, size);
      var t = (performance.now() - start) / 1000;
      // the pointer itself eases toward the cursor, so the push feels soft
      mouse.x += (target.x - mouse.x) * 0.15;
      mouse.y += (target.y - mouse.y) * 0.15;
      ctx.font = font + "px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var radius = size * 0.2, settled = true;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i], age = t - p.delay;
        if (age < 0) { settled = false; continue; }
        var fade = 1 - Math.pow(1 - Math.min(age / 1.5, 1), 2);
        var lively = mouse.active || age < 3;
        p.alpha = Math.max(0, p.base * fade + (lively ? Math.sin(t * 2 + p.phase) * 0.1 : 0));

        if (reduced) { p.x = p.tx; p.y = p.ty; }
        else {
          if (mouse.active) {
            var dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius && dist > 0) { var f = (1 - dist / radius) * 4; p.vx += dx / dist * f; p.vy += dy / dist * f; }
          }
          var grip = 1 - Math.pow(1 - Math.min(age / 2.5, 1), 3);
          var k = 0.01 + grip * 0.08, ex = p.tx - p.x, ey = p.ty - p.y;
          p.vx += ex * k; p.vy += ey * k;
          if (lively) {
            p.vx += Math.sin(t * 0.5 + p.ty * 0.1) * 0.15;
            p.vy += Math.cos(t * 0.5 + p.tx * 0.1) * 0.15;
            p.vx *= 0.92; p.vy *= 0.92;
            settled = false;
          } else {
            p.vx *= 0.85; p.vy *= 0.85;
            if (age > 4 && Math.abs(ex) < 0.01 && Math.abs(ey) < 0.01) { p.x = p.tx; p.y = p.ty; p.vx = p.vy = 0; }
            else settled = false;
          }
          p.x += p.vx; p.y += p.vy;
        }
        ctx.fillStyle = "rgba(92, 18, 36, " + p.alpha + ")";
        ctx.fillText(p.ch, p.x, p.y);
      }
      // Once everything has settled and nobody is touching it, stop redrawing.
      if ((settled && t > 4.5) || !visible || document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    }
    function wake() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }

    function pointAt(clientX, clientY) {
      var r = canvas.getBoundingClientRect();
      target.x = clientX - r.left; target.y = clientY - r.top;
      if (!mouse.active) { mouse.x = target.x; mouse.y = target.y; }
      mouse.active = true;
      if (opts.onInteract) opts.onInteract();
      wake();
    }
    function leave() { mouse.active = false; target.x = target.y = -1000; wake(); }
    canvas.addEventListener("mousemove", function (e) { pointAt(e.clientX, e.clientY); });
    canvas.addEventListener("mouseleave", leave);
    canvas.addEventListener("touchmove", function (e) { var tc = e.touches[0]; pointAt(tc.clientX, tc.clientY); if (e.cancelable) e.preventDefault(); }, { passive: false });
    canvas.addEventListener("touchend", leave);

    var lastSize = 0;
    window.addEventListener("resize", function () { if (sizeFor(window.innerWidth) !== lastSize) { build(); lastSize = size; wake(); } });
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) wake(); }).observe(canvas);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) wake(); });

    // Game Mode's robot can nudge the portrait as it runs past.
    window.portraitSplash = function (clientX, clientY) {
      var r = canvas.getBoundingClientRect();
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) return;
      var x = clientX - r.left, y = clientY - r.top, radius = size * 0.12;
      particles.forEach(function (p) {
        var dx = p.x - x, dy = p.y - y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < radius && d > 0) { var f = (1 - d / radius) * 3; p.vx += dx / d * f; p.vy += dy / d * f; }
      });
      wake();
    };

    build(); lastSize = size;
    wake();
  }

  window.initPortrait = initPortrait;
})();
