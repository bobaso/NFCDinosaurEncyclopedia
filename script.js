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

const cardStack = document.getElementById("cardStack");

if (cardStack) {

    let startX = 0;
    let startY = 0;

    let isDragging = false;

    /*
     * 現在のカード
     *
     * false = 2枚目
     * true  = 3枚目
     */
    let showingThird = false;


    /*====================================
     * スワイプ開始
     *====================================*/

    cardStack.addEventListener("touchstart", (e) => {

        const touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        isDragging = true;

    }, { passive: true });


    /*====================================
     * スワイプ終了
     *====================================*/

    cardStack.addEventListener("touchend", (e) => {

        if (!isDragging) return;

        isDragging = false;

        const touch = e.changedTouches[0];

        const endX = touch.clientX;
        const endY = touch.clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;


        /*================================
         * 縦スクロールを優先
         *================================*/

        if (Math.abs(diffX) < Math.abs(diffY)) {

            return;

        }


        /*================================
         * 50px未満なら無視
         *================================*/

        if (Math.abs(diffX) < 50) {

            return;

        }


        /*================================
         * 左スワイプは無効
         *
         * 今回は「右スワイプのみ」で
         * カードを切り替える
         *================================*/

        if (diffX <= 0) {

            return;

        }


        /*================================
         * 右スワイプ
         *================================*/

        if (!showingThird) {

            /*
             * 2枚目 → 3枚目
             */

            cardStack.classList.add("swiped");

            showingThird = true;

        } else {

            /*
             * 3枚目 → 2枚目
             */

            cardStack.classList.remove("swiped");

            showingThird = false;

        }

    });

}
}
