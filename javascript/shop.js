function initializeShopPage() {
  console.log("🛍️ Shop Page Initialized");

  let products = [];

  // ======= FETCH DỮ LIỆU =======
  fetch('/db.json')
    .then(response => response.json())
    .then(data => {
      products = data.Product;
      initializeDefaultButton();
      attachButtonEvents();
      showProductByBrand('Tất cả');
    })
    .catch(err => console.error("❌ Lỗi load dữ liệu:", err));

  // ======= GẮN SỰ KIỆN NÚT DANH MỤC =======
  function attachButtonEvents() {
    const items = document.querySelectorAll('.filed_type .type button');
    if (!items || items.length === 0) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        handleButtonClick(item, items);
        const brand = item.textContent.trim();
        showProductByBrand(brand);
      });
    });
  }

  // ======= ACTIVE NÚT MẶC ĐỊNH =======
  function initializeDefaultButton() {
    const defaultBtn = document.querySelector('.filed_type .type .default');
    if (defaultBtn) defaultBtn.classList.add('active');
  }

  // ======= ĐỔ SẢN PHẨM RA GIAO DIỆN =======
  function showProductByBrand(brand) {
    const listProductHTML = document.querySelector('.products');
    const total = document.querySelector('.sum_product');
    if (!listProductHTML) return;

    listProductHTML.innerHTML = '';

    const filtered = brand === 'Tất cả'
      ? products
      : products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());

    if (filtered.length === 0) {
      listProductHTML.innerHTML = `<p>Sản phẩm hiệu ${brand} đã hết hàng</p>`;
    } else {
      filtered.forEach(product => {
        const card = createProductCard(product);
        listProductHTML.appendChild(card);
      });
    }

    updateTotalProducts(listProductHTML, total);
  }

  // ======= CẬP NHẬT SỐ LƯỢNG SẢN PHẨM =======
  function updateTotalProducts(listElement, totalElement) {
    if (totalElement)
      totalElement.innerHTML = `<p>Hiển thị ${listElement.childElementCount} sản phẩm</p>`;
  }
}

// ===============================
// 🧱 HÀM TẠO THẺ SẢN PHẨM
// ===============================
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product_card');

  card.innerHTML = `
    <div class="image_card">
      <img src="${product.img}" alt="${product.name}" class="product-img">
    </div>
    <div class="product_infor">
      <p>${product.brand}</p>
      <h3>${product.name}</h3>
      <div class="icon_card">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="price_card">
        <span class="official_price">${product.price}</span>
      </div>
      <button class="add-cart-btn"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</button>
    </div>
  `;

  // 🛒 Khi click nút thêm vào giỏ hàng
  card.querySelector('.add-cart-btn').addEventListener('click', (e) => {
    e.stopPropagation(); // tránh kích hoạt click sang trang chi tiết
    addToCart(product);
  });

  // 🔍 Khi click vào thẻ hoặc ảnh → chuyển trang chi tiết
  card.addEventListener('click', () => {
    window.location.href = `/HTML/product_detail.html?id=${product.id}`;
  });

  return card;
}

// ===============================
// 🛒 HÀM THÊM GIỎ HÀNG
// ===============================
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      img: product.img,
      price: convertPriceToNumber(product.price),
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
}

// 🔹 Chuyển giá "6.197.500₫" → số
function convertPriceToNumber(priceStr) {
  return Number(priceStr.replace(/[^\d]/g, "")) || 0;
}

// ===============================
// 🔹 TỰ ĐỘNG KHỞI TẠO TRANG SHOP
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.querySelector('#shop');
  if (shopContainer) initializeShopPage();
});
