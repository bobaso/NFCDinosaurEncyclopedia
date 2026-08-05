/*==============================
スライダー
==============================*/

const slides = document.querySelector(".slides");

let current = 0;

setInterval(() => {

    current++;

    if(current > 1){

        current = 0;

    }

    slides.style.transform = `translateX(-${current * 100}%)`;

},3000);


/*==============================
スクロールアニメーション
==============================*/

const fadeElements = document.querySelectorAll(".fadein");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

fadeElements.forEach(element=>{

    observer.observe(element);

});
