document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".danh-sach-san-pham");
  const tamTinhEl = document.getElementById("tam-tinh");
  const tongCongEl = document.getElementById("tong-cong");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    list.innerHTML = "";

    if (cart.length === 0) {
      list.innerHTML = `
        <div class="gio-hang-trong" style="text-align:center; padding:20px;">
          <p>🛒 Giỏ hàng của bạn đang trống.</p>
          <button onclick="window.location.href='shop.html'" style="padding:10px 20px; cursor:pointer;">← Quay lại cửa hàng</button>
        </div>
      `;
      tamTinhEl.textContent = "0 ₫";
      tongCongEl.textContent = "0 ₫";
      return;
    }

    let tongTien = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("san-pham");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="thong-tin-san-pham">
          <h3>${item.name}</h3>
          <p class="gia">${Number(item.price).toLocaleString("vi-VN")} ₫</p>
          <div class="so-luong">
            <button class="nut-tru">-</button>
            <span class="so-luong-hien-tai">${item.quantity}</span>
            <button class="nut-cong">+</button>
          </div>
        </div>
        <div class="hanh-dong-san-pham">
          <div class="tong-phu">
            <b>Tổng phụ</b>
            <p><span>${(item.price * item.quantity).toLocaleString("vi-VN")} ₫</span></p>
            <button class="delete-btn">🗑️ Xóa</button>
          </div>
        </div>
      `;

      div.querySelector(".nut-cong").addEventListener("click", () => {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      div.querySelector(".nut-tru").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      div.querySelector(".delete-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      tongTien += item.price * item.quantity;
      list.appendChild(div);
    });

    tamTinhEl.textContent = tongTien.toLocaleString("vi-VN") + " ₫";
    tongCongEl.textContent = tongTien.toLocaleString("vi-VN") + " ₫";
  }

  renderCart();
});
