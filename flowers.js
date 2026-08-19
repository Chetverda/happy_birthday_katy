(function () {
  const DIR = 'flowers/';

  function src(file) {
    return encodeURI(DIR + file);
  }

  function layer(items) {
    return `<div class="flowers">${items.map((f, i) => {
      const cls = ['flower', 'flower--' + f.pos];
      if (f.size) cls.push('flower--' + f.size);
      return `<img class="${cls.join(' ')}" src="${src(f.file)}" alt="" style="animation-delay:${(i * 1.3)}s">`;
    }).join('')}</div>`;
  }

  const SLIDER = {
    quiz: [
      'fresh-1.png',
      'fresh-20.png',
      'fresh-10.png',
      'dried-16.png',
      'fresh-24.png',
      'fresh-30.png',
      'dried-11.png'
    ],
    chapters: [
      'fresh-2.png',
      'fresh-22.png',
      'fresh-9.png',
      'fresh-33.png',
      'dried-2.png',
      'fresh-18.png',
      'fresh-16.png'
    ]
  };

  const QUIZ = {
    0: [
      { file: 'fresh-1.png', pos: 'tr' },
      { file: 'fresh-20.png', pos: 'bl', size: 'lg' },
      { file: 'dried-16.png', pos: 'l' }
    ],
    1: [
      { file: 'fresh-10.png', pos: 'tl' },
      { file: 'fresh-15.png', pos: 'br' },
      { file: 'dried-1.png', pos: 'r' }
    ],
    2: [
      { file: 'fresh-5.png', pos: 'tr' },
      { file: 'fresh-24.png', pos: 'bl' }
    ],
    3: [
      { file: 'fresh-12.png', pos: 'tl' },
      { file: 'fresh-30.png', pos: 'br' },
      { file: 'fresh-54.png', pos: 'r', size: 'sm' }
    ],
    4: [
      { file: 'fresh-18.png', pos: 'tr', size: 'lg' },
      { file: 'dried-11.png', pos: 'bl' },
      { file: 'fresh-7.png', pos: 'l' }
    ]
  };

  const CHAPTERS = {
    0: [
      { file: 'fresh-2.png', pos: 'tl' },
      { file: 'fresh-22.png', pos: 'br' },
      { file: 'dried-2.png', pos: 'r' }
    ],
    1: [
      { file: 'fresh-4.png', pos: 'tr' },
      { file: 'dried-5.png', pos: 'bl' },
      { file: 'fresh-25.png', pos: 'l', size: 'sm' }
    ],
    2: [
      { file: 'fresh-9.png', pos: 'tl' },
      { file: 'fresh-33.png', pos: 'br' },
      { file: 'dried-14.png', pos: 'r' }
    ],
    3: [
      { file: 'fresh-14.png', pos: 'tl', size: 'sm' },
      { file: 'dried-20.png', pos: 'tr', size: 'sm' },
      { file: 'fresh-47.png', pos: 'bl', size: 'sm' },
      { file: 'fresh-28.png', pos: 'br', size: 'sm' }
    ],
    4: [
      { file: 'fresh-6.png', pos: 'tr' },
      { file: 'fresh-11.png', pos: 'bl' },
      { file: 'dried-13.png', pos: 'l' }
    ],
    5: [
      { file: 'fresh-13.png', pos: 'tl' },
      { file: 'fresh-21.png', pos: 'br' },
      { file: 'dried-9.png', pos: 'r', size: 'sm' }
    ],
    6: [
      { file: 'fresh-16.png', pos: 'tr', size: 'lg' },
      { file: 'fresh-8.png', pos: 'bl' },
      { file: 'dried-4.png', pos: 'l' }
    ]
  };

  const PRELOAD = {
    quiz: [
      { file: 'fresh-1.png', pos: 'tr' },
      { file: 'dried-16.png', pos: 'bl' },
      { file: 'fresh-54.png', pos: 'tl', size: 'sm' }
    ],
    chapters: [
      { file: 'fresh-2.png', pos: 'tl' },
      { file: 'fresh-18.png', pos: 'br' },
      { file: 'dried-11.png', pos: 'r', size: 'sm' }
    ]
  };

  const PETALS = {
    quiz: [
      'fresh-47.png',
      'fresh-45.png',
      'fresh-44.png',
      'fresh-47.png',
      'fresh-45.png'
    ],
    chapters: [
      'fresh-47.png',
      'fresh-45.png',
      'fresh-44.png',
      'fresh-47.png',
      'fresh-44.png'
    ]
  };

  function buildSlider(el) {
    const key = el.dataset.flowerSlider;
    const files = SLIDER[key] || SLIDER.quiz;
    const track = el.querySelector('.flower-slider__track');
    if (!track) return;

    track.innerHTML = files.map(file =>
      `<div class="flower-slider__slide"><img src="${src(file)}" alt="" draggable="false"></div>`
    ).join('');

    enableDragScroll(el);
  }

  function enableDragScroll(el) {
    let down = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('mousedown', e => {
      down = true;
      el.classList.add('is-dragging');
      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      down = false;
      el.classList.remove('is-dragging');
    });

    el.addEventListener('mousemove', e => {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - startX);
    });

    el.addEventListener('touchstart', e => {
      startX = e.touches[0].pageX;
      scrollLeft = el.scrollLeft;
    }, { passive: true });

    el.addEventListener('touchmove', e => {
      el.scrollLeft = scrollLeft - (e.touches[0].pageX - startX);
    }, { passive: true });
  }

  window.initFlowerSliderDrag = enableDragScroll;

  function buildPetals() {
    const files = PETALS[page] || PETALS.quiz;
    if (!files.length) return;

    const field = document.createElement('div');
    field.className = 'petal-field';
    field.setAttribute('aria-hidden', 'true');
    document.body.appendChild(field);

    const petals = files.map((file, i) => {
      const el = document.createElement('img');
      el.className = 'petal';
      el.src = src(file);
      el.alt = '';
      el.draggable = false;
      const data = {
        el,
        x: 24 + i * 48,
        y: 80 + i * 56,
        vx: (i % 2 ? -1 : 1) * (0.09 + i * 0.01),
        vy: (i % 3 ? 1 : -1) * (0.07 + i * 0.01),
        angle: i * 17,
        spin: (i % 2 ? -1 : 1) * (0.05 + i * 0.008),
        scale: 0.6 + (i % 3) * 0.12,
        dragging: false,
        dx: 0,
        dy: 0,
        lane: i
      };
      el.style.setProperty('--petal-size', `${54 + (i % 3) * 10}px`);
      field.appendChild(el);
      return data;
    });

    function laneBounds(p) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const leftLane = { xMin: 6, xMax: Math.min(110, w * 0.18), yMin: 44, yMax: Math.max(120, h * 0.42) };
      const rightLane = { xMin: Math.max(w - 118, w * 0.8), xMax: w - 12, yMin: 52, yMax: Math.max(140, h * 0.46) };
      const bottomLeftLane = { xMin: 10, xMax: Math.min(132, w * 0.2), yMin: Math.max(h * 0.58, 220), yMax: h - 20 };
      const bottomRightLane = { xMin: Math.max(w - 144, w * 0.78), xMax: w - 14, yMin: Math.max(h * 0.62, 240), yMax: h - 18 };
      const topLane = { xMin: Math.max(72, w * 0.28), xMax: Math.min(w - 72, w * 0.72), yMin: 4, yMax: Math.min(92, h * 0.14) };
      return [leftLane, rightLane, bottomLeftLane, bottomRightLane, topLane][p.lane % 5];
    }

    function clampToViewport(p) {
      const box = laneBounds(p);
      p.x = Math.max(box.xMin, Math.min(box.xMax, p.x));
      p.y = Math.max(box.yMin, Math.min(box.yMax, p.y));
    }

    function seedLayout() {
      petals.forEach((p, i) => {
        const box = laneBounds(p);
        p.x = box.xMin + ((box.xMax - box.xMin) * (0.35 + (i % 2) * 0.22));
        p.y = box.yMin + ((box.yMax - box.yMin) * (0.3 + (i % 3) * 0.16));
        clampToViewport(p);
      });
    }

    let active = null;

    petals.forEach(p => {
      p.el.addEventListener('pointerdown', e => {
        active = p;
        p.dragging = true;
        p.dx = e.clientX - p.x;
        p.dy = e.clientY - p.y;
        p.el.classList.add('is-dragging');
        p.el.setPointerCapture(e.pointerId);
      });

      p.el.addEventListener('pointermove', e => {
        if (active !== p || !p.dragging) return;
        p.x = e.clientX - p.dx;
        p.y = e.clientY - p.dy;
        clampToViewport(p);
      });

      const end = () => {
        if (!p.dragging) return;
        p.dragging = false;
        p.el.classList.remove('is-dragging');
        active = null;
      };

      p.el.addEventListener('pointerup', end);
      p.el.addEventListener('pointercancel', end);
    });

    function render() {
      petals.forEach((p, i) => {
        if (!p.dragging) {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin;

          const box = laneBounds(p);
          if (p.x <= box.xMin || p.x >= box.xMax) p.vx *= -1;
          if (p.y <= box.yMin || p.y >= box.yMax) p.vy *= -1;
          p.y += Math.sin((Date.now() / 900) + i) * 0.18;
        }

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg) scale(${p.scale})`;
      });

      requestAnimationFrame(render);
    }

    seedLayout();
    window.addEventListener('resize', () => petals.forEach(clampToViewport), { passive: true });
    render();
  }

  const page = document.body.getAttribute('data-page') || 'quiz';
  const map = page === 'chapters' ? CHAPTERS : QUIZ;

  document.querySelectorAll('.screen[data-screen]').forEach(screen => {
    const items = map[screen.getAttribute('data-screen')];
    if (items) screen.insertAdjacentHTML('afterbegin', layer(items));
  });

  document.querySelectorAll('[data-flower-slider]').forEach(buildSlider);
  buildPetals();

  const pre = document.getElementById('preloader');
  if (pre && PRELOAD[page]) pre.insertAdjacentHTML('afterbegin', layer(PRELOAD[page]));
})();
