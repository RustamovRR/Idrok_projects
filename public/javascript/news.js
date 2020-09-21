const btn = document.getElementById('btn_menu')
const top_menu = document.querySelector('.top_container');
btn.addEventListener('click', () => {
    top_menu.classList.toggle('top_transform')
})

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

let link = document.getElementsByClassName('link')

for (var i = 0; i < link.length; i++) {
    link[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    });
}

let moblink = document.getElementsByClassName('mob_link')

for (var i = 0; i < moblink.length; i++) {
    moblink[i].addEventListener("click", function () {
        var mobcurrent = document.getElementsByClassName(" active");
        mobcurrent[0].className = mobcurrent[0].className.replace(" active", "");
        this.className += "  active";
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