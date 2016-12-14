const container = document.getElementById('project-container');
const controlNext = document.getElementById('controls--next');
const controlPrevious = document.getElementById('controls--previous');
const numberPrevious = document.getElementById('previous-number');
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

const projects = [document.getElementById('project0'), document.getElementById('project1'),
  document.getElementById('project2'), document.getElementById('project3'),];
let currentActive = 0;

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
  var e = window.event || e; // old IE support
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
