document.addEventListener("DOMContentLoaded", function () {

  // ================= PRODUCTS =================
  const products = [
    { name:"Chess Set Deluxe", category:"Board Game", price:999, original:1199, rating: 4.8, reviews: 245, badge: "🎯 Popular" },
    { name:"UNO Classic Cards", category:"Cards", price:199, original:299, rating: 4.5, reviews: 128, badge: "✨ Classic" },
    { name:"LEGO Race Car", category:"LEGO", price:1499, original:1799, rating: 4.9, reviews: 356, badge: "🏎️ Trending" },
    { name:"Puzzle 1000pcs Nature", category:"Puzzle", price:599, original:799, rating: 4.7, reviews: 89, badge: "🌿 Zen" },
    { name:"Magic Card Starter", category:"Cards", price:899, original:1099, rating: 4.6, reviews: 176, badge: "✨ New" },
    { name:"LEGO City Building", category:"LEGO", price:2499, original:2999, rating: 4.8, reviews: 210, badge: "🏗️ Best" }
  ];

  const container = document.getElementById("productList");

  function renderProducts() {
    if (!container) return;

    container.innerHTML = "";

    products.forEach((p, idx) => {
      const stars = '⭐'.repeat(Math.floor(p.rating));

      container.innerHTML += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="https://images.unsplash.com/photo-${[
              '1611432831897-3f36ba6dc4ee',
              '1516975080664-ed2fc6a32937',
              '1506702519100-a89e8b7ce338',
              '1570529734382-4b8629f3a121',
              '1485846876519-c21cc028cb00',
              '1594787318286-2027ef77ef14'
            ][idx]}?w=400&h=250&fit=crop" class="product-image" alt="${p.name}">

            <div class="product-badge">${p.badge}</div>

            <div class="product-wishlist">
              <i class="bi bi-heart"></i>
            </div>
          </div>

          <div class="product-body">
            <small class="product-category">${p.category}</small>
            <h6 class="product-name">${p.name}</h6>

            <div class="product-rating">
              <span class="stars">${stars}</span>
              <span class="count">(${p.reviews} reviews)</span>
            </div>

            <div class="product-footer">
              <div class="product-price">
                <span class="price-current">₱${p.price}</span>
                <span class="price-original">₱${p.original}</span>
              </div>

              <button class="btn-add-cart" data-name="${p.name}">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      `;
    });
  }

  function addToCart(productName) {
    alert(`✅ ${productName} added to cart!`);
  }

  renderProducts();

  // ================= EVENT DELEGATION =================

  document.addEventListener("click", function (e) {

    // ADD TO CART
    if (e.target.closest(".btn-add-cart")) {
      const btn = e.target.closest(".btn-add-cart");
      addToCart(btn.dataset.name);
    }

    // WISHLIST
    if (e.target.closest(".product-wishlist")) {
      const btn = e.target.closest(".product-wishlist");

      if (btn.style.color === 'rgb(255, 107, 107)') {
        btn.style.color = '#999';
      } else {
        btn.style.color = '#FF6B6B';
      }
    }
  });

  // ================= SEARCH =================
  const input = document.getElementById("searchInput");
  const box = document.getElementById("suggestions");

  if (input && box) {
    input.addEventListener("input", () => {
      let q = input.value.toLowerCase();

      if (!q) {
        box.classList.add("d-none");
        return;
      }

      let matches = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );

      box.innerHTML = matches.length === 0
        ? `<div style="padding:15px;text-align:center;color:#999;">No products found</div>`
        : matches.map(m => `
          <div style="padding:10px; cursor:pointer;"
               onclick="document.getElementById('searchInput').value='${m.name}'; document.getElementById('suggestions').classList.add('d-none');">
            ${m.name} - ₱${m.price}
          </div>
        `).join("");

      box.classList.remove("d-none");
    });
  }

  // ================= TOOLTIP =================
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

  // ================= CAROUSEL =================
  const carouselElement = document.querySelector('#heroCarousel');
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 3000,
      ride: 'carousel',
      pause: false,
      wrap: true,
      touch: true
    });
  }

});