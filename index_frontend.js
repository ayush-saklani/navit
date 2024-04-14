// all javascript related to front end will be written here other one is for mapping and server talking  
let active = (activebtn) => {
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    activebtn.classList.add('active');
}
let addEventListenertobutton = () =>{
    let circular_buttons = document.querySelectorAll(".circular_button");
    circular_buttons.forEach(btn => {
        btn.addEventListener("click",()=>{active(btn);});
    });
}
addEventListenertobutton();