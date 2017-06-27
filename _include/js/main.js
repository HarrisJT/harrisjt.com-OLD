'use strict';

const HJT = {
  init: function () {
    if (document.documentElement.classList.contains('page--home')) {
      HJT.projectToggler();
    } else if (document.documentElement.classList.contains('page--case') || document.documentElement.classList.contains('page--writing')) {
      HJT.scrollToTop();
      HJT.socialSharing();
      if (document.documentElement.classList.contains('page--writing')) {
        HJT.readingTime();
      }
    }

    window.onload = function () {
      HJT.installServiceWorker();
      HJT.addAnalytics();
    };
  },

  addEvent: function (el, type, func, passive = false) {
    if (el.attachEvent) {
      if (passive) {
        el.attachEvent('on' + type, func, { passive: true });
      } else {
        el.attachEvent('on' + type, func);
      }
    } else if (passive) {
      el.addEventListener(type, func, { passive: true });
    } else {
      el.addEventListener(type, func);
    }
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

  updatePagination: function (el, number, line) {
    number.innerText = el.getAttribute('data-project-number');
    line.style.height = `${parseInt(el.getAttribute('data-project-number')) / document.querySelectorAll('.project').length * 100}%`;
  },

  projectToggler: function () {
    const container = document.getElementById('project-container');
    const controlNext = document.getElementById('controls--next');
    const controlPrevious = document.getElementById('controls--previous');
    const numberPrevious = document.querySelector('.project-container__previous');
    const progressLine = document.getElementById('progress-line');
    const projects = Array.from(document.querySelectorAll('.project'));


    if (container.addEventListener) {
      HJT.addEvent(container, 'mousewheel', throttle(MouseWheelHandler, 1000), true);
      HJT.addEvent(container, 'DOMMouseScroll', throttle(MouseWheelHandler, 1000), true);
    } else HJT.addEvent(container, 'onmousewheel', throttle(MouseWheelHandler, 1000), true);

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

    let touchVars = {
      touchStartX: 0,
      touchMoveX: 0,
      touchStarted: false,
    };

    HJT.addEvent(container, 'touchstart', touchStart, true);
    HJT.addEvent(container, 'touchmove', touchMove, true);
    HJT.addEvent(container, 'touchend', touchEnd, true);

    function touchStart(e) {
      e.stopPropagation();
      if (!touchVars.touchStarted) {
        touchVars.touchStarted = true;
        let touch = e.changedTouches[0];
        touchVars.touchStartX = touch.clientX;
      }
    }

    function touchMove(e) {
      e.stopPropagation();
      let touch = e.changedTouches[0];
      touchVars.touchMoveX = touch.clientX;
    }

    function touchEnd() {
      const diff = Math.abs(touchVars.touchStartX - touchVars.touchMoveX);
      if (diff > 50 && touchVars.touchMoveX !== 0) {
        if (touchVars.touchMoveX > touchVars.touchStartX) {
          // swipe right
          HJT.removeClass(projects[0], 'project--active');
          projects.unshift(projects.splice(projects.length - 1, 1)[0]);
          HJT.addClass(projects[0], 'project--active');
        } else {
          // swipe left
          HJT.removeClass(projects[0], 'project--active');
          projects.push(projects.splice(0, 1)[0]);
          HJT.addClass(projects[0], 'project--active');
        }

        HJT.updatePagination(projects[0], numberPrevious, progressLine);
        touchVars.touchStarted = false;
        touchVars.touchMoveX = 0;
      }
    }
  },

  readingTime: function () {
    const article = document.querySelector('.article');

    function getText(el) {
      let text = '';
      const length = el.childNodes.length;
      for (let i = 0; i < length; i++) {
        const node = el.childNodes[i];
        if (node.nodeType !== 8) {
          text += node.nodeType !== 1 ? node.nodeValue : getText(node);
        }
      }

      return text;
    }

    const readTime = Math.ceil((getText(article).split(/\s+/).length / 150));
    document.querySelector('.article__read-time').textContent = `${readTime} MIN READ`;

  },

  scrollToTop: function () {
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

        const p = currentTime / 1.1; // 1.1 is animation time in seconds
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
      if (window.pageYOffset > 900) {
        HJT.addClass(scrollButton, 'scroll-button--active');
        HJT.addClass(scrollButtonBg, 'scroll-button__bg--active');
      } else {
        HJT.removeClass(scrollButton, 'scroll-button--active');
        HJT.removeClass(scrollButtonBg, 'scroll-button__bg--active');
      }
    });
  },

  socialSharing: function () {
    const twitterButton = document.querySelector('.social-buttons__twitter');
    const facebookButton = document.querySelector('.social-buttons__facebook');
    const linkedinButton = document.querySelector('.social-buttons__linkedin');
    const twitter = {
      shareUrl: 'https://twitter.com/intent/tweet/',
      params: {
        text: document.title,
        url: window.location.href,
      },
    };
    const facebook = {
      shareUrl: 'https://www.facebook.com/dialog/share',
      params: {
        app_id: '146038212592206',
        href: window.location.href,
        display: 'popup',
        redirect_uri: 'https://harrisjt.com',
        quote: document.title,
      },
    };
    const linkedin = {
      shareUrl: 'https://www.linkedin.com/shareArticle',
      params: {
        mini: true,
        url: window.location.href,
        title: document.title,
      },
    };

    function buildWindow(site) {
      const p = site.params;
      const keys = Object.keys(p);
      let str = keys.length > 0 ? '?' : '';
      for (let i = 0; i < keys.length; i++) {
        if (str !== '?') {
          str += '&';
        }

        if (p[keys[i]]) {
          str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
        }
      }

      site.shareUrl += str;

      const left = window.innerWidth / 2 - 600 / 2 + window.screenX;
      const top = window.innerHeight / 2 - 480 / 2 + window.screenY;
      const popParams = `scrollbars=no,width=600,height=480,top=${top},left=${left}`;
      const newWindow = window.open(site.shareUrl, '', popParams);

      if (window.focus) {
        newWindow.focus();
      }
    }

    HJT.addEvent(twitterButton, 'click', function () {
      buildWindow(twitter);
    });

    HJT.addEvent(facebookButton, 'click', function () {
      buildWindow(facebook);
    });

    HJT.addEvent(linkedinButton, 'click', function () {
      buildWindow(linkedin);
    });

  },

  installServiceWorker: function () {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      HJT.addEvent(window, 'load', function () {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ command: 'trimCaches' });
        }
      });
    }
  },

  addAnalytics: function () {
    const TRACKING_ID = 'UA-89144841-1';
    const TRACKING_VERSION = '1';
    const NULL_VALUE = '(not set)';
    const dimensions = {
      TRACKING_VERSION: 'dimension1',
      CLIENT_ID: 'dimension2',
      WINDOW_ID: 'dimension3',
      HIT_ID: 'dimension4',
      HIT_TIME: 'dimension5',
      HIT_TYPE: 'dimension6',
      HIT_SOURCE: 'dimension7',
      VISIBILITY_STATE: 'dimension8',
    };

    const metrics = {
      RESPONSE_END_TIME: 'metric1',
      DOM_LOAD_TIME: 'metric2',
      WINDOW_LOAD_TIME: 'metric3',
    };

    const init = () => {
      window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));
      createTracker();
      trackCustomDimensions();
      sendInitialPageview();
      sendNavigationTimingMetrics();
    };

    const createTracker = () => {
      ga('create', TRACKING_ID, 'auto');
      ga('set', 'transport', 'beacon');
    };

    const trackCustomDimensions = () => {
      Object.keys(dimensions).forEach((key) => {
        ga('set', dimensions[key], NULL_VALUE);
      });
      ga((tracker) => {
        tracker.set({
          [dimensions.TRACKING_VERSION]: TRACKING_VERSION,
          [dimensions.CLIENT_ID]: tracker.get('clientId'),
          [dimensions.WINDOW_ID]: uuid(),
        });
      });

      ga((tracker) => {
        const originalBuildHitTask = tracker.get('buildHitTask');
        tracker.set('buildHitTask', (model) => {
          const qt = model.get('queueTime') || 0;
          model.set(dimensions.HIT_TIME, String(new Date - qt), true);
          model.set(dimensions.HIT_ID, uuid(), true);
          model.set(dimensions.HIT_TYPE, model.get('hitType'), true);
          model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true);

          originalBuildHitTask(model);
        });
      });
    };

    const sendInitialPageview = () => {
      ga('send', 'pageview', { [dimensions.HIT_SOURCE]: 'pageload' });
    };

    const sendNavigationTimingMetrics = () => {
      if (!(window.performance && window.performance.timing)) return;
      if (document.readyState != 'complete') {
        window.addEventListener('load', sendNavigationTimingMetrics);
        return;
      }

      const nt = performance.timing;
      const navStart = nt.navigationStart;

      const responseEnd = Math.round(nt.responseEnd - navStart);
      const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
      const windowLoaded = Math.round(nt.loadEventStart - navStart);

      const allValuesAreValid = (...values) => values.every((value) => value > 0 && value < 6e6);

      if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
        ga('send', 'event', {
          eventCategory: 'Navigation Timing',
          eventAction: 'track',
          nonInteraction: true,
          [metrics.RESPONSE_END_TIME]: responseEnd,
          [metrics.DOM_LOAD_TIME]: domLoaded,
          [metrics.WINDOW_LOAD_TIME]: windowLoaded,
        });
      }
    };

    const uuid = function b(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
          ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    };

    init();
  },
};

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

document.addEventListener('DOMContentLoaded', function () {
  if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
    HJT.init();
  }

  console.info('Designed and Developed by Harris J. Thompson\nTwitter - www.twitter.com/HarrisJT_\nGitHub - www.github.com/HarrisJT');
});

