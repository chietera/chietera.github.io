document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-nav");

  if (hamburger && nav) {
    // ハンバーガーボタンクリックで開閉
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // リンクをクリックした時はメニューを閉じる（ページ遷移はそのまま許可する）
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }
  // jQueryを使ったスムーススクロール
  $(function () {
    $(".scroll-top-btn").on("click", function (e) {
      e.preventDefault(); // デフォルトのパッと切り替わる動きを止める

      // ページの一番上（0pxの位置）まで 1200ミリ秒（1.2秒）かけてゆっくり戻る
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1000,
        "swing",
      );
    });
  });
});
