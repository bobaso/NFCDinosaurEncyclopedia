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

                    cards.forEach((card,index)=>{

                        setTimeout(()=>{

                            card.classList.add("show");

                            if(index===0){
                                typeWriter();
                            }

                        },index*250);

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
