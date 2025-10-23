function initializeShopPage() {
  console.log("🛍️ Shop Page Initialized");

  let products = []; // Dữ liệu sản phẩm toàn cục trong file

  // ======= FETCH DỮ LIỆU =======
  fetch('/db.json')
    .then(response => response.json())
    .then(data => {
      products = data.Product;
      initializeDefaultButton();
      attachButtonEvents();
      showProductByBrand('Tất cả');
    });

  // ======= GẮN SỰ KIỆN NÚT DANH MỤC =======
  function attachButtonEvents() {
    const items = document.querySelectorAll('.filed_type .type button');
    if (!items || items.length === 0) {
      console.warn("⚠️ Không tìm thấy nút danh mục trong shop.html");
      return;
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        handleButtonClick(item, items);
        const brand = item.textContent.trim();
        showProductByBrand(brand);
      });
    });
  }

  // ======= XỬ LÝ ACTIVE NÚT BẤM =======
  function handleButtonClick(selectedButton, allButtons) {
    allButtons.forEach(i => i.classList.remove('active'));
    selectedButton.classList.add('active');
  }

  // ======= HIỂN THỊ SẢN PHẨM THEO THƯƠNG HIỆU =======
  function showProductByBrand(brand) {
    const listProductHTML = document.querySelector('.products');
    const total = document.querySelector('.sum_product');
    if (!listProductHTML) return;

    listProductHTML.innerHTML = '';

    let filtered = brand === 'Tất cả'
      ? products
      : products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());

    if (!filtered || filtered.length === 0) {
      listProductHTML.innerHTML = `<p>Sản phẩm hiệu ${brand} đã hết hàng</p>`;
    } else {
      filtered.forEach(product => {
        const productCard = createProductCard(product);
        listProductHTML.appendChild(productCard);
      });
    }

    updateTotalProducts(listProductHTML, total);
  }

  // ======= CẬP NHẬT SỐ SẢN PHẨM HIỂN THỊ =======
  function updateTotalProducts(listElement, totalElement) {
    if (!totalElement) return;
    const totalProducts = listElement.childElementCount;
    totalElement.innerHTML = `<p>Hiển thị ${totalProducts} sản phẩm</p>`;
  }

  // ======= NÚT MẶC ĐỊNH KHI VỪA LOAD =======
  function initializeDefaultButton() {
    const defaultBtn = document.querySelector('.filed_type .type .default');
    if (defaultBtn) defaultBtn.classList.add('active');
  }

  // Nếu bạn không dùng product_detail.html có thể bỏ đoạn này
  let detailProduct = document.getElementById('product_card');
  if (detailProduct) {
    detailProduct.addEventListener('click', () => {
      window.location.href = "/HTML/partials/product_detail.html";
    });
  }
}

// ===============================
// 🔹 TỰ ĐỘNG KHỞI TẠO NẾU MỞ SHOP.HTML RIÊNG
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.querySelector('#shop');
  if (shopContainer && typeof initializeShopPage === 'function') {
    initializeShopPage();
  }
});

// ===============================
// 🧱 TẠO THẺ SẢN PHẨM CÓ NÚT THÊM GIỎ HÀNG
// ===============================
function createProductCard(product) {
  const newProduct = document.createElement('div');
  newProduct.classList.add('product_card');
  newProduct.innerHTML = `
    <div class="image_card">
      <img src="${product.img}" alt="${product.name}">
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
    </div>`;

  // Thêm sự kiện thêm giỏ hàng
  newProduct.querySelector('.add-cart-btn').addEventListener('click', () => {
    addToCart(product);
  });

  return newProduct;
}

// ===============================
// 🛒 HÀM THÊM SẢN PHẨM VÀO GIỎ HÀNG
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

// 🔹 Chuyển giá từ "6.197.500₫" sang số
function convertPriceToNumber(priceStr) {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^\d]/g, ""));
}
