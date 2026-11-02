/* ==========================================================================
   DURASAB — interactions & motion
   Requires: gsap.min.js, ScrollTrigger.min.js, data.js
   ========================================================================== */
(function () {
  "use strict";

  var D = window.DURASAB || {};
  var hasGsap = typeof window.gsap !== "undefined";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------- */
  /* Stand drawing helpers                                              */
  /* ---------------------------------------------------------------- */
  function layer(svg, name) { return svg ? svg.querySelector('[data-layer="' + name + '"]') : null; }
  function lines(el) { return el ? $$(".ln:not(.hoist)", el) : []; }
  function fills(el) { return el ? $$(".fl", el) : []; }

  /* ---------------------------------------------------------------- */
  /* Preloader + hero build sequence                                    */
  /* ---------------------------------------------------------------- */
  var heroSvg = $(".hero .stand");
  var status = $(".js-status");
  var loader = $(".loader");

  function setStatus(t) { if (status) status.textContent = t; }

  function heroBuild() {
    if (!heroSvg || !hasGsap || reduce) { if (heroSvg) litHero(); setStatus("Show ready"); return; }
    var order = ["s-platform", "s-walls", "s-furniture", "s-counter", "s-tower", "s-plant"];
    var tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.from(".hero h1 .line > span", { yPercent: 110, duration: 1, stagger: .12, ease: "power4.out" }, 0)
      .from(".hero__sub, .hero__actions, .hero__strip", { y: 20, opacity: 0, duration: .8, stagger: .1, ease: "power3.out" }, .45)
      .from(layer(heroSvg, "s-grid"), { opacity: 0, duration: .8 }, 0)
      .from(layer(heroSvg, "s-aisle").children, { opacity: 0, duration: .8 }, .2)
      .add(function () { setStatus("Drawing to scale"); }, .2);

    order.forEach(function (name, i) {
      tl.to(lines(layer(heroSvg, name)), { strokeDashoffset: 0, duration: .7, stagger: .04 }, .3 + i * .22);
    });
    tl.to(lines(layer(heroSvg, "s-dims")), { strokeDashoffset: 0, duration: .6, stagger: .03 }, 1.2)
      .from($$(".dimtxt", heroSvg), { opacity: 0, duration: .4, stagger: .1 }, 1.5)
      .add(function () { setStatus("Fabricating panels"); }, 1.6);

    order.forEach(function (name, i) {
      tl.to(fills(layer(heroSvg, name)), { opacity: 1, duration: .6, stagger: .05, ease: "power1.out" }, 1.8 + i * .12);
    });
    tl.add(function () { setStatus("Rigging truss"); }, 2.5)
      .to(lines(layer(heroSvg, "s-truss")), { strokeDashoffset: 0, duration: .9, stagger: .05 }, 2.5)
      .from($$(".hoist", heroSvg), { opacity: 0, duration: .5, stagger: .05 }, 2.7)
      .from($$(".head", heroSvg), { scale: 0, transformOrigin: "50% 50%", duration: .4, stagger: .08, ease: "back.out(3)" }, 3.1)
      .to(lines(layer(heroSvg, "s-graphics")), { strokeDashoffset: 0, duration: .5 }, 3.0)
      .to(fills(layer(heroSvg, "s-graphics")), { opacity: 1, duration: .6 }, 3.3)
      .add(function () { setStatus("Lights on"); litHero(); }, 3.6)
      .to($$(".dimtxt, [data-layer='s-dims'] .ln", heroSvg), { opacity: .35, duration: .8 }, 4.4)
      .add(function () { setStatus("Show ready"); }, 4.6);
  }

  function prepHero() {
    if (!heroSvg || !hasGsap || reduce) return;
    gsap.set(lines(heroSvg), { strokeDashoffset: 1 });
    gsap.set(fills(heroSvg).filter(function (f) { return !f.classList.contains("carpet"); }), { opacity: 0 });
  }

  function litHero() {
    if (!heroSvg) return;
    var visual = heroSvg.closest(".hero__visual");
    if (visual) visual.classList.add("is-lit");
    var beams = $$(".beam", heroSvg), spots = $$(".spot", heroSvg);
    if (!hasGsap || reduce) { beams.forEach(function (b) { b.style.opacity = .55; }); spots.forEach(function (s) { s.style.opacity = .8; }); return; }
    gsap.to(beams, { opacity: .55, duration: .5, stagger: .12 });
    gsap.to(spots, { opacity: .85, duration: .5, stagger: .12 });
    beams.forEach(function (b, i) {
      var o = b.getAttribute("data-ox") + " " + b.getAttribute("data-oy");
      gsap.fromTo(b, { rotation: i % 2 ? 5 : -5, svgOrigin: o }, { rotation: i % 2 ? -6 : 6, svgOrigin: o, duration: 3 + i * .4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
    spots.forEach(function (s, i) {
      gsap.to(s, { x: i % 2 ? -26 : 26, y: i % 2 ? 6 : -6, duration: 3 + i * .4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
  }

  function runLoader(done) {
    if (!loader) { done(); return; }
    if (!hasGsap || reduce || sessionStorageSeen()) { loader.classList.add("is-done"); done(); return; }
    var count = $(".loader__count b"), o = { v: 0 };
    var tl = gsap.timeline({ onComplete: function () { loader.classList.add("is-done"); done(); } });
    tl.to($$(".loader path"), { strokeDashoffset: 0, duration: .9, stagger: .15, ease: "power2.inOut" }, 0)
      .to(o, { v: 100, duration: 1.2, ease: "power1.inOut", onUpdate: function () { count.textContent = Math.round(o.v); } }, 0)
      .to(loader, { yPercent: -100, duration: .7, ease: "power4.inOut" }, 1.3);
  }
  function sessionStorageSeen() {
    try { var s = sessionStorage.getItem("durasab-loaded"); sessionStorage.setItem("durasab-loaded", "1"); return !!s; } catch (e) { return false; }
  }

  prepHero();
  runLoader(heroBuild);

  /* ---------------------------------------------------------------- */
  /* Tape-measure scroll progress + navigation                          */
  /* ---------------------------------------------------------------- */
  var tape = $(".tape__fill"), nav = $(".nav"), lastY = 0;
  var darkSections = $$("section.aisle, section.stage, section.reach, footer.footer");

  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (tape) tape.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    if (!nav) return;
    nav.classList.toggle("is-solid", y > 40);
    if (!nav.classList.contains("is-open")) nav.classList.toggle("is-hidden", y > lastY && y > 400);
    var onDark = darkSections.some(function (s) { var r = s.getBoundingClientRect(); return r.top <= 36 && r.bottom > 36; });
    nav.classList.toggle("on-dark", onDark);
    lastY = y;
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".nav__links a, .nav__cta").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Reveal on scroll                                                   */
  /* ---------------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("is-in"); }); }

  /* ---------------------------------------------------------------- */
  /* Services floor plan                                                */
  /* ---------------------------------------------------------------- */
  var booths = $$(".booth");
  booths.forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.getAttribute("data-svc"), s = D.services && D.services[key];
      if (!s || b.getAttribute("aria-pressed") === "true") return;
      booths.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var img = $(".js-svc-img"), title = $(".js-svc-title"), text = $(".js-svc-text"), tags = $(".js-svc-tags");
      function swap() {
        img.src = s.img; img.alt = s.alt; title.textContent = s.title; text.textContent = s.text;
        tags.innerHTML = s.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("");
      }
      if (!hasGsap || reduce) { swap(); return; }
      gsap.timeline()
        .to([img, title, text, tags], { opacity: 0, y: 8, duration: .2, stagger: .03 })
        .add(swap)
        .fromTo(img, { clipPath: "inset(0 100% 0 0)", opacity: 1, y: 0 }, { clipPath: "inset(0 0% 0 0)", duration: .6, ease: "power3.out" })
        .to([title, text, tags], { opacity: 1, y: 0, duration: .35, stagger: .05 }, "<.1");
    });
  });

  /* ---------------------------------------------------------------- */
  /* The aisle: horizontal walk (desktop), native swipe (mobile)        */
  /* ---------------------------------------------------------------- */
  if (hasGsap && window.ScrollTrigger && !reduce) {
    var mm = gsap.matchMedia();
    mm.add("(min-width: 821px)", function () {
      var track = $(".aisle__track"), view = $(".aisle__viewport");
      if (!track) return;
      var dist = function () { return Math.max(0, track.scrollWidth - view.clientWidth); };
      var walk = gsap.to(track, {
        x: function () { return -dist(); }, ease: "none",
        scrollTrigger: { trigger: "section.aisle", start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: .6, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      $$(".booth-card").forEach(function (card) {
        var img = $(".booth-card__photo img", card);
        gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: card, containerAnimation: walk, start: "left right", end: "right left", scrub: true } });
        gsap.from($(".booth-card__fascia", card), { yPercent: -120, opacity: 0, duration: .8, ease: "back.out(1.6)", scrollTrigger: { trigger: card, containerAnimation: walk, start: "left 85%" } });
      });
    });

    /* Stage: curtain opens, beams sweep */
    gsap.timeline({ scrollTrigger: { trigger: ".stage", start: "top 75%", end: "top 15%", scrub: .8 } })
      .to(".stage__curtain span:first-child", { xPercent: -100, ease: "power2.in" }, 0)
      .to(".stage__curtain span:last-child", { xPercent: 100, ease: "power2.in" }, 0);
    $$(".stage__beam").forEach(function (b, i) {
      gsap.fromTo(b, { rotation: i % 2 ? 14 : -14 }, { rotation: i % 2 ? -14 : 14, duration: 4 + i, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
    gsap.from(".stage__gallery figure", { y: 60, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".stage__gallery", start: "top 80%" } });
  } else {
    $$(".stage__curtain").forEach(function (c) { c.style.display = "none"; });
  }

  var stage = $(".stage");
  if (stage && !reduce) {
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", (e.clientX - r.left) + "px");
      stage.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---------------------------------------------------------------- */
  /* Process: the stand builds as the steps scroll past                 */
  /* ---------------------------------------------------------------- */
  var procVisual = $(".process__visual"), procSvg = procVisual && $(".stand", procVisual);
  /* off | line | full per layer, per step */
  var STATES = [
    { "s-grid": "full", "s-aisle": "full" },
    { "s-grid": "full", "s-aisle": "full", "s-platform": "line", "s-walls": "line", "s-counter": "line", "s-tower": "line", "s-furniture": "line", "s-plant": "line", "s-dims": "line" },
    { "s-grid": "full", "s-aisle": "full", "s-platform": "full", "s-walls": "full", "s-counter": "full", "s-tower": "full", "s-furniture": "full", "s-plant": "full", "s-graphics": "line" },
    { "s-grid": "full", "s-aisle": "full", "s-platform": "full", "s-walls": "full", "s-counter": "full", "s-tower": "full", "s-furniture": "full", "s-plant": "full", "s-graphics": "full", "s-truss": "line", "s-heads": "full" },
    { "s-grid": "full", "s-aisle": "full", "s-platform": "full", "s-walls": "full", "s-counter": "full", "s-tower": "full", "s-furniture": "full", "s-plant": "full", "s-graphics": "full", "s-truss": "line", "s-heads": "full", "s-beams": "full" },
    { "s-grid": "full", "s-aisle": "full", "s-platform": "line", "s-walls": "line", "s-tower": "line" }
  ];
  var LAYERS = ["s-grid", "s-aisle", "s-platform", "s-walls", "s-graphics", "s-plant", "s-furniture", "s-counter", "s-tower", "s-beams", "s-truss", "s-heads", "s-dims"];

  function applyStep(n) {
    if (!procSvg) return;
    var st = STATES[n] || STATES[0];
    procVisual.setAttribute("data-step", n);
    var badge = $(".js-badge"); if (badge) badge.textContent = "Step " + (n + 1) + " of " + STATES.length;
    LAYERS.forEach(function (name) {
      var el = layer(procSvg, name); if (!el) return;
      var s = st[name] || "off";
      el.style.opacity = s === "off" ? 0 : 1;
      $$(".ln", el).forEach(function (l) { if (!l.classList.contains("hoist")) l.style.strokeDashoffset = s === "off" ? 1 : 0; });
      $$(".fl", el).forEach(function (f) { f.style.opacity = s === "full" || f.classList.contains("carpet") ? 1 : 0; });
      $$(".beam", el).forEach(function (b) { b.style.opacity = s === "full" ? .55 : 0; });
      $$(".spot", el).forEach(function (b) { b.style.opacity = s === "full" ? .85 : 0; });
    });
    procVisual.classList.toggle("is-lit", n === 4);
    $$(".step").forEach(function (li) { li.classList.toggle("is-active", +li.getAttribute("data-step") === n); });
  }
  if (procSvg) {
    applyStep(0);
    if ("IntersectionObserver" in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) applyStep(+e.target.getAttribute("data-step")); });
      }, { rootMargin: "-45% 0px -45% 0px" });
      $$(".step").forEach(function (s) { sio.observe(s); });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Spec plate counters                                                */
  /* ---------------------------------------------------------------- */
  var counters = $$(".js-count");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, to = +el.getAttribute("data-to");
        cio.unobserve(el);
        if (!hasGsap || reduce) { el.textContent = to; return; }
        var o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: "power3.out", onUpdate: function () { el.textContent = Math.round(o.v); } });
      });
    }, { threshold: .6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else { counters.forEach(function (c) { c.textContent = c.getAttribute("data-to"); }); }

  /* ---------------------------------------------------------------- */
  /* Departures board                                                   */
  /* ---------------------------------------------------------------- */
  var board = $(".js-board");
  if (board && D.destinations) {
    var ROWS = 7, W1 = 13, W2 = 12, offset = 0, CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    var pad = function (s, n) { s = s.toUpperCase().slice(0, n); while (s.length < n) s += " "; return s; };
    var rows = [];
    for (var r = 0; r < ROWS; r++) {
      var row = document.createElement("div"); row.className = "board__row";
      row.innerHTML = '<span class="flap"></span><span class="flap flap--region"></span><span class="board__status ok">Booking</span>';
      board.appendChild(row);
      var a = row.children[0], b = row.children[1];
      for (var i = 0; i < W1; i++) a.appendChild(document.createElement("b"));
      for (var j = 0; j < W2; j++) b.appendChild(document.createElement("b"));
      rows.push(row);
    }
    var mqSmall = window.matchMedia("(max-width: 820px)");
    function flapTo(cells, text, delay) {
      cells.forEach(function (cell, i) {
        var target = (text[i] || " ") === " " ? "\u00a0" : text[i];
        var token = (cell._flap || 0) + 1; cell._flap = token; /* newer flips cancel older ones */
        if (cell.textContent === target) return;
        if (reduce) { cell.textContent = target; return; }
        var ticks = 4 + Math.floor(Math.random() * 6);
        setTimeout(function step() {
          if (cell._flap !== token) return;
          if (ticks-- <= 0) { cell.textContent = target; return; }
          cell.textContent = CH[Math.floor(Math.random() * 26)];
          setTimeout(step, 55);
        }, delay + i * 22);
      });
    }
    function fillBoard() {
      var list = D.destinations, w1 = mqSmall.matches ? 11 : W1, w2 = mqSmall.matches ? 8 : W2;
      rows.forEach(function (row, r) {
        var d = list[(offset + r) % list.length];
        var c1 = $$("b", row.children[0]), c2 = $$("b", row.children[1]);
        c1.forEach(function (c, i) { c.style.display = i < w1 ? "" : "none"; });
        c2.forEach(function (c, i) { c.style.display = i < w2 ? "" : "none"; });
        flapTo(c1.slice(0, w1), pad(d[0], w1), r * 90);
        flapTo(c2.slice(0, w2), pad(d[1], w2), r * 90 + 120);
        var st = row.children[2];
        st.textContent = r === 0 ? "Building" : "Booking";
        st.classList.toggle("ok", r !== 0);
      });
      offset = (offset + ROWS) % D.destinations.length;
    }
    var boardTimer = null;
    var bio = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { if (boardTimer) return; fillBoard(); if (!reduce) boardTimer = setInterval(fillBoard, 5200); }
      else if (boardTimer) { clearInterval(boardTimer); boardTimer = null; }
    });
    bio.observe(board);
  }
  var clock = $(".js-clock");
  if (clock) {
    var tick = function () {
      try { clock.textContent = "DXB " + new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" }).format(new Date()); }
      catch (e) { clock.textContent = ""; }
    };
    tick(); setInterval(tick, 15000);
  }

  /* ---------------------------------------------------------------- */
  /* Lightbox (stage gallery, aisle photos, projects page)              */
  /* ---------------------------------------------------------------- */
  var lb = $(".lightbox"), lbImg = lb && $("img", lb), lbCap = lb && $("p", lb), lbSet = [], lbIdx = 0, lastFocus = null;
  function lbShow(i) {
    lbIdx = (i + lbSet.length) % lbSet.length;
    var f = lbSet[lbIdx], im = $("img", f), cap = $("figcaption", f);
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, " ").trim() : im.alt;
    if (hasGsap && !reduce) gsap.fromTo(lbImg, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .35 });
  }
  function lbOpen(set, i) { lbSet = set; lastFocus = document.activeElement; lb.classList.add("open"); lbShow(i); $(".lb-close", lb).focus(); document.body.style.overflow = "hidden"; }
  function lbClose() { lb.classList.remove("open"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  window.durasabLightbox = function (selector) {
    $$(selector).forEach(function (f) {
      f.setAttribute("tabindex", "0"); f.setAttribute("role", "button");
      var open = function () { var set = $$(selector).filter(function (x) { return x.offsetParent !== null; }); lbOpen(set, set.indexOf(f)); };
      f.addEventListener("click", open);
      f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  };
  if (lb) {
    $(".lb-close", lb).addEventListener("click", lbClose);
    $(".lb-prev", lb).addEventListener("click", function () { lbShow(lbIdx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { lbShow(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    });
    window.durasabLightbox(".js-gallery figure");
    window.durasabLightbox(".booth-card__frame");
  }

  /* ---------------------------------------------------------------- */
  /* Brief form → pre-filled email                                      */
  /* ---------------------------------------------------------------- */
  var form = $(".js-form");
  if (form) {
    var TO = "hello@durasab.com"; /* TODO: replace with Durasab's real inbox */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$(".field", form).forEach(function (f) { f.classList.remove("invalid"); var er = $(".err", f); if (er) er.textContent = ""; });
      var req = [["f-name", "Enter your name so we know who to reply to."], ["f-email", "Enter a work email, like name@company.com."]];
      req.forEach(function (r) {
        var input = $("#" + r[0]), bad = !input.value.trim() || (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        if (bad) { ok = false; var f = input.closest(".field"); f.classList.add("invalid"); $(".err", f).textContent = r[1]; }
      });
      if (!ok) { $(".invalid input", form).focus(); return; }
      var fd = new FormData(form), needs = fd.getAll("need").join(", ") || "Not specified";
      var body = [
        "Name: " + fd.get("name"), "Company: " + (fd.get("company") || "-"), "Email: " + fd.get("email"), "Phone: " + (fd.get("phone") || "-"),
        "Needs: " + needs, "Event and venue: " + (fd.get("event") || "-"), "Space size: " + (fd.get("size") || "-"), "", fd.get("message") || ""
      ].join("\n");
      var subject = "New brief: " + needs + (fd.get("event") ? " at " + fd.get("event") : "");
      window.location.href = "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      $(".form__done", form).classList.add("show");
    });
  }

  /* footer year */
  $$(".js-year").forEach(function (y) { y.textContent = new Date().getFullYear(); });

  if (hasGsap && window.ScrollTrigger) addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
