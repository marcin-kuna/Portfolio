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

let touching = false

window.addEventListener('touchstart', function onFirstTouch() {
  
    // or set some global variable
    touching = true;
  
    
  
    // we only need to know once that a human touched the screen, so we can stop listening now
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);

  if(!touching) {
    lerpScroll()
  }
// lerpScroll()

// Adjustable height on orientation/screen size change (prevent fixed height whitespace 'bug')
// window.onresize = lerpScroll

