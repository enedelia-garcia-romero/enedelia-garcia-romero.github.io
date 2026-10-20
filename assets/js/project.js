/* Project log page: project.html#<id> — structure modelled on gazijarin.com's project logs. */
(function () {
  "use strict";
  var S = window.SITE || {}, U = window.UI, esc = U.esc, P = S.profile || {};
  var groups = [
    { key: "software", list: S.software || [], back: "index.html#projects" },
    { key: "hardware", list: S.hardware || [], back: "index.html#hardware-projects" },
    { key: "community", list: S.community || [], back: "index.html#community" }
  ];
  // the id travels in the hash (project.html#id); ?id= links from older versions still work
  var id = decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("id"), group = null, idx = -1;
  groups.forEach(function (g) { var i = g.list.findIndex(function (p) { return p.id === id; }); if (i >= 0) { group = g; idx = i; } });
  // prev/next links only change the hash, so reload when it names another project (not the skip link)
  window.addEventListener("hashchange", function () {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h !== id && groups.some(function (g) { return g.list.some(function (q) { return q.id === h; }); })) location.reload();
  });
  var root = document.getElementById("content");
  var BACK = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';

  if (!group) {
    root.innerHTML = '<div class="section-header"><a class="back-button" href="index.html" aria-label="Back home">' + BACK + '</a><span class="section-title">/ project log</span></div><div class="project-log-header"><h1 class="project-log-title">That project isn’t here.</h1><p class="project-log-description">It may have been renamed. Every project is on the home page.</p></div>';
    return;
  }
  var p = group.list[idx], log = p.log || {};
  document.title = p.title + (p.subtitle ? " · " + p.subtitle : "") + " · Enedelia Garcia-Romero";
  var meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute("content", p.desc);

  var hero;
  if (log.hero || p.image) hero = '<img class="project-log-hero" src="' + esc(log.hero || p.image) + '" alt="' + esc(p.title) + '">';
  else if (p.pixel) hero = '<div style="max-width:440px;margin:0 auto">' + U.pixelArt(p.pixel, p.title + ", pixel-art illustration") + "</div>";
  else hero = U.cover(p.motif, p.id + "-hero");

  var links = [];
  if (p.github) links.push('<a class="project-reels-link" href="' + esc(p.github) + '" target="_blank" rel="noopener">' + U.icon.github + "<span>View the code on GitHub</span></a>");
  if (p.badge && p.badge.lightbox) links.push('<a class="project-reels-link" href="' + esc(p.badge.href) + '" data-lightbox="' + esc(p.badge.href) + '" data-alt="Research poster" data-caption="Research poster · Math Path Summer Research Program, Georgia State University, 2026">' + U.icon.open + "<span>View the research poster</span></a>");
  (p.links || []).forEach(function (l) {
    var href = l.href || (S.links || {})[l.key];
    if (href) links.push('<a class="project-reels-link" href="' + esc(href) + '" target="_blank" rel="noopener">' + U.icon.open + "<span>" + esc(l.label) + "</span></a>");
  });
  if (p.tutoring) links.push('<a class="project-reels-link" href="mailto:' + esc(P.tutorEmail) + "?subject=" + encodeURIComponent("Tutoring request") + '">' + U.icon.mail + "<span>Request tutoring · " + esc(P.tutorEmail) + "</span></a>");

  function section(s) {
    var c = "";
    (s.p || []).forEach(function (t) { c += '<p class="article-text">' + esc(t) + "</p>"; });
    if (s.list) c += '<div class="article-list-container"><ul class="article-list">' + s.list.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul></div>";
    if (s.code) c += '<div class="article-code-container"><pre class="article-code"><code>' + esc(s.code) + "</code></pre></div>";
    if (s.diagram) c += '<div class="article-diagram-container"><pre class="article-diagram">' + esc(s.diagram) + "</pre></div>";
    (s.after || []).forEach(function (t) { c += '<p class="article-text">' + esc(t) + "</p>"; });
    if (s.image) c += '<div class="article-image-container" data-lightbox="' + esc(s.image.src) + '" data-alt="' + esc(s.image.caption) + '" data-caption="' + esc(s.image.caption) + '"><img src="' + esc(s.image.src) + '" alt="' + esc(s.image.caption) + '" loading="lazy"></div><p class="article-image-caption">' + esc(s.image.caption) + "</p>";
    if (s.tip) c += '<div class="article-tip">' + esc(s.tip) + "</div>";
    if (s.note) c += '<div class="article-note">' + esc(s.note) + "</div>";
    return '<div class="fade-in-section"><section class="article-section"><div class="article-header"><h2 class="article-title">' + esc(s.t) + '</h2></div><div class="article-content">' + c + "</div></section></div>";
  }

  var list = group.list, prev = list[(idx - 1 + list.length) % list.length], next = list[(idx + 1) % list.length];
  var planned = /design|planned|development|progress|soon/i.test(p.status);

  root.innerHTML =
    '<div class="section-header"><a class="back-button" href="' + group.back + '" aria-label="Back">' + BACK + '</a><span class="section-title">/ project log</span></div>' +
    '<div class="fade-in-section"><div class="project-log-header">' +
      '<h1 class="project-log-title">' + esc(p.title) + "</h1>" +
      (p.subtitle ? '<p class="project-log-subtitle">' + esc(p.subtitle) + "</p>" : "") +
      '<div class="project-log-hero-wrapper"' + (log.heroNarrow ? ' style="max-width:440px"' : "") + '><div class="project-log-hero-container">' + hero + "</div>" + (log.caption ? '<p class="project-log-hero-caption">' + esc(log.caption) + "</p>" : "") + "</div>" +
      '<p class="project-log-description">' + esc(log.intro || p.desc) + "</p>" +
      '<div class="project-log-date">' + esc(p.date || "") + "</div>" +
      (planned ? '<div class="project-log-status">◌ ' + esc(p.status) + "</div>" : "") +
    "</div></div>" +
    (links.length ? '<div class="fade-in-section"><div class="reels-container">' + links.join("") + "</div></div>" : "") +
    '<div class="project-log-container">' + (log.sections || []).map(section).join("") + "</div>" +
    '<div class="fade-in-section"><p class="article-text" style="color:var(--slate);font-size:17px">' + esc(p.tech) + "</p></div>" +
    '<nav class="log-next" aria-label="More projects">' +
      '<a href="project.html#' + encodeURIComponent(prev.id) + '"><span>← previous</span><strong>' + esc(prev.title) + "</strong></a>" +
      '<a href="project.html#' + encodeURIComponent(next.id) + '"><span>next →</span><strong>' + esc(next.title) + "</strong></a>" +
    "</nav>";
})();
