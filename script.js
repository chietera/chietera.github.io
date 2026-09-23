$(function () {
  // ==========================================
  // 1. スマホ用ハンバーガーメニュー
  // ==========================================
  $("#js-hamburger").on("click", function () {
    $(this).toggleClass("active");
    $("#js-nav").toggleClass("active");
  });

  // メニュー内のリンクをクリックしたら閉じる
  $("#js-nav a").on("click", function () {
    $("#js-hamburger").removeClass("active");
    $("#js-nav").removeClass("active");
  });

  // ==========================================
  // 2. DESIGNページのカテゴリ切り替え（スクロールなし）
  // ==========================================
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

  // サブメニュー（ALL/販促物/グラフィックデザイン）のクリック時
  $(".sub-menu a").on("click", function (e) {
    const category = $(this).attr("data-category");
    const isDesignPage = window.location.pathname.indexOf("design.html") !== -1;

    if (isDesignPage && category) {
      e.preventDefault(); // スクロール防止
      showCategory(category);
    }
  });

  // 別ページからURLパラメータ（?cat=promo など）で飛んできた場合の自動判定
  if (window.location.pathname.indexOf("design.html") !== -1) {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("cat");
    showCategory(catParam || "all");
  }

  // ==========================================
  // 3. ふわぁ〜っと開く画像拡大モーダル（×ボタン対応）
  // ==========================================
  // 画像クリックで拡大モーダルを開く
  $(".gallery-grid").on("click", ".modal-open", function (e) {
    e.preventDefault();
    const imgSrc = $(this).attr("href");

    $("#modal-img").attr("src", imgSrc);
    $("#modal").css("display", "flex").hide().fadeIn(300); // ふわぁ〜っとフェードイン
    $("body").css("overflow", "hidden"); // 背後のスクロールを固定
  });

  // ×ボタン・背景・画像クリックでふわぁ〜っと閉じる
  $(document).on("click", ".modal-close, .modal-bg, #modal-img", function () {
    $("#modal").fadeOut(300, function () {
      $("#modal-img").attr("src", "");
      $("body").css("overflow", ""); // スクロール固定解除
    });
  });
});
