/*========================================
カルーセル
========================================*/

const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const bars = document.querySelectorAll(".bar");

let current = 0;
const total = slideItems.length;

function updateSlider(){

    slides.style.transform = `translateX(-${current * 100}%)`;

    bars.forEach((bar,index)=>{

        bar.classList.toggle("active", index === current);

    });

}

/*------------------------------
自動送り（8秒）
------------------------------*/

let autoTimer = setInterval(nextSlide,8000);

function nextSlide(){

    current++;

    if(current >= total){

        current = 0;

    }

    updateSlider();

}

function prevSlide(){

    current--;

    if(current < 0){

        current = total - 1;

    }

    updateSlider();

}

function restartTimer(){

    clearInterval(autoTimer);

    autoTimer = setInterval(nextSlide,8000);

}

/*------------------------------
スワイプ
------------------------------*/

let startX = 0;

slides.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

slides.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].clientX;

    const diff = startX - endX;

    if(diff > 50){

        nextSlide();

        restartTimer();

    }

    else if(diff < -50){

        prevSlide();

        restartTimer();

    }

});

/*========================================
フェードイン
========================================*/

const fadeItems = document.querySelectorAll(".fadein");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

fadeItems.forEach(item=>{

    observer.observe(item);

});

/*========================================
初期表示
========================================*/

updateSlider();
