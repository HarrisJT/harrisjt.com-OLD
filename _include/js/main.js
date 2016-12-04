console.log("working");
var container = document.getElementById("project-container");
var controlNext = document.getElementById("controls--next");
var controlPrevious = document.getElementById("controls--previous");
var numberPrevious = document.getElementById("previous-number");
var progressLine = document.getElementById("progress-line");

if (container.addEventListener) {
    // IE9, Chrome, Safari, Opera
    container.addEventListener("mousewheel", throttle(1250, MouseWheelHandler), false);
    // Firefox
    container.addEventListener("DOMMouseScroll", throttle(1250, MouseWheelHandler), false);
}
// IE 6/7/8
else container.attachEvent("onmousewheel", throttle(1250, MouseWheelHandler));


function throttle(limit, fn) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            fn.apply(this, arguments);  // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

var projects = [document.getElementById("project0"), document.getElementById("project1"), document.getElementById("project2"), document.getElementById("project3")];
var currentActive = 0;


function progress() {
    if (currentActive === 0) {
        progressLine.style.height = '25%';
    } else if (currentActive === 1) {
        progressLine.style.height = '50%';
    } else if (currentActive === 2) {
        progressLine.style.height = '75%';
    } else if (currentActive === 3) {
        progressLine.style.height = '100%';
    }
}


controlNext.addEventListener("click", throttle(800, function () {
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

controlPrevious.addEventListener("click", throttle(800, function () {
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
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (delta > 0) {
        console.log("scroll up");
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
        console.log("scroll down");
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
