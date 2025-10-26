document.addEventListener("DOMContentLoaded", () => {
  const orderContainer = document.querySelector(".don-hang-cua-ban");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Nếu giỏ hàng rỗng
  if (cart.length === 0) {
    orderContainer.innerHTML = `
      <p>🛒 Không có sản phẩm nào để thanh toán.</p>
      <button onclick="window.location.href='cart.html'" class="nut-quay-lai">← Quay lại giỏ hàng</button>
    `;
    return;
  }

  // Tính tổng tiền
  let tongTien = 0;
  let htmlSanPham = "";

  cart.forEach((item) => {
    tongTien += item.price * item.quantity;
    htmlSanPham += `
      <div class="san-pham">
        <div class="thong-tin-san-pham">
          <img src="${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p class="gia">${Number(item.price).toLocaleString("vi-VN")} ₫ × ${item.quantity}</p>
        </div>
      </div>
    `;
  });

  // Cập nhật giao diện Checkout
  orderContainer.innerHTML = `
    <h2>Đơn hàng của bạn</h2>
    ${htmlSanPham}
    <div class="phi-van-chuyen">
      <p>Phí vận chuyển:</p>
      <p>Miễn phí</p>
    </div>
    <div class="tong-cong">
      <p><strong>Tổng cộng:</strong></p>
      <p class="gia-tong"><strong>${tongTien.toLocaleString("vi-VN")} ₫</strong></p>
    </div>
    <button class="nut-dat-hang">Đặt hàng</button>
  `;

  // ==========================
  // ✅ Xử lý nút "Đặt hàng"
  // ==========================
  const datHangBtn = orderContainer.querySelector(".nut-dat-hang");
  datHangBtn.addEventListener("click", () => {
    alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm ❤️");
    localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi đặt hàng
    window.location.href = "shop.html"; // Quay lại cửa hàng
  });
});
