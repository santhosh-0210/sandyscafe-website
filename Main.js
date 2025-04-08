let Navbar = document.querySelector('.navbar');
document.querySelector('#menu-button').onclick = () => {
    Navbar.classList.toggle('active');
    Search.classList.remove('active');
    Profile.classList.remove('active');
}

let Search = document.querySelector('.search');
document.querySelector('#search-button').onclick = () => {
    Search.classList.toggle('active');
    Navbar.classList.remove('active');
    Profile.classList.remove('active');
}
let Profile = document.querySelector('.profile');
document.querySelector('#user-button').onclick = () => {
    Profile.classList.toggle('active');
    Navbar.classList.remove('active');
    Search.classList.remove('active');
}

window.onscroll = () => {
    Navbar.classList.remove('active');
    Search.classList.remove('active');
    Profile.classList.remove('active')
}

