
AOS.init({
    once: true
});


const btn = document.getElementById('btn_menu')
const top_menu = document.querySelector('.top_container');
btn.addEventListener('click', () => {
    top_menu.classList.toggle('top_transform')
})

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}




//Link/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let gallery_link = document.getElementsByClassName('gallery_link')

for (var i = 0; i < gallery_link.length; i++) {
    gallery_link[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    });
}

let team_link = document.getElementsByClassName('team_link')

for (var i = 0; i < team_link.length; i++) {
    team_link[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    });
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


// Swiper////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var swiper = new Swiper('.swiper-container1', {
    scrollbar: {
        el: '.gallery_bottom_border',
    },
});

var swiper = new Swiper('.swiper-container2', {
    scrollbar: {
        el: '.team_bottom_border',
    },
    breakpoints: {
        '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
        },
    }
});