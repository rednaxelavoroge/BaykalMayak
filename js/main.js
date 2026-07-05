// Отмечаем, что JS активен (для анимаций появления)
document.documentElement.classList.add('js');

// Мобильное меню
(function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('is-open');
        nav.classList.remove('is-open');
      });
    });
  }

  // Подсветка активного пункта меню
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('is-active');
  });

  // Лайтбокс галереи с листанием
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var counter = lb.querySelector('.lightbox__counter');
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var srcs = items.map(function (el) { return el.getAttribute('data-lightbox'); });
    var current = 0;

    function show(i) {
      current = (i + srcs.length) % srcs.length;
      lbImg.style.opacity = 0;
      var img = new Image();
      img.onload = function () { lbImg.src = srcs[current]; lbImg.style.opacity = 1; };
      img.src = srcs[current];
      if (counter) counter.textContent = (current + 1) + ' / ' + srcs.length;
    }
    function open(i) { show(i); lb.classList.add('is-open'); }
    function close() { lb.classList.remove('is-open'); lbImg.src = ''; }
    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    items.forEach(function (el, i) {
      el.addEventListener('click', function () { open(i); });
    });

    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__close')) close();
    });
    var nextBtn = lb.querySelector('.lightbox__next');
    var prevBtn = lb.querySelector('.lightbox__prev');
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    });

    // Свайп на телефоне
    var startX = null;
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      startX = null;
    });
  }

  // Аккордеон-блоки (одностраничник)
  document.querySelectorAll('.block__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var block = head.closest('.block');
      block.classList.toggle('is-open');
    });
  });

  // Плавная прокрутка по якорям меню
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // Форма брони → WhatsApp
  var bf = document.getElementById('bookingForm');
  if (bf) {
    bf.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(bf);
      var msg = 'Здравствуйте! Хочу забронировать в «Байкальский Маяк».\n' +
        'Заезд: ' + (d.get('in') || '—') + '\n' +
        'Выезд: ' + (d.get('out') || '—') + '\n' +
        'Имя: ' + (d.get('name') || '—') + '\n' +
        'Телефон: ' + (d.get('phone') || '—') + '\n' +
        'Пожелания: ' + (d.get('note') || '—');
      window.open('https://wa.me/79025651010?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  // Плавное появление секций при прокрутке
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Год в подвале
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
