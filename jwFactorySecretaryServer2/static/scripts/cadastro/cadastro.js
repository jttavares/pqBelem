
//#region accordion
const accordion=Array.from( document.getElementsByClassName('btnPub'));
const panel=document.getElementsByClassName('scdInfo');

function splitPanel(element) {
    let index=accordion.indexOf(element);

        accordion[index].classList.toggle('active');

       // const panel = this.nextElementSibling;
        if (panel[index].style.display === 'flex') {
            panel[index].style.display = 'none';
        } else {
            panel[index].style.display = 'flex';
        }
}
//#endregion

//#region carroussel
let slideIndex=1;
showSlides(slideIndex);


function showSlides(n){
    let i;
    const slides=document.getElementsByClassName('myFrames');
    const dots=document.getElementsByClassName('dot');
    if(n>slides.length){slideIndex=1}
    else if(n<1){slideIndex=slides.length}

    for(i=0;i<slides.length;i++){
        slides[i].style.display="none";
    }
    for(i=0;i<dots.length;i++){
        dots[i].className= dots[i].className.replace(' onSlide','');
    }
    slides[slideIndex-1].style.display='flex';
    dots[slideIndex-1].className+=' onSlide';
}

function plusSlides(n){
    showSlides((slideIndex += n));
}

function currentSlide(n){
    showSlides(slideIndex=n);
}

//#endregion

//#region addPub
function openForm(){
    document.querySelector('.pubForm').classList.toggle('show');
}

window.onclick = function (event) {
    if (!event.target.matches('.pubForm')) {
        let form = document.getElementsByClassName('pubForm');
        let i = 0;
        for (i = 0; i < form.length; i++) {
            let openDropDown = form[i];
            if (openDropDown.classList.contains('show')) {
                openDropDown.classList.remove('show');
            }else{
                return;
            }
        }
    }

}

//#endregion