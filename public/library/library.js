/* =============================================================================
   DONOHOE UX LIBRARY — Consolidated component JS
   Initializes every interactive component on page load via data-attributes.
   ============================================================================= */
(function () {
  "use strict";
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* Footer year */
  function initYear() { $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear()); }

  /* Constellation flourish */
  function initConstellation() {
    $$(".constellation").forEach(container => {
      if (container.dataset.init) return;
      container.dataset.init = "1";
      const lines = ["M30 40 L60 25 L100 35 L140 20","M160 60 L175 100 L165 140 L180 170","M40 160 L25 130 L35 90 L20 60","M60 175 L100 165 L140 178"];
      const dots = [[30,40,4],[60,25,3],[100,35,5],[140,20,3],[160,60,4],[175,100,3],[165,140,4],[180,170,3],[140,178,4],[100,165,5],[60,175,3],[40,160,4],[25,130,3],[35,90,4],[20,60,3]];
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", "0 0 200 200");
      svg.setAttribute("fill", "none");
      lines.forEach((d, i) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.style.animationDelay = i * 0.2 + "s"; svg.appendChild(p); });
      dots.forEach(([cx, cy, r], i) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r); c.style.animationDelay = (0.8 + i * 0.1) + "s"; svg.appendChild(c); });
      container.appendChild(svg);
    });
  }

  /* About carousel */
  function initAboutCarousel() {
    $$("[data-about-carousel]").forEach(root => {
      const tabs = $$("[data-about-tab]", root);
      const track = $("[data-about-track]", root);
      const prev = $("[data-about-prev]", root);
      const next = $("[data-about-next]", root);
      if (!track || !tabs.length) return;
      let active = 0;
      const cardPct = () => { const w = window.innerWidth; if (w >= 1280) return 45; if (w >= 1024) return 55; if (w >= 640) return 70; return 85; };
      const render = () => { track.style.transform = `translateX(-${active * (cardPct() + 2)}%)`; tabs.forEach((t, i) => t.classList.toggle("active", i === active)); };
      tabs.forEach((t, i) => t.addEventListener("click", () => { active = i; render(); }));
      prev && prev.addEventListener("click", () => { active = Math.max(0, active - 1); render(); });
      next && next.addEventListener("click", () => { active = Math.min(tabs.length - 1, active + 1); render(); });
      window.addEventListener("resize", render);
      render();
    });
  }

  /* Image carousels */
  function initImageCarousels() {
    $$("[data-image-carousel]").forEach(root => {
      const track = $("[data-ic-track]", root);
      const slides = $$(".ic-slide", track);
      const prev = $("[data-ic-prev]", root);
      const next = $("[data-ic-next]", root);
      let i = 0; const total = slides.length;
      const render = () => { track.style.transform = `translateX(-${i * 100}%)`; };
      const go = d => { i = (i + d + total) % total; render(); };
      prev && prev.addEventListener("click", () => go(-1));
      next && next.addEventListener("click", () => go(1));
      render();
    });
  }

  /* Video player */
  function fmtTime(s) { s = Math.max(0, Math.floor(s || 0)); const m = Math.floor(s / 60); const r = s % 60; return m + ":" + (r < 10 ? "0" : "") + r; }
  function initVideoPlayers() {
    $$("[data-video-player]").forEach(root => {
      const video = $("video", root);
      const playBtn = $("[data-vp-play]", root);
      const toggleBtn = $("[data-vp-toggle]", root);
      const muteBtn = $("[data-vp-mute]", root);
      const fill = $(".vp-progress-fill", root);
      const progress = $(".vp-progress", root);
      const time = $(".vp-time", root);
      if (!video) return;
      const sync = () => { root.classList.toggle("is-playing", !video.paused); };
      const togglePlay = () => { video.paused ? video.play() : video.pause(); };
      playBtn && playBtn.addEventListener("click", togglePlay);
      toggleBtn && toggleBtn.addEventListener("click", togglePlay);
      muteBtn && muteBtn.addEventListener("click", () => { video.muted = !video.muted; muteBtn.dataset.muted = video.muted ? "1" : "0"; });
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      video.addEventListener("timeupdate", () => {
        if (fill && video.duration) fill.style.width = (video.currentTime / video.duration * 100) + "%";
        if (time) time.textContent = fmtTime(video.currentTime) + " / " + fmtTime(video.duration);
      });
      progress && progress.addEventListener("click", e => {
        const r = progress.getBoundingClientRect();
        const ratio = (e.clientX - r.left) / r.width;
        if (video.duration) video.currentTime = ratio * video.duration;
      });
    });
  }

  /* Tabs */
  function initTabs() {
    $$("[data-tabs]").forEach(root => {
      const btns = $$(".tab-btn", root);
      const panels = $$(".tab-panel", root);
      btns.forEach((b, i) => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("active"));
        panels.forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        panels[i] && panels[i].classList.add("active");
      }));
    });
  }

  /* Accordion */
  function initAccordion() {
    $$("[data-accordion]").forEach(root => {
      $$(".accordion-item", root).forEach(item => {
        const trig = $(".acc-trigger", item);
        trig && trig.addEventListener("click", () => item.classList.toggle("is-open"));
      });
    });
  }

  /* Reveal on scroll */
  function initReveal() {
    const els = $$(".reveal-init");
    if (!els.length || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("reveal-in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("reveal-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYear(); initConstellation(); initAboutCarousel(); initImageCarousels();
    initVideoPlayers(); initTabs(); initAccordion(); initReveal();
  });
})();
