// all javascript related to front end will be written here other one is for mapping and server talking  
let active = (activebtn) => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    activebtn.classList.add('active');
}
let addEventListenertobutton = () => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click", () => { active(btn); });
    });
}
addEventListenertobutton();


let down = false;
document.getElementById('foldup').addEventListener('click', () => {
    let bottombar = document.getElementsByClassName('bottom-bar')[0];
    let icon = document.getElementById('foldup-icon');

    if (down == false) {
        down = true;
        icon.setAttribute('class', 'bi bi-caret-up-fill h3');
        bottombar.classList.add('bottom-bar-down');
    } else {
        down = false;
        icon.setAttribute('class', 'bi bi-caret-down-fill h3');
        bottombar.classList.remove('bottom-bar-down');
    }
});