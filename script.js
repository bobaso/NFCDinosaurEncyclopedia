/*========================================
フェードインアニメーション
========================================*/
window.addEventListener("load", () => {

    const logo = document.querySelector(".logo");
    const card = document.querySelector(".info-card");

    // 最初にロゴを表示
    logo.classList.add("show");

    // ロゴ表示後にカードを表示
    setTimeout(() => {

        card.classList.add("show");

    }, 300);

});
