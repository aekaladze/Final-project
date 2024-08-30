const menuButton = document.getElementById("menu");
const menu = document.querySelector(".menu");
const closeButton = document.getElementById("close");

export function toggleMenu() {
  menuButton.addEventListener("click", () => {
    menu.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    menu.style.display = "none";
  });
}
