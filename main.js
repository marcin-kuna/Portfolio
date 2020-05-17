const bgChange = document.querySelectorAll('.bg-change')

// const init = () => {

//     setTimeout(() => {
//         bgChange.forEach(element => {
//             element.classList.add('slide')
//         });

//         setTimeout(() => {
//             bgChange.forEach(element => {
//                 element.classList.remove('slide')
//             }); 
//         }, 2000)


//     }, 2000);

// }

// init()


// menu

const menuBtn = document.querySelector('.menu-btn')
// let menuOpen = false

// menuBtn.addEventListener('click', () => {
//     if(!menuOpen) {
//         menuBtn.classList.add('open')
//         menuOpen = true
//     } else {
//         menuBtn.classList.remove('open')
//         menuOpen = false
//     }
// })

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-open')
    bgChange.forEach(element => {
        element.classList.toggle('slide')
    })
})