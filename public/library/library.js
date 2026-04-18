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

  /* Modal */
  function initModals() {
    $$("[data-modal-open]").forEach(btn => btn.addEventListener("click", () => {
      const m = document.getElementById(btn.getAttribute("data-modal-open"));
      if (m) m.classList.add("is-open");
    }));
    $$(".modal-overlay").forEach(m => {
      m.addEventListener("click", e => { if (e.target === m) m.classList.remove("is-open"); });
      $$("[data-modal-close]", m).forEach(b => b.addEventListener("click", () => m.classList.remove("is-open")));
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") $$(".modal-overlay.is-open").forEach(m => m.classList.remove("is-open"));
    });
  }

  /* Dropdown */
  function initDropdowns() {
    $$("[data-dropdown]").forEach(dd => {
      const trig = $("[data-dropdown-trigger]", dd);
      trig && trig.addEventListener("click", e => {
        e.stopPropagation();
        const wasOpen = dd.classList.contains("is-open");
        $$("[data-dropdown].is-open").forEach(o => o.classList.remove("is-open"));
        if (!wasOpen) dd.classList.add("is-open");
      });
    });
    document.addEventListener("click", () => $$("[data-dropdown].is-open").forEach(o => o.classList.remove("is-open")));
  }

  /* Toast */
  function ensureToastRegion() {
    let r = $(".toast-region");
    if (!r) { r = document.createElement("div"); r.className = "toast-region"; document.body.appendChild(r); }
    return r;
  }
  window.libToast = function (msg, variant) {
    const r = ensureToastRegion();
    const t = document.createElement("div");
    t.className = "toast" + (variant ? " toast-" + variant : "");
    t.textContent = msg;
    r.appendChild(t);
    setTimeout(() => { t.classList.add("is-leaving"); setTimeout(() => t.remove(), 200); }, 3200);
  };
  function initToasts() {
    $$("[data-toast]").forEach(btn => btn.addEventListener("click", () => {
      window.libToast(btn.getAttribute("data-toast-msg") || "Saved successfully", btn.getAttribute("data-toast") || "success");
    }));
  }

  /* Pagination demo */
  function initPagination() {
    $$("[data-pagination]").forEach(root => {
      const btns = $$("button[data-page]", root);
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("is-current"));
        b.classList.add("is-current");
      }));
    });
  }

  /* Sortable list view */
  function initSortableList() {
    $$("[data-sortable-list]").forEach(root => {
      const body = $("[data-list-body]", root);
      if (!body) return;
      const sortBtns = $$(".list-sort", root);
      sortBtns.forEach(btn => btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        const type = btn.getAttribute("data-type") || "string";
        const cur = btn.getAttribute("data-sort");
        const next = cur === "asc" ? "desc" : "asc";
        sortBtns.forEach(b => b.removeAttribute("data-sort"));
        btn.setAttribute("data-sort", next);
        const rows = $$(".list-row", body);
        rows.sort((a, b) => {
          let av = a.querySelector(`[data-cell="${key}"]`)?.getAttribute("data-value") ?? a.querySelector(`[data-cell="${key}"]`)?.textContent ?? "";
          let bv = b.querySelector(`[data-cell="${key}"]`)?.getAttribute("data-value") ?? b.querySelector(`[data-cell="${key}"]`)?.textContent ?? "";
          if (type === "number") { av = parseFloat(av) || 0; bv = parseFloat(bv) || 0; return next === "asc" ? av - bv : bv - av; }
          return next === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });
        rows.forEach(r => body.appendChild(r));
      }));
    });
  }

  /* Inline editable cells */
  function initInlineEdit() {
    $$(".cell-edit").forEach(cell => {
      cell.setAttribute("contenteditable", "true");
      cell.setAttribute("spellcheck", "false");
      let original = cell.textContent;
      cell.addEventListener("focus", () => { original = cell.textContent; });
      cell.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); cell.blur(); }
        if (e.key === "Escape") { cell.textContent = original; cell.blur(); }
      });
      cell.addEventListener("blur", () => {
        if (cell.textContent !== original) {
          cell.classList.add("is-saving");
          setTimeout(() => cell.classList.remove("is-saving"), 800);
          if (window.libToast) window.libToast("Saved", "success");
        }
      });
    });
    /* Inline status select — keep pill color in sync with selected option */
    $$(".cell-select").forEach(sel => {
      const sync = () => {
        const opt = sel.options[sel.selectedIndex];
        const variant = opt.getAttribute("data-variant") || "neutral";
        sel.className = "cell-select status-pill status-" + variant;
      };
      sync();
      sel.addEventListener("change", () => { sync(); if (window.libToast) window.libToast("Status updated", "success"); });
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

  /* ===========================================================================
     DATA VISUALIZATION — Inline SVG chart renderer.
     Each .viz container declares data-viz-type and data-viz with JSON payload.
     Palette pulls live values from CSS custom properties so charts auto-theme.
     =========================================================================== */
  const VIZ_NS = "http://www.w3.org/2000/svg";
  function el(name, attrs) {
    const n = document.createElementNS(VIZ_NS, name);
    if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v ? `hsl(${v})` : fallback;
  }
  function vizPalette() {
    return [
      cssVar("--primary", "hsl(12 76% 61%)"),
      cssVar("--fill-blue", "hsl(197 76% 61%)"),
      cssVar("--fill-purp", "hsl(262 76% 61%)"),
      cssVar("--fill-green", "hsl(134 71% 60%)"),
      cssVar("--accent-warm-dark", "hsl(12 70% 45%)"),
      cssVar("--fill-blue-dark", "hsl(201 70% 45%)"),
    ];
  }
  function parseData(node) {
    try { return JSON.parse(node.getAttribute("data-viz") || "null"); }
    catch (err) { console.error("Bad data-viz JSON", err, node); return null; }
  }
  function makeTooltip(host) {
    let tip = host.querySelector(".viz-tooltip");
    if (!tip) { tip = document.createElement("div"); tip.className = "viz-tooltip"; host.appendChild(tip); }
    return {
      show(html, x, y) { tip.innerHTML = html; tip.style.left = x + "px"; tip.style.top = y + "px"; tip.classList.add("is-visible"); },
      hide() { tip.classList.remove("is-visible"); }
    };
  }
  function makeLegend(host, items) {
    const wrap = document.createElement("div");
    wrap.className = "viz-legend";
    items.forEach(it => {
      const span = document.createElement("span");
      span.className = "viz-legend-item";
      span.innerHTML = `<span class="viz-legend-swatch" style="background:${it.color}"></span>${it.label}`;
      wrap.appendChild(span);
    });
    host.appendChild(wrap);
  }
  function ptToContainer(host, evt) {
    const r = host.getBoundingClientRect();
    return { x: evt.clientX - r.left, y: evt.clientY - r.top };
  }

  /* ---- Axis helpers ---- */
  function drawAxes(svg, opts) {
    const { x0, y0, x1, y1, xTicks, yTicks, yMax, yMin = 0, xLabels } = opts;
    const grid = el("g", { class: "viz-grid" });
    const axis = el("g", { class: "viz-axis" });
    // y grid + labels
    for (let i = 0; i <= yTicks; i++) {
      const v = yMin + (yMax - yMin) * (i / yTicks);
      const y = y1 - (y1 - y0) * (i / yTicks);
      grid.appendChild(el("line", { x1: x0, x2: x1, y1: y, y2: y }));
      const t = el("text", { x: x0 - 8, y: y + 4, "text-anchor": "end" });
      t.textContent = Math.round(v * 100) / 100;
      axis.appendChild(t);
    }
    // x labels
    if (xLabels) {
      const step = (x1 - x0) / Math.max(1, xLabels.length - 1);
      xLabels.forEach((lbl, i) => {
        const x = x0 + step * i;
        const t = el("text", { x, y: y1 + 16, "text-anchor": "middle" });
        t.textContent = lbl;
        axis.appendChild(t);
      });
    } else if (xTicks) {
      for (let i = 0; i <= xTicks; i++) {
        const x = x0 + (x1 - x0) * (i / xTicks);
        const t = el("text", { x, y: y1 + 16, "text-anchor": "middle" });
        t.textContent = i;
        axis.appendChild(t);
      }
    }
    axis.appendChild(el("line", { x1: x0, x2: x1, y1: y1, y2: y1 }));
    svg.appendChild(grid);
    svg.appendChild(axis);
  }

  /* ---- Chart: Line ---- */
  function renderLine(host, data, opts = {}) {
    const W = 720, H = 280, pad = { l: 40, r: 16, t: 12, b: 28 };
    const series = Array.isArray(data[0]) ? data : [data];
    const colors = vizPalette();
    const allY = series.flat().map(d => d.y);
    const yMax = Math.max(...allY) * 1.1;
    const xLen = series[0].length;
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, {
      x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b,
      xTicks: xLen - 1, yTicks: 4, yMax,
      xLabels: series[0].map(d => d.x)
    });
    const tip = makeTooltip(host);
    series.forEach((s, si) => {
      const color = colors[si % colors.length];
      const px = i => pad.l + (W - pad.l - pad.r) * (i / Math.max(1, s.length - 1));
      const py = v => (H - pad.b) - (H - pad.b - pad.t) * (v / yMax);
      let d = "";
      s.forEach((p, i) => { d += (i ? " L" : "M") + px(i) + " " + py(p.y); });
      svg.appendChild(el("path", { class: "viz-line", d, stroke: color }));
      s.forEach((p, i) => {
        const dot = el("circle", { class: "viz-dot", cx: px(i), cy: py(p.y), r: 4, fill: color });
        dot.addEventListener("mouseenter", e => {
          const xy = ptToContainer(host, e);
          tip.show(`<strong>${p.x}</strong> · ${p.y}`, xy.x, xy.y);
        });
        dot.addEventListener("mouseleave", () => tip.hide());
        svg.appendChild(dot);
      });
    });
    host.appendChild(svg);
    if (opts.legend) makeLegend(host, opts.legend.map((l, i) => ({ label: l, color: colors[i % colors.length] })));
  }

  /* ---- Chart: Area (single series, filled) ---- */
  function renderArea(host, data) {
    const W = 720, H = 280, pad = { l: 40, r: 16, t: 12, b: 28 };
    const yMax = Math.max(...data.map(d => d.y)) * 1.1;
    const color = vizPalette()[0];
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, { x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b, yTicks: 4, yMax, xLabels: data.map(d => d.x) });
    const px = i => pad.l + (W - pad.l - pad.r) * (i / Math.max(1, data.length - 1));
    const py = v => (H - pad.b) - (H - pad.b - pad.t) * (v / yMax);
    let dLine = "", dArea = "";
    data.forEach((p, i) => { const cmd = (i ? " L" : "M") + px(i) + " " + py(p.y); dLine += cmd; dArea += cmd; });
    dArea += ` L${px(data.length - 1)} ${H - pad.b} L${px(0)} ${H - pad.b} Z`;
    svg.appendChild(el("path", { class: "viz-area", d: dArea, fill: color }));
    svg.appendChild(el("path", { class: "viz-line", d: dLine, stroke: color }));
    const tip = makeTooltip(host);
    data.forEach((p, i) => {
      const dot = el("circle", { class: "viz-dot", cx: px(i), cy: py(p.y), r: 4, fill: color });
      dot.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${p.x}</strong> · ${p.y}`, xy.x, xy.y); });
      dot.addEventListener("mouseleave", () => tip.hide());
      svg.appendChild(dot);
    });
    host.appendChild(svg);
  }

  /* ---- Chart: Grouped Bar ---- */
  function renderGroupedBar(host, data, opts = {}) {
    // data: [{ label, values: [a, b, c] }]
    const W = 720, H = 280, pad = { l: 40, r: 16, t: 12, b: 28 };
    const colors = vizPalette();
    const groups = data.length;
    const seriesCount = data[0].values.length;
    const yMax = Math.max(...data.flatMap(g => g.values)) * 1.15;
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, { x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b, yTicks: 4, yMax, xLabels: data.map(d => d.label) });
    const groupW = (W - pad.l - pad.r) / groups;
    const barW = (groupW * 0.7) / seriesCount;
    const tip = makeTooltip(host);
    data.forEach((g, gi) => {
      const cx = pad.l + groupW * (gi + 0.5);
      g.values.forEach((v, si) => {
        const x = cx - (seriesCount * barW) / 2 + si * barW;
        const h = (H - pad.b - pad.t) * (v / yMax);
        const y = H - pad.b - h;
        const r = el("rect", { class: "viz-bar", x, y, width: barW - 2, height: h, rx: 2, fill: colors[si % colors.length] });
        r.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${g.label}</strong> · ${opts.legend ? opts.legend[si] : "Series " + (si + 1)}: ${v}`, xy.x, xy.y); });
        r.addEventListener("mouseleave", () => tip.hide());
        svg.appendChild(r);
      });
    });
    host.appendChild(svg);
    if (opts.legend) makeLegend(host, opts.legend.map((l, i) => ({ label: l, color: colors[i % colors.length] })));
  }

  /* ---- Chart: Stacked Bar ---- */
  function renderStackedBar(host, data, opts = {}) {
    const W = 720, H = 280, pad = { l: 40, r: 16, t: 12, b: 28 };
    const colors = vizPalette();
    const seriesCount = data[0].values.length;
    const yMax = Math.max(...data.map(g => g.values.reduce((a, b) => a + b, 0))) * 1.15;
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, { x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b, yTicks: 4, yMax, xLabels: data.map(d => d.label) });
    const groupW = (W - pad.l - pad.r) / data.length;
    const barW = groupW * 0.6;
    const tip = makeTooltip(host);
    data.forEach((g, gi) => {
      const cx = pad.l + groupW * (gi + 0.5);
      let yAcc = H - pad.b;
      g.values.forEach((v, si) => {
        const h = (H - pad.b - pad.t) * (v / yMax);
        yAcc -= h;
        const r = el("rect", { class: "viz-bar", x: cx - barW / 2, y: yAcc, width: barW, height: h, fill: colors[si % colors.length] });
        r.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${g.label}</strong> · ${opts.legend ? opts.legend[si] : "Series " + (si + 1)}: ${v}`, xy.x, xy.y); });
        r.addEventListener("mouseleave", () => tip.hide());
        svg.appendChild(r);
      });
    });
    host.appendChild(svg);
    if (opts.legend) makeLegend(host, opts.legend.map((l, i) => ({ label: l, color: colors[i % colors.length] })));
  }

  /* ---- Chart: Scatter ---- */
  function renderScatter(host, data, opts = {}) {
    const W = 720, H = 320, pad = { l: 40, r: 16, t: 12, b: 28 };
    const series = Array.isArray(data[0]) ? data : [data];
    const colors = vizPalette();
    const all = series.flat();
    const xMax = Math.max(...all.map(d => d.x)), xMin = Math.min(0, ...all.map(d => d.x));
    const yMax = Math.max(...all.map(d => d.y)) * 1.1;
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, {
      x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b,
      xTicks: 5, yTicks: 4, yMax,
      xLabels: Array.from({ length: 6 }, (_, i) => Math.round(xMin + (xMax - xMin) * i / 5))
    });
    const px = v => pad.l + (W - pad.l - pad.r) * ((v - xMin) / (xMax - xMin));
    const py = v => (H - pad.b) - (H - pad.b - pad.t) * (v / yMax);
    const tip = makeTooltip(host);
    series.forEach((s, si) => {
      s.forEach(p => {
        const dot = el("circle", { class: "viz-dot", cx: px(p.x), cy: py(p.y), r: p.r || 5, fill: colors[si % colors.length], "fill-opacity": 0.78 });
        dot.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>(${p.x}, ${p.y})</strong>${p.label ? " · " + p.label : ""}`, xy.x, xy.y); });
        dot.addEventListener("mouseleave", () => tip.hide());
        svg.appendChild(dot);
      });
    });
    host.appendChild(svg);
    if (opts.legend) makeLegend(host, opts.legend.map((l, i) => ({ label: l, color: colors[i % colors.length] })));
  }

  /* ---- Chart: Donut ---- */
  function arcPath(cx, cy, rOuter, rInner, a0, a1) {
    const x0 = cx + rOuter * Math.cos(a0), y0 = cy + rOuter * Math.sin(a0);
    const x1 = cx + rOuter * Math.cos(a1), y1 = cy + rOuter * Math.sin(a1);
    const x2 = cx + rInner * Math.cos(a1), y2 = cy + rInner * Math.sin(a1);
    const x3 = cx + rInner * Math.cos(a0), y3 = cy + rInner * Math.sin(a0);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `M${x0} ${y0} A${rOuter} ${rOuter} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${rInner} ${rInner} 0 ${large} 0 ${x3} ${y3} Z`;
  }
  function renderDonut(host, data, opts = {}) {
    const W = 360, H = 320;
    const cx = W / 2, cy = H / 2, rOuter = 120, rInner = 78;
    const colors = vizPalette();
    const total = data.reduce((s, d) => s + d.value, 0);
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    let a = -Math.PI / 2;
    const tip = makeTooltip(host);
    data.forEach((d, i) => {
      const frac = d.value / total;
      const a1 = a + frac * Math.PI * 2;
      const path = el("path", { class: "viz-arc", d: arcPath(cx, cy, rOuter, rInner, a, a1), fill: d.color || colors[i % colors.length] });
      path.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${d.label}</strong> · ${d.value} (${Math.round(frac * 100)}%)`, xy.x, xy.y); });
      path.addEventListener("mouseleave", () => tip.hide());
      svg.appendChild(path);
      a = a1;
    });
    if (opts.center) {
      const cl = el("text", { class: "viz-center-label", x: cx, y: cy - 6 }); cl.textContent = opts.center.value; svg.appendChild(cl);
      const cs = el("text", { class: "viz-center-sub", x: cx, y: cy + 18 }); cs.textContent = opts.center.label; svg.appendChild(cs);
    }
    host.appendChild(svg);
    makeLegend(host, data.map((d, i) => ({ label: d.label, color: d.color || colors[i % colors.length] })));
  }

  /* ---- Chart: Nested Donut (multi-ring) ---- */
  function renderNestedDonut(host, rings, opts = {}) {
    const W = 360, H = 320, cx = W / 2, cy = H / 2;
    const colors = vizPalette();
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    const tip = makeTooltip(host);
    const ringW = 22, gap = 4, rMax = 140;
    rings.forEach((ring, ri) => {
      const rOuter = rMax - ri * (ringW + gap);
      const rInner = rOuter - ringW;
      const total = ring.reduce((s, d) => s + d.value, 0);
      let a = -Math.PI / 2;
      ring.forEach((d, i) => {
        const a1 = a + (d.value / total) * Math.PI * 2;
        const p = el("path", { class: "viz-arc", d: arcPath(cx, cy, rOuter, rInner, a, a1), fill: d.color || colors[(i + ri) % colors.length] });
        p.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${d.label}</strong> · ${d.value}`, xy.x, xy.y); });
        p.addEventListener("mouseleave", () => tip.hide());
        svg.appendChild(p);
        a = a1;
      });
    });
    host.appendChild(svg);
    if (opts.legend) makeLegend(host, opts.legend.map((l, i) => ({ label: l, color: colors[i % colors.length] })));
  }

  /* ---- Chart: Treemap (squarified-ish: simple slice & dice) ---- */
  function renderTreemap(host, data) {
    const W = 720, H = 360;
    const colors = vizPalette();
    const total = data.reduce((s, d) => s + d.value, 0);
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    // Sort desc, alternating slice direction
    const items = data.slice().sort((a, b) => b.value - a.value);
    const tip = makeTooltip(host);
    let x = 0, y = 0, w = W, h = H;
    let horizontal = w > h;
    let remaining = items.slice();
    let remainingTotal = total;
    while (remaining.length) {
      const item = remaining.shift();
      const frac = item.value / remainingTotal;
      let cw, ch, cx, cy;
      if (horizontal) { cw = w * frac; ch = h; cx = x; cy = y; x += cw; w -= cw; }
      else { cw = w; ch = h * frac; cx = x; cy = y; y += ch; h -= ch; }
      const idx = items.indexOf(item);
      const r = el("rect", { class: "viz-cell", x: cx + 1, y: cy + 1, width: Math.max(0, cw - 2), height: Math.max(0, ch - 2), rx: 4, fill: colors[idx % colors.length] });
      r.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${item.label}</strong> · ${item.value}`, xy.x, xy.y); });
      r.addEventListener("mouseleave", () => tip.hide());
      svg.appendChild(r);
      if (cw > 60 && ch > 28) {
        const t = el("text", { class: "viz-cell-label", x: cx + 8, y: cy + 18 }); t.textContent = item.label; svg.appendChild(t);
        const v = el("text", { class: "viz-cell-value", x: cx + 8, y: cy + 32 }); v.textContent = item.value; svg.appendChild(v);
      }
      remainingTotal -= item.value;
      horizontal = w > h;
    }
    host.appendChild(svg);
  }

  /* ---- Chart: Timeline (gantt-style row bars) ---- */
  function renderTimeline(host, data) {
    // data: [{ label, start, end, group? }] start/end as numeric (e.g., day index)
    const colors = vizPalette();
    const rowH = 30, padTop = 16, padBottom = 28, padLeft = 110, padRight = 16;
    const W = 720, H = padTop + padBottom + data.length * rowH;
    const xMin = Math.min(...data.map(d => d.start));
    const xMax = Math.max(...data.map(d => d.end));
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    const px = v => padLeft + (W - padLeft - padRight) * ((v - xMin) / (xMax - xMin));
    // grid x ticks
    const grid = el("g", { class: "viz-grid" });
    const axis = el("g", { class: "viz-axis" });
    for (let i = 0; i <= 5; i++) {
      const v = xMin + (xMax - xMin) * (i / 5);
      const x = px(v);
      grid.appendChild(el("line", { x1: x, x2: x, y1: padTop, y2: H - padBottom }));
      const t = el("text", { x, y: H - padBottom + 14, "text-anchor": "middle" }); t.textContent = Math.round(v); axis.appendChild(t);
    }
    svg.appendChild(grid); svg.appendChild(axis);
    const tip = makeTooltip(host);
    data.forEach((d, i) => {
      const y = padTop + i * rowH;
      const t = el("text", { x: padLeft - 10, y: y + rowH / 2 + 4, "text-anchor": "end", class: "viz-axis" });
      t.setAttribute("style", "font-size:11px; fill:hsl(var(--text-body));");
      t.textContent = d.label;
      svg.appendChild(t);
      const x = px(d.start), w = Math.max(2, px(d.end) - px(d.start));
      const r = el("rect", { class: "viz-bar", x, y: y + 6, width: w, height: rowH - 12, rx: 4, fill: colors[(d.group ?? i) % colors.length] });
      r.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${d.label}</strong> · ${d.start}–${d.end}`, xy.x, xy.y); });
      r.addEventListener("mouseleave", () => tip.hide());
      svg.appendChild(r);
    });
    host.appendChild(svg);
  }

  /* ---- Chart: Sankey (simple two-column flow) ---- */
  function renderSankey(host, data) {
    // data: { nodes: [{id,label,column}], links: [{source, target, value}] }
    const W = 720, H = 340, pad = 16;
    const colors = vizPalette();
    const cols = {};
    data.nodes.forEach(n => { (cols[n.column] = cols[n.column] || []).push(n); });
    const colKeys = Object.keys(cols).sort((a, b) => +a - +b);
    const colW = 16;
    const colX = colKeys.map((k, i) => pad + (W - pad * 2 - colW) * (i / Math.max(1, colKeys.length - 1)));
    // compute node totals + positions
    const nodeMap = {};
    colKeys.forEach((k, ci) => {
      const ns = cols[k];
      ns.forEach(n => {
        n.outgoing = data.links.filter(l => l.source === n.id).reduce((s, l) => s + l.value, 0);
        n.incoming = data.links.filter(l => l.target === n.id).reduce((s, l) => s + l.value, 0);
        n.total = Math.max(n.outgoing, n.incoming);
      });
      const total = ns.reduce((s, n) => s + n.total, 0);
      const gap = 12;
      const usable = H - pad * 2 - gap * (ns.length - 1);
      let y = pad;
      ns.forEach((n, ni) => {
        n.h = usable * (n.total / total);
        n.x = colX[ci];
        n.y = y;
        y += n.h + gap;
        nodeMap[n.id] = n;
      });
    });
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    // links first (under nodes)
    const tip = makeTooltip(host);
    // track cursor per node side
    const srcCursor = {}, tgtCursor = {};
    data.links.forEach((l, li) => {
      const s = nodeMap[l.source], t = nodeMap[l.target];
      const sH = s.h * (l.value / s.outgoing);
      const tH = t.h * (l.value / t.incoming);
      const sy = (srcCursor[s.id] = (srcCursor[s.id] || s.y)) + sH / 2;
      srcCursor[s.id] += sH;
      const ty = (tgtCursor[t.id] = (tgtCursor[t.id] || t.y)) + tH / 2;
      tgtCursor[t.id] += tH;
      const x0 = s.x + colW, x1 = t.x;
      const mid = (x0 + x1) / 2;
      const path = el("path", {
        d: `M${x0} ${sy} C${mid} ${sy}, ${mid} ${ty}, ${x1} ${ty}`,
        stroke: colors[li % colors.length],
        "stroke-width": Math.max(1, Math.min(sH, tH)),
        "stroke-opacity": 0.35,
        fill: "none",
        class: "viz-arc"
      });
      path.addEventListener("mouseenter", e => { const xy = ptToContainer(host, e); tip.show(`<strong>${s.label} → ${t.label}</strong> · ${l.value}`, xy.x, xy.y); });
      path.addEventListener("mouseleave", () => tip.hide());
      svg.appendChild(path);
    });
    // nodes
    data.nodes.forEach((n, i) => {
      const r = el("rect", { x: n.x, y: n.y, width: colW, height: n.h, rx: 2, fill: colors[i % colors.length] });
      svg.appendChild(r);
      const t = el("text", { x: n.x + (n.column == colKeys[colKeys.length - 1] ? -8 : colW + 8), y: n.y + n.h / 2 + 4, "text-anchor": (n.column == colKeys[colKeys.length - 1] ? "end" : "start") });
      t.setAttribute("style", "font-family:Inter,sans-serif;font-size:12px;fill:hsl(var(--text-body));");
      t.textContent = n.label;
      svg.appendChild(t);
    });
    host.appendChild(svg);
  }

  /* ---- Chart: Annotations (line chart + threshold marker) ---- */
  function renderAnnotations(host, data) {
    // data: { series: [{x,y}], threshold: number, label: string }
    const W = 720, H = 280, pad = { l: 40, r: 16, t: 12, b: 28 };
    const color = vizPalette()[0];
    const yMax = Math.max(data.threshold, ...data.series.map(d => d.y)) * 1.15;
    const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" });
    drawAxes(svg, { x0: pad.l, x1: W - pad.r, y0: pad.t, y1: H - pad.b, yTicks: 4, yMax, xLabels: data.series.map(d => d.x) });
    const px = i => pad.l + (W - pad.l - pad.r) * (i / Math.max(1, data.series.length - 1));
    const py = v => (H - pad.b) - (H - pad.b - pad.t) * (v / yMax);
    let d = "";
    data.series.forEach((p, i) => { d += (i ? " L" : "M") + px(i) + " " + py(p.y); });
    svg.appendChild(el("path", { class: "viz-line", d, stroke: color }));
    const ty = py(data.threshold);
    svg.appendChild(el("line", { class: "viz-annotation-line", x1: pad.l, x2: W - pad.r, y1: ty, y2: ty }));
    const tl = el("text", { class: "viz-annotation-label", x: W - pad.r, y: ty - 6, "text-anchor": "end" });
    tl.textContent = `${data.label}: ${data.threshold}`;
    svg.appendChild(tl);
    host.appendChild(svg);
  }

  function initCharts() {
    $$(".viz").forEach(host => {
      if (host.dataset.vizInit) return;
      host.dataset.vizInit = "1";
      const type = host.getAttribute("data-viz-type");
      const data = parseData(host);
      if (!data) return;
      const opts = {};
      const legendAttr = host.getAttribute("data-viz-legend");
      if (legendAttr) { try { opts.legend = JSON.parse(legendAttr); } catch (e) {} }
      const centerAttr = host.getAttribute("data-viz-center");
      if (centerAttr) { try { opts.center = JSON.parse(centerAttr); } catch (e) {} }
      try {
        switch (type) {
          case "line": renderLine(host, data, opts); break;
          case "area": renderArea(host, data); break;
          case "grouped-bar": renderGroupedBar(host, data, opts); break;
          case "stacked-bar": renderStackedBar(host, data, opts); break;
          case "scatter": renderScatter(host, data, opts); break;
          case "donut": renderDonut(host, data, opts); break;
          case "nested-donut": renderNestedDonut(host, data, opts); break;
          case "treemap": renderTreemap(host, data); break;
          case "timeline": renderTimeline(host, data); break;
          case "sankey": renderSankey(host, data); break;
          case "annotations": renderAnnotations(host, data); break;
          default: console.warn("Unknown viz type:", type);
        }
      } catch (err) { console.error("Chart render failed:", type, err); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYear(); initConstellation(); initAboutCarousel(); initImageCarousels();
    initVideoPlayers(); initTabs(); initAccordion();
    initModals(); initDropdowns(); initToasts(); initPagination();
    initSortableList(); initInlineEdit();
    initReveal();
    initCharts();
  });
})();
