console.log("working");
var container = document.getElementById("project-container");
if (container.addEventListener) {
    // IE9, Chrome, Safari, Opera
    container.addEventListener("mousewheel", throttle(1250), false);
    // Firefox
    container.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else container.attachEvent("onmousewheel", throttle(1250));


function throttle(limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            MouseWheelHandler.call();          // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

var projects = [document.getElementById("project0"), document.getElementById("project1"), document.getElementById("project2"), document.getElementById("project3")];
var currentActive = 0;

function MouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (delta > 0) {
        console.log("scroll up");
        if (currentActive !== 0) {
            projects[currentActive].classList.remove('project--active');
            currentActive--;
            projects[currentActive].classList.add('project--active');
        }
    } else {
        console.log("scroll down");
        if (currentActive !== 3) {
            projects[currentActive].classList.remove('project--active');
            currentActive++;
            projects[currentActive].classList.add('project--active');
        }

    }

    return false;
}
