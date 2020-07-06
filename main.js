// const heroSpans = document.querySelectorAll('.hero-span')

// window.onload = () => {
//     heroSpans.forEach(element => {
//         element.classList.add('loaded')
//     })
// }


// const hero = document.querySelector('.hero')

// hero.style.height = window.innerHeight

// MENU & OVERLAY

const bgChange = document.querySelectorAll('.bg-change')
const menuBtn = document.querySelector('.menu-btn')
const navLinks = document.querySelectorAll('.nav-link')
const menuOverlay = document.querySelector('.menu-overlay')

let menuOpen = false

function disableScrolling(){
    // var x=window.scrollX;
    var y=window.pageYOffset;
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


const projects = document.querySelectorAll('.project-wrapper')



projects.forEach((element) => {
    

    element.addEventListener('click', () => {
        
        
        // if(element.matches('.project-open')) {
            //     element.requestFullscreen()
            // } else {
                //     document.exitFullscreen()
                // }
                // disableScrolling()

        element.classList.toggle('project-open')
        let y = window.pageYOffset;
        // window.scrollTo(0, y)
        if(element.matches('.project-open')) {
            element.style.top = `${y}px`
            // menuBtn.style.transition = 'none'
            // menuBtn.style.visibility = 'hidden'
            menuBtn.classList.add('menu-btn-hidden')
            document.documentElement.style.overflow = 'hidden';  // firefox, chrome
            document.body.scroll = "no"; // ie only
        } else {
            element.style.top = '0'
            menuBtn.classList.remove('menu-btn-hidden')
            // menuBtn.style.visibility = 'visible'
            document.documentElement.style.overflow = 'initial';  // firefox, chrome
            document.body.scroll = "yes"; // ie only
        }
    })
})