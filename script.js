/*==============================
スライダー（スワイプ対応）
==============================*/
const bars = document.querySelectorAll(".bar");
const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slide").length;

let current = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

function showSlide(index){

    slides.style.transform = `translateX(-${index*100}%)`;

    bars.forEach(bar=>bar.classList.remove("active"));

    bars[index].classList.add("active");

}

// ------------------
// 自動送り
// ------------------

let autoSlide = setInterval(nextSlide,6000);

function nextSlide(){

    current++;

    if(current>=slideCount){

        current=0;

    }

    showSlide(current);

}

function restartTimer(){

    clearInterval(autoSlide);

    autoSlide = setInterval(nextSlide,6000);

}

// ------------------
// スワイプ開始
// ------------------

slides.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

    isDragging = true;

});

// ------------------
// スワイプ終了
// ------------------

slides.addEventListener("touchend",(e)=>{

    if(!isDragging) return;

    currentX = e.changedTouches[0].clientX;

    let diff = startX-currentX;

    if(diff>50){

        current++;

        if(current>=slideCount){

            current=0;

        }

    }

    else if(diff<-50){

        current--;

        if(current<0){

            current=slideCount-1;

        }

    }

    showSlide(current);

    restartTimer();

    isDragging=false;

});
