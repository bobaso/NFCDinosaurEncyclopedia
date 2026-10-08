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

                    activateCard(cards[0]);


                    /*==============================
                    * 2枚目を監視
                    *==============================*/

                    const observer =
                        new IntersectionObserver((entries) => {

                            entries.forEach(entry => {

                                if (!entry.isIntersecting) {

                                    return;

                                }


                                /*------------------------------
                                * 2枚目
                                *------------------------------*/

                                if (
                                    entry.target.classList.contains(
                                        "card-second"
                                    )
                                ) {

                                    activateCard(entry.target);

                                }


                                /*------------------------------
                                * 4枚目
                                *------------------------------*/

                                if (
                                    entry.target.classList.contains(
                                        "topic-card-stack"
                                    )
                                ) {

                                    const fourthCard =
                                        entry.target.querySelector(
                                            ".card-fourth"
                                        );

                                    activateCard(fourthCard);

                                }


                                observer.unobserve(entry.target);

                            });

                        }, {

                            threshold:0.15

                        });


                    /*------------------------------
                    * 2枚目を監視
                    *------------------------------*/

                    const secondCard =
                        document.querySelector(".card-second");

                    if (secondCard) {

                        observer.observe(secondCard);

                    }


                    /*------------------------------
                    * 4〜6枚目のスタックを監視
                    *------------------------------*/

                    const topicStack =
                        document.getElementById("topicCardStack");

                    if (topicStack) {

                        observer.observe(topicStack);

                    }


                }, 300);


            }, 800);

        }

    }, 20);

});


/*========================================*
* カードをアクティブ化
*========================================*/

function activateCard(card) {

    if (!card) {

        return;

    }


    /*------------------------------
    * すでに表示済みなら何もしない
    *------------------------------*/

    if (card.classList.contains("show")) {

        return;

    }


    /*------------------------------
    * フェードイン
    *------------------------------*/

    card.classList.add("show");


    /*------------------------------
    * 2枚目
    * HABITAT RANGE
    *------------------------------*/

    if (
        card.classList.contains("card-second")
    ) {

        setTimeout(() => {

            habitatTypeWriter();

        }, 800);

    }

}


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
     * false = 2枚目
     * true  = 3枚目
     */
    let showingThird = false;


    /*====================================
     * スワイプ開始
     *====================================*/

    cardStack.addEventListener("touchstart", function (e) {

        const touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        isDragging = true;

    }, { passive: true });


    /*====================================
     * スワイプ終了
     *====================================*/

    cardStack.addEventListener("touchend", function (e) {

        if (!isDragging) {
            return;
        }

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
         * 今回は右スワイプだけで
         * 2枚目 ⇔ 3枚目を切り替える
         *================================*/

        if (diffX <= 0) {
            return;
        }


      /*================================
 * 右スワイプ
 *================================*/

if (showingThird === false) {

    /*------------------------------
     * 2枚目 → 3枚目
     *------------------------------*/

    cardStack.classList.add("swiped");

    showingThird = true;


    /*------------------------------
     * 3枚目が最前面になったら
     * フェードイン
     *------------------------------*/

    const thirdCard =
        cardStack.querySelector(".card-third");

    activateCard(thirdCard);


} else {

    /*------------------------------
     * 3枚目 → 2枚目
     *------------------------------*/

    cardStack.classList.remove("swiped");

    showingThird = false;

}

    }, { passive: true });

}
const topicCardStack = document.getElementById("topicCardStack");

if (topicCardStack) {

    let topicStartX = 0;
    let topicStartY = 0;
    let topicIsDragging = false;

    let topicCardIndex = 0;


    /* ==========================
       タッチ開始
    ========================== */

    topicCardStack.addEventListener("touchstart", function(e) {

        const touch = e.touches[0];

        topicStartX = touch.clientX;
        topicStartY = touch.clientY;

        topicIsDragging = true;

    }, { passive: true });


    /* ==========================
       タッチ終了
    ========================== */

    topicCardStack.addEventListener("touchend", function(e) {

        if (!topicIsDragging) return;

        topicIsDragging = false;

        const touch = e.changedTouches[0];

        const topicEndX = touch.clientX;
        const topicEndY = touch.clientY;

        const diffX = topicEndX - topicStartX;
        const diffY = topicEndY - topicStartY;


        /* 縦スクロールの場合は無視 */

        if (Math.abs(diffX) < Math.abs(diffY)) {
            return;
        }


        /* 小さいスワイプは無視 */

        if (Math.abs(diffX) < 50) {
            return;
        }


        /* ==========================
           右スワイプ
           4 → 5 → 6
        ========================== */

        if (diffX > 0) {

            if (topicCardIndex < 2) {
                topicCardIndex++;
            }

        }


        /* ==========================
           左スワイプ
           6 → 5 → 4
        ========================== */

        if (diffX < 0) {

            if (topicCardIndex > 0) {
                topicCardIndex--;
            }

        }


        /* ==========================
           クラス切り替え
        ========================== */

        topicCardStack.classList.remove(
            "swiped-1",
            "swiped-2"
        );


if (topicCardIndex === 1) {

    topicCardStack.classList.add("swiped-1");


    /*------------------------------
     * 5枚目が最前面になったら
     * フェードイン
     *------------------------------*/

    const fifthCard =
        topicCardStack.querySelector(".card-fifth");

    activateCard(fifthCard);

}


if (topicCardIndex === 2) {

    topicCardStack.classList.add("swiped-2");


    /*------------------------------
     * 6枚目が最前面になったら
     * フェードイン
     *------------------------------*/

    const sixthCard =
        topicCardStack.querySelector(".card-sixth");

    activateCard(sixthCard);

}
    }, { passive: true });

}
