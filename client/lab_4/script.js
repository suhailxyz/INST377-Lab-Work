let slidePosition = 0;
const slides = document.querySelectorAll(".carousel_item");
const totalSlides = slides.length;

document.
    querySelector("#carousel_button--next")
    .addEventListener("click", function(){
        moveToNext();

    })

document.
querySelector("#carousel_button--back")
.addEventListener("click", function(){
    moveBack();

})

function updatePosition() {for (let slide of slides) {slide.classList.remove('carousel_item--visible');slide.classList.add('carousel_item--hidden');}

    slides[slidePosition].classList.add('carousel_item--visible')
}

function moveToNext(){
    if (slidePosition === totalSlides-1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updatePosition();
}

function moveBack() {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updatePosition();
}