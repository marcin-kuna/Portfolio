const scrolling = requestAnimationFrame || 
               function(callback) {window.setTimeout(callback, 1000/60)};

let elementsToShow = document.querySelectorAll('.animate-on-scroll');

function loop() {
    elementsToShow.forEach((element) => {
        if(isElementInViewport(element)) {
            element.classList.add('is-visible')
        }
    });
    scrolling(loop);
}

loop();

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}

function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}