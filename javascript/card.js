// Lấy các phần tử
const nutTru = document.querySelector('.nut-tru');
const nutCong = document.querySelector('.nut-cong');
const hienThiSoLuong = document.querySelector('.so-luong-hien-tai');
const tongPhuEl = document.getElementById('tong-phu-san-pham');
const giaEl = document.querySelector('.gia');
const tamTinhEl = document.getElementById('tam-tinh');
const tongCongEl = document.getElementById('tong-cong');

// Lấy giá (loại bỏ ký tự ₫ và dấu .) | Biến lưu số lượng
const gia = parseFloat(giaEl.textContent.replace(/[^\d]/g, ''));
let soLuong = 1;

// Hàm cập nhật tổng
function capNhatTong() {
  const tongPhu = gia * soLuong;
  const dinhDang = tongPhu.toLocaleString('vi-VN') + ' ₫';
  tongPhuEl.textContent = dinhDang;
  tamTinhEl.textContent = dinhDang;
  tongCongEl.textContent = dinhDang;
}
  

// Nút cộng 
nutCong.addEventListener('click', () => {
  soLuong++;
  hienThiSoLuong.textContent = soLuong;
  capNhatTong();
});
// Nút trừ
nutTru.addEventListener('click', () => {
  if (soLuong > 1) {
    soLuong--;
    hienThiSoLuong.textContent = soLuong;
    capNhatTong();
  }
});


// Nút Xóa một sản phẩm
const nutXoa = document.querySelector('.nut-xoa');
nutXoa.addEventListener('click', () => {
  const theCard = nutXoa.closest('.the-card');
  if (theCard) {
    const xacNhan = confirm("🗑️ Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (xacNhan) {
      theCard.remove();

      // Nếu có lưu trong localStorage thì xóa luôn:
      const productId = theCard.dataset.id; 
      if (productId) {
        const cart = JSON.parse(localStorage.getItem('cart_demo')) || {};
        delete cart[productId];
        localStorage.setItem('cart_demo', JSON.stringify(cart));
      }

      alert("Đã xóa sản phẩm!");
    }
  }
});