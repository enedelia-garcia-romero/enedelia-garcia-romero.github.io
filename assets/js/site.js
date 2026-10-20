/* Shared helpers + home page rendering (layout modelled on gazijarin.com). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var S = window.SITE || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function html(id, markup) { var el = document.getElementById(id); if (el) el.innerHTML = markup; return el; }
  function fade(inner, delay) { return '<div class="fade-in-section"' + (delay ? ' style="transition-delay:' + delay + 'ms"' : "") + ">" + inner + "</div>"; }

  var ICON = {
    mail: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM2 22h20v2H2z" transform="translate(0 -2)"/></svg>',
    podcast: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.81-.87 7.09-.5 9.72 1.11.3.18.39.57.21.86zm1.22-2.72a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.5c3.63-1.1 8.15-.57 11.23 1.33.37.22.48.71.26 1.08zm.1-2.83C14.7 8.94 9.38 8.76 6.3 9.7a.94.94 0 11-.54-1.8c3.53-1.07 9.4-.86 13.12 1.34a.94.94 0 01-.96 1.61z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.2 1.6 3.7 3.9 3.9v3a7 7 0 01-3.9-1.2v6.1A5.8 5.8 0 1110.7 9v3.1a2.7 2.7 0 102 2.7V3z"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
    open: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    math: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 20c3 0 3-16 6-16M5 12h6M14 9l6 6M20 9l-6 6"/></svg>',
    atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5M15 14.5c3 0 6 1.3 6 4.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 005 5L13 18l-3 3-3-3 3-3 6.7-6.7z"/><path d="M14.7 6.3L17 4l3 3-2.3 2.3"/></svg>'
  };
  var SOCIAL = [["email", "mail", "Email"], ["github", "github", "GitHub"], ["linkedin", "linkedin", "LinkedIn"], ["blog", "pen", "WrittenbyEne on Substack"]];
  function icons() {
    var L = S.links || {}, P = S.profile || {};
    return SOCIAL.map(function (s) {
      var href = s[0] === "email" ? "mailto:" + P.email : L[s[0]];
      if (!href) return "";
      return '<a href="' + esc(href) + '"' + (s[0] === "email" ? "" : ' target="_blank" rel="noopener"') + ' aria-label="' + s[2] + '">' + ICON[s[1]] + "</a>";
    }).join("");
  }

  // ---------- drawn covers for the software carousel ----------
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var s = seed || 1; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  var C = { cream: "#f8e9e1", car: "#e9b8c3", gold: "#c99a6b", wine: "#a33a52", wineL: "#e9b8c3" };

  function cover(motif, seedStr) {
    var r = rng(hash(motif + (seedStr || ""))), id = "g" + hash(seedStr || motif).toString(36);
    var defs = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b1d2e"/><stop offset=".55" stop-color="#4a1420"/><stop offset="1" stop-color="#2e0a13"/></linearGradient>' +
      '<radialGradient id="' + id + 'v" cx=".5" cy=".5" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>';
    var body = "", i, x, y;
    switch (motif) {
      case "sonar":
        for (i = 1; i <= 9; i++) {
          var rr = i * 24, op = (1 - i / 10) * 0.7;
          body += '<path d="M' + (200 - rr * 0.94) + " " + (210 - rr * 0.34) + " A" + rr + " " + rr + " 0 0 1 " + (200 + rr * 0.94) + " " + (210 - rr * 0.34) + '" fill="none" stroke="' + (i % 3 ? C.cream : C.car) + '" stroke-opacity="' + op.toFixed(2) + '" stroke-width="' + (i % 3 ? 0.8 : 1.4) + '"/>';
        }
        [-36, 0, 36].forEach(function (a, k) {
          var rad = (a - 90) * Math.PI / 180, l = 200;
          body += '<line x1="200" y1="210" x2="' + (200 + Math.cos(rad) * l).toFixed(1) + '" y2="' + (210 + Math.sin(rad) * l).toFixed(1) + '" stroke="' + C.gold + '" stroke-opacity=".5" stroke-dasharray="2 5"/>';
          body += '<text x="' + (200 + Math.cos(rad) * 150).toFixed(1) + '" y="' + (210 + Math.sin(rad) * 150).toFixed(1) + '" fill="' + C.gold + '" font-family="monospace" font-size="10" text-anchor="middle" opacity=".8">' + ["L", "C", "R"][k] + "</text>";
        });
        body += '<rect x="80" y="70" width="34" height="58" fill="' + C.wine + '" opacity=".8"/><rect x="276" y="96" width="18" height="44" fill="' + C.wine + '" opacity=".8"/>';
        body += '<rect x="182" y="200" width="36" height="22" rx="11" fill="' + C.car + '"/><circle cx="200" cy="211" r="3" fill="#4a1420"/>';
        break;
      case "matrix":
        var pat = [[2, 2, 2, 0], [2, 2, 2, 2], [1, 0, 0, 0], [3, 3, 3, 3]];
        body += '<text x="60" y="44" fill="' + C.gold + '" font-family="monospace" font-size="10" opacity=".85">READ   EDIT   DELETE   SHARE</text>';
        for (y = 0; y < 4; y++) for (x = 0; x < 4; x++) {
          var v = pat[y][x], cx = 72 + x * 62, cy = 70 + y * 40;
          body += '<rect x="' + (cx - 14) + '" y="' + (cy - 14) + '" width="28" height="28" fill="' + (v ? (v === 3 ? C.car : v === 2 ? C.wineL : C.wine) : "none") + '" fill-opacity="' + (v ? 0.85 : 0) + '" stroke="' + C.cream + '" stroke-opacity="' + (v ? 0 : 0.35) + '"/>';
        }
        ["STU", "LEAD", "TA", "INST"].forEach(function (t, k) { body += '<text x="330" y="' + (74 + k * 40) + '" fill="' + C.cream + '" opacity=".55" font-family="monospace" font-size="10">' + t + "</text>"; });
        body += '<line x1="40" y1="222" x2="360" y2="222" stroke="' + C.gold + '" stroke-opacity=".35"/>';
        break;
      case "shield":
        for (i = 0; i < 5; i++) {
          var w = 210 - i * 36, h = 170 - i * 28;
          body += '<rect x="' + (200 - w / 2) + '" y="' + (120 - h / 2) + '" width="' + w + '" height="' + h + '" rx="' + (h / 2) + '" fill="none" stroke="' + (i === 4 ? C.car : C.cream) + '" stroke-opacity="' + (0.15 + i * 0.12).toFixed(2) + '"/>';
        }
        body += '<circle cx="200" cy="114" r="9" fill="' + C.car + '"/><rect x="196" y="118" width="8" height="18" fill="' + C.car + '"/>';
        ["Secure", "HttpOnly", "SameSite", "CSP", "WAF"].forEach(function (t, k) { body += '<text x="' + (34 + k * 76) + '" y="214" fill="' + C.gold + '" font-family="monospace" font-size="10" opacity=".8">' + t + "</text>"; });
        break;
      case "terminal":
        body += '<rect x="50" y="34" width="300" height="176" fill="#24070f" stroke="' + C.cream + '" stroke-opacity=".2"/><circle cx="66" cy="48" r="3.5" fill="' + C.wine + '"/><circle cx="78" cy="48" r="3.5" fill="' + C.car + '"/><circle cx="90" cy="48" r="3.5" fill="' + C.gold + '"/>';
        for (i = 0; i < 9; i++) {
          y = 74 + i * 15;
          body += '<text x="64" y="' + (y + 4) + '" fill="' + C.car + '" font-family="monospace" font-size="10">$</text>';
          body += '<rect x="76" y="' + (y - 3) + '" width="' + (40 + r() * 200).toFixed(0) + '" height="5" fill="' + C.cream + '" opacity="' + (0.25 + r() * 0.45).toFixed(2) + '"/>';
        }
        break;
      case "network":
        var pts = [];
        for (i = 0; i < 22; i++) pts.push([30 + r() * 340, 26 + r() * 188]);
        pts.forEach(function (p) { body += '<line x1="200" y1="120" x2="' + p[0].toFixed(0) + '" y2="' + p[1].toFixed(0) + '" stroke="' + C.cream + '" stroke-opacity=".12"/>'; });
        pts.forEach(function (p, k) { body += '<circle cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="' + (k % 5 ? 3 : 6) + '" fill="' + (k % 5 ? C.cream : C.car) + '" opacity="' + (k % 5 ? 0.6 : 0.95) + '"/>'; });
        body += '<circle cx="200" cy="120" r="16" fill="none" stroke="' + C.gold + '"/><circle cx="200" cy="120" r="6" fill="' + C.gold + '"/>';
        break;
      case "lens":
        body += '<radialGradient id="' + id + 'l" cx=".5" cy=".5" r=".5"><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".92"/></radialGradient>';
        for (i = 0; i < 40; i++) body += '<circle cx="' + (r() * 400).toFixed(0) + '" cy="' + (r() * 240).toFixed(0) + '" r="' + (6 + r() * 22).toFixed(0) + '" fill="' + [C.car, C.wineL, C.gold, C.cream][i % 4] + '" opacity=".55"/>';
        body += '<rect x="0" y="0" width="400" height="240" fill="url(#' + id + 'l)"/>';
        body += '<circle cx="200" cy="120" r="86" fill="none" stroke="' + C.cream + '" stroke-opacity=".5"/><line x1="200" y1="20" x2="200" y2="220" stroke="' + C.cream + '" stroke-opacity=".15"/>';
        break;
      case "orbit":
        for (i = 0; i < 4; i++) body += '<ellipse cx="200" cy="120" rx="' + (60 + i * 42) + '" ry="' + (22 + i * 16) + '" fill="none" stroke="' + C.cream + '" stroke-opacity="' + (0.4 - i * 0.07).toFixed(2) + '" transform="rotate(-14 200 120)"/>';
        body += '<circle cx="200" cy="120" r="20" fill="' + C.car + '"/>';
        for (i = 0; i < 46; i++) body += '<circle cx="' + (r() * 400).toFixed(0) + '" cy="' + (r() * 240).toFixed(0) + '" r="' + (r() * 1.6 + 0.4).toFixed(1) + '" fill="' + C.cream + '" opacity="' + (0.3 + r() * 0.5).toFixed(2) + '"/>';
        body += '<circle cx="318" cy="70" r="6" fill="' + C.gold + '"/>';
        break;
      case "bowl":
        for (i = 0; i < 14; i++) body += '<circle cx="' + (130 + r() * 140).toFixed(0) + '" cy="' + (60 + r() * 70).toFixed(0) + '" r="' + (8 + r() * 18).toFixed(0) + '" fill="' + [C.car, C.wineL, C.gold, C.cream, C.wine][i % 5] + '" opacity=".8"/>';
        body += '<path d="M90 130 H310 A110 80 0 0 1 90 130 Z" fill="#3a0f1a" stroke="' + C.cream + '" stroke-opacity=".4"/><line x1="70" y1="130" x2="330" y2="130" stroke="' + C.gold + '"/>';
        break;
      case "path":
        body += '<path d="M30 200 C 110 200, 90 60, 180 90 S 260 190, 300 120 S 340 40, 372 40" fill="none" stroke="' + C.cream + '" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"/>';
        [[30, 200], [138, 92], [228, 150], [300, 120], [372, 40]].forEach(function (p, k) {
          body += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (k === 4 ? 10 : 6) + '" fill="' + (k === 4 ? C.car : "#4a1420") + '" stroke="' + (k === 4 ? C.car : C.gold) + '" stroke-width="1.5"/>';
        });
        body += '<text x="40" y="214" fill="' + C.gold + '" font-family="monospace" font-size="10" opacity=".85">explore → verify → map → plan</text>';
        break;
      case "circuit":
        for (i = 0; i < 14; i++) {
          x = 20 + r() * 360; y = 20 + r() * 200;
          var x2 = r() > 0.5 ? 200 : x, y2 = r() > 0.5 ? 120 : y;
          body += '<polyline points="' + x.toFixed(0) + "," + y.toFixed(0) + " " + x2.toFixed(0) + "," + y.toFixed(0) + " " + x2.toFixed(0) + "," + y2.toFixed(0) + '" fill="none" stroke="' + (i % 4 ? C.cream : C.car) + '" stroke-opacity="' + (i % 4 ? 0.3 : 0.8) + '"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="3.5" fill="none" stroke="' + C.gold + '"/>';
        }
        body += '<rect x="160" y="90" width="80" height="60" fill="#24070f" stroke="' + C.car + '"/>';
        for (i = 0; i < 6; i++) body += '<line x1="' + (168 + i * 13) + '" y1="84" x2="' + (168 + i * 13) + '" y2="90" stroke="' + C.gold + '"/><line x1="' + (168 + i * 13) + '" y1="150" x2="' + (168 + i * 13) + '" y2="156" stroke="' + C.gold + '"/>';
        break;
      case "pages":
      default:
        for (i = 3; i >= 0; i--) {
          body += '<rect x="' + (110 + i * 16) + '" y="' + (36 + i * 12) + '" width="160" height="150" fill="' + (i ? "#4a1420" : C.cream) + '" fill-opacity="' + (i ? 1 : 0.92) + '" stroke="' + C.cream + '" stroke-opacity=".25"/>';
        }
        for (i = 0; i < 6; i++) body += '<rect x="126" y="' + (62 + i * 16) + '" width="' + (60 + r() * 70).toFixed(0) + '" height="4" fill="#5a1a28" opacity=".7"/>';
        body += '<rect x="126" y="44" width="70" height="8" fill="' + C.wine + '"/>';
    }
    return '<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' + defs +
      '<rect width="400" height="240" fill="url(#' + id + ')"/>' + body + '<rect width="400" height="240" fill="url(#' + id + 'v)"/></svg>';
  }

  // ---------- pixel-art concept images (planned builds and community cards) ----------
  var PAL = { L: "#f3e2d8", W: "#ffffff", S: "#a8848a", N: "#7b1e34", D: "#3a0d18", M: "#c24d6a", m: "#5a1426", Y: "#d9a441", P: "#b0476a", R: "#d64545", B: "#3d7fd1", O: "#e0903c", G: "#3a9d5d" };
  var ART = {
    usb: ["................", "..........Y.Y...", ".........YYYYY..", "..........YYY...", "...........Y....", "..NNNNNNNNNNNN..", "..NLLLLLLLLLLN..", "..NLDDDDDDDDLN..", "SSNLDODDDDODLN..", "SSNLDOOOOOODLN..", "SSNLDODOODODLN..", "SSNLDOOPPOODLN..", "..NLDDOOOODDLN..", "..NLDDDDDDDDLN..", "..NLLLLLLLLLLN..", "..NNNNNNNNNNNN.."],
    pantry: ["................", "...NNNNNNNNNN...", "...NLLLLLLLLN...", "...NLDDDDDDLN...", "...NLDWDWWDLN...", "...NLDWDWWDLN...", "...NLDDDDDDLN...", "...NLLLLLLLLN...", "...NLMMMMSSLN...", "...NLLLLLLLLN...", "...NNNNNNNNNN...", "................", "....G..O..R.....", "...GGG.OO.RRR...", "...GGG.OO.RRR...", "....G..O..R....."],
    marta: ["......R..Y......", "......R..Y......", "......R..Y......", "......R..Y......", "......R..Y......", "BBBBBBWBBWBBBBBB", "......R..Y......", "......R..Y......", "GGGGGGWGGW......", "......R..Y......", "......R..Y......", "......R..Y.....M", "......R..Y....MM", "......R..Y.....M", "......R..Y......", "......R..Y......"],
    charm: ["................", "................", "......SSSS......", ".....S....S.....", ".....S....S.....", "......SSSS......", ".......SS.......", "....LLLLLLLL....", "...LNNNNNNNNL...", "...LNNNPPNNNL.M.", "...LNNPPPPNNL..M", "...LNNPPPPNNL..M", "...LNNNPPNNNL.M.", "...LNNNNNNNNL...", "....LLLLLLLL....", "................"],
    journal: ["................", "................", ".LLLLLLNNWWWWWW.", ".LSSSSLNNWWWWWW.", ".LLLLLLNNWWMWWW.", ".LSSSSLNNWWMMWW.", ".LLLLLLNNWMMMWW.", ".LSSSLLNNWWMMWW.", ".LLLLLLNNWWWmWW.", ".LSSSSLNNWWWmWW.", ".LLLLLLNNWWWWWW.", ".LLLLLLNNWWWWWW.", "..NNNNNNNNNNNN..", "................", "................", "................"],
    grid: ["................", "....NNNNNNNN....", "....NSSSSSSN....", "....NDMDYDDN....", "....NSSSSSSN....", "....NDMDMDDN....", "....NSSSSSSN....", "....NDYDMDDN....", "....NSSSSSSN....", "....NDMDRDDN....", "....NSSSSSSN....", "....NDMDMDDN....", "....NSSSSSSN....", "....NNNNNNNN....", "...NN......NN...", "................"],
    cafe: ["................", ".....M...M......", "......M...M.....", ".....M...M......", "......M...M.....", "................", "...LLLLLLLLL....", "...LOOOOOOOLLL..", "...LLLLLLLLL.L..", "...LLLLLLLLL.L..", "...LLLLLLLLLLL..", "....LLLLLLL.....", "..SSSSSSSSSSSS..", "................", "................", "................"],
    calendar: ["................", "...Y......Y.....", "..NNNNNNNNNNNN..", "..NMMMMMMMMMMN..", "..NLLLLLLLLLLN..", "..NLDLDLDLDLLN..", "..NLLLLLLLLLLN..", "..NLDLDLMLDLLN..", "..NLLLLLLLLLLN..", "..NLDLDLDLDLLN..", "..NLLLLLLLLLLN..", "..NNNNNNNNNNNN..", "................", "................", "................", "................"],
    shield: ["................", "....MMMMMMMM....", "...MmmmmmmmmM...", "...MmmmmmmmmM...", "...MmmmWWmmmM...", "...MmmWNNWmmM...", "...MmmWNNWmmM...", "...MmmmWWmmmM...", "....MmmWWmmM....", "....MmmWWmmM....", ".....MmmmmM.....", "......MmmM......", ".......MM.......", "................", "................", "................"],
    network: ["................", "..Y.........P...", "...S.......S....", "....S.....S.....", ".....S...S......", "......MMM.......", ".SSSSSMWMSSSSSB.", "......MMM.......", ".....S...S......", "....S.....S.....", "...S.......S....", "..G.........L...", "................", "................", "................", "................"],
    mic: ["................", "......NNNN......", ".....NLLLLN.....", ".....NLSLSN.....", ".....NLLLLN.....", ".....NLSLSN.....", ".....NLLLLN.....", "...N.NLLLLN.N...", "...N..NNNN..N...", "....N......N....", ".....NNNNNN.....", ".......NN.......", ".......NN.......", ".....NNNNNN.....", "................", "................"],
    book: ["................", "................", ".NNNNNN..NNNNNN.", ".NWWWWWNNWWWWWN.", ".NWSSSWNNWSSSWN.", ".NWWWWWNNWWWWWN.", ".NWSSSWNNWSSSWN.", ".NWWWWWNNWWWWWN.", ".NWSSWWNNWSSSWN.", ".NWWWWWNNWWWMWN.", ".NWSSSWNNWWMMWN.", ".NWWWWWNNWWWWWN.", ".NNNNNNNNNNNNNN.", "................", "................", "................"],
    board: ["................", ".NNNNNNNNNNNNNN.", ".NmmmmmmmmmmmmN.", ".NmWmmmWWWmmmmN.", ".NmmWmmmmWmmmmN.", ".NmWmmmWWWmmmmN.", ".NmmmmmWmmmMmmN.", ".NmmmmmWWWmmmmN.", ".NmmmmmmmmmmmmN.", ".NNNNNNNNNNNNNN.", "......S..S......", ".....S....S.....", "................", "................", "................", "................"]
  };
  function pixelArt(name, label) {
    var rows = ART[name] || ART.grid, rects = "";
    var top = 0, bottom = rows.length - 1;
    while (top < bottom && !/[^.]/.test(rows[top])) top++;
    while (bottom > top && !/[^.]/.test(rows[bottom])) bottom--;
    var yOff = Math.round((16 - (bottom - top + 1)) / 2) - top;
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) { var c = row[x]; if (c !== ".") rects += '<rect x="' + (x + 6) + '" y="' + (y + yOff + 6) + '" width="1.02" height="1.02" fill="' + PAL[c] + '"/>'; }
    });
    var dots = "";
    for (var gy = 1; gy < 28; gy += 3) for (var gx = 1; gx < 28; gx += 3) dots += '<rect x="' + gx + '" y="' + gy + '" width=".18" height=".18" fill="#7b1e34" opacity=".16"/>';
    return '<svg viewBox="0 0 28 28" shape-rendering="crispEdges" role="img" aria-label="' + esc(label || "pixel-art concept illustration") + '">' +
      '<defs><radialGradient id="pg-' + name + '" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f4e8df"/></radialGradient></defs>' +
      '<rect width="28" height="28" fill="url(#pg-' + name + ')"/>' + dots + rects + "</svg>";
  }

  function flow(steps) {
    return '<div class="flow" style="--n:' + Math.min(4, steps.length) + '">' + steps.map(function (s, i) { return '<div class="flow__node"><span>0' + (i + 1) + "</span><p>" + esc(s) + "</p></div>"; }).join("") + "</div>";
  }

  // ---------- lightbox ----------
  function lightbox() {
    var box = document.getElementById("lightbox");
    if (!box) return;
    var img = $("img", box), cap = $("p", box), closeBtn = $("button", box), lastFocus = null;
    function open(src, alt, caption) { lastFocus = document.activeElement; img.src = src; img.alt = alt || ""; cap.textContent = caption || ""; box.hidden = false; document.body.style.overflow = "hidden"; closeBtn.focus(); }
    function close() { box.hidden = true; img.src = ""; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-lightbox]");
      if (t) { e.preventDefault(); e.stopPropagation(); open(t.getAttribute("data-lightbox"), t.getAttribute("data-alt"), t.getAttribute("data-caption")); }
    }, true);
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  }

  // ---------- fade-in on scroll ----------
  function reveals() {
    var els = $all(".fade-in-section");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- navbar ----------
  function nav() {
    var bar = document.getElementById("nav");
    if (!bar) return;
    $all("[data-icons]").forEach(function (el) { el.innerHTML = icons(); });
    var toggle = $(".navbar__toggle", bar);
    if (toggle) {
      toggle.addEventListener("click", function () { var open = bar.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", open ? "true" : "false"); });
      $all(".navbar__links a", bar).forEach(function (a) { a.addEventListener("click", function () { bar.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }); });
    }
    var links = $all('.navbar__links a[href^="#"]', bar), map = {};
    links.forEach(function (a) { var s = document.getElementById(a.getAttribute("href").slice(1)); if (s) map[s.id] = a; });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && map[en.target.id]) { links.forEach(function (l) { l.classList.remove("is-active"); }); map[en.target.id].classList.add("is-active"); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // ---------- typed name ----------
  function typeName() {
    var el = document.getElementById("intro-name");
    if (!el) return;
    var name = (S.profile && S.profile.nickname) || "ene";
    if (reduceMotion) { el.textContent = name; return; }
    el.textContent = "";
    var i = 0;
    (function tick() { if (i > name.length) return; el.textContent = name.slice(0, i++); setTimeout(tick, i === 1 ? 500 : 160); })();
  }

  // ---------- cards ----------
  function logHref(p) { return "project.html#" + encodeURIComponent(p.id); }
  function softwareCard(p, i) {
    var links = (p.github ? '<a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + ICON.github + "</a>" : "") +
      '<a href="' + logHref(p) + '" aria-label="Open project log">' + ICON.open + "</a>";
    return '<div class="fade-in-section" style="transition-delay:' + (i % 3) * 100 + 'ms"><div class="projects-card">' +
      '<div class="card-header"><span class="folder-icon">' + ICON.folder + '</span><span class="external-links">' + links + "</span></div>" +
      '<h3 class="card-title"><a href="' + logHref(p) + '">' + esc(p.title) + "</a></h3>" +
      (/design|planned|development|progress|soon/i.test(p.status) ? '<span class="card-planned">◌ ' + esc(p.status) + "</span>" : "") +
      '<p class="card-desc">' + esc(p.desc) + "</p>" +
      '<div class="card-tech">' + esc(p.tech) + "</div></div></div>";
  }
  function imageCard(p, i) {
    var P = S.profile || {};
    var media = p.image ? '<img class="project-image" src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' : pixelArt(p.pixel, p.title + ", pixel-art illustration");
    var badge = "";
    if (p.badge) {
      var star = '<span class="card-badge-icon" aria-hidden="true">★</span>';
      if (p.badge.lightbox) badge = '<a class="card-badge-link" href="' + esc(p.badge.href) + '" data-lightbox="' + esc(p.badge.href) + '" data-alt="Research poster" data-caption="Research poster · Math Path Summer Research Program, Georgia State University, 2026">' + star + esc(p.badge.text) + "</a>";
      else if (p.tutoring) badge = '<a class="card-badge-link" href="mailto:' + esc(P.tutorEmail) + '?subject=' + encodeURIComponent("Tutoring request") + '">' + star + esc(p.badge.text) + "</a>";
      else badge = '<span class="card-badge-link">' + star + esc(p.badge.text) + "</span>";
    }
    var planned = /design|planned|development|progress|soon/i.test(p.status) ? '<span class="card-planned">◌ ' + esc(p.status) + "</span>" : "";
    var extra = p.tutoring ? '<p class="card-note">Looking for a tutor? Email <a href="mailto:' + esc(P.tutorEmail) + '?subject=' + encodeURIComponent("Tutoring request") + '">' + esc(P.tutorEmail) + "</a> for availability and rates.</p>" : "";
    return '<div class="fade-in-section" style="transition-delay:' + (i % 3) * 100 + 'ms"><div class="projects-card transparent-card" data-href="' + logHref(p) + '">' +
      '<div class="project-image-container">' + media + "</div>" +
      '<h3 class="card-title"><a href="' + logHref(p) + '">' + esc(p.title) + "</a></h3>" +
      (p.subtitle ? '<p class="card-subtitle">' + esc(p.subtitle) + "</p>" : "") +
      badge + planned +
      '<p class="card-desc">' + esc(p.desc) + "</p>" + extra +
      '<a class="full-log-link" href="' + logHref(p) + '">Full project log</a>' +
      '<div class="card-tech">' + esc(p.tech) + "</div></div></div>";
  }
  // Whole card clickable, like the original (links and badges inside still work).
  function clickableCards() {
    document.addEventListener("click", function (e) {
      var c = e.target.closest(".transparent-card[data-href]");
      if (!c || e.target.closest("a, button")) return;
      window.location.href = c.getAttribute("data-href");
    });
  }

  // ---------- home ----------
  function renderHome() {
    var P = S.profile || {}, L = S.links || {};
    $all("[data-email]").forEach(function (a) { a.href = "mailto:" + P.email; if (a.hasAttribute("data-email-text")) a.textContent = P.email; });
    $all("[data-tutor-email]").forEach(function (a) { a.href = "mailto:" + P.tutorEmail + "?subject=" + encodeURIComponent("Tutoring request"); a.textContent = P.tutorEmail; });
    $all("[data-grad]").forEach(function (el) { el.textContent = (P.graduation || "").replace(/^Expected/, "expected"); });
    $all("[data-link]").forEach(function (a) { var k = a.getAttribute("data-link"); if (L[k]) a.href = L[k]; else a.replaceWith(document.createTextNode(a.textContent)); });

    // Experience tabs
    var ex = S.experience || [], list = document.getElementById("tabs-list"), panels = document.getElementById("tabs-panels"), ind = document.getElementById("tabs-indicator");
    if (list && panels) {
      list.insertAdjacentHTML("beforeend", ex.map(function (e, i) {
        return '<button class="tabs__btn" role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i ? -1 : 0) + '">' + esc(e.tab) + "</button>";
      }).join(""));
      panels.innerHTML = ex.map(function (e, i) {
        var more = "";
        if (e.link) more = '<a class="job-more" href="project.html#' + esc(e.link) + '">Read the project log</a>';
        if (e.tutoring) more = '<p class="job-note">Looking for a tutor? Email <a href="mailto:' + esc(P.tutorEmail) + '?subject=' + encodeURIComponent("Tutoring request") + '">' + esc(P.tutorEmail) + "</a> for availability and rates.</p>";
        return '<div class="tabs__panel" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? " hidden" : "") + ">" +
          '<div class="joblist-job-title">' + esc(e.title) + ' @ <span class="joblist-job-company">' + esc(e.org) + "</span></div>" +
          '<div class="joblist-duration">' + esc(e.period) + "</div>" +
          '<ul class="bullets">' + e.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" + more + "</div>";
      }).join("");
      var btns = $all(".tabs__btn", list);
      function select(i, focus) {
        btns.forEach(function (b, k) { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
        $all(".tabs__panel", panels).forEach(function (p, k) { p.hidden = k !== i; if (k === i) { p.classList.remove("is-entering"); void p.offsetWidth; p.classList.add("is-entering"); } });
        if (ind) { ind.style.transform = "translateY(" + btns[i].offsetTop + "px)"; ind.style.height = btns[i].offsetHeight + "px"; }
        if (focus) btns[i].focus();
      }
      btns.forEach(function (b, i) { b.addEventListener("click", function () { select(i); }); });
      list.addEventListener("keydown", function (e) {
        var i = btns.indexOf(document.activeElement); if (i < 0) return;
        var k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select((i + k + btns.length) % btns.length, true); }
      });
      select(0);
    }

    // Software: spotlight carousel + three cards
    var software = S.software || [], feats = software.filter(function (p) { return p.featured; });
    var inner = document.getElementById("carousel-inner"), dotsEl = document.getElementById("carousel-indicators");
    if (inner && feats.length) {
      inner.innerHTML = feats.map(function (p, i) {
        var gh = p.github ? '<a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + ICON.github + "</a>" : "";
        return '<div class="carousel-item' + (i ? "" : " is-active") + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + feats.length + '">' + cover(p.motif, p.id) +
          '<div class="carousel-caption">' + (/design|planned|development|progress|soon/i.test(p.status) ? '<span class="carousel-status">◌ ' + esc(p.status) + "</span>" : "") + "<h3>" + esc(p.title) + "</h3><p>" + esc(p.desc) + '</p><p class="techStack">' + esc(p.tech) + '</p><div class="external-links">' + gh +
          '<a href="' + logHref(p) + '" aria-label="Open project log">' + ICON.open + "</a></div></div></div>";
      }).join("");
      dotsEl.innerHTML = feats.map(function (p, i) { return '<button type="button" aria-label="Slide ' + (i + 1) + '" aria-current="' + (i === 0) + '"></button>'; }).join("");
      var items = $all(".carousel-item", inner), dots = $all("button", dotsEl), cur = 0, timer = null, root = document.getElementById("carousel");
      function go(n, dir) {
        var next = (n + items.length) % items.length; if (next === cur) return;
        dir = dir || (n > cur ? 1 : -1);
        var from = items[cur], to = items[next];
        to.style.transition = "none"; to.classList.remove("is-left", "is-right"); to.classList.add(dir > 0 ? "is-right" : "is-left"); void to.offsetWidth; to.style.transition = "";
        from.classList.remove("is-active"); from.classList.add(dir > 0 ? "is-left" : "is-right");
        to.classList.remove("is-left", "is-right"); to.classList.add("is-active");
        setTimeout(function () { from.classList.remove("is-left", "is-right"); }, 650);
        cur = next; dots.forEach(function (d, k) { d.setAttribute("aria-current", k === cur); });
      }
      function play() { if (reduceMotion) return; stop(); timer = setInterval(function () { go(cur + 1, 1); }, 5000); }
      function stop() { if (timer) clearInterval(timer); timer = null; }
      $(".carousel-control--prev", root).addEventListener("click", function () { go(cur - 1, -1); play(); });
      $(".carousel-control--next", root).addEventListener("click", function () { go(cur + 1, 1); play(); });
      dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); play(); }); });
      root.addEventListener("mouseenter", stop); root.addEventListener("mouseleave", play);
      var sx = null;
      root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
      root.addEventListener("touchend", function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); play(); } sx = null; });
      play();
    }
    var homeCards = software.filter(function (p) { return p.home; });
    html("project-grid", homeCards.map(softwareCard).join(""));
    var grid = document.getElementById("project-grid"); if (grid) grid.hidden = !homeCards.length;
    html("hardware-grid", (S.hardware || []).map(imageCard).join(""));
    html("community-grid", (S.community || []).map(imageCard).join(""));
  }

  // ---------- all projects page ----------
  function renderProjectsPage() {
    html("all-software", (S.software || []).map(softwareCard).join(""));
    html("all-hardware", (S.hardware || []).map(imageCard).join(""));
    html("all-community", (S.community || []).map(imageCard).join(""));
  }

  // ---------- background glow: eases toward the scroll position so the light trails a little behind ----------
  function bgGlow() {
    var el = document.querySelector(".bg-glow");
    if (!el || reduceMotion) return;
    var cur = 0, target = 0, raf = 0, root = document.documentElement;
    function step() {
      cur += (target - cur) * 0.08;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      el.style.setProperty("--scroll", cur.toFixed(4));
      raf = cur === target ? 0 : requestAnimationFrame(step);
    }
    function measure() {
      var max = root.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (!raf) raf = requestAnimationFrame(step);
    }
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
  }

  window.UI = { esc: esc, icon: ICON, cover: cover, pixelArt: pixelArt, flow: flow, icons: icons, lightbox: lightbox, reveals: reveals, nav: nav };

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");
    bgGlow();
    if (page === "home") {
      renderHome();
      typeName();
      var canvas = document.getElementById("portrait-canvas"), hint = document.getElementById("sim-hint");
      if (canvas && window.initPortrait) window.initPortrait(canvas, { onInteract: function () { if (hint) hint.classList.add("is-gone"); } });
      if (location.hash.length > 1) {
        var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) { var rs = document.documentElement.style; rs.scrollBehavior = "auto"; target.scrollIntoView(); rs.scrollBehavior = ""; }
      }
    }
    if (page === "projects") renderProjectsPage();
    clickableCards();
    nav();
    lightbox();
    reveals();
  });
})();
