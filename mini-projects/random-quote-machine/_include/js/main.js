let currentQuote = 'A people that values its privileges above its principles soon loses both.';
let currentAuthor = 'Dwight D. Eisenhower';
const quoteElement = document.querySelector('.quote-group__quote');
const authorElement = document.querySelector('.quote-group__author');

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function openURL(url, width, height) {
  window.open(url, 'Share', `width=${width}, height=${height}, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0`);
}

function getQuote() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=', true);
  request.setRequestHeader('X-Mashape-Key', '2goMqE557YmshrBAZx9tiX6vq5I6p1IXclEjsn6Efgp5xQ37BQ');
  request.setRequestHeader('Accept', 'application/json');
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      const resp = JSON.parse(this.response);
      quoteElement.classList.remove('quote-active');
      authorElement.classList.remove('quote-active');
      currentQuote = resp.quote;
      currentAuthor = resp.author;
      quoteElement.textContent = `${currentQuote}`;
      authorElement.textContent = `-${currentAuthor}`;
    } else {
      quoteElement.textContent = `${currentQuote}`;
      authorElement.textContent = `-${currentAuthor}`;
      quoteElement.classList.remove('quote-active');
      authorElement.classList.remove('quote-active');
    }
  };

  request.onerror = function () {
    quoteElement.textContent = `Error with Request}`;
    authorElement.textContent = `-developer`;
    quoteElement.classList.remove('quote-active');
    authorElement.classList.remove('quote-active');
  };

  setTimeout(function () {
    quoteElement.classList.add('quote-active');
    authorElement.classList.add('quote-active');
  }, 500);

  request.send();
}

window.onload = function () {
  getQuote();
  document.body.keypress = function (e) {
    let eventObject = window.event ? event : e;
    let keyCode = eventObject.charCode ? eventObject.charCode : eventObject.keyCode;
    if (keyCode === 0 || keyCode === 32) {
      e.preventDefault();
      getQuote();
    }
  };

  document.querySelector('.button-group__new-quote').addEventListener('click', getQuote);

  document.querySelector('.button-group__twitter').addEventListener('click', function () {
    if (!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&text='
          + encodeURIComponent('"' + currentQuote + '" -' + currentAuthor), 640, 300);
    }
  });

  document.querySelector('.button-group__tumblr').addEventListener('click', function () {
    if (!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='
          + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote)
          + '&canonicalUrl=' + encodeURIComponent(window.location.href), 640, 600);
    }
  });

  document.querySelector('.button-group__google').addEventListener('click', function () {
    if (!inIframe()) {
      openURL('https://www.google.com/#q=' + encodeURIComponent(currentQuote), 1000, 800);
    }
  });
};

