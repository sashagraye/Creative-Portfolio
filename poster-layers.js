/* 포스터 레이어 분리 효과 (standalone)
 * 사용: <script src="poster-layers.js"></script> 이후
 *   PosterLayers.init({ tilt: 1, spread: 1, animate: true });
 * 마크업은 markup.html 참고. data-poster-deck 하나만 잡습니다.
 */
(function (global) {
  function init(opts) {
    var o = opts || {};
    var deck = document.querySelector(o.selector || '[data-poster-deck]');
    if (!deck) return null;
    var wrap = deck.querySelector('[data-poster-layers]');
    var shade = deck.querySelector('[data-poster-shadow]');
    var hint = document.querySelector('[data-poster-hint]');
    var layers = Array.prototype.slice.call(deck.querySelectorAll('[data-pl]')).map(function (el) {
      return {
        el: el,
        z: parseFloat(el.getAttribute('data-depth')) || 0,
        dx: parseFloat(el.getAttribute('data-dx')) || 0,
        dy: parseFloat(el.getAttribute('data-dy')) || 0
      };
    });
    if (!wrap || !layers.length) return null;

    var tilt = Math.max(0.2, Math.min(1.8, Number(o.tilt != null ? o.tilt : 1)));
    var spread = Math.max(0.2, Math.min(2.4, Number(o.spread != null ? o.spread : 1)));
    var animate = o.animate !== false &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate) {
      wrap.style.transform = 'none';
      if (shade) shade.style.opacity = '.45';
      if (hint) hint.style.display = 'none';
      return null;
    }

    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine && hint) {
      var line = hint.querySelector('[data-hint-line]');
      if (line && o.scrollHint) line.textContent = o.scrollHint;
    }
    var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
    var open = 0, want = 0, wx = 0, wy = 0, mx = 0, my = 0;
    var px = -99999, py = -99999;
    var raf = 0, vis = false, t0 = 0, phase = 0, lastQ = -1, hintOff = false;
    deck.style.opacity = '0';

    function paint(now) {
      var op = open;
      var idle = Math.sin(now / 2600) * 0.6;
      var rx = (16 + 26 * op) * tilt + wy * 8 * (0.34 + 0.66 * op) + idle;
      var rz = (-7 - 10 * op) * tilt + wx * 7 * (0.34 + 0.66 * op) - idle * 0.5;
      var ry = wx * 6 * op;
      wrap.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) rotateZ(' + rz.toFixed(2) + 'deg)';
      var q = Math.round(op * 12);
      var reshadow = fine && q !== lastQ;
      for (var i = 0; i < layers.length; i++) {
        var L = layers[i];
        L.el.style.transform = 'translate3d(' + (L.dx * spread * op).toFixed(2) + 'px,' +
          (L.dy * spread * op).toFixed(2) + 'px,' + (L.z * spread * op).toFixed(2) + 'px)';
        if (reshadow && L.z > 0) {
          L.el.style.filter = op < 0.03 ? 'none'
            : 'drop-shadow(0 ' + (L.z * 0.10 * op).toFixed(1) + 'px ' +
              (L.z * 0.16 * op + 3).toFixed(1) + 'px rgba(0,0,0,' + (0.42 * op).toFixed(2) + '))';
        }
      }
      if (reshadow) lastQ = q;
      if (shade) {
        shade.style.opacity = (0.7 - 0.3 * op).toFixed(3);
        shade.style.transform = 'scale(' + (1 + 0.05 * op).toFixed(3) + ')';
      }
      if (hint && !hintOff && phase === 2 && op > 0.45) { hintOff = true; hint.style.opacity = '0'; }
    }

    function tick(now) {
      raf = 0;
      if (!t0) t0 = now;
      var el = now - t0;
      if (phase === 0) {
        // 등장: 62deg 눕힘 → 기본 각도로 세우면서 페이드인 (1.5s)
        var e = 1 - Math.pow(1 - clamp(el / 1500, 0, 1), 4);
        deck.style.opacity = e.toFixed(3);
        wrap.style.transform = 'rotateX(' + (16 * tilt + 62 * (1 - e)).toFixed(2) + 'deg) rotateZ(' +
          (-7 * tilt * e).toFixed(2) + 'deg) scale(' + (0.9 + 0.1 * e).toFixed(3) + ')';
        if (el >= 1500) { phase = 1; t0 = now; }
      } else if (phase === 1) {
        // 자동 시연: 한 번 열렸다 닫힘 (2.4s)
        var p = clamp(el / 2400, 0, 1);
        open = Math.pow(Math.sin(Math.PI * p), 1.3);
        paint(now);
        if (p >= 1) { phase = 2; open = 0; }
      } else {
        // 인터랙션: 커서가 가까울수록 열림 / 터치는 화면 중앙 근접도로 열림
        var r = deck.getBoundingClientRect();
        if (fine) {
          var cx = r.left + r.width / 2, cy = r.top + r.height * 0.46;
          var nx = (px - cx) / (r.width / 2), ny = (py - cy) / (r.height / 2);
          want = clamp(1 - (Math.hypot(nx, ny) - 0.85) / 1, 0, 1);
          mx = clamp(nx, -1.4, 1.4);
          my = clamp(-ny, -1.4, 1.4);
        } else {
          var mid = (r.top + r.height / 2) / (window.innerHeight || 1);
          want = clamp(1 - Math.abs(mid - 0.46) / 0.42, 0, 1);
          mx = 0; my = 0;
        }
        open += (want - open) * 0.11;
        wx += (mx - wx) * 0.09;
        wy += (my - wy) * 0.09;
        paint(now);
      }
      if (vis) raf = requestAnimationFrame(tick);
    }

    function kick() { if (!raf && vis) { t0 = 0; raf = requestAnimationFrame(tick); } }
    if (fine) {
      window.addEventListener('pointermove', function (ev) { px = ev.clientX; py = ev.clientY; }, { passive: true });
      document.addEventListener('mouseleave', function () { px = -99999; py = -99999; });
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { vis = en.isIntersecting; if (vis) kick(); });
    }, { threshold: 0.14 });
    io.observe(deck);
    return { observer: io, deck: deck };
  }

  global.PosterLayers = { init: init };
})(window);
