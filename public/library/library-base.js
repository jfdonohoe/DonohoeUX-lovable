/* =============================================================================
   DONOHOE UX — Standalone JS
   Drives: site nav active state, about carousel, image carousels,
   constellation flourish, current year in footer.
   No frameworks. No build step.
   ============================================================================= */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------- Nav active link ---------- */
  function initNavActive() {
    const path = location.pathname.split("/").pop() || "index.html";
    $$(".site-nav a[data-route]").forEach((a) => {
      if (a.dataset.route === path) a.classList.add("active");
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Constellation flourish ---------- */
  function initConstellation() {
    const container = $(".constellation");
    if (!container) return;
    const lines = [
      "M30 40 L60 25 L100 35 L140 20",
      "M160 60 L175 100 L165 140 L180 170",
      "M40 160 L25 130 L35 90 L20 60",
      "M60 175 L100 165 L140 178",
    ];
    const dots = [
      [30,40,4],[60,25,3],[100,35,5],[140,20,3],
      [160,60,4],[175,100,3],[165,140,4],[180,170,3],
      [140,178,4],[100,165,5],[60,175,3],[40,160,4],
      [25,130,3],[35,90,4],[20,60,3],
    ];
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.setAttribute("fill", "none");
    lines.forEach((d, i) => {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      p.style.animationDelay = i * 0.2 + "s";
      svg.appendChild(p);
    });
    dots.forEach(([cx, cy, r], i) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", cx);
      c.setAttribute("cy", cy);
      c.setAttribute("r", r);
      c.style.animationDelay = 0.8 + i * 0.1 + "s";
      svg.appendChild(c);
    });
    container.appendChild(svg);
  }

  /* ---------- About carousel (homepage) ---------- */
  function initAboutCarousel() {
    const root = $("[data-about-carousel]");
    if (!root) return;
    const tabs = $$("[data-about-tab]", root);
    const track = $("[data-about-track]", root);
    const prev = $("[data-about-prev]", root);
    const next = $("[data-about-next]", root);
    let active = 0;

    function cardPct() {
      const w = window.innerWidth;
      if (w >= 1280) return 45;
      if (w >= 1024) return 55;
      if (w >= 640) return 70;
      return 85;
    }

    function render() {
      const pct = cardPct();
      track.style.transform = `translateX(-${active * (pct + 2)}%)`;
      tabs.forEach((t, i) => t.classList.toggle("active", i === active));
    }

    tabs.forEach((t, i) => t.addEventListener("click", () => { active = i; render(); }));
    prev && prev.addEventListener("click", () => { active = Math.max(0, active - 1); render(); });
    next && next.addEventListener("click", () => { active = Math.min(tabs.length - 1, active + 1); render(); });
    window.addEventListener("resize", render);
    render();
  }

  /* ---------- Image carousels ---------- */
  function initImageCarousels() {
    $$("[data-image-carousel]").forEach((root) => {
      const track = $("[data-ic-track]", root);
      const slides = $$(".ic-slide", track);
      const prev = $("[data-ic-prev]", root);
      const next = $("[data-ic-next]", root);
      let i = 0;
      const total = slides.length;

      function render() {
        track.style.transform = `translateX(-${i * 100}%)`;
      }
      function go(d) { i = (i + d + total) % total; render(); }

      prev && prev.addEventListener("click", () => go(-1));
      next && next.addEventListener("click", () => go(1));
      render();
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavActive();
    initYear();
    initConstellation();
    initAboutCarousel();
    initImageCarousels();
  });
})();
