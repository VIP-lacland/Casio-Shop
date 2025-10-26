// Khi toàn bộ nội dung trang được tải xong
document.addEventListener("DOMContentLoaded", () => {
//  Khai báo các phần tử và dữ liệu 
  const orderContainer = document.querySelector(".don-hang-cua-ban"); 
  const cart = JSON.parse(localStorage.getItem("cart")) || []; 

  // Nếu có sản phẩm trong giỏ hàng 
  let tongTien = 0; 
  let htmlSanPham = ""; 

  // Duyệt từng sản phẩm trong giỏ
  cart.forEach((item) => {
    tongTien += item.price * item.quantity; 

    // HTML cho mỗi sản phẩm
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

  // Hiển thị thông tin đơn hàng trên trang Checkout 
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

  // Xử lý sự kiện khi người dùng nhấn nút "Đặt hàng"
  const datHangBtn = orderContainer.querySelector(".nut-dat-hang");
  datHangBtn.addEventListener("click", () => { 
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm ");
    localStorage.removeItem("cart");
    window.location.href = "shop.html";
  });
});

// LOAD HEADER và FOOTER + XỬ LÝ NÚT ĐĂNG NHẬP, ĐĂNG KÝ, ĐẶT HÀNG
document.addEventListener("DOMContentLoaded", () => {
  // LOAD HEADER & FOOTER 
  // gọi tới file header.html
  fetch("/HTML/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  fetch("/HTML/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

  // NÚT ĐĂNG NHẬP
  const btnDangNhap = document.querySelector(".nut-dang-nhap");
  if (btnDangNhap) {
    btnDangNhap.addEventListener("click", () => {
      window.location.href = "/HTML/account.html";
    });
  }

  // NÚT ĐĂNG KÝ
  const btnDangKy = document.querySelector(".nut-dang-ky");
  if (btnDangKy) {
    btnDangKy.addEventListener("click", () => {
      window.location.href = "/HTML/account.html#register";
    });
  }

  // NÚT ĐẶT HÀNG
  const datHangBtn = document.querySelector(".nut-dat-hang");
  if (datHangBtn) {
    datHangBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("🛒 Giỏ hàng của bạn đang trống!");
        window.location.href = "/HTML/shop.html";
        return;
      }

      alert("✅ Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý.");
      localStorage.removeItem("cart");
      window.location.href = "/HTML/index.html";
    });
  }
});
