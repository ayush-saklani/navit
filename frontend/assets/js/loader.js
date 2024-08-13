const loader_loading = ()=>{
    let mainheading = document.createElement('h1');
    mainheading.classList.add('mx-3', 'my-3', 'text');
    mainheading.innerText = 'Navit - University indoor Mapping';
    document.getElementById("navitloader").appendChild(mainheading);
    

    let dotdot = document.createElement('div');
    dotdot.classList.add('my-2');
    dotdot.innerHTML = `<section class="dots-container">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </section>`
    document.getElementById("navitloader").appendChild(dotdot);

    let delay_warning = document.createElement('h5');
    delay_warning.classList.add('mx-3', 'my-3', 'text');
    delay_warning.style.display = 'none';
    delay_warning.innerHTML = `Server is doing a cold Restart it may take 40-50 Sec to start, Please Wait...`;
    document.getElementById("navitloader").appendChild(delay_warning);
}
loader_loading();

setTimeout(() => {
    document.getElementById("navitloader").childNodes[2].style.display = 'flex';
}, 10000);
