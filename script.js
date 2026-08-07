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
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            // 2枚目のカードが表示された後に
            // HABITAT RANGE のタイピングを開始
            if(entry.target === cards[1]){

                setTimeout(() => {

                    habitatTypeWriter();

                }, 800);

            }

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
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

/*========================================*
* 2枚目・3枚目カード スワイプ
*========================================*/

const cardStack = document.getElementById("cardStack");

if(cardStack){

    let startX = 0;
    let startY = 0;

    let currentX = 0;

    let isDragging = false;


    /*==============================
      タッチ開始
    ==============================*/

    cardStack.addEventListener("touchstart", (e)=>{

        const touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        currentX = startX;

        isDragging = true;

    }, {passive:true});


    /*==============================
      指を動かす
    ==============================*/

    cardStack.addEventListener("touchmove", (e)=>{

        if(!isDragging) return;

        const touch = e.touches[0];

        currentX = touch.clientX;

    }, {passive:true});


    /*==============================
      指を離す
    ==============================*/

    cardStack.addEventListener("touchend", (e)=>{

        if(!isDragging) return;

        isDragging = false;

        const endX = currentX;

        const diffX = endX - startX;

        const diffY = Math.abs(
            endX - startX
        );


        /*
         * 横方向に50px以上動かした場合だけ
         * スワイプとして判定
         */

        if(Math.abs(diffX) < 50){

            return;

        }


        /*
         * 左スワイプ
         *
         * 2枚目
         * ↓
         * 3枚目を表示
         */

        if(diffX < 0){

            cardStack.classList.add("swiped");

        }


        /*
         * 右スワイプ
         *
         * 3枚目
         * ↓
         * 2枚目へ戻る
         */

        if(diffX > 0){

            cardStack.classList.remove("swiped");

        }

    });

}
