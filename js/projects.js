/* Projects page: renders the gallery from data.js and handles category filters */
(function () {
  "use strict";
  var D = window.DURASAB || {}, grid = document.querySelector(".js-works"), bar = document.querySelector(".js-filters");
  if (!grid || !D.projects) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var CATS = [["all", "All work"], ["stands", "Exhibition stands"], ["kiosks", "Kiosks & pavilions"], ["stages", "Stages & facades"], ["malls", "Mall & auto activations"], ["roadshows", "Roadshows"]];

  grid.innerHTML = D.projects.map(function (p) {
    return '<figure class="work" data-cat="' + p.cat + '">' +
      '<img src="images/projects/' + p.img + '.jpg" alt="' + p.title + ', ' + p.type.toLowerCase() + '" loading="lazy">' +
      '<figcaption><strong>' + p.title + '</strong><span>' + p.type + '</span></figcaption></figure>';
  }).join("");

  bar.innerHTML = CATS.map(function (c, i) {
    var n = c[0] === "all" ? D.projects.length : D.projects.filter(function (p) { return p.cat === c[0]; }).length;
    return '<button type="button" data-filter="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '<span>' + n + '</span></button>';
  }).join("");

  var items = Array.prototype.slice.call(grid.children);
  if (hasGsap && !reduce) gsap.from(items.slice(0, 9), { y: 40, opacity: 0, duration: .8, stagger: .06, ease: "power3.out", delay: .2 });

  bar.addEventListener("click", function (e) {
    var btn = e.target.closest("button"); if (!btn) return;
    var f = btn.getAttribute("data-filter");
    Array.prototype.forEach.call(bar.children, function (b) { b.setAttribute("aria-pressed", b === btn); });
    var show = items.filter(function (it) { return f === "all" || it.getAttribute("data-cat") === f; });
    var apply = function () {
      items.forEach(function (it) { it.classList.toggle("is-hidden", show.indexOf(it) < 0); });
      if (hasGsap && !reduce) gsap.fromTo(show, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .035, ease: "power3.out" });
    };
    if (hasGsap && !reduce) gsap.to(items, { opacity: 0, duration: .18, onComplete: apply }); else apply();
  });

  if (window.durasabLightbox) window.durasabLightbox(".js-works .work");
})();
