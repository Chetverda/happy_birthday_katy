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
      { file: 'fresh-17.png', pos: 'br' },
      { file: 'dried-1.png', pos: 'r' }
    ],
    2: [
      { file: 'fresh-5.png', pos: 'tr' },
      { file: 'fresh-24.png', pos: 'bl' }
    ],
    3: [
      { file: 'fresh-12.png', pos: 'tl' },
      { file: 'fresh-30.png', pos: 'br' },
      { file: 'fresh-44.png', pos: 'r', size: 'sm' }
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
      { file: 'fresh-45.png', pos: 'br', size: 'sm' }
    ],
    4: [
      { file: 'fresh-6.png', pos: 'tr' },
      { file: 'fresh-11.png', pos: 'bl' },
      { file: 'dried-13.png', pos: 'l' }
    ],
    5: [
      { file: 'fresh-3.png', pos: 'tl' },
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
      { file: 'fresh-44.png', pos: 'tl', size: 'sm' }
    ],
    chapters: [
      { file: 'fresh-2.png', pos: 'tl' },
      { file: 'fresh-18.png', pos: 'br' },
      { file: 'dried-11.png', pos: 'r', size: 'sm' }
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

  const page = document.body.getAttribute('data-page') || 'quiz';
  const map = page === 'chapters' ? CHAPTERS : QUIZ;

  document.querySelectorAll('.screen[data-screen]').forEach(screen => {
    const items = map[screen.getAttribute('data-screen')];
    if (items) screen.insertAdjacentHTML('afterbegin', layer(items));
  });

  document.querySelectorAll('[data-flower-slider]').forEach(buildSlider);

  const pre = document.getElementById('preloader');
  if (pre && PRELOAD[page]) pre.insertAdjacentHTML('afterbegin', layer(PRELOAD[page]));
})();
