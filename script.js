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
      <img class="modal-image" src="" alt="" />
    </div>
  `);

  // 画像をクリックした時の処理
  $(".gallery-image img").on("click", function () {
    const imgSrc = $(this).attr("src");
    $("#js-modal img").attr("src", imgSrc);
    $("#js-modal").addClass("is-active");
    $("body").css("overflow", "hidden");
  });

  // 黒背景を押したら閉じる
  $("#js-modal").on("click", function (e) {
    if ($(e.target).is(".modal-image")) return;
    $("#js-modal").removeClass("is-active");
    $("body").css("overflow", "");
  });
});

//-----------DESIGN画面------------------//
// DESIGNサブメニューの表示切り替え処理
$(function () {
  // カテゴリ表示切り替え用関数
  function showCategory(category) {
    if (!category || category === "all") {
      $(".design-section").show();
      $(".line").show();
    } else {
      $(".design-section").hide();
      $(".line").hide();
      $("#" + category).fadeIn(300);
    }
  }

  // サブメニュー（ALL/販促物/グラフィックデザイン）をクリックした時
  $(".sub-menu a").on("click", function (e) {
    const category = $(this).attr("data-category");
    const isDesignPage = window.location.pathname.indexOf("design.html") !== -1;

    if (isDesignPage) {
      e.preventDefault(); // 遷移とスクロールを阻止
      showCategory(category); // その場で表示切り替え
    }
  });

  // 別ページから移動してきた時の処理（URLの ?cat=... を判定）
  if (window.location.pathname.indexOf("design.html") !== -1) {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("cat");
    showCategory(catParam || "all");
  }
});
