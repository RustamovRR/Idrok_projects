const btn = document.getElementById('btn_menu')
const top_menu = document.querySelector('.top_container');
btn.addEventListener('click', () => {
    top_menu.classList.toggle('top_transform')
})


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// Hamburger menu//////////////////////////////////////////////////////////////////////////////////////////////////////
let menuBtn = document.getElementById('btn_menu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});
