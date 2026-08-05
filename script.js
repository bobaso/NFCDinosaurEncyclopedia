const slides = document.querySelector(".slides");
const bars = document.querySelectorAll(".bar");

let slideList = [...document.querySelectorAll(".slide")];
const total = slideList.length;

// ---------- 無限ループ用 ----------
const firstClone = slideList[0].cloneNode(true);
const lastClone = slideList[total-1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone,slideList[0]);

slideList = [...document.querySelectorAll(".slide")];

let current = 1;

slides.style.transform=`translateX(-100%)`;

// ---------- バー ----------
function updateBar(){

    bars.forEach(bar=>bar.classList.remove("active"));

    let index=current-1;

    if(index<0) index=total-1;

    if(index>=total) index=0;

    bars[index].classList.add("active");

}

updateBar();

// ---------- スライド表示 ----------

function moveSlide(){

    slides.style.transition=".45s ease";

    slides.style.transform=`translateX(-${current*100}%)`;

}

// ---------- 自動送り ----------

let timer=setInterval(nextSlide,8000);

function restart(){

    clearInterval(timer);

    timer=setInterval(nextSlide,8000);

}

function nextSlide(){

    current++;

    moveSlide();

}

function prevSlide(){

    current--;

    moveSlide();

}

// ---------- ループ ----------

slides.addEventListener("transitionend",()=>{

    if(current===total+1){

        slides.style.transition="none";

        current=1;

        slides.style.transform=`translateX(-100%)`;

    }

    if(current===0){

        slides.style.transition="none";

        current=total;

        slides.style.transform=`translateX(-${total*100}%)`;

    }

    updateBar();

});

// ---------- スワイプ ----------

let startX=0;

slides.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

slides.addEventListener("touchend",(e)=>{

    let diff=startX-e.changedTouches[0].clientX;

    if(diff>50){

        nextSlide();

    }

    else if(diff<-50){

        prevSlide();

    }

    restart();

});
