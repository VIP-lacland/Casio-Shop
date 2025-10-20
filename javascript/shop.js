// truy cập đến nút bấm
const items = document.querySelectorAll('.filed_type .type button');
items.forEach(item => {item.addEventListener('click',() => handleButtonClick(item, items));});


// Xử lý nút bấm
function handleButtonClick(selectedButton, allButtons) {
    allButtons.forEach(i => i.classList.remove('active'));
    selectedButton.classList.add('active');
}


let products = null;
// lấy dữ liệu từ file json
fetch('/db.json')
  .then(response => response.json())
  .then(data => {
    products = data.Product;
    showProductByBrand('Tất cả');
  })

  //  Tạo thẻ sản phẩm
function createProductCard(product) {
  let newProduct = document.createElement('div');
  newProduct.classList.add('product_card');
  newProduct.innerHTML = 
  `<div class="image_card">
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
                <span class="reduced_price">2000.000</span>
            </div>
            <button><i class="fa-solid fa-cart-shopping"></i>Thêm vào giỏ hàng</button>
        </div>`;
        return newProduct;
}


// hiển thị những dữ liệu từ trong danh sách html
function showProductByBrand(brand) {
  // xoá dữ liệu mặc định trong html
  let listProductHTML = document.querySelector('.products')
  listProductHTML.innerHTML = '';
  // Tổng số sản phẩm sau lọc
  let total = document.querySelector('.sum_product')

  let type = "Tất cả";
  if (type === brand) { 
    if (products != null) {
      products.forEach(product => {
      let productCard = createProductCard(product)
      listProductHTML.appendChild(productCard);
    });
  }
  }else {
      let listProductBrand = products.filter( product => product.brand.toLowerCase() === brand.toLowerCase());
      if (!listProductBrand || listProductBrand.length === 0) {
      listProductHTML.innerHTML = `<p>Sản phẩm hiệu ${type} đã hết hàng</p>`;
      return;
    } else { 
      listProductBrand.forEach( product => { 
      let productCard = createProductCard(product)
      listProductHTML.appendChild(productCard);
    })
    };
  }
  updateTotalProducts(listProductHTML, total);
}


// Đếm số sản phẩm có trong listElement
function updateTotalProducts(listElement, totalElement) {
  // Đếm số phần tử con trong list
  let totalProducts = listElement.childElementCount;
  // Cập nhật nội dung
  totalElement.innerHTML = `<p>Hiển thị ${totalProducts} sản phẩm</p>`;
}


// Luôn hiển thị màu cho nút khi mới load trang và show sản phẩm ban đầu
function initializeDefaultButton() {
  const item = document.querySelector('.filed_type .type .default');
  if (!item) return;
  item.classList.remove('active');
  item.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeDefaultButton();
});



