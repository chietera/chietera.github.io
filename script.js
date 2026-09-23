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
  // ------------------------------------------
  // DESIGNページの「ALL / 各ジャンル」見出し切り替え処理
  // ------------------------------------------
  function updateDesignTitleVisibility() {
    const hash = window.location.hash;
    const titles = document.querySelectorAll(".section-title");
    const lines = document.querySelectorAll(".line");

    if (hash === "#all" || hash === "" || hash === "#") {
      titles.forEach((el) => el.classList.add("is-hidden"));
      lines.forEach((el) => el.classList.add("is-hidden"));
    } else {
      titles.forEach((el) => el.classList.remove("is-hidden"));
      lines.forEach((el) => el.classList.remove("is-hidden"));
    }
  }

  window.addEventListener("DOMContentLoaded", updateDesignTitleVisibility);
  window.addEventListener("hashchange", updateDesignTitleVisibility);

  // ------------------------------------------
  // DESIGNページ：ALLのときは見出しと線を隠す処理
  // ------------------------------------------
  function updateDesignTitleVisibility() {
    // 現在のURL（#all, #promo など）を取得
    const hash = window.location.hash;

    // 対象となる見出し(h2)と線(hr)を取得
    const titles = document.querySelectorAll(
      ".design-section h2, .section-title",
    );
    const lines = document.querySelectorAll(".line");

    // #all、またはハッシュなし（初期表示）のときは非表示にする
    if (hash === "#all" || hash === "" || hash === "#") {
      titles.forEach((el) => el.classList.add("is-hidden"));
      lines.forEach((el) => el.classList.add("is-hidden"));
    } else {
      // #promo や #graphic のときは表示する
      titles.forEach((el) => el.classList.remove("is-hidden"));
      lines.forEach((el) => el.classList.remove("is-hidden"));
    }
  }

  // ページ読み込み時 ＆ メニューのクリック(#変更)時に実行
  window.addEventListener("DOMContentLoaded", updateDesignTitleVisibility);
  window.addEventListener("hashchange", updateDesignTitleVisibility);

  // ------------------------------------------
  // DESIGNページ：カテゴリー切替（表示・非表示）処理
  // ------------------------------------------
  function switchDesignCategory() {
    const hash = window.location.hash; // #all, #promo, #graphic など

    const promoSection = document.getElementById("promo");
    const graphicSection = document.getElementById("graphic");
    const lines = document.querySelectorAll(".line");
    const titles = document.querySelectorAll(".section-title");

    if (!promoSection || !graphicSection) return; // design.html 以外では実行しない

    // ① 販促物（#promo）が選ばれたとき
    if (hash === "#promo") {
      promoSection.classList.remove("is-hidden");
      graphicSection.classList.add("is-hidden");

      // 見出しを表示、区切り線は非表示
      titles.forEach((el) => el.classList.remove("is-hidden"));
      lines.forEach((el) => el.classList.add("is-hidden"));

      // ② グラフィックデザイン（#graphic）が選ばれたとき
    } else if (hash === "#graphic") {
      promoSection.classList.add("is-hidden");
      graphicSection.classList.remove("is-hidden");

      // 見出しを表示、区切り線は非表示
      titles.forEach((el) => el.classList.remove("is-hidden"));
      lines.forEach((el) => el.classList.add("is-hidden"));

      // ③ ALL（#all）または初期状態（指定なし）のとき
    } else {
      // 両方表示する
      promoSection.classList.remove("is-hidden");
      graphicSection.classList.remove("is-hidden");

      // 見出しは隠して、区切り線を表示する
      titles.forEach((el) => el.classList.add("is-hidden"));
      lines.forEach((el) => el.classList.remove("is-hidden"));
    }
  }
  // ページ読み込み時 ＆ メニュー（#）切り替え時に実行
  window.addEventListener("DOMContentLoaded", switchDesignCategory);
  window.addEventListener("hashchange", switchDesignCategory);
});
