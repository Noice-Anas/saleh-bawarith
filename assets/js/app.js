/* ============================================================
   Salih Bawarith — app.js
   Renders data-driven sections, drives the roast-curve timeline,
   language toggle, scroll reveals and ink-stroke animations.
   Dependency-free. Renders BOTH languages inline (data-lang spans)
   so the toggle is pure CSS — no re-render needed.
   ============================================================ */
(function () {
  "use strict";
  const D = window.APP_DATA;
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NOW = 2026.58; // Jul 2026 as decimal year
  const $ = (s, c) => (c || document).querySelector(s);
  const el = (t, cls, html) => { const e = document.createElement(t); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const bi = (en, ar) => `<span data-lang="en">${en}</span><span data-lang="ar">${ar}</span>`;

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const toDec = d => { const [y, m] = d.split("-").map(Number); return y + (m - 1) / 12; };
  const fmt = (d, lang) => { const [y, m] = d.split("-").map(Number); return (lang === "ar" ? MONTHS_AR : MONTHS)[m - 1] + " " + y; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- LANGUAGE ---------- */
  function setLang(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("sb-lang", lang); } catch (e) {}
    const tog = $("#langToggle");
    if (tog) tog.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
  }
  function initLang() {
    let saved;
    try { saved = localStorage.getItem("sb-lang"); } catch (e) {}
    const lang = saved || ((navigator.language || "en").slice(0, 2) === "ar" ? "ar" : "en");
    setLang(lang);
    $("#langToggle").addEventListener("click", () =>
      setLang(document.documentElement.lang === "ar" ? "en" : "ar"));
  }

  /* ---------- STAT BAND ---------- */
  function renderStats() {
    const g = $("#statGrid");
    D.stats.forEach(s => {
      g.appendChild(el("div", "stat reveal",
        `<div class="stat__value">${s.value}</div><div class="stat__label">${bi(s.en, s.ar)}</div>`));
    });
  }

  /* ---------- ACHIEVEMENTS ---------- */
  function renderAchievements() {
    const g = $("#achGrid");
    D.achievements.forEach(a => {
      g.appendChild(el("div", "ach",
        `<div class="ach__metric">${a.metric}${a.unit ? `<small>${a.unit}</small>` : ""}</div>
         <div class="ach__label">${bi(a.en, a.ar)}</div>`));
    });
    g.appendChild(el("p", "ach__note",
      bi("Figures shown without brand attribution.", "أرقامٌ معروضةٌ دون نسبةٍ لعلامةٍ محددة.")));
  }

  /* ---------- TIMELINE ---------- */
  const trackOf = id => D.tracks.find(t => t.id === id);
  function roleEnd(r) { return r.present ? NOW : toDec(r.end) + 1 / 12; }
  function isPoint(r) { return !r.present && r.start === r.end; }

  // Non-linear time axis: squeeze the near-empty early years, expand the dense
  // 2024→2027 cluster so recent role bars are wide enough to carry their labels.
  // Piecewise-linear over [year, pct] stops — still monotonic left→right.
  const AXIS_STOPS = [[2009, 0], [2020, 16], [2024, 38], [2027, 100]];
  function axisPct(dec) {
    const d = clamp(dec, AXIS_STOPS[0][0], AXIS_STOPS[AXIS_STOPS.length - 1][0]);
    for (let i = 1; i < AXIS_STOPS.length; i++) {
      const [y0, p0] = AXIS_STOPS[i - 1], [y1, p1] = AXIS_STOPS[i];
      if (d <= y1 || i === AXIS_STOPS.length - 1) return p0 + (d - y0) / (y1 - y0) * (p1 - p0);
    }
    return 0;
  }

  function renderTimeline() {
    const { startYear, endYear } = D.timeline;
    const pctL = axisPct;

    /* --- filter chips --- */
    const fWrap = $("#tlFilters");
    const chipAll = el("button", "chip", `<span class="dot" style="--c:var(--roast)"></span>${bi("All", "الكل")}`);
    chipAll.setAttribute("aria-pressed", "true");
    chipAll.dataset.track = "all";
    fWrap.appendChild(chipAll);
    D.tracks.forEach(t => {
      const c = el("button", "chip", `<span class="dot" style="--c:var(${t.var})"></span>${bi(t.en, t.ar)}`);
      c.setAttribute("aria-pressed", "false");
      c.dataset.track = t.id;
      fWrap.appendChild(c);
    });

    /* --- lanes --- */
    const lanes = $("#lanes");
    lanes.style.direction = "ltr"; // keep the chart chronological L→R in both languages
    D.tracks.forEach(track => {
      const roles = D.roles.filter(r => r.track === track.id).sort((a, b) => toDec(a.start) - toDec(b.start));
      // greedy sub-row packing so overlapping concurrent roles don't collide
      const rowEnds = [];
      roles.forEach(r => {
        const s = toDec(r.start), e = roleEnd(r);
        let row = rowEnds.findIndex(end => s >= end - 0.02);
        if (row === -1) { row = rowEnds.length; rowEnds.push(e); } else { rowEnds[row] = e; }
        r._row = row;
      });
      const subRows = Math.max(1, rowEnds.length);
      const laneH = subRows * 32 + 14;

      const lane = el("div", "lane");
      lane.style.setProperty("--c", `var(${track.var})`);
      lane.innerHTML = `<div class="lane__name"><span class="swatch"></span>${bi(track.en, track.ar)}</div>`;
      const trackEl = el("div", "lane__track");
      trackEl.style.minHeight = laneH + "px";

      roles.forEach(r => {
        const s = toDec(r.start), e = roleEnd(r);
        const left = pctL(s);
        const width = Math.max(pctL(e) - left, 0);
        const bar = el("button", "bar" + (r.present ? " bar--present" : "") + (isPoint(r) ? " bar--point" : ""));
        bar.style.left = left + "%";
        bar.style.width = width + "%";
        bar.style.top = (r._row * 32 + 8) + "px";
        bar.style.bottom = "auto";
        bar.style.height = "24px";
        bar.style.background = `var(${track.var})`;
        bar.dataset.id = r.id;
        bar.dataset.track = r.track;
        bar.innerHTML = `<span class="bar__dot"></span><span class="bar__label">${r.org}</span>`;
        bar.setAttribute("aria-label", r.org);
        bar.addEventListener("mouseenter", () => showDetail(r));
        bar.addEventListener("focus", () => showDetail(r));
        bar.addEventListener("click", () => showDetail(r));
        trackEl.appendChild(bar);
      });
      lane.appendChild(trackEl);
      lanes.appendChild(lane);
    });

    /* --- year axis ---
       Explicit ticks: sparse in the compressed early years (so labels don't
       collide on the narrow mobile plot), denser through the expanded recent
       cluster where the action is. */
    const yWrap = $("#tlYears");
    yWrap.style.direction = "ltr";
    const yearTicks = [2009, 2015, 2021, 2024, 2025, 2026, 2027]
      .filter(y => y >= startYear && y <= endYear);
    yearTicks.forEach(y => {
      const g = el("div", "tl__grid"); g.style.left = pctL(y) + "%";
      const lab = el("div", "tl__year", String(y)); lab.style.left = pctL(y) + "%";
      yWrap.appendChild(g); yWrap.appendChild(lab);
    });

    /* --- reveal bars (staggered left→right, like the curve drawing) --- */
    const barsAll = () => [...lanes.querySelectorAll(".bar")];
    if (REDUCED) {
      barsAll().forEach(b => b.classList.add("in"));
    } else {
      const io2 = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          barsAll().sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left))
            .forEach((b, i) => { b.style.transitionDelay = (i * 55) + "ms"; b.classList.add("in"); });
          obs.disconnect();
        });
      }, { threshold: 0.15 });
      io2.observe(lanes);
    }

    /* --- roast curve --- */
    renderCurve(pctL);

    /* --- filter behaviour --- */
    fWrap.addEventListener("click", e => {
      const chip = e.target.closest(".chip"); if (!chip) return;
      const t = chip.dataset.track;
      fWrap.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
      document.querySelectorAll(".bar").forEach(b =>
        b.classList.toggle("dim", t !== "all" && b.dataset.track !== t));
      document.querySelectorAll(".crack").forEach(c =>
        c.style.display = (t !== "all" && c.dataset.track !== t) ? "none" : "");
    });
  }

  function showDetail(r) {
    const t = trackOf(r.track);
    const box = $("#tlDetail");
    const dates = `${fmt(r.start, "en")} — ${r.present ? "Present" : fmt(r.end, "en")}`;
    const datesAr = `${fmt(r.start, "ar")} — ${r.present ? "الآن" : fmt(r.end, "ar")}`;
    const extra = r.clients ? `<div class="d-tags">${r.clients.map(c => `<span class="note-pill">${c}</span>`).join("")}</div>`
      : r.highlights ? `<div class="d-tags">${r.highlights.map(c => `<span class="note-pill">${c}</span>`).join("")}</div>` : "";
    box.innerHTML = `
      <div class="d-role">${bi(r.title_en, r.title_ar)} <span class="d-org">· ${r.org}</span></div>
      <div class="d-meta">
        ${bi(dates, datesAr)} · ${bi(r.type_en, r.type_ar)} · ${r.loc} ·
        <span style="color:var(${t.var});font-weight:600">${bi(t.en, t.ar)}</span>
      </div>
      <p class="d-desc">${bi(r.desc_en, r.desc_ar)}</p>
      ${extra}
      <div class="d-tags">${r.tags.map(tag => `<span class="note-pill">${tag}</span>`).join("")}</div>`;
  }

  /* roast curve as a sampled rising profile with role dots */
  let curveState = null;
  function curveY(t, H) {
    const ease = 1 - Math.pow(1 - t, 2.2);
    const wobble = 0.028 * Math.sin(t * Math.PI * 3.1);
    const v = 0.15 + 0.74 * ease + wobble;
    return H - v * H;
  }
  function renderCurve(pctL) {
    const host = $("#roastCurve");
    const W = 1000, H = 210;
    let d = "M 0 " + curveY(0, H).toFixed(1);
    for (let i = 1; i <= 100; i++) { const t = i / 100; d += " L " + (t * W).toFixed(1) + " " + curveY(t, H).toFixed(1); }
    const fillD = d + ` L ${W} ${H} L 0 ${H} Z`;

    const dots = D.roles.map(r => {
      const t = clamp(pctL(toDec(r.start)) / 100, 0, 1); // same non-linear axis as the bars
      const trk = trackOf(r.track);
      return `<circle class="crack" data-track="${r.track}" data-t="${t.toFixed(3)}" cx="${(t * W).toFixed(1)}" cy="${curveY(t, H).toFixed(1)}" r="5" fill="var(${trk.var})"></circle>`;
    }).join("");

    host.innerHTML = `
      <svg viewBox="0 0 ${W} ${H + 10}" preserveAspectRatio="none" role="img" aria-label="Career roast curve">
        <defs>
          <linearGradient id="roastFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#B87333" stop-opacity="0.28"/>
            <stop offset="1" stop-color="#F4ECE0" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="curve-fill" d="${fillD}"/>
        <path class="curve-line" d="${d}"/>
        ${dots}
      </svg>`;

    const line = host.querySelector(".curve-line");
    const len = line.getTotalLength();
    line.style.strokeDasharray = len;
    if (REDUCED) {
      line.style.strokeDashoffset = 0;
      host.querySelectorAll(".crack").forEach(c => c.classList.add("on"));
    } else {
      line.style.strokeDashoffset = len;
      curveState = { host, line, len, cracks: [...host.querySelectorAll(".crack")] };
      updateCurve();
      window.addEventListener("scroll", updateCurve, { passive: true });
      window.addEventListener("resize", updateCurve);
    }
  }
  function updateCurve() {
    if (!curveState) return;
    const rect = curveState.host.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 when curve enters bottom, 1 when it has scrolled up through ~70% viewport
    const p = clamp((vh * 0.85 - rect.top) / (vh * 0.55), 0, 1);
    curveState.line.style.strokeDashoffset = curveState.len * (1 - p);
    curveState.cracks.forEach(c => c.classList.toggle("on", p >= parseFloat(c.dataset.t) * 0.92));
  }

  /* ---------- ORIGINS ---------- */
  function renderOrigins() {
    const g = $("#originGrid");
    D.origins.forEach((o, i) => {
      g.appendChild(el("div", "origin reveal",
        `<div class="origin__no">0${i + 1} / ${bi("ORIGIN", "المنشأ")}</div>
         <div class="origin__name">${bi(o.en, o.ar)}</div>
         <div class="origin__row"><b>${bi("Role", "الدور")}</b><span>${bi(o.altitude_en, o.altitude_ar)}</span></div>
         <div class="origin__row"><b>${bi("Process", "المعالجة")}</b><span>${bi(o.process_en, o.process_ar)}</span></div>
         <p class="origin__notes">${bi(o.notes_en, o.notes_ar)}</p>`));
      g.lastChild.dataset.delay = String(i + 1);
    });
  }

  /* ---------- SKILL CARDS ---------- */
  function renderSkills() {
    const g = $("#skillGrid");
    const icons = ["◈", "✷", "❖", "✦"];
    D.skillGroups.forEach((s, i) => {
      const card = el("div", "skillcard reveal",
        `<h3><span class="ico">${icons[i % icons.length]}</span>${bi(s.en, s.ar)}</h3>
         <div class="notes">${s.skills.map(k => `<span class="note-pill">${k}</span>`).join("")}</div>`);
      card.dataset.delay = String((i % 4) + 1);
      g.appendChild(card);
    });
  }

  /* ---------- GALLERY (real images + filter + lightbox) ---------- */
  const THUMB = f => `assets/gallery/thumb/${f}.jpg`;
  const FULL  = f => `assets/gallery/full/${f}.jpg`;
  let lb = null; // lightbox state: { visible:[items], idx }

  function renderGallery() {
    const G = D.gallery;
    if (!G || !G.items.length) return;
    const g = $("#galleryGrid");

    /* filter chips */
    const fWrap = $("#galFilters");
    if (fWrap) {
      G.filters.forEach((f, i) => {
        const c = el("button", "chip", bi(f.en, f.ar));
        c.setAttribute("aria-pressed", String(i === 0));
        c.dataset.cat = f.id;
        fWrap.appendChild(c);
      });
      fWrap.addEventListener("click", e => {
        const chip = e.target.closest(".chip"); if (!chip) return;
        const cat = chip.dataset.cat;
        fWrap.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
        g.querySelectorAll(".gtile").forEach(t =>
          t.classList.toggle("hide", cat !== "all" && t.dataset.cat !== cat));
      });
    }

    /* tiles */
    G.items.forEach((item, i) => {
      const tile = el("button", "gtile reveal" + (item.feat ? " feat" : ""));
      tile.dataset.cat = item.cat;
      tile.dataset.idx = String(i);
      tile.setAttribute("aria-label", stripTags(item.en));
      tile.innerHTML =
        `<img src="${THUMB(item.file)}" alt="${stripTags(item.en)}" loading="lazy" decoding="async">
         <span class="gtile__cap">${bi(item.en, item.ar)}</span>`;
      tile.addEventListener("click", () => openLightbox(i));
      g.appendChild(tile);
    });

    initLightbox();
  }
  function stripTags(s) { return String(s).replace(/&amp;/g, "&"); }

  /* --- lightbox --- */
  function visibleItems() {
    // walk only the currently-shown (filtered) tiles, in DOM order
    return [...document.querySelectorAll("#galleryGrid .gtile:not(.hide)")]
      .map(t => ({ tile: t, i: +t.dataset.idx, item: D.gallery.items[+t.dataset.idx] }));
  }
  function initLightbox() {
    const box = $("#lightbox"); if (!box) return;
    box.addEventListener("click", e => {
      if (e.target.closest("[data-lb-close]") || e.target === box || e.target.classList.contains("lb__stage"))
        closeLightbox();
      else if (e.target.closest("[data-lb-prev]")) stepLightbox(-1);
      else if (e.target.closest("[data-lb-next]")) stepLightbox(1);
    });
    document.addEventListener("keydown", e => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") stepLightbox(document.documentElement.dir === "rtl" ? -1 : 1);
      else if (e.key === "ArrowLeft")  stepLightbox(document.documentElement.dir === "rtl" ? 1 : -1);
    });
  }
  function openLightbox(idx) {
    const box = $("#lightbox"); if (!box) return;
    const vis = visibleItems();
    const pos = vis.findIndex(v => v.i === idx);
    lb = { vis, pos: pos < 0 ? 0 : pos };
    paintLightbox();
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const c = box.querySelector("[data-lb-close]"); if (c) c.focus();
  }
  function stepLightbox(dir) {
    if (!lb) return;
    lb.pos = (lb.pos + dir + lb.vis.length) % lb.vis.length;
    paintLightbox();
  }
  function paintLightbox() {
    const box = $("#lightbox"); if (!box || !lb) return;
    const { item } = lb.vis[lb.pos];
    const img = box.querySelector(".lb__img");
    img.src = FULL(item.file);
    img.alt = stripTags(item.en);
    box.querySelector(".lb__cap").innerHTML = bi(item.en, item.ar);
    box.querySelector(".lb__count").textContent = `${lb.pos + 1} / ${lb.vis.length}`;
    const multi = lb.vis.length > 1;
    box.querySelectorAll("[data-lb-prev],[data-lb-next]").forEach(b => b.style.display = multi ? "" : "none");
  }
  function closeLightbox() {
    const box = $("#lightbox"); if (!box) return;
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lb = null;
  }

  /* ---------- CREDENTIALS ---------- */
  function renderCreds() {
    const g = $("#credGrid");
    D.credentials.forEach(c => {
      g.appendChild(el("div", "cred reveal" + (c.star ? " star" : ""),
        `<div class="cred__seal">${c.star ? "★" : "✓"}</div>
         <div>
           <div class="cred__name">${bi(c.en, c.ar)}</div>
           <div class="cred__issuer">${bi(c.issuer_en, c.issuer_ar)}</div>
           <div class="cred__date">${c.date}</div>
         </div>`));
    });
    $("#eduBlock").innerHTML =
      `${bi("Education", "التعليم")}: <b>${bi(D.education.school_en, D.education.school_ar)}</b> —
       ${bi(D.education.degree_en, D.education.degree_ar)} · ${D.education.years}`;
  }

  /* ---------- CONTACT (links + form) ---------- */
  function renderContact() {
    const C = D.contact; if (!C) return;

    // fill the direct-contact links from data (single source of truth)
    const set = (sel, attr, val) => { const e = $(sel); if (e && val != null) e.setAttribute(attr, val); };
    const txt = (sel, val) => { const e = $(sel); if (e && val != null) e.textContent = val; };

    set("#cEmail", "href", "mailto:" + C.email);
    txt("#cEmailVal", C.email);
    set("#cJobs", "href", "tel:" + C.phone_jobs.tel);
    txt("#cJobsVal", C.phone_jobs.display);
    set("#cWa", "href", "https://wa.me/" + C.phone_business.whatsapp);
    txt("#cWaVal", C.phone_business.display);
    set("#cBizCall", "href", "tel:" + C.phone_business.tel);
    set("#cIg", "href", C.instagram.url);
    txt("#cIgVal", C.instagram.handle);
    set("#cIgQr", "href", C.instagram.url);
    const qr = $("#cIgQrImg"); if (qr) qr.src = C.instagram.qr;
    set("#cLinkedin", "href", C.linkedin);

    initContactForm(C);
  }

  function initContactForm(C) {
    const form = $("#contactForm"); if (!form) return;
    const status = $("#formStatus");
    const key = (C.web3forms_key || "").trim();
    const isConfigured = key.length > 10;

    // stamp the access key + subject from data
    const keyField = form.querySelector('input[name="access_key"]');
    if (keyField) keyField.value = key;

    const say = (msg_en, msg_ar, kind) => {
      status.className = "form__status " + (kind || "");
      status.innerHTML = bi(msg_en, msg_ar);
    };

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (form.querySelector('input[name="botcheck"]').checked) return; // honeypot tripped

      if (!isConfigured) {
        say(`The form isn't switched on yet — please email <a href="mailto:${C.email}">${C.email}</a> directly.`,
            `النموذج غير مُفعّلٍ بعد — يُرجى المراسلة مباشرةً على <a href="mailto:${C.email}">${C.email}</a>.`,
            "err");
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      say("Sending…", "جارٍ الإرسال…", "");

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        const data = await res.json();
        if (data.success) {
          form.reset();
          say("Thanks — your message is on its way. Salih will reply soon.",
              "شكراً — تم إرسال رسالتك. سيردّ عليك صالح قريباً.", "ok");
        } else {
          throw new Error(data.message || "failed");
        }
      } catch (err) {
        say(`Something went wrong. Please email <a href="mailto:${C.email}">${C.email}</a> instead.`,
            `حدث خطأ ما. يُرجى المراسلة على <a href="mailto:${C.email}">${C.email}</a> بدلاً من ذلك.`, "err");
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---------- SCROLL REVEAL + HEADER ---------- */
  function initReveal() {
    if (REDUCED) { document.querySelectorAll(".reveal").forEach(r => r.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(r => io.observe(r));
  }
  function initHeader() {
    const h = $("#header");
    const onScroll = () => h.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- HERO SIGNATURE DRAW ---------- */
  function initSignature() {
    const p = $("#signPath"); if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    if (REDUCED) { p.style.strokeDashoffset = 0; return; }
    p.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      p.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.7,0,0.3,1) 0.3s";
      p.style.strokeDashoffset = 0;
    });
  }

  /* ---------- TIMELINE SCROLL CUES (mobile) ---------- */
  // Fade the right-edge gradient near the end and retire the swipe hint once used.
  function initTimelineScroll() {
    const sc = $("#tlScroll");
    if (!sc) return;
    const chart = sc.closest(".tl__chart");
    const swipe = $("#tlSwipe");
    let swiped = false;
    const onScroll = () => {
      if (!swiped && sc.scrollLeft > 8) { swiped = true; if (swipe) swipe.classList.add("gone"); }
      if (chart) chart.classList.toggle("at-end", sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 4);
    };
    onScroll();
    sc.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---------- INIT ---------- */
  function init() {
    initLang();
    renderStats();
    renderAchievements();
    renderTimeline();
    initTimelineScroll();
    renderOrigins();
    renderSkills();
    renderGallery();
    renderCreds();
    renderContact();
    initReveal();
    initHeader();
    initSignature();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
