
function initializeShopPage() {
  console.log(" Shop Page Initialized");

  let products = []; // Dữ liệu sản phẩm toàn cục trong file

  // ======= FETCH DỮ LIỆU =======
  fetch('/db.json')
    .then(response => response.json())
    .then(data => {
      products = data.Product;
      initializeDefaultButton();
      attachButtonEvents();
      showProductByBrand('Tất cả');
    })
  // ======= GẮN SỰ KIỆN NÚT DANH MỤC =======
  function attachButtonEvents() {
    const items = document.querySelectorAll('.filed_type .type button');
    if (!items || items.length === 0) {
      console.warn("Không tìm thấy nút danh mục trong shop.html");
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

    // Nếu là "Tất cả" → hiển thị toàn bộ
    let filtered = [];
    if (brand === 'Tất cả') {
      filtered = products;
    } else {
      filtered = products.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Nếu không có sản phẩm
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

  // ======= TẠO THẺ SẢN PHẨM =======
  function createProductCard(product) {
  const newProduct = document.createElement('div');
  newProduct.classList.add('product_card');

  newProduct.innerHTML = `
    <a href="/HTML/partials/product_detail.html?id=${product.id}">
      <div class="image_card">
        <img src="${product.img}" alt="">
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
          <span class="reduced_price">2.000.000</span>
        </div>
      </div>
    </a>
    <button><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</button>
  `;

  // ✅ Giữ nguyên bố cục, thêm event "Thêm vào giỏ"
  const addToCartBtn = newProduct.querySelector('button');
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault(); // tránh click ăn vào link
    console.log(`🛒 Đã thêm "${product.name}" vào giỏ!`);
  });

  return newProduct;
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
    if (defaultBtn) {
      defaultBtn.classList.add('active');
    }
  }

  let detailProduct = document.getElementById('product_card');

  detailProduct.addEventListener('click', () => {
    window.location.href = "/HTML/partials/product_detail.html";
  })

} // cuối initializeShopPage()


  function goToDetail() {
    window.location.href = "/HTML/partials/product_detail.html";
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



