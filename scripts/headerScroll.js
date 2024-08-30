export function headerScroll() {
  const header = document.getElementById("header");
  const content = document.querySelector(".main-content");

  window.addEventListener("scroll", function () {
    if (window.scrollY > content.offsetTop - header.offsetHeight) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
