// ハンバーガーメニューの開閉処理
const hamburger = document.getElementById("js-hamburger");
const nav = document.getElementById("js-nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });
}
