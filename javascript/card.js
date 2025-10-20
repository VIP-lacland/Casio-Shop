// Lấy các phần tử cần thao tác
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const quantityEl = document.querySelector('.quantity');
const totalEl = document.getElementById('total');
const priceEl = document.querySelector('.cart-price h4');

// Lấy giá gốc từ phần tử giá (bỏ dấu $)
const price = parseFloat(priceEl.textContent.replace('$', ''));

// Biến lưu số lượng
let quantity = 1;

// Hàm cập nhật tổng
function updateTotal() {
  const total = price * quantity;
  totalEl.textContent = `$${total.toLocaleString()}`; // định dạng số đẹp hơn
}

// Khi bấm nút +
plusBtn.addEventListener('click', () => {
  quantity++;
  quantityEl.textContent = quantity;
  updateTotal();
});

// Khi bấm nút −
minusBtn.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityEl.textContent = quantity;
    updateTotal();
  }
});
