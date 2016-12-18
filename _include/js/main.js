if (document.documentElement.classList.contains('page--home')) {
  const container = document.getElementById('project-container');
  const controlNext = document.getElementById('controls--next');
  const controlPrevious = document.getElementById('controls--previous');
  const numberPrevious = document.querySelector('.project-container__previous');
  const progressLine = document.getElementById('progress-line');

  if (container.addEventListener) {
    container.addEventListener('mousewheel', throttle(1250, MouseWheelHandler), false);
    container.addEventListener('DOMMouseScroll', throttle(1250, MouseWheelHandler), false);
  } else container.attachEvent('onmousewheel', throttle(1250, MouseWheelHandler));

  function throttle(limit, fn) {
    let wait = false;
    return function () {
      if (!wait) {
        fn.apply(this, arguments);
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  }

  let currentActive = 0;
  const projects = document.getElementsByClassName('project');

  function progress() {
    switch (currentActive) {
      case 0:
        progressLine.style.height = '25%';
        break;
      case 1:
        progressLine.style.height = '50%';
        break;
      case 2:
        progressLine.style.height = '75%';
        break;
      case 3:
        progressLine.style.height = '100%';
        break;
    }
  }

  controlNext.addEventListener('click', throttle(800, function () {
    projects[currentActive].classList.remove('project--active');
    if (currentActive !== 3) {
      currentActive++;
      projects[currentActive].classList.add('project--active');
      numberPrevious.innerText = '0' + (currentActive + 1);
    } else {
      currentActive = 0;
      projects[currentActive].classList.add('project--active');
      numberPrevious.innerText = '0' + (currentActive + 1);
    }

    progress();
  }));

  controlPrevious.addEventListener('click', throttle(800, function () {
    projects[currentActive].classList.remove('project--active');
    if (currentActive !== 0) {
      currentActive--;
      projects[currentActive].classList.add('project--active');
      numberPrevious.innerText = '0' + (currentActive + 1);
    } else {
      currentActive = 3;
      projects[currentActive].classList.add('project--active');
      numberPrevious.innerText = '0' + (currentActive + 1);
    }

    progress();
  }));

  function MouseWheelHandler(e) {

    var e = window.event || e; // old IE support only works with var
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (delta > 0) {
      projects[currentActive].classList.remove('project--active');
      if (currentActive !== 0) {
        currentActive--;
        projects[currentActive].classList.add('project--active');
        numberPrevious.innerText = '0' + (currentActive + 1);
      } else {
        currentActive = 3;
        projects[currentActive].classList.add('project--active');
        numberPrevious.innerText = '0' + (currentActive + 1);
      }
    } else {
      projects[currentActive].classList.remove('project--active');
      if (currentActive !== 3) {
        currentActive++;
        projects[currentActive].classList.add('project--active');
        numberPrevious.innerText = '0' + (currentActive + 1);
      } else {
        currentActive = 0;
        projects[currentActive].classList.add('project--active');
        numberPrevious.innerText = '0' + (currentActive + 1);
      }

    }

    progress();
  }
} else {
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();

  document.querySelector('.scroll-button').onclick = function () {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    let currentTime = 0;

    function ease(p) {
      if ((p /= 0.5) < 1) {
        return 0.5 * Math.pow(p, 5);
      }

      return 0.5 * (Math.pow((p - 2), 5) + 2);
    }

    function tick() {
      currentTime += 1 / 60;

      const p = currentTime / 1.25; //1.25 is how long for animation to take
      const t = ease(p);

      if (p < 1) {
        requestAnimFrame(tick);

        window.scrollTo(0, scrollY + ((0 - scrollY) * t));
      } else {
        window.scrollTo(0, 0);
      }
    }

    tick();
  };

  const scrollButton = document.querySelector('.scroll-button');
  document.addEventListener('scroll', function () {
    if (window.pageYOffset > 1150) {
      scrollButton.classList.add('scroll-button--active');
    } else {
      scrollButton.classList.remove('scroll-button--active');
    }
  });

  (function () {
    if (window.pluso)if (typeof window.pluso.start == 'function') return;
    if (window.ifpluso == undefined) {
      window.ifpluso = 1;
      const d = document;
      const s = d.createElement('script');
      const g = 'getElementsByTagName';
      s.type = 'text/javascript';
      s.charset = 'UTF-8';
      s.async = true;
      s.src = ('https:' == window.location.protocol ? 'https' : 'http')
          + '://share.pluso.ru/pluso-like.js';
      const h = d[g]('body')[0];
      h.appendChild(s);
    }
  })();
}
