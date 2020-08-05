// MENU & OVERLAY
const bgChange = document.querySelectorAll('.bg-change')
const menuBtn = document.querySelector('.menu-btn')
const navLinks = document.querySelectorAll('.nav-link')
const menuOverlay = document.querySelector('.menu-overlay')
let menuOpen = false

const moveMenuOverlay = () => {
    if(menuOverlay.matches('.menu-open')) {
        setTimeout(() => {
            menuOverlay.classList.remove('menu-open')
        }, 1200)
    } else {
        menuOverlay.classList.add('menu-open')
    }
}

const toggleMenuBtn = () => {
    menuBtn.classList.toggle('menu-open')
}

const toggleNavLinks = () => {
    navLinks.forEach(element => {
        element.classList.toggle('menu-open')
    })
}

const changeBackground = () => {
    if(!menuOpen) {
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
}

const disableScrolling = () => {
    const y = window.pageYOffset;
    window.onscroll = () => {
        window.scrollTo(0, y);
    };
}

const enableScrolling = () => {
    window.onscroll = () => {};
}

const openMenu = () => {
    moveMenuOverlay()
    toggleMenuBtn()
    toggleNavLinks()
    changeBackground()
    menuOpen = !menuOpen
    if(menuOpen) {
        disableScrolling()
    } else {
        enableScrolling()
    }  
}

menuBtn.addEventListener('click', openMenu)

// SMOOTH SCROLL

const easeInOutQuad = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop; 
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const step = (timestamp) => {
        if(!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
        if(progress < duration) window.requestAnimationFrame(step);
    }
    
    window.requestAnimationFrame(step);
}

const navLinkClick = (event) => {
    smoothScroll(event);
    openMenu()
}

navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
document.querySelector('.button-up').addEventListener('click', smoothScroll);

// LERP-SCROLL

const lerpScroll = () => {
    const body = document.body;
    const main = document.querySelector('main');
    
    let sx = 0;
    let sy = 0;
    let dx = sx;
    let dy = sy;
    
    body.style.height = main.clientHeight + 'px';
    
    main.style.position = 'fixed';
    main.style.top = 0;
    main.style.left = 0;
    
    window.addEventListener('scroll', scroll);
    
    function scroll() {
        sx = window.pageXOffset;
        sy = window.pageYOffset;
    }
    
    window.requestAnimationFrame(render);
    
    function render() {
        dx = lerp(dx, sx, 0.07);
        dy = lerp(dy, sy, 0.07);
        dx = Math.floor(dx * 100) / 100;
        dy = Math.floor(dy * 100) / 100;
    
        main.style.transform = `translate(-${dx}px, -${dy}px)`;
    
        window.requestAnimationFrame(render);
    }
    
    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }
}

// For no lerp scroll on 'touchscreens'
if (window.matchMedia("(min-width: 1024px)").matches) {
    lerpScroll()
    window.onresize = lerpScroll    // Adjustable height on orientation/screen size change (prevent fixed height whitespace 'bug')
   } 

// For lerp scroll only
// lerpScroll()
// Adjustable height on orientation/screen size change (prevent fixed height whitespace 'bug')
// window.onresize = lerpScroll

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
            document.documentElement.style.overflow = 'hidden'; // firefox, chrome
            document.body.scroll = "no" // ie only
        } else {
            element.style.top = 'initial'
            menuBtn.classList.remove('menu-btn-hidden')
            document.documentElement.style.overflow = 'initial' // firefox, chrome
            document.body.scroll = "yes"    // ie only
        }
    })
})

// ANIMATIONS

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