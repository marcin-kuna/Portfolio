// MENU & OVERLAY

const bgChange = document.querySelectorAll('.bg-change')
const menuBtn = document.querySelector('.menu-btn')
const navLinks = document.querySelectorAll('.nav-link')

let menuOpen = false

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-open')

    navLinks.forEach(element => {
        element.classList.toggle('menu-open')
    })

    if(menuOpen === false) {
        bgChange.forEach(element => {
            element.classList.add('slide')
        })
    } else {
        setTimeout(() => {
            bgChange.forEach(element => {
                element.classList.remove('slide')
            })
        }, 1000)
    }

    menuOpen = !menuOpen
})

// SMOOTH SCROLL

navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));

function navLinkClick(event) {
    smoothScroll(event);
    menuBtn.classList.toggle('menu-open')

    navLinks.forEach(element => {
        element.classList.toggle('menu-open')
    })

    if(menuOpen === false) {
        bgChange.forEach(element => {
            element.classList.add('slide')
        })
    } else {
        setTimeout(() => {
            bgChange.forEach(element => {
                element.classList.remove('slide')
            })
        }, 1000)
    }

    menuOpen = !menuOpen
}

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop; 
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if(!start) start = timestamp;
      const progress = timestamp - start;
    //   window.scrollTo(0, distance*(progress/duration) + startPosition);    //linear
      window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
      if(progress < duration) window.requestAnimationFrame(step);
    }
}

// EASING FOR SMOOTH SCROLL

function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
