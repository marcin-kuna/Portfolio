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

