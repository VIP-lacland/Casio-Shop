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