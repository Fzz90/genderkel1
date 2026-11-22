(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var stage = document.querySelector('.stage');
  var slideButtons = Array.prototype.slice.call(document.querySelectorAll('.slide-nav [data-go]'));
  var previousButton = document.querySelector('.previous');
  var nextButton = document.querySelector('.next');
  var announcer = document.querySelector('#slide-announcer');
  var zoomButton = document.querySelector('#zoom-button');
  var magnifierLens = document.querySelector('#magnifier-lens');
  var magnifierContent = document.querySelector('#magnifier-content');
  var fullscreenButton = document.querySelector('#fullscreen-button');
  var mobileSlideTrigger = document.querySelector('#mobile-slide-trigger');
  var mobileSlideLabel = document.querySelector('#mobile-slide-label');
  var slideNav = document.querySelector('#slide-nav-list');
  var mobile = window.matchMedia ? window.matchMedia('(max-width: 900px)') : { matches: false };

  var glossaryToggle = document.querySelector('#glossary-toggle');
  var glossaryDrawer = document.querySelector('#glossary-drawer');
  var glossaryClose = document.querySelector('#glossary-close');
  var glossarySearch = document.querySelector('#glossary-search');
  var glossaryFilterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-glossary-cat]'));
  var glossaryItems = Array.prototype.slice.call(document.querySelectorAll('.glossary-item'));
  var glossaryEmpty = document.querySelector('#glossary-empty');
  var glossaryClearBtn = document.querySelector('#glossary-clear-btn');

  var sceneTabs = Array.prototype.slice.call(document.querySelectorAll('[data-scene-tab]'));
  var scenePanel = document.querySelector('#scene-panel');
  var sceneDetailTitle = document.querySelector('#scene-detail-title');
  var sceneDetailBody = document.querySelector('#scene-detail-body');

  var normNodes = Array.prototype.slice.call(document.querySelectorAll('[data-norm-node]'));
  var normCards = Array.prototype.slice.call(document.querySelectorAll('[data-norm-select]'));
  var normResetBtn = document.querySelector('#norm-reset-btn');
  var normTitle = document.querySelector('#norm-inspector-title');
  var normTag = document.querySelector('#norm-inspector-tag');
  var normText = document.querySelector('#norm-inspector-text');

  var visualPins = Array.prototype.slice.call(document.querySelectorAll('[data-visual-pin]'));
  var visualCards = Array.prototype.slice.call(document.querySelectorAll('[data-visual-select]'));
  var visualResetBtn = document.querySelector('#visual-reset-btn');
  var visualTitle = document.querySelector('#visual-inspector-title');
  var visualText = document.querySelector('#visual-inspector-text');

  var LOUPE_MAG = 2.0;
  var XLINK_NS = 'http://www.w3.org/1999/xlink';
  var supportsAspectRatio = Boolean(
    window.CSS && typeof window.CSS.supports === 'function' && window.CSS.supports('aspect-ratio', '16 / 9')
  );

  var SCENE_DETAILS = {
    trigger: {
      title: '01. Awal Mula Pertolongan',
      body: 'Ceritanya dimulai saat Amane meminjamkan payungnya ke Mahiru yang duduk sendirian waktu hujan. Tidak lama setelah itu, Amane sakit dan kesusahan mengurus makan di apartemennya yang berantakan. Dari situ, Mahiru merasa perlu membalas kebaikan Amane.'
    },
    ongaeshi: {
      title: '02. Balas Budi Lewat Masakan',
      body: 'Untuk membalas budi, Mahiru memilih membuatkan masakan rumahan yang sehat buat Amane. Padahal banyak cara lain untuk berterima kasih, tapi di adegan ini balas budinya langsung diwujudkan lewat urusan dapur.'
    },
    domestic: {
      title: '03. Jadi Kebiasaan Harian',
      body: 'Awalnya cuma sekali berbagi makanan, lama-lama masak buat Amane malah jadi rutinitas harian di apartemen. Akhirnya, peran Mahiru di cerita terus berputar di soal menyiapkan makan dan merapikan kebutuhan Amane.'
    }
  };

  var NORM_DETAILS = {
    all: {
      title: 'Ringkasan Norma Gender',
      tag: '3 Poin Utama',
      body: 'Mahiru digambarkan pintar memasak dan memilih membalas budi dengan masakan rumahan sederhana. Pola ini nyambung dengan paham ryousai kenbo dan mengarahkan kebiasaan balas budi Jepang (ongaeshi) ke pekerjaan rumah.'
    },
    ryousai: {
      title: 'Paham Ryousai Kenbo (良妻賢母)',
      tag: 'Aturan Lama',
      body: 'Di Jepang sejak era Meiji ada paham ryousai kenbo, yang artinya perempuan ideal adalah istri yang baik dan ibu yang bijaksana. Walaupun Mahiru masih anak SMA, sikapnya yang sabar mengatur makanan dan mengurus Amane masih mengikuti gambaran istri idaman tersebut.'
    },
    ongaeshi: {
      title: 'Cara Balas Budi (Ongaeshi)',
      tag: 'Budaya Jepang',
      body: 'Di masyarakat Jepang, membalas kebaikan (ongaeshi dan okaeshi) sebenarnya berlaku untuk siapa saja. Tapi di adegan ini, cara balas budi yang dianggap cocok untuk perempuan justru dipersempit jadi melayani lewat masakan rumahan yang sederhana.'
    },
    cooking: {
      title: 'Perempuan Dianggap Harus Bisa Masak',
      tag: 'Temuan Kelompok 1',
      body: 'Perempuan sejak muda seolah otomatis harus bisa memasak dengan baik. Sebaliknya, laki-laki seperti Amane dianggap wajar saja kalau tidak bisa masak makanan sehat sendiri. Jadi, memasak masih ditempelkan sebagai tugas perempuan.'
    }
  };

  var VISUAL_DETAILS = {
    all: {
      title: 'Rangkuman Bukti Visual',
      body: 'Dari satu potongan adegan memasak ini saja, tiga hal langsung terlihat bersamaan: keahlian Mahiru memakai wajan tamagoyaki, ekspresinya yang tenang, serta celemek berenda dengan pencahayaan hangat yang menguatkan gambaran perempuan feminin di dapur.'
    },
    food: {
      title: 'Pin 1: Wajan Tamagoyaki & Sumpit Masak',
      body: 'Mahiru terlihat cekatan membalik telur dadar gulung (tamagoyaki) memakai wajan khusus dan sumpit masak kayu. Detail ini langsung menegaskan gambaran bahwa perempuan muda dianggap terampil memasak makanan rumahan.'
    },
    gesture: {
      title: 'Pin 2: Ekspresi Tenang & Rambut Rapi',
      body: 'Wajah Mahiru tetap tenang dan lembut saat memasak, sementara rambutnya diikat rapi ke belakang. Cara ini membuat pekerjaan dapur terasa ringan, alami, dan sudah melekat pada dirinya.'
    },
    lighting: {
      title: 'Pin 3: Celemek Berenda & Nuansa Hangat',
      body: 'Celemek putih berenda, kardigan merah muda pastel, dan cahaya dapur yang hangat memberi kesan manis serta keibuan. Tampilan seperti ini ikut memperkuat stereotip perempuan ideal yang merawat urusan makan di rumah.'
    }
  };

  var currentSlide = 0;
  var transitionTimer;
  var toastTimer;
  var activeNormId = null;
  var activeVisualId = null;
  var activeGlossaryCat = 'all';
  var isLoupeActive = false;
  var loupeX = null;
  var loupeY = null;
  var loupeClone = null;

  function setUseHref(useEl, id) {
    if (!useEl) return;
    useEl.setAttribute('href', id);
    try {
      useEl.setAttributeNS(XLINK_NS, 'xlink:href', id);
    } catch (err) {
      useEl.setAttribute('xlink:href', id);
    }
  }

  function clearChildren(node) {
    if (!node) return;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function closestEl(target, selector) {
    if (!target || target.nodeType !== 1) return null;
    if (typeof target.closest === 'function') return target.closest(selector);
    var el = target;
    while (el && el.nodeType === 1) {
      var matches = el.matches || el.msMatchesSelector || el.webkitMatchesSelector;
      if (matches && matches.call(el, selector)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function selectSceneTab(key) {
    var data = SCENE_DETAILS[key];
    if (!data) return;
    for (var i = 0; i < sceneTabs.length; i++) {
      var tab = sceneTabs[i];
      var isMatch = tab.getAttribute('data-scene-tab') === key;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
      if (isMatch && scenePanel) {
        scenePanel.setAttribute('aria-labelledby', tab.id);
      }
    }
    if (sceneDetailTitle) sceneDetailTitle.textContent = data.title;
    if (sceneDetailBody) sceneDetailBody.textContent = data.body;
    if (isLoupeActive) syncLoupeClone();
  }

  function selectNorm(id) {
    activeNormId = activeNormId === id ? null : id;
    var selectedKey = activeNormId || 'all';
    var info = NORM_DETAILS[selectedKey] || NORM_DETAILS.all;

    for (var i = 0; i < normNodes.length; i++) {
      var node = normNodes[i];
      var nodeId = node.getAttribute('data-norm-node');
      var isSelected = Boolean(activeNormId && activeNormId === nodeId);
      node.classList.toggle('is-selected', isSelected);
      node.classList.toggle('is-dimmed', Boolean(activeNormId && !isSelected));
      node.setAttribute('aria-pressed', String(isSelected));
    }

    for (var j = 0; j < normCards.length; j++) {
      var card = normCards[j];
      var cardSelected = Boolean(activeNormId && card.getAttribute('data-norm-select') === activeNormId);
      card.classList.toggle('is-selected', cardSelected);
      card.setAttribute('aria-pressed', String(cardSelected));
    }

    if (normResetBtn) {
      normResetBtn.setAttribute('aria-pressed', String(!activeNormId));
    }
    if (normTitle) normTitle.textContent = info.title;
    if (normTag) normTag.textContent = info.tag;
    if (normText) normText.textContent = info.body;
    if (isLoupeActive) syncLoupeClone();
  }

  function selectVisual(id) {
    activeVisualId = activeVisualId === id ? null : id;
    var selectedKey = activeVisualId || 'all';
    var info = VISUAL_DETAILS[selectedKey] || VISUAL_DETAILS.all;

    for (var i = 0; i < visualPins.length; i++) {
      var pin = visualPins[i];
      var pinId = pin.getAttribute('data-visual-pin');
      var isSelected = Boolean(activeVisualId && activeVisualId === pinId);
      pin.classList.toggle('is-selected', isSelected);
      pin.classList.toggle('is-dimmed', Boolean(activeVisualId && !isSelected));
      pin.setAttribute('aria-pressed', String(isSelected));
    }

    for (var j = 0; j < visualCards.length; j++) {
      var card = visualCards[j];
      var cardSelected = Boolean(activeVisualId && card.getAttribute('data-visual-select') === activeVisualId);
      card.classList.toggle('is-selected', cardSelected);
      card.setAttribute('aria-pressed', String(cardSelected));
    }

    if (visualResetBtn) {
      visualResetBtn.setAttribute('aria-pressed', String(!activeVisualId));
    }
    if (visualTitle) visualTitle.textContent = info.title;
    if (visualText) visualText.textContent = info.body;
    if (isLoupeActive) syncLoupeClone();
  }

  function filterGlossary() {
    var query = glossarySearch ? glossarySearch.value.trim().toLowerCase() : '';
    var visibleCount = 0;
    for (var i = 0; i < glossaryItems.length; i++) {
      var item = glossaryItems[i];
      var cat = item.getAttribute('data-cat');
      var keywords = (item.getAttribute('data-keywords') || '') + ' ' + item.textContent.toLowerCase();
      var matchesCat = activeGlossaryCat === 'all' || cat === activeGlossaryCat;
      var matchesQuery = !query || keywords.indexOf(query) !== -1;
      var show = matchesCat && matchesQuery;
      item.hidden = !show;
      if (show) visibleCount += 1;
    }
    if (glossaryEmpty) {
      glossaryEmpty.hidden = visibleCount > 0;
    }
  }

  function setGlossaryOpen(nextOpen, options) {
    if (!glossaryDrawer || !glossaryToggle) return;
    var open = Boolean(nextOpen);
    var restoreFocus = options && options.restoreFocus;
    glossaryDrawer.hidden = !open;
    glossaryToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      if (isLoupeActive && magnifierLens) magnifierLens.hidden = true;
      closeMobileNav();
      if (glossarySearch) {
        try {
          glossarySearch.focus({ preventScroll: true });
        } catch (err) {
          glossarySearch.focus();
        }
      }
      announcer.textContent = 'Glosarium istilah dibuka. Tekan Escape untuk menutup.';
    } else {
      if (restoreFocus) {
        try {
          glossaryToggle.focus({ preventScroll: true });
        } catch (err) {
          glossaryToggle.focus();
        }
      }
      announcer.textContent = 'Glosarium istilah ditutup.';
    }
  }

  function fitStage() {
    var baseWidth = Math.max(1, stage.clientWidth);
    stage.style.setProperty('--deck-scale', String(baseWidth / 1440));
    if (!supportsAspectRatio) {
      stage.style.height = mobile.matches ? 'auto' : Math.round((baseWidth * 9) / 16) + 'px';
    }
    if (isLoupeActive && loupeX !== null && loupeY !== null) {
      positionLoupe(loupeX, loupeY);
    }
  }

  var zoomUse = zoomButton ? zoomButton.querySelector('use') : null;

  function syncLoupeClone() {
    if (!magnifierContent || !slides[currentSlide]) return;
    var sourceSlide = slides[currentSlide];
    var clone = sourceSlide.cloneNode(true);
    clone.removeAttribute('id');
    var withIds = clone.querySelectorAll('[id]');
    for (var i = 0; i < withIds.length; i++) {
      withIds[i].removeAttribute('id');
    }
    clone.classList.remove('entering');
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;

    if (mobile.matches) {
      clone.style.width = sourceSlide.offsetWidth + 'px';
      clone.style.height = sourceSlide.offsetHeight + 'px';
    }

    clearChildren(magnifierContent);
    magnifierContent.appendChild(clone);
    loupeClone = clone;
    if (loupeX !== null && loupeY !== null) {
      positionLoupe(loupeX, loupeY);
    }
  }

  function positionLoupe(x, y) {
    if (!magnifierLens || !loupeClone) return;
    var lensRadius = (magnifierLens.offsetWidth || 236) / 2;
    var stageW = stage.clientWidth || 1;
    var stageH = stage.clientHeight || 1;
    var cx = Math.max(0, Math.min(stageW, x));
    var cy = Math.max(0, Math.min(stageH, y));
    loupeX = cx;
    loupeY = cy;

    var baseScale = mobile.matches ? 1 : stageW / 1440;
    var loupeScale = baseScale * LOUPE_MAG;
    var tx = lensRadius - cx * LOUPE_MAG;
    var ty = lensRadius - cy * LOUPE_MAG;

    magnifierLens.style.transform = 'translate3d(' + (cx - lensRadius).toFixed(1) + 'px, ' + (cy - lensRadius).toFixed(1) + 'px, 0)';
    loupeClone.style.transform = 'translate3d(' + tx.toFixed(1) + 'px, ' + ty.toFixed(1) + 'px, 0) scale(' + loupeScale.toFixed(4) + ')';
  }

  function setLoupe(nextState) {
    isLoupeActive = Boolean(nextState);
    stage.classList.toggle('is-loupe', isLoupeActive);
    if (zoomButton) {
      var label = isLoupeActive ? 'Matikan kaca pembesar kursor' : 'Aktifkan kaca pembesar kursor';
      zoomButton.setAttribute('aria-pressed', String(isLoupeActive));
      zoomButton.setAttribute('aria-label', label);
      zoomButton.title = (isLoupeActive ? 'Matikan kaca pembesar' : 'Kaca pembesar kursor') + ' (Z)';
      setUseHref(zoomUse, isLoupeActive ? '#icon-zoom-out' : '#icon-zoom-in');
    }

    if (!magnifierLens) return;
    if (isLoupeActive) {
      if (glossaryDrawer && !glossaryDrawer.hidden) {
        setGlossaryOpen(false);
      }
      magnifierLens.hidden = false;
      loupeX = (stage.clientWidth || 600) / 2;
      loupeY = mobile.matches
        ? Math.min((stage.clientHeight || 340) / 2, 220)
        : (stage.clientHeight || 340) / 2;
      syncLoupeClone();
      announcer.textContent = 'Kaca pembesar kursor aktif. Gerakkan kursor untuk memperbesar area slide.';
    } else {
      magnifierLens.hidden = true;
      clearChildren(magnifierContent);
      loupeClone = null;
      announcer.textContent = 'Kaca pembesar kursor dimatikan.';
    }
  }

  function readHash() {
    var match = location.hash.match(/^#slide-(\d+)$/);
    if (!match) return 0;
    var index = Number(match[1]) - 1;
    return index >= 0 && index < slides.length ? index : 0;
  }

  function goToSlide(index, options) {
    var opts = options || {};
    var updateHash = opts.updateHash !== undefined ? opts.updateHash : true;
    var focus = Boolean(opts.focus);
    var animate = opts.animate !== undefined ? opts.animate : true;

    if (typeof index !== 'number' || isNaN(index) || index < 0 || index >= slides.length) return;
    var changed = currentSlide !== index;
    var focusIsInSlide = false;
    for (var k = 0; k < slides.length; k++) {
      if (slides[k].contains(document.activeElement)) {
        focusIsInSlide = true;
        break;
      }
    }
    currentSlide = index;
    clearTimeout(transitionTimer);

    for (var i = 0; i < slides.length; i++) {
      var slide = slides[i];
      var active = i === index;
      slide.hidden = !active;
      slide.inert = !active;
      slide.classList.toggle('active', active);
      slide.classList.remove('entering');
    }

    if (changed && animate) {
      slides[index].classList.add('entering');
      transitionTimer = setTimeout(function () {
        slides[index].classList.remove('entering');
      }, 340);
    }

    for (var b = 0; b < slideButtons.length; b++) {
      var button = slideButtons[b];
      button.classList.toggle('current', b === index);
      if (b === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    }

    previousButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
    document.querySelector('.skip-link').href = '#slide-' + (index + 1);
    if (mobileSlideLabel) {
      mobileSlideLabel.textContent = 'Slide ' + (index + 1) + ' / ' + slides.length + ' · ' + slides[index].getAttribute('data-title');
    }
    closeMobileNav();

    if (updateHash && location.hash !== '#slide-' + (index + 1)) {
      try {
        history.replaceState(null, '', '#slide-' + (index + 1));
      } catch (err) {
        location.hash = 'slide-' + (index + 1);
      }
    }

    if (focus || focusIsInSlide) {
      try {
        slides[index].focus({ preventScroll: true });
      } catch (err) {
        slides[index].focus();
      }
    }
    if (isLoupeActive) {
      syncLoupeClone();
      if (magnifierLens && loupeX !== null && loupeY !== null && (!glossaryDrawer || glossaryDrawer.hidden)) {
        magnifierLens.hidden = false;
      }
    }
    if (changed && mobile.matches) {
      window.scrollTo(0, 0);
    }
    announcer.textContent = 'Slide ' + (index + 1) + ' dari ' + slides.length + ': ' + slides[index].getAttribute('data-title');
  }

  function closeMobileNav(options) {
    var restoreFocus = options && options.restoreFocus;
    if (!slideNav || !mobileSlideTrigger) return;
    var wasOpen = slideNav.classList.contains('is-open');
    slideNav.classList.remove('is-open');
    mobileSlideTrigger.setAttribute('aria-expanded', 'false');
    if (wasOpen && restoreFocus) {
      try {
        mobileSlideTrigger.focus({ preventScroll: true });
      } catch (err) {
        mobileSlideTrigger.focus();
      }
    }
  }

  function toggleMobileNav() {
    if (!slideNav || !mobileSlideTrigger) return;
    var isOpen = slideNav.classList.toggle('is-open');
    mobileSlideTrigger.setAttribute('aria-expanded', String(isOpen));
  }

  function toast(message) {
    var element = document.querySelector('#toast');
    clearTimeout(toastTimer);
    element.textContent = message;
    element.hidden = false;
    toastTimer = setTimeout(function () {
      element.hidden = true;
    }, 4000);
  }

  var fullscreenUse = fullscreenButton ? fullscreenButton.querySelector('use') : null;

  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
  }

  function toggleFullscreen() {
    var docEl = document.documentElement;
    var req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
    var exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    try {
      if (getFullscreenElement()) {
        if (exit) exit.call(document);
      } else if (req) {
        req.call(docEl);
      } else {
        toast('Browser ini belum mendukung mode layar penuh.');
      }
    } catch (err) {
      toast('Mode layar penuh tidak dapat diaktifkan pada jendela ini.');
    }
  }

  var goButtons = Array.prototype.slice.call(document.querySelectorAll('[data-go]'));
  for (var g = 0; g < goButtons.length; g++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        goToSlide(Number(btn.getAttribute('data-go')), { focus: true });
      });
    })(goButtons[g]);
  }

  document.querySelector('.brand').addEventListener('click', function (event) {
    event.preventDefault();
    goToSlide(0, { focus: true });
  });

  previousButton.addEventListener('click', function () {
    goToSlide(currentSlide - 1, { focus: true });
  });
  nextButton.addEventListener('click', function () {
    goToSlide(currentSlide + 1, { focus: true });
  });

  if (glossaryToggle) {
    glossaryToggle.addEventListener('click', function () {
      setGlossaryOpen(glossaryDrawer.hidden, { restoreFocus: !glossaryDrawer.hidden });
    });
  }
  if (glossaryClose) {
    glossaryClose.addEventListener('click', function () {
      setGlossaryOpen(false, { restoreFocus: true });
    });
  }
  if (glossarySearch) {
    glossarySearch.addEventListener('input', filterGlossary);
  }
  if (glossaryClearBtn) {
    glossaryClearBtn.addEventListener('click', function () {
      activeGlossaryCat = 'all';
      for (var f = 0; f < glossaryFilterBtns.length; f++) {
        var isAll = glossaryFilterBtns[f].getAttribute('data-glossary-cat') === 'all';
        glossaryFilterBtns[f].classList.toggle('is-active', isAll);
        glossaryFilterBtns[f].setAttribute('aria-pressed', String(isAll));
      }
      if (glossarySearch) glossarySearch.value = '';
      filterGlossary();
      if (glossarySearch) glossarySearch.focus();
    });
  }
  for (var fc = 0; fc < glossaryFilterBtns.length; fc++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        activeGlossaryCat = btn.getAttribute('data-glossary-cat');
        for (var m = 0; m < glossaryFilterBtns.length; m++) {
          var isActive = glossaryFilterBtns[m] === btn;
          glossaryFilterBtns[m].classList.toggle('is-active', isActive);
          glossaryFilterBtns[m].setAttribute('aria-pressed', String(isActive));
        }
        filterGlossary();
      });
    })(glossaryFilterBtns[fc]);
  }

  if (zoomButton) {
    zoomButton.addEventListener('click', function () {
      setLoupe(!isLoupeActive);
    });
  }
  fullscreenButton.addEventListener('click', toggleFullscreen);

  if (mobileSlideTrigger) {
    mobileSlideTrigger.addEventListener('click', toggleMobileNav);
  }

  document.addEventListener('click', function (event) {
    if (slideNav && slideNav.classList.contains('is-open') && !closestEl(event.target, '#slide-nav-list, #mobile-slide-trigger')) {
      closeMobileNav();
    }
  });

  for (var t = 0; t < sceneTabs.length; t++) {
    (function (tab, tabIndex) {
      tab.addEventListener('click', function () {
        selectSceneTab(tab.getAttribute('data-scene-tab'));
      });
      tab.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          event.stopPropagation();
          var nextIdx = event.key === 'ArrowRight'
            ? (tabIndex + 1) % sceneTabs.length
            : (tabIndex - 1 + sceneTabs.length) % sceneTabs.length;
          sceneTabs[nextIdx].focus();
          selectSceneTab(sceneTabs[nextIdx].getAttribute('data-scene-tab'));
        }
      });
    })(sceneTabs[t], t);
  }

  for (var n = 0; n < normNodes.length; n++) {
    (function (node) {
      var id = node.getAttribute('data-norm-node');
      node.addEventListener('click', function () {
        selectNorm(id);
      });
      node.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectNorm(id);
        }
      });
    })(normNodes[n]);
  }

  for (var nc = 0; nc < normCards.length; nc++) {
    (function (card) {
      card.addEventListener('click', function () {
        selectNorm(card.getAttribute('data-norm-select'));
      });
    })(normCards[nc]);
  }

  if (normResetBtn) {
    normResetBtn.addEventListener('click', function () {
      if (activeNormId) selectNorm(activeNormId);
    });
  }

  for (var v = 0; v < visualPins.length; v++) {
    (function (pin) {
      var id = pin.getAttribute('data-visual-pin');
      pin.addEventListener('click', function () {
        selectVisual(id);
      });
    })(visualPins[v]);
  }

  for (var vc = 0; vc < visualCards.length; vc++) {
    (function (card) {
      card.addEventListener('click', function () {
        selectVisual(card.getAttribute('data-visual-select'));
      });
    })(visualCards[vc]);
  }

  if (visualResetBtn) {
    visualResetBtn.addEventListener('click', function () {
      if (activeVisualId) selectVisual(activeVisualId);
    });
  }

  window.addEventListener('hashchange', function () {
    goToSlide(readHash(), { updateHash: false });
  });
  window.addEventListener('resize', fitStage);
  if (typeof window.ResizeObserver === 'function') {
    new window.ResizeObserver(fitStage).observe(stage);
  }

  function onFullscreenChange() {
    var active = Boolean(getFullscreenElement());
    var label = active ? 'Keluar dari layar penuh' : 'Masuk ke layar penuh';
    fullscreenButton.setAttribute('aria-label', label);
    fullscreenButton.title = label + ' (F)';
    setUseHref(fullscreenUse, active ? '#collapse' : '#expand');
    fitStage();
    requestAnimationFrame(fitStage);
  }

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  document.addEventListener('keydown', function (event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    var key = event.key || '';

    if (key === 'Escape' && glossaryDrawer && !glossaryDrawer.hidden) {
      event.preventDefault();
      setGlossaryOpen(false, { restoreFocus: true });
      return;
    }
    if (key === 'Escape' && slideNav && slideNav.classList.contains('is-open')) {
      event.preventDefault();
      closeMobileNav({ restoreFocus: true });
      return;
    }
    if (key === 'Escape' && isLoupeActive) {
      event.preventDefault();
      setLoupe(false);
      return;
    }
    if (closestEl(event.target, 'input, textarea, select, [contenteditable="true"]')) return;

    if (key === 'ArrowRight' || key === 'ArrowDown' || key === 'PageDown') {
      event.preventDefault();
      goToSlide(currentSlide + 1, { focus: true });
    } else if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'PageUp') {
      event.preventDefault();
      goToSlide(currentSlide - 1, { focus: true });
    } else if (key === 'Home' || key === 'End') {
      event.preventDefault();
      goToSlide(key === 'Home' ? 0 : slides.length - 1, { focus: true });
    } else if (key.toLowerCase() === 'g') {
      event.preventDefault();
      setGlossaryOpen(glossaryDrawer.hidden, { restoreFocus: !glossaryDrawer.hidden });
    } else if (key.toLowerCase() === 'z') {
      event.preventDefault();
      setLoupe(!isLoupeActive);
    } else if (key.toLowerCase() === 'f') {
      event.preventDefault();
      toggleFullscreen();
    } else if (key === ' ' && !closestEl(event.target, 'button, a, summary, [role="button"], [role="tab"]')) {
      event.preventDefault();
      goToSlide(event.shiftKey ? currentSlide - 1 : currentSlide + 1, { focus: true });
    }
  });

  function updateLoupeFromClientXY(clientX, clientY) {
    if (!isLoupeActive || !magnifierLens || (glossaryDrawer && !glossaryDrawer.hidden)) return;
    var rect = stage.getBoundingClientRect();
    var x = clientX - rect.left - (stage.clientLeft || 0);
    var y = clientY - rect.top - (stage.clientTop || 0);
    magnifierLens.hidden = false;
    positionLoupe(x, y);
  }

  stage.addEventListener('mousemove', function (event) {
    updateLoupeFromClientXY(event.clientX, event.clientY);
  });
  stage.addEventListener('mouseenter', function (event) {
    updateLoupeFromClientXY(event.clientX, event.clientY);
  });
  stage.addEventListener('mouseleave', function () {
    if (!isLoupeActive || !magnifierLens) return;
    magnifierLens.hidden = true;
  });

  var touchStart = null;
  stage.addEventListener('touchstart', function (event) {
    if (isLoupeActive && event.touches.length === 1) {
      updateLoupeFromClientXY(event.touches[0].clientX, event.touches[0].clientY);
      touchStart = null;
      return;
    }
    if (event.touches.length !== 1 || closestEl(event.target, 'button, input, textarea, a, [role="button"], [role="tab"], #glossary-drawer')) {
      touchStart = null;
      return;
    }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });

  stage.addEventListener('touchmove', function (event) {
    if (isLoupeActive && event.touches.length === 1) {
      updateLoupeFromClientXY(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });

  stage.addEventListener('touchend', function (event) {
    if (!touchStart || event.changedTouches.length !== 1) return;
    var deltaX = event.changedTouches[0].clientX - touchStart.x;
    var deltaY = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(deltaX) > 75 && Math.abs(deltaX) > Math.abs(deltaY) * 1.8) {
      if (deltaX < 0) goToSlide(currentSlide + 1, { focus: true });
      else goToSlide(currentSlide - 1, { focus: true });
    }
    touchStart = null;
  }, { passive: true });

  stage.addEventListener('touchcancel', function () {
    touchStart = null;
  }, { passive: true });

  // Remove inert before print so all slides stay selectable and render cleanly to PDF.
  window.addEventListener('beforeprint', function () {
    for (var i = 0; i < slides.length; i++) {
      slides[i].inert = false;
    }
  });

  window.addEventListener('afterprint', function () {
    for (var i = 0; i < slides.length; i++) {
      slides[i].inert = i !== currentSlide;
    }
  });

  fitStage();
  goToSlide(readHash(), { updateHash: Boolean(location.hash), animate: false });
})();
