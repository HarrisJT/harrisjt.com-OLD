'use strict';

const HJT = {
  init: function () {
    if (document.documentElement.classList.contains('page--home')) {
      HJT.addProjectToggler();
    } else if (document.documentElement.classList.contains('page--case')) {
      HJT.addScrollToTop();
    }

    HJT.installServiceWorker();
  },

  addEvent: function (el, type, handler) {
    if (el.attachEvent) {
      el.attachEvent('on' + type, handler);
    } else {
      el.addEventListener(type, handler);
    }
  },

  updatePagination: function (el, number, line) {
    number.innerText = el.getAttribute('data-project-number');
    line.style.height = `${parseInt(el.getAttribute('data-project-number')) * 25}%`;
  },

  addClass: function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
  },

  removeClass: function (el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  },

  addProjectToggler: function () {
    const container = document.getElementById('project-container');
    const controlNext = document.getElementById('controls--next');
    const controlPrevious = document.getElementById('controls--previous');
    const numberPrevious = document.querySelector('.project-container__previous');
    const progressLine = document.getElementById('progress-line');
    const projects = Array.from(document.querySelectorAll('.project'));

    if (container.addEventListener) {
      container.addEventListener('mousewheel', throttle(MouseWheelHandler, 1150), false);
      container.addEventListener('DOMMouseScroll', throttle(MouseWheelHandler, 1150), false);
    } else container.attachEvent('onmousewheel', throttle(MouseWheelHandler, 1150));

    HJT.addEvent(controlNext, 'click', throttle(function () {
      HJT.removeClass(projects[0], 'project--active');
      projects.push(projects.splice(0, 1)[0]);
      HJT.addClass(projects[0], 'project--active');
      HJT.updatePagination(projects[0], numberPrevious, progressLine);
    }, 925));

    HJT.addEvent(controlPrevious, 'click', throttle(function () {
      HJT.removeClass(projects[0], 'project--active');
      projects.unshift(projects.splice(projects.length - 1, 1)[0]);
      HJT.addClass(projects[0], 'project--active');
      HJT.updatePagination(projects[0], numberPrevious, progressLine);
    }, 925));

    function MouseWheelHandler(e) {
      e = window.event || e; // old IE support
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      if (delta > 0) {
        HJT.removeClass(projects[0], 'project--active');
        projects.unshift(projects.splice(projects.length - 1, 1)[0]);
        HJT.addClass(projects[0], 'project--active');
      } else {
        HJT.removeClass(projects[0], 'project--active');
        projects.push(projects.splice(0, 1)[0]);
        HJT.addClass(projects[0], 'project--active');
      }

      HJT.updatePagination(projects[0], numberPrevious, progressLine);
    }
  },

  addScrollToTop: function () {
    const scrollButton = document.querySelector('.scroll-button');
    const scrollButtonBg = document.querySelector('.scroll-button__bg');

    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
    })();

    HJT.addEvent(scrollButton, 'click', function () {
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
    });

    HJT.addEvent(document, 'scroll', function () {
      if (window.pageYOffset > 1100) {
        HJT.addClass(scrollButton, 'scroll-button--active');
        HJT.addClass(scrollButtonBg, 'scroll-button__bg--active');
      } else {
        HJT.removeClass(scrollButton, 'scroll-button--active');
        HJT.removeClass(scrollButtonBg, 'scroll-button__bg--active');
      }
    });
  },

  installServiceWorker: function () {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/harrisjt.com/sw.js', {
        scope: './',
      });
      window.addEventListener('load', function () {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({command: 'trimCaches'});
        }
      });
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
    HJT.init();
  }
});

// My simplified implementation of the Lodash throttle & debounce.
function throttle(func, wait) {
  let lastArgs;
  let lastThis;
  let result;
  let timerId;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  let leading = true;
  let maxing = true;
  let maxWait = wait;
  let trailing = false;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const result = wait - timeSinceLastCall;

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
    (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function throttled(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    let _this = this;

    lastArgs = args;
    lastThis = _this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  return throttled;
}

