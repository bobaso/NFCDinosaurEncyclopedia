/*========================================
フェードインアニメーション
========================================*/
　
window.addEventListener("load",()=>{

    const loading = document.getElementById("loading");
    const logo = document.querySelector(".logo");
    const cards = document.querySelectorAll(".info-card");
    const percent = document.getElementById("percent");

    let value = 0;

    const counter = setInterval(()=>{

        value++;
        percent.textContent = value;

        if(value >= 100){

            clearInterval(counter);

            loading.classList.add("hide");

            setTimeout(()=>{

                loading.style.display="none";

                logo.classList.add("show");

                setTimeout(()=>{

// 1枚目だけ最初に表示
cards[0].classList.add("show");

typeWriter();


// 2枚目以降はスクロールで表示
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});


// 2枚目以降を監視
cards.forEach((card,index)=>{

    if(index > 0){

        observer.observe(card);

    }

});

                },300);

            },800);

        }

    },20);

});


/*========================================
DINOSAUR DATA タイピング
========================================*/

const typing = document.getElementById("typing");
const text = "DINOSAUR DATA";

function typeWriter(){

    let i = 0;

    typing.textContent = "";

    const timer = setInterval(() => {

        typing.textContent += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(timer);

        }

    }, 80);

}
const habitatTyping = document.getElementById("habitatTyping");
const habitatText = "HABITAT RANGE";

function habitatTypeWriter(){

    let i = 0;

    habitatTyping.textContent = "";

    const timer = setInterval(() => {

        habitatTyping.textContent += habitatText.charAt(i);

        i++;

        if(i >= habitatText.length){

            clearInterval(timer);

        }

    }, 80);

}
