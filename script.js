/*========================================
フェードインアニメーション
========================================*/
　
window.addEventListener("load",()=>{

    const loading=document.getElementById("loading");
    const logo=document.querySelector(".logo");
    const card=document.querySelector(".info-card");

    setTimeout(()=>{

        loading.classList.add("hide");

        setTimeout(()=>{

            loading.style.display="none";

            logo.classList.add("show");

            setTimeout(()=>{

                card.classList.add("show");

                typeWriter();

            },300);

        },800);

    },2000);

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
