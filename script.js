/*========================================*
* フェードインアニメーション
*========================================*/

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");
    const logo = document.querySelector(".logo");
    const cards = document.querySelectorAll(".info-card");
    const percent = document.getElementById("percent");

    /*------------------------------
    * 必要な要素がない場合
    *------------------------------*/

    if (!loading || !logo || !percent || cards.length === 0) {

        console.error("必要なHTML要素が見つかりません");

        return;

    }


    /*------------------------------
    * ローディング
    *------------------------------*/

    let value = 0;

    const counter = setInterval(() => {

        value++;

        percent.textContent = value;


        if (value >= 100) {

            clearInterval(counter);

            loading.classList.add("hide");


            setTimeout(() => {

                loading.style.display = "none";

                logo.classList.add("show");


                setTimeout(() => {


                    /*==============================
                    * 1枚目を表示
                    *==============================*/

                    cards[0].classList.add("show");

                    typeWriter();


                    /*==============================
                    * 2枚目以降を監視
                    *==============================*/

                    const observer =
                        new IntersectionObserver((entries) => {

                            entries.forEach(entry => {

                                if (!entry.isIntersecting) {

                                    return;

                                }


                                entry.target.classList.add("show");


                                /*------------------------------
                                * 2枚目が表示されたら
                                * HABITAT RANGE開始
                                *------------------------------*/

                                if (entry.target === cards[1]) {

                                    setTimeout(() => {

                                        habitatTypeWriter();

                                    }, 800);

                                }


                                observer.unobserve(entry.target);

                            });

                        }, {

                            threshold: 0.15

                        });


                    /*------------------------------
                    * 2枚目以降を監視
                    *------------------------------*/

                    cards.forEach((card, index) => {

                        if (index > 0) {

                            observer.observe(card);

                        }

                    });


                }, 300);


            }, 800);

        }

    }, 20);

});


/*========================================*
* DINOSAUR DATA タイピング
*========================================*/

const typing = document.getElementById("typing");

const text = "DINOSAUR DATA";


function typeWriter() {

    if (!typing) {

        return;

    }


    let i = 0;

    typing.textContent = "";


    const timer = setInterval(() => {

        typing.textContent += text.charAt(i);

        i++;


        if (i >= text.length) {

            clearInterval(timer);

        }

    }, 80);

}


/*========================================*
* HABITAT RANGE タイピング
*========================================*/

const habitatTyping =
    document.getElementById("habitatTyping");

const habitatText = "HABITAT RANGE";


function habitatTypeWriter() {

    if (!habitatTyping) {

        return;

    }


    let i = 0;

    habitatTyping.textContent = "";


    const timer = setInterval(() => {

        habitatTyping.textContent +=
            habitatText.charAt(i);

        i++;


        if (i >= habitatText.length) {

            clearInterval(timer);

        }

    }, 80);

}


/*========================================*
* 2枚目・3枚目カード スワイプ
*========================================*/

const cardStack =
    document.getElementById("cardStack");


if (cardStack) {


    let startX = 0;

    let startY = 0;

    let currentX = 0;

    let currentY = 0;

    let isDragging = false;


    /*==============================
    * タッチ開始
    *==============================*/

    cardStack.addEventListener("touchstart", (e) => {

        const touch = e.touches[0];

        startX = touch.clientX;

        startY = touch.clientY;

        currentX = startX;

        currentY = startY;

        isDragging = true;

    }, {
        passive: true
    });


    /*==============================
    * 指を動かす
    *==============================*/

    cardStack.addEventListener("touchmove", (e) => {

        if (!isDragging) {

            return;

        }

        const touch = e.touches[0];

        currentX = touch.clientX;

        currentY = touch.clientY;

    }, {
        passive: true
    });


    /*==============================
    * 指を離す
    *==============================*/

    cardStack.addEventListener("touchend", () => {

        if (!isDragging) {

            return;

        }


        isDragging = false;


        const diffX =
            currentX - startX;

        const diffY =
            currentY - startY;


        /*------------------------------
        * 縦方向の移動が大きい場合は
        * スワイプ処理しない
        *------------------------------*/

        if (Math.abs(diffY) > Math.abs(diffX)) {

            return;

        }


        /*------------------------------
        * 50px未満は無視
        *------------------------------*/

        if (Math.abs(diffX) < 50) {

            return;

        }


        /*------------------------------
        * 左スワイプ
        * 2枚目 → 3枚目
        *------------------------------*/

        if (diffX < 0) {

            cardStack.classList.add("show-third");

        }


        /*------------------------------
        * 右スワイプ
        * 3枚目 → 2枚目
        *------------------------------*/

        if (diffX > 0) {

            cardStack.classList.remove("show-third");

        }

    });

}
