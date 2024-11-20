// dev. rubic-on.com 
document.addEventListener("DOMContentLoaded", () => {
    // parallax bg
    let meteor = document.querySelectorAll('.meteorite');
    if(meteor){
        for(let el=0; el<meteor.length; el++){
            window.addEventListener('mousemove', function(e) { 
                let x = e.clientX / window.innerWidth;
                let y = e.clientY / window.innerHeight;     
                meteor[el].style.transform = 'translate(-' + x * 25 + 'px, -' + y * 25 + 'px)';
            });
        }
    }

    const cardItem = document.querySelectorAll('.card');
    for(let e=0;e<cardItem.length; e++){
        cardItem[e].addEventListener('mouseover', (e) => {
            cardItem[0].classList.remove('active');
        })
    }
    // slider
    // const cardsContainer = document.querySelector('.cards_container'); // card
    const informContainer = document.querySelector('.inform_container'); //inform
    // if(cardsContainer || informContainer){
    if(informContainer){
        function slideElements(slideEl){
            let startX = 0;
            let isDown = false;
            slideEl.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slideEl.offsetLeft;
                scrollLeft = slideEl.scrollLeft;
            });
            slideEl.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slideEl.offsetLeft;
                const walk = (x - startX) * 2;
                slideEl.scrollLeft = scrollLeft - walk;
            });
            slideEl.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.pageX - slideEl.offsetLeft;
                scrollLeft = slideEl.scrollLeft;
            });
            slideEl.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slideEl.offsetLeft;
                const walk = (x - startX) * 2;
                slideEl.scrollLeft = scrollLeft - walk;
            });
            slideEl.addEventListener('touchend', () => {isDown = false;});
            slideEl.addEventListener('touchcancel', () => {isDown = false;});
            slideEl.addEventListener('mouseleave', () => {isDown = false;});
            slideEl.addEventListener('mouseup', () => {isDown = false;});
        }
        // slideElements(cardsContainer);
        window.addEventListener('resize', function () {
            checkWidthWindow();
        });
        checkWidthWindow();
        // checkWidthWindow
        function checkWidthWindow(){
            if (window.innerWidth <= 1065) {
                slideElements(informContainer);
                informContainer.classList.add('mobrect');
            }
        }
    }
    // nav
    const navbtns = document.querySelectorAll(".navbtns span");
    const elHead = document.getElementById("head").offsetTop;
    const elRules = document.getElementById("rules").offsetTop;
    const elInformer = document.getElementById("informer").offsetTop;
    if(navbtns[0]){
        addEventListener('scroll', ()=>{
            if(elHead < window.scrollY){
                clearnavbtns();
                navbtns[0].classList.add('active');
            }
            if(elRules < window.scrollY){
                clearnavbtns();
                navbtns[1].classList.add('active');
            }
            if(elInformer < window.scrollY){
                clearnavbtns();
                navbtns[2].classList.add('active');
            }
            function clearnavbtns(){
                for(let e=0; e<navbtns.length; e++){
                    navbtns[e].classList.remove('active');
                }
            }
        })
    }
    console.log('X Empire project');
    console.log('%c Site developed by rubic-on.com ', 'background: #000; color: #007eff; padding: 10px');
});