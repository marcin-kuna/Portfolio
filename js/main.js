// MENU & OVERLAY
const bgChange = document.querySelectorAll('.bg-change')
const menuBtn = document.querySelector('.menu-btn')
const navLinks = document.querySelectorAll('.nav-link')
const menuOverlay = document.querySelector('.menu-overlay')

let menuOpen = false

function disableScrolling(){
    let y = window.pageYOffset;
    window.onscroll=function(){window.scrollTo(0, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

const openMenu = () => {
    if(menuOverlay.matches('.menu-open')) {
        setTimeout(() => {
            menuOverlay.classList.remove('menu-open')
        }, 1200)
    } else {
        menuOverlay.classList.add('menu-open')
    }

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

    if(menuOpen) {
        disableScrolling()
    } else {
        enableScrolling()
    }
    
}

menuBtn.addEventListener('click', openMenu)

// SMOOTH SCROLL
navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
document.querySelector('.button-up').addEventListener('click', smoothScroll);

function navLinkClick(event) {
    smoothScroll(event);
    openMenu()
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

// WORKS
const projects = document.querySelectorAll('.project-wrapper')

projects.forEach((element) => {
    element.addEventListener('click', () => {
        element.classList.toggle('project-open')

        // For lerp scroll only
        // let y = window.pageYOffset

        // For no lerp scroll on 'touchscreens'
        let y
        if (window.matchMedia("(min-width: 1024px)").matches) {
            y = window.pageYOffset
        } else {
            y = 0
        }
        
        if(element.matches('.project-open')) {

            element.style.top = `${y}px`
            menuBtn.classList.add('menu-btn-hidden')
            // firefox, chrome
            document.documentElement.style.overflow = 'hidden';
            // ie only
            document.body.scroll = "no"
        } else {
            element.style.top = 'initial'
            menuBtn.classList.remove('menu-btn-hidden')
            // firefox, chrome
            document.documentElement.style.overflow = 'initial'
            // ie only
            document.body.scroll = "yes"
        }
    })
})