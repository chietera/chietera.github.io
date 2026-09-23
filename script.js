document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------
  // 1. ハンバーガーメニューの開閉処理
  // ------------------------------------------
  const hamburger = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-nav");

  if (hamburger && nav) {
    // ボタンクリックでメニュー開閉
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // リンクをクリックした時はメニューを閉じる
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }
});

// ------------------------------------------
// 2. トップへ戻るボタン（スムーススクロール）
// ------------------------------------------
$(function () {
  $(".scroll-top-btn").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000,
      "swing",
    );
  });
});

// ------------------------------------------
// 3. 画像クリックで拡大表示（モーダル）
// ------------------------------------------
$(function () {
  // 拡大用要素をHTMLに挿入
  $("body").append(`
    <div class="modal-overlay" id="js-modal">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="拡大画像" />
    </div>
  `);

  // 画像をクリックした時の処理
  $(".gallery-image img").on("click", function () {
    const imgSrc = $(this).attr("src");
    $("#js-modal img").attr("src", imgSrc);
    $("#js-modal").addClass("is-active");
    $("body").css("overflow", "hidden");
  });

  // 黒背景または閉じるボタンを押したら閉じる
  $("#js-modal, .modal-close").on("click", function (e) {
    if ($(e.target).is(".modal-image")) return;
    $("#js-modal").removeClass("is-active");
    $("body").css("overflow", "");
  });
});
