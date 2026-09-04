/* ============================================================
   BLUEPRINT : FITNESS — motion engine ("the drafting kit")
   Vanilla JS. Every pattern is scroll-driven and has a
   prefers-reduced-motion fallback (handled here + in CSS).
   ============================================================ */
(function () {
  'use strict';

  /* progressive enhancement gate: hidden-until-revealed CSS is scoped
     under body.js, so pages render fully static wherever this script
     is stripped (same convention as the RLF/CTPT builds) */
  document.body.classList.remove('no-js');
  document.body.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = window.matchMedia('(min-width: 920px)').matches;

  /* ---------- text helpers ----------
     Written without backslashes so these files stay safe to embed in a
     TSX template literal. Behaviour matches the regex forms exactly. */
  /* .apply so the minifier cannot fold this back into escape sequences */
  var WS = String.fromCharCode.apply(null, [32, 9, 10, 13, 12, 11]);
  var SPLIT_WS = new RegExp('([' + WS + ']+)');
  function hasWs(str) {
    for (var i = 0; i < str.length; i++) if (WS.indexOf(str.charAt(i)) !== -1) return true;
    return false;
  }
  function isEmail(v) {                 /* was: ^[^ws@]+@[^ws@]+.[^ws@]+$ */
    if (!v || hasWs(v)) return false;
    var at = v.indexOf('@');
    if (at < 1 || v.indexOf('@', at + 1) !== -1) return false;
    var dom = v.slice(at + 1);
    var dot = dom.indexOf('.');
    return dot >= 1 && dot <= dom.length - 2;
  }
  var TEL_RE = new RegExp('^[+0-9][0-9' + WS + '()-]{6,}$');

  /* ---------- generic in-view reveals (kit 5) ----------
     Checked inside the rAF scroll loop rather than an
     IntersectionObserver: observers are throttled and can miss
     sections during fast flick-scrolls; this never does. */
  var pendingReveals = Array.prototype.slice.call(
    document.querySelectorAll('.reveal, .stagger, .sec-head, .draft-u, .plan-frame, .anno-photo')
  );
  function checkReveals(vh) {
    if (!pendingReveals.length) return;
    var remaining = [];
    for (var i = 0; i < pendingReveals.length; i++) {
      var el = pendingReveals[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) el.classList.add('in-view');
      else remaining.push(el);
    }
    pendingReveals = remaining;
  }

  /* ---------- kit 1: drafted underline SVGs ----------
     Injects a hand-drawn-looking stroke under .draft-u words and
     preps it for the draw-on animation (CSS runs it on .in-view). */
  document.querySelectorAll('.draft-u').forEach(function (el) {
    if (el.querySelector('svg')) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 120 12');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // slightly imperfect stroke, like a pen pulled across a title block
    path.setAttribute('d', 'M3 8 C 30 5.5, 62 4.5, 117 6.5');
    svg.appendChild(path);
    el.appendChild(svg);
    try {
      var len = path.getTotalLength();
      path.style.setProperty('--len', len);
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = reduced ? 0 : len;
    } catch (e) { /* detached svg — CSS fallback covers it */ }
  });

  /* ---------- kit 2: word-ignite scroll story ----------
     Splits [data-ignite] into words; words light up one by one,
     driven by how far the block has been scrolled through. */
  var igniteBlocks = [];
  document.querySelectorAll('[data-ignite]').forEach(function (block) {
    block.classList.add('ignite');
    var words = [];
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(SPLIT_WS).forEach(function (tok) {
            if (tok.trim() === '') {
              frag.appendChild(document.createTextNode(tok));
            } else {
              var s = document.createElement('span');
              s.className = 'w';
              if (node.nodeType === 1 && node.closest('.key')) s.classList.add('key');
              s.textContent = tok;
              frag.appendChild(s);
              words.push(s);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) { split(child); }
      });
    })(block);
    if (reduced) { words.forEach(function (w) { w.classList.add('lit'); }); }
    else igniteBlocks.push({ el: block, words: words });
  });

  /* ---------- kit 3: journey primitive ---------- */
  var journeys = [];
  document.querySelectorAll('.journey').forEach(function (j) {
    var fill = j.querySelector('.journey-line .fill');
    var items = Array.prototype.slice.call(j.querySelectorAll('.journey-item'));
    if (reduced) {
      if (fill) fill.style.height = '100%';
      items.forEach(function (it) { it.classList.add('reached'); });
      return;
    }
    journeys.push({ el: j, fill: fill, items: items });
  });

  /* ---------- kit 3b: pinned day counter (kickstart) ---------- */
  var dayCounter = document.querySelector('[data-daycount]');
  var dayCounterWrap = document.querySelector('[data-daycount-track]');
  if (dayCounter && reduced) dayCounter.firstChild.nodeValue = '30';

  /* ---------- kit 4: page companion ---------- */
  var companion = document.querySelector('.companion');
  var companionFill = companion ? companion.querySelector('.fillbar') : null;
  if (companion) {
    companion.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- kit 5b: ghost numeral parallax ---------- */
  var ghosts = reduced ? [] : Array.prototype.slice.call(document.querySelectorAll('.ghost-num'));

  /* ---------- kit 9: edge ruler ---------- */
  var rulerMark = document.querySelector('.ruler .mark');
  var rulerPct = document.querySelector('.ruler .pct');

  /* ---------- kit 3 v2: hatched plan grid ---------- */
  var planGrid = document.querySelector('.plan-grid');
  var planCells = planGrid ? Array.prototype.slice.call(planGrid.children) : [];
  if (planCells.length && reduced) planCells.forEach(function (c) { c.classList.add('done'); });

  /* ---------- single scroll loop ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = window.innerHeight;
      var doc = document.documentElement;
      var max = doc.scrollHeight - vh;
      var sy = window.scrollY || doc.scrollTop;

      checkReveals(vh);

      if (companion) {
        companion.classList.toggle('show', sy > vh * 0.6);
        if (companionFill && max > 0) companionFill.style.height = (Math.min(1, sy / max) * 100) + '%';
      }

      igniteBlocks.forEach(function (b) {
        var r = b.el.getBoundingClientRect();
        // progress: 0 when block top hits 85% of viewport, 1 when bottom hits 45%
        var start = vh * 0.85, end = vh * 0.45;
        var total = (r.height + (start - end));
        var p = (start - r.top) / total;
        p = Math.max(0, Math.min(1, p));
        var lit = Math.round(p * b.words.length);
        b.words.forEach(function (w, i) { w.classList.toggle('lit', i < lit); });
      });

      journeys.forEach(function (j) {
        var r = j.el.getBoundingClientRect();
        var p = (vh * 0.7 - r.top) / r.height;
        p = Math.max(0, Math.min(1, p));
        if (j.fill) j.fill.style.height = (p * 100) + '%';
        var lineTop = r.top;
        j.items.forEach(function (it) {
          var ir = it.getBoundingClientRect();
          var nodeCentre = (ir.top - lineTop) + 18;
          it.classList.toggle('reached', nodeCentre <= p * r.height);
        });
      });

      if (dayCounter && dayCounterWrap && !reduced) {
        var tr = dayCounterWrap.getBoundingClientRect();
        var tp = (vh * 0.6 - tr.top) / tr.height;
        tp = Math.max(0, Math.min(1, tp));
        var day = Math.max(1, Math.min(30, Math.round(tp * 30)));
        dayCounter.firstChild.nodeValue = (day < 10 ? '0' : '') + day;
        for (var ci = 0; ci < planCells.length; ci++) {
          planCells[ci].classList.toggle('done', ci < day);
        }
      }

      if (rulerMark && max > 0) {
        var rp = Math.min(1, sy / max);
        rulerMark.style.top = (rp * (vh - 30)) + 'px';
        if (rulerPct) rulerPct.textContent = String(Math.round(rp * 100)).padStart(2, '0') + '%';
      }

      ghosts.forEach(function (g) {
        var gr = g.getBoundingClientRect();
        var gp = (gr.top + gr.height / 2 - vh / 2) / vh; // -0.5..0.5 around centre
        g.style.transform = 'translateY(' + (gp * -34) + 'px)';
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- kit 5c: cursor tilt (desktop only) ---------- */
  if (!reduced && isDesktop && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.card[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateX(' + (y * -4) + 'deg) rotateY(' + (x * 5) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- burger menu ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-locked', open);
    }
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('button');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
    });
  });

  /* ---------- the sign-up funnel ----------
     The old placeholder sign-up lightbox has been retired. Every kickstart
     page now carries the real enquiry form (the React island) inside its own
     lightbox, and that is the only form we want in the document: HighLevel's
     tracking script binds to EVERY form on the page, so a second, unidentified
     sign-up form would post empty submissions into the CRM. Any other button
     that opens the funnel does it by clicking the island's trigger, so there
     is one way in and one way out. (site/ and import-pack/ still ship the
     original lightbox - they are the untouched static build.) */

  /* ---------- member stories: video lightbox ----------
     Cards ([data-vt]) open a minimal player over the page; portrait
     videos fit within 86dvh, mobile-first. Without JS the card is a
     plain link to the mp4, which opens the native player. */
  var vtCards = document.querySelectorAll('[data-vt]');
  if (vtCards.length) {
    var vtOverlay = document.createElement('div');
    vtOverlay.className = 'vt-overlay';
    vtOverlay.hidden = true;
    vtOverlay.innerHTML =
      '<div class="vt-frame" role="dialog" aria-modal="true" aria-label="Member story">' +
        '<button type="button" class="vt-close" aria-label="Close">&times;</button>' +
        '<video controls playsinline preload="metadata"></video>' +
        '<p class="vt-who"></p>' +
      '</div>';
    document.body.appendChild(vtOverlay);
    var vtVideo = vtOverlay.querySelector('video');
    var vtWho = vtOverlay.querySelector('.vt-who');
    var vtLast = null;
    var closeVt = function () {
      vtVideo.pause();
      vtOverlay.classList.remove('show');
      document.body.classList.remove('modal-open');
      var hide = function () {
        vtOverlay.hidden = true;
        vtVideo.removeAttribute('src');
        while (vtVideo.firstChild) vtVideo.removeChild(vtVideo.firstChild);
        vtVideo.load();
      };
      if (reduced) hide(); else setTimeout(hide, 250);
      if (vtLast) vtLast.focus();
    }
    vtOverlay.querySelector('.vt-close').addEventListener('click', closeVt);
    vtOverlay.addEventListener('click', function (e) { if (e.target === vtOverlay) closeVt(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !vtOverlay.hidden) closeVt();
    });
    vtCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        vtLast = card;
        vtVideo.poster = card.getAttribute('data-poster') || '';
        vtVideo.src = card.getAttribute('data-src');
        var cap = card.getAttribute('data-captions');
        if (cap) {
          var tr = document.createElement('track');
          tr.kind = 'captions'; tr.label = 'English'; tr.srclang = 'en'; tr.src = cap;
          vtVideo.appendChild(tr);
        }
        var who = card.getAttribute('data-name') || '';
        var role = card.getAttribute('data-role') || 'Blueprint member';
        vtWho.innerHTML = '<strong>' + who + '</strong> &middot; ' + role;
        vtOverlay.hidden = false;
        document.body.classList.add('modal-open');
        requestAnimationFrame(function () { vtOverlay.classList.add('show'); });
        var playAttempt = vtVideo.play();
        if (playAttempt && playAttempt.catch) playAttempt.catch(function () {});
      });
    });
  }

  /* ---------- sign-up page: studio picker ----------
     Every studio's payment form is rendered into the page; the picker just
     chooses which one is visible. Without JavaScript the first is shown and
     the noscript block links to the per-studio sign-up pages instead. */
  var signupPicks = document.querySelectorAll('[data-signup-pick]');
  if (signupPicks.length) {
    signupPicks.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slug = btn.getAttribute('data-signup-pick');
        signupPicks.forEach(function (b) {
          var on = b === btn;
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
          b.classList.toggle('btn-primary', on);
          b.classList.toggle('btn-ghost', !on);
        });
        document.querySelectorAll('[data-signup]').forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-signup') !== slug;
        });
      });
    });
  }

  /* ---------- members: per-studio cancellation lightbox ----------
     Opens the studio's live cancellation form (link.stronger.systems)
     inside the branded modal, mirroring the client's original embed
     spec; form_embed.js is loaded once, on first open, and handles
     iframe resizing. Without JavaScript the buttons link straight to
     the hosted form instead. */
  var embedJsLoaded = false;
  /* the {'id':'INLINE'} layout value is built at runtime via .apply so the
     minifier cannot fold it into a string literal needing escaped quotes */
  var SQ = String.fromCharCode.apply(null, [39]);
  var EMBED_LAYOUT = '{' + SQ + 'id' + SQ + ':' + SQ + 'INLINE' + SQ + '}';
  var embedTriggers = document.querySelectorAll('[data-embed-form]');
  if (embedTriggers.length) {
    var embedOverlay = document.createElement('div');
    embedOverlay.className = 'signup-overlay';
    embedOverlay.hidden = true;
    embedOverlay.innerHTML =
      '<div class="signup-modal embed-modal" role="dialog" aria-modal="true" aria-labelledby="embed-title">' +
        '<button type="button" class="signup-close" aria-label="Close">&times;</button>' +
        '<p class="annotation" style="margin:0 0 .2rem">Membership cancellation</p>' +
        '<h3 class="h-3" id="embed-title">Cancellation form</h3>' +
        '<div class="embed-slot"></div>' +
      '</div>';
    document.body.appendChild(embedOverlay);
    var embedSlot = embedOverlay.querySelector('.embed-slot');
    var embedTitle = embedOverlay.querySelector('#embed-title');
    var embedLast = null;
    var closeEmbed = function () {
      embedOverlay.classList.remove('show');
      document.body.classList.remove('modal-open');
      var hide = function () { embedOverlay.hidden = true; embedSlot.innerHTML = ''; };
      if (reduced) hide(); else setTimeout(hide, 250);
      if (embedLast) embedLast.focus();
    };
    embedOverlay.querySelector('.signup-close').addEventListener('click', closeEmbed);
    embedOverlay.addEventListener('click', function (e) { if (e.target === embedOverlay) closeEmbed(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !embedOverlay.hidden) closeEmbed();
    });
    embedTriggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        embedLast = btn;
        var studio = btn.getAttribute('data-studio') || 'your studio';
        var formId = btn.getAttribute('data-embed-form');
        var h = btn.getAttribute('data-embed-height') || '640';
        embedTitle.textContent = studio + ' cancellation form';
        if (!embedJsLoaded) {
          var sc = document.createElement('script');
          sc.src = 'https://link.stronger.systems/js/form_embed.js';
          document.body.appendChild(sc);
          embedJsLoaded = true;
        }
        embedSlot.innerHTML =
          '<iframe src="https://link.stronger.systems/widget/form/' + formId + '"' +
          ' style="width:100%;height:' + h + 'px;border:none;border-radius:8px;background:#fff"' +
          ' id="inline-' + formId + '"' +
          ' data-layout="' + EMBED_LAYOUT + '"' +
          ' data-trigger-type="alwaysShow" data-trigger-value=""' +
          ' data-activation-type="alwaysActivated" data-activation-value=""' +
          ' data-deactivation-type="neverDeactivate" data-deactivation-value=""' +
          ' data-form-name="Cancellation Form"' +
          ' data-height="' + h + '"' +
          ' data-layout-iframe-id="inline-' + formId + '"' +
          ' data-form-id="' + formId + '"' +
          ' title="Cancellation Form ' + studio + '"></iframe>';
        embedOverlay.hidden = false;
        document.body.classList.add('modal-open');
        requestAnimationFrame(function () { embedOverlay.classList.add('show'); });
      });
    });
  }

  /* "Tap to get started" buttons carry data-enquiry-trigger in the markup and
     are opened by the lightbox island's own delegated listener - nothing to do
     here. Without JavaScript they stay plain anchors to #register.
     "Try us for 30 days" buttons elsewhere navigate to the kickstart page. */

  /* ---------- forms: inline validation + branded success ----------
     Placeholder only — nothing is sent anywhere. */
  document.querySelectorAll('form[data-placeholder-form]').forEach(function (form) {
    var successSel = form.getAttribute('data-success');
    var advance = form.getAttribute('data-advance'); /* url to auto-advance to */

    function validateField(field) {
      var radios = field.querySelectorAll('input[type=radio]');
      if (radios.length) {
        var picked = field.querySelector('input[type=radio]:checked');
        field.classList.toggle('invalid', !picked);
        return !!picked;
      }
      var input = field.querySelector('input, select, textarea');
      if (!input) return true;
      var ok = true;
      if (input.type === 'checkbox') {
        ok = !input.required || input.checked;
        field.classList.toggle('invalid', !ok);
        input.setAttribute('aria-invalid', ok ? 'false' : 'true');
        return ok;
      }
      var v = input.value.trim();
      if (input.required && !v) ok = false;
      if (ok && input.type === 'email' && !isEmail(v)) ok = false;
      if (ok && input.type === 'tel' && v && !TEL_RE.test(v)) ok = false;
      field.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }

    form.querySelectorAll('.field input, .field select').forEach(function (input) {
      if (input.type === 'radio' || input.type === 'checkbox') {
        input.addEventListener('change', function () { validateField(input.closest('.field')); });
        return;
      }
      input.addEventListener('blur', function () { validateField(input.closest('.field')); });
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f.classList.contains('invalid')) validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      form.querySelectorAll('.field').forEach(function (f) {
        var ok = validateField(f);
        if (!ok && !firstBad) firstBad = f;
        allOk = allOk && ok;
      });
      if (!allOk) {
        if (firstBad) firstBad.querySelector('input,select,textarea').focus();
        return;
      }
      form.hidden = true;
      var success = successSel ? document.querySelector(successSel) : null;
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      }
      if (advance) {
        var COUNT = 3;
        var counterEl = success ? success.querySelector('[data-advance-count]') : null;
        var iv = setInterval(function () {
          COUNT -= 1;
          if (counterEl) counterEl.textContent = COUNT;
          if (COUNT <= 0) { clearInterval(iv); window.location.href = advance; }
        }, 1000);
        if (counterEl) counterEl.textContent = COUNT;
      }
    });
  });

  /* ---------- sticky mobile CTA (landing) ---------- */
  var sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    document.body.classList.add('has-stickycta');
    var hero = document.querySelector('[data-cta-sentinel]') || document.querySelector('.hero');
    var stickyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { sticky.classList.toggle('show', !e.isIntersecting); });
    }, { threshold: 0 });
    if (hero) stickyIO.observe(hero);
  }

  /* ---------- drawing-index discipline: number the section eyebrows ---------- */
  var dims = document.querySelectorAll('main .dim');
  dims.forEach(function (d, i) {
    var idx = document.createElement('span');
    idx.className = 'idx';
    idx.textContent = (i + 1 < 10 ? '0' : '') + (i + 1) + ' — ';
    d.insertBefore(idx, d.firstChild);
  });

  /* ---------- stat band: numbers count up when the band arrives ---------- */
  var statEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (statEls.length) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        statIO.unobserve(e.target);
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduced) { el.textContent = target + suffix; return; }
        var t0 = null;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / 900);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) {
      if (reduced) el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      else { el.textContent = '0' + (el.getAttribute('data-suffix') || ''); statIO.observe(el); }
    });
  }

  /* ---------- ribbon: duplicate content for seamless loop ---------- */
  document.querySelectorAll('.ribbon .track, .photo-strip .strip-track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- kit 10: the site survey (fit check) ---------- */
  var survey = document.querySelector('.survey');
  if (survey) {
    var items = Array.prototype.slice.call(survey.querySelectorAll('.survey-item'));
    var verdict = survey.querySelector('[data-survey-verdict]');
    var verdicts = [
      'Tick what’s true — we’ll be straight with you.',
      'One tick — promising. Keep going.',
      'Two ticks — sounding a lot like our members.',
      'That’s a match. This is exactly who the plan was drawn for.'
    ];
    var updateVerdict = function () {
      var n = items.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).length;
      if (verdict) verdict.textContent = verdicts[Math.min(n, 3)];
      survey.classList.toggle('matched', n >= 3);
    }
    items.forEach(function (b) {
      b.addEventListener('click', function () {
        b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        updateVerdict();
      });
    });
    updateVerdict();
  }

  /* ---------- kit 11: timetable slot tags ---------- */
  var slotWrap = document.querySelector('[data-slots]');
  if (slotWrap) {
    var chips = Array.prototype.slice.call(slotWrap.querySelectorAll('.slot-chip'));
    var line = document.querySelector('[data-slot-line]');
    var updateSlots = function () {
      var on = chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; })
        .map(function (c) { return c.getAttribute('data-label'); });
      if (!line) return;
      if (!on.length) { line.textContent = 'Tap the times that fit your week — we’ll draw around them.'; return; }
      var last = on.pop();
      var list = on.length ? on.join(', ') + ' and ' + last : last;
      line.textContent = '3 sessions a week — ' + list + ' — drawn around your life.';
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        updateSlots();
      });
    });
    updateSlots();
  }

  /* ---------- kit 12: snap-to-grid magnetic CTAs (desktop) ----------
     Buttons snap toward the cursor in 3px drafting-grid steps. */
  if (!reduced && isDesktop && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.btn-primary').forEach(function (btn) {
      btn.addEventListener('pointermove', function (ev) {
        var r = btn.getBoundingClientRect();
        var dx = (ev.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (ev.clientY - (r.top + r.height / 2)) / (r.height / 2);
        var snap = function (v) { return Math.round(v * 2) * 3; };
        btn.style.transform = 'translate(' + snap(dx) + 'px,' + snap(dy) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- videos: play when visible, pause off-screen ---------- */
  if (reduced) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      try { v.pause(); } catch (e) {}
    });
  } else {
    var vidIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else if (!v.paused) { v.pause(); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('video[autoplay]').forEach(function (v) { vidIO.observe(v); });
  }
})();
