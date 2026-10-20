/*
  Game Mode — a little space hamster in a bubble helmet runs and jumps across the page.
  Platforms are the tops of section titles and cards plus a few floating ledges
  in the intro; five stars are hidden down the page. Gravity is moon-light,
  sparkles twinkle in the background and a pixel moon hangs in the corner. Desktop only.
*/
(function () {
  "use strict";
  var btn = document.getElementById("game-btn");
  if (!btn) return;
  var wrap = document.getElementById("game-toggle"), infoBtn = document.getElementById("game-info-btn"), info = document.getElementById("game-info");
  var canvas = document.getElementById("game-canvas"), ctx = canvas.getContext("2d");
  var countEl = document.getElementById("cell-count"), statusEl = document.getElementById("game-status"), againBtn = document.getElementById("game-again");

  var TOTAL = 5, PX = 3;
  // 16×13 hamster, facing right: 1 fur, 2 cream belly and cheeks, 3 pink ears, nose, blush and paws,
  // 4 eye, 6 outline, 7 eye shine
  var HAMSTER = [
    ".......66..66...",
    "......63366336..",
    "....66111111116.",
    "..66111111111116",
    ".611111111174116",
    "6111111111144116",
    "6111111111222323",
    "6111111122222226",
    "611111222223326.",
    ".6112222222226..",
    "..66222222266...",
    "....6666666.....",
    "....33...33....."
  ];
  var HAMSTER_STEP = HAMSTER.slice(0, 12).concat([".....33.33......"]);
  var COLORS = { "1": "#d68a4e", "2": "#faead0", "3": "#ee96a5", "4": "#2b0d14", "6": "#7a3f22", "7": "#ffffff" };
  var W = 16, RW = W * PX, RH = HAMSTER.length * PX;
  var STAR = ["..#..", "..#..", "#####", ".###.", ".#.#."];

  var on = false, raf = 0, platforms = [], cells = [], sparkles = [], puffs = [], got = 0, keys = {}, t = 0;
  var bot = { x: 0, y: 0, vx: 0, vy: 0, ground: false, face: 1, lastSafe: null };

  function docRect(el) { var r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; }

  function buildPlatforms() {
    platforms = [];
    var sel = ".section-title, .projects-card, .intro-contact, .stat, .pod-cover, .form-card, .research-paper, .carousel-inner, .feature, .about-image img, .tabs__panels";
    document.querySelectorAll(sel).forEach(function (el) {
      var r = docRect(el);
      if (r.w < 40 || !el.offsetParent) return;
      platforms.push({ x: r.x, y: r.y, w: r.w, line: false });
    });
    // floating ledges around the intro, like stepping stones, only in empty space:
    // never over the portrait, the name, the description or the Say hi button
    var intro = document.getElementById("intro");
    if (intro) {
      var ir = docRect(intro), seed = 7, ledges = [], PAD = 22;
      var blocked = Array.prototype.map.call(intro.querySelectorAll("#portrait-canvas, .intro-title, .intro-desc, .intro-contact"), docRect);
      blocked.push({ x: innerWidth - 230, y: 125, w: 180, h: 180 });   // the moon's corner
      function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
      function clear(c) {
        var hitsContent = blocked.some(function (b) { return c.x < b.x + b.w + PAD && c.x + c.w > b.x - PAD && c.y + 12 > b.y - PAD && c.y < b.y + b.h + PAD; });
        var crowded = ledges.some(function (l) { return c.x < l.x + l.w + 30 && c.x + c.w > l.x - 30 && Math.abs(c.y - l.y) < 55; });
        return !hitsContent && !crowded;
      }
      for (var i = 0; i < 400 && ledges.length < 12; i++) {
        var c = { x: ir.x + 10 + rnd() * (ir.w - 130), y: ir.y + 130 + rnd() * (ir.h - 150), w: 60 + rnd() * 50, line: true };
        if (clear(c)) ledges.push(c);
      }
      ledges.forEach(function (l) { platforms.push(l); });
    }
    platforms.sort(function (a, b) { return a.y - b.y; });
  }

  function placeCells() {
    cells = [];
    var docH = document.documentElement.scrollHeight;
    for (var i = 0; i < TOTAL; i++) {
      // spread the stars across the page: pick the platform nearest each fifth of the document
      var target = docH * (0.04 + i * 0.19), best = null;
      platforms.forEach(function (p) { if (!best || Math.abs(p.y - target) < Math.abs(best.y - target)) best = p; });
      if (best) cells.push({ x: best.x + best.w * (0.3 + 0.4 * ((i * 37) % 10) / 10), y: best.y - 26, got: false });
    }
  }

  // background sparkles live in screen space and drift with a little parallax
  function makeSparkles() {
    sparkles = [];
    var seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 70; i++) sparkles.push({ x: rnd(), y: rnd(), depth: 0.08 + rnd() * 0.25, big: rnd() < 0.25, gold: rnd() < 0.6, phase: rnd() * 6.283 });
  }

  function resize() {
    var d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * d; canvas.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0); ctx.imageSmoothingEnabled = false;
    if (on) buildPlatforms();
  }

  function spawn() {
    bot.x = scrollX + 70; bot.y = scrollY + 110; bot.vx = bot.vy = 0; bot.ground = false;
  }

  // show every fade-in section at its final position right away, so the platforms line up with the content
  function settleReveals() {
    var els = document.querySelectorAll(".fade-in-section");
    els.forEach(function (el) { el.style.transition = "none"; el.classList.add("is-visible"); });
    void document.body.offsetHeight;
    requestAnimationFrame(function () { els.forEach(function (el) { el.style.transition = ""; }); });
  }

  function start() {
    on = true; got = 0; statusEl.hidden = true;
    document.body.classList.add("game-on"); btn.classList.add("is-on"); wrap.classList.add("is-on"); btn.setAttribute("aria-pressed", "true");
    settleReveals(); resize(); buildPlatforms(); placeCells(); makeSparkles(); spawn(); updateCount();
    if (!raf) raf = requestAnimationFrame(loop);
  }
  function stop() {
    on = false; document.body.classList.remove("game-on"); btn.classList.remove("is-on"); wrap.classList.remove("is-on"); btn.setAttribute("aria-pressed", "false");
    info.hidden = true; infoBtn.setAttribute("aria-expanded", "false"); statusEl.hidden = true;
    cancelAnimationFrame(raf); raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  function updateCount() { countEl.textContent = got + " / " + TOTAL; }

  function physics() {
    var left = keys.ArrowLeft || keys.a || keys.A, right = keys.ArrowRight || keys.d || keys.D;
    var target = (right ? 1 : 0) - (left ? 1 : 0);
    if (target) bot.face = target;
    bot.vx += (target * 3.6 - bot.vx) * 0.3;
    bot.vy = Math.min(bot.vy + 0.45, 12);   // moon gravity: floatier than the old robot
    var prevBottom = bot.y + RH;
    bot.x += bot.vx; bot.y += bot.vy;
    bot.x = Math.max(scrollX, Math.min(scrollX + innerWidth - RW, bot.x));
    if (bot.y < 70) { bot.y = 70; bot.vy = Math.max(bot.vy, 0); }   // stay below the navbar
    bot.ground = false;
    if (bot.vy >= 0) {
      for (var i = 0; i < platforms.length; i++) {
        var p = platforms[i];
        if (bot.x + RW > p.x + 4 && bot.x < p.x + p.w - 4 && prevBottom <= p.y + 1 && bot.y + RH >= p.y) {
          bot.y = p.y - RH; bot.vy = 0; bot.ground = true; bot.lastSafe = p; break;
        }
      }
    }
    var docH = document.documentElement.scrollHeight;
    if (bot.y > docH) {
      if (bot.lastSafe) { bot.x = bot.lastSafe.x + 10; bot.y = bot.lastSafe.y - RH - 4; } else spawn();
      bot.vy = 0;
    }
    // keep the hamster in view
    var sy = bot.y - scrollY;
    if (sy > innerHeight * 0.72) window.scrollTo(scrollX, scrollY + (sy - innerHeight * 0.72) * 0.25);
    else if (sy < innerHeight * 0.22 && scrollY > 0) window.scrollTo(scrollX, scrollY + (sy - innerHeight * 0.22) * 0.25);

    // collect
    cells.forEach(function (c) {
      if (!c.got && Math.abs(bot.x + RW / 2 - c.x) < 24 && Math.abs(bot.y + RH / 2 - c.y) < 26) {
        c.got = true; got++; updateCount();
        if (window.portraitSplash) window.portraitSplash(c.x - scrollX, c.y - scrollY, 3);
        if (got === TOTAL) { statusEl.hidden = false; againBtn.focus(); }
      }
    });
    if (window.portraitSplash && Math.abs(bot.vx) > 0.5) window.portraitSplash(bot.x + RW / 2 - scrollX, bot.y + RH - scrollY, 0.6);
  }

  function drawSprite(rows, x, y, flip) {
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < W; c++) {
        var ch = rows[r][flip ? W - 1 - c : c];
        if (ch === ".") continue;
        ctx.fillStyle = COLORS[ch];
        ctx.fillRect(Math.round(x + c * PX), Math.round(y + r * PX), PX, PX);
      }
    }
  }

  function drawHelmet(x, y, flip) {
    var hx = x + (flip ? W - 10.5 : 10.5) * PX, hy = y + 4.5 * PX, r = 6.3 * PX;
    ctx.beginPath(); ctx.arc(hx, hy, r, 0, 6.283);
    ctx.fillStyle = "rgba(205, 228, 255, 0.22)"; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(122, 160, 200, 0.9)"; ctx.stroke();
    ctx.beginPath(); ctx.arc(hx, hy, r - 3.5, flip ? 5.2 : 3.6, flip ? 6.0 : 4.4);
    ctx.lineWidth = 2; ctx.strokeStyle = "rgba(255, 255, 255, 0.95)"; ctx.stroke();
  }

  function drawStar(x, y, size, color) {
    ctx.fillStyle = color;
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) {
      if (STAR[r][c] === "#") ctx.fillRect(Math.round(x + (c - 2.5) * size), Math.round(y + (r - 2.5) * size), size, size);
    }
  }

  function drawSparkles() {
    sparkles.forEach(function (s) {
      var x = s.x * innerWidth, y = ((s.y * innerHeight - scrollY * s.depth) % innerHeight + innerHeight) % innerHeight;
      var a = 0.2 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.05 + s.phase));
      ctx.fillStyle = s.gold ? "rgba(201, 151, 58, " + a + ")" : "rgba(176, 71, 106, " + a + ")";
      ctx.fillRect(Math.round(x), Math.round(y), 2, 2);
      if (s.big) {   // four-point twinkle
        ctx.fillRect(Math.round(x) - 3, Math.round(y), 2, 2); ctx.fillRect(Math.round(x) + 3, Math.round(y), 2, 2);
        ctx.fillRect(Math.round(x), Math.round(y) - 3, 2, 2); ctx.fillRect(Math.round(x), Math.round(y) + 3, 2, 2);
      }
    });
  }

  // a pixel crescent moon in the top-right corner, with a soft halo and a few craters
  function drawMoon() {
    var R = 15, M = 4, cx = innerWidth - 140, cy = 215 + Math.sin(t * 0.02) * 3;
    var halo = ctx.createRadialGradient(cx, cy, R * M * 0.6, cx, cy, R * M * 2.6);
    halo.addColorStop(0, "rgba(240, 214, 160, 0.55)"); halo.addColorStop(1, "rgba(240, 214, 160, 0)");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * M * 2.6, 0, 6.283); ctx.fill();
    function lit(i, j) { return i * i + j * j <= R * R && (i + 8) * (i + 8) + (j + 4) * (j + 4) > (R - 2) * (R - 2); }
    var craters = { "9,1": 1, "10,1": 1, "9,2": 1, "10,2": 1, "12,-4": 1, "13,3": 1, "7,8": 1, "8,8": 1, "11,6": 1, "6,-10": 1 };
    for (var j = -R; j <= R; j++) for (var i = -R; i <= R; i++) {
      if (!lit(i, j)) continue;
      var edge = !lit(i + 1, j) || !lit(i - 1, j) || !lit(i, j + 1) || !lit(i, j - 1);
      ctx.fillStyle = edge ? "#b8874a" : craters[i + "," + j] ? "#e2c48c" : "#f6e2b4";
      ctx.fillRect(Math.round(cx + i * M), Math.round(cy + j * M), M, M);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    var sx = scrollX, sy = scrollY;
    drawSparkles();
    drawMoon();
    platforms.forEach(function (p) {
      var x = Math.round(p.x - sx), y = Math.round(p.y - sy), w = Math.round(p.w);
      if (y < -12 || y > innerHeight + 12) return;
      if (p.line) {   // floating moon-rock ledges: pink top, burgundy rock, pixel-rounded underside, little craters
        ctx.fillStyle = "#ee96a5"; ctx.fillRect(x, y, w, 3);
        ctx.fillStyle = "#7b1e34"; ctx.fillRect(x + 1, y + 3, w - 2, 5); ctx.fillRect(x + 4, y + 8, w - 8, 3);
        ctx.fillStyle = "#4a1420";
        for (var k = x + 7; k < x + w - 6; k += 14) ctx.fillRect(k, y + 5, 3, 2);
      } else {        // tops of titles and cards: a thin gold edge just above them, so it never covers the text
        ctx.fillStyle = "rgba(217, 164, 65, 0.85)"; ctx.fillRect(x, y - 3, w, 2);
      }
    });
    cells.forEach(function (c, i) {
      if (c.got) return;
      var x = c.x - sx, y = c.y - sy + Math.sin(t * 0.06 + i) * 3;
      if (y < -20 || y > innerHeight + 20) return;
      ctx.fillStyle = "rgba(217, 164, 65, 0.25)"; ctx.beginPath(); ctx.arc(x, y, 13, 0, 6.283); ctx.fill();
      drawStar(x, y, 3, "#d9a441");
    });
    // little puffs under the hamster when it floats in mid-air
    puffs = puffs.filter(function (p) { return ++p.age < 22; });
    puffs.forEach(function (p) {
      ctx.fillStyle = "rgba(238, 150, 165, " + (1 - p.age / 22) + ")";
      ctx.fillRect(Math.round(p.x - sx + p.dx * p.age), Math.round(p.y - sy + p.age * 0.8), 3, 3);
    });
    var walking = bot.ground && Math.abs(bot.vx) > 0.6 && Math.floor(t / 8) % 2;
    var bx = bot.x - sx, by = bot.y - sy, flip = bot.face < 0;
    drawSprite(walking ? HAMSTER_STEP : HAMSTER, bx, by, flip);
    drawHelmet(bx, by, flip);
  }

  function loop() {
    raf = 0; if (!on) return;
    t++;
    if (t % 120 === 0) buildPlatforms();   // re-measure now and then, in case images or the carousel shift the layout
    if (statusEl.hidden) physics();
    draw();
    raf = requestAnimationFrame(loop);
  }

  btn.addEventListener("click", function () { on ? stop() : start(); });
  infoBtn.addEventListener("click", function () { info.hidden = !info.hidden; infoBtn.setAttribute("aria-expanded", info.hidden ? "false" : "true"); });
  againBtn.addEventListener("click", function () { statusEl.hidden = true; window.scrollTo(0, 0); setTimeout(start, 50); });
  window.addEventListener("resize", resize);

  // Every star can be reached: tapping jump again in mid-air floats the hamster higher (as many times as you like),
  // and ↓ drops through the platform it's standing on.
  var GAME_KEYS = { ArrowLeft: 1, ArrowRight: 1, ArrowUp: 1, ArrowDown: 1, " ": 1, a: 1, d: 1, w: 1, s: 1, A: 1, D: 1, W: 1, S: 1 };
  window.addEventListener("keydown", function (e) {
    if (!on) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (e.key === "Escape") { stop(); return; }
    if (GAME_KEYS[e.key]) {
      e.preventDefault();
      var jump = e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W";
      var down = e.key === "ArrowDown" || e.key === "s" || e.key === "S";
      if (jump && !e.repeat) {
        if (bot.ground) { bot.vy = -10.8; bot.ground = false; }
        else {
          bot.vy = -7.5;
          for (var i = 0; i < 5; i++) puffs.push({ x: bot.x + RW / 2 - 6 + i * 3, y: bot.y + RH, dx: (i - 2) * 0.3, age: 0 });
        }
      }
      if (down && bot.ground) { bot.y += 3; bot.ground = false; }   // step below the platform's top so it no longer catches us
      keys[e.key] = true;
    }
  });
  window.addEventListener("keyup", function (e) { keys[e.key] = false; });
})();
