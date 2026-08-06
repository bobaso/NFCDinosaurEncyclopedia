/*========================================
フェードインアニメーション
========================================*/

window.addEventListener("load", () => {

    const logo = document.querySelector(".logo");
    const card = document.querySelector(".info-card");

    // ロゴ表示
    logo.classList.add("show");

    // ロゴ表示後にカード表示
    setTimeout(() => {

        card.classList.add("show");

        // カード表示が始まって少ししてから文字入力
        setTimeout(() => {

            typeWriter();

        }, 450);

    }, 300);

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
