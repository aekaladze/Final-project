import { toggleMenu } from "./menu.js";
import { fetchProducts } from "./fetchProducts.js";
import { headerScroll } from "./headerScroll.js";

const searchInput = document.getElementById("search-input");
const productsContainer = document.getElementById("products-container");
const showMore = document.getElementById("show-more");

let allProducts = [];
let filteredProducts = [];
let productsPerPage = 9;
let currentIndex = 0;

toggleMenu();
headerScroll();

function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
    <div class="image">
      <img src="${product.image}" alt="" />
    </div>
    <div class="content">
      <p class="category">${product.category}</p>
      <h3>${product.title}</h3>
      <p class="description">${product.description}</p>
      <div class="row">
      <div class="footer">
      <p class="price">${product.price} $</p>
      <div class="rating">
        <p><i class="fa-solid fa-star"></i>${product.rating.rate}</p>
        <p><i class="fa-solid fa-tags"></i>${product.rating.count}</p>
      </div>
      </div>
      </div>
    </div>
`;

    productsContainer.appendChild(productCard);
  });
}

async function init() {
  allProducts = await fetchProducts();
  filteredProducts = allProducts;
  loadMoreProducts();
}

function loadMoreProducts() {
  const productsToDisplay = filteredProducts.slice(
    currentIndex,
    currentIndex + productsPerPage
  );
  displayProducts(productsToDisplay);
  currentIndex += productsPerPage;

  if (currentIndex >= filteredProducts.length) {
    showMore.style.display = "none";
  } else {
    showMore.style.display = "block";
  }
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  productsContainer.innerHTML = "";
  currentIndex = 0;
  loadMoreProducts();
}

searchInput.addEventListener("input", filterProducts);
showMore.addEventListener("click", loadMoreProducts);

init();
