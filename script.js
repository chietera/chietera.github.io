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
//  ------------------------------------------
// 画像クリックで拡大表示（モーダル）
// ------------------------------------------
$(function () {
  // 1. 拡大用要素をHTMLに自動挿入
  $("body").append(`
    <div class="modal-overlay" id="js-modal">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="拡大画像" />
    </div>
  `);

  // 2. 画像をクリックした時の処理
  $(".gallery-image img").on("click", function () {
    const imgSrc = $(this).attr("src"); // クリックした画像のURLを取得
    $("#js-modal img").attr("src", imgSrc); // 拡大用imgにURLをセット
    $("#js-modal").addClass("is-active"); // モーダルを表示
    $("body").css("overflow", "hidden"); // 背後のスクロールを止める
  });

  // 3. 黒背景または閉じるボタンを押したら閉じる処理
  $("#js-modal, .modal-close").on("click", function (e) {
    // 画像自体をクリックした時は閉じないようにガード
    if ($(e.target).is(".modal-image")) return;

    $("#js-modal").removeClass("is-active"); // モーダルを非表示
    $("body").css("overflow", ""); // スクロールを再開
  });
});
