// checkout.js — autofill form for logged-in users, allow guest checkout, simulate payment

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));
  } catch (e) {
    return null;
  }
}

function populateFormFromUser() {
  const user = getCurrentUser();
  if (!user) return;
  const fullNameEl = document.getElementById('fullName');
  const phoneEl = document.getElementById('phone');
  const emailEl = document.getElementById('email');

  if (fullNameEl) fullNameEl.value = user.username || user.name || '';
  if (phoneEl) phoneEl.value = user.phone || '';
  if (emailEl) emailEl.value = user.email || '';
}

function clearFormIfLoggedOut() {
  const user = getCurrentUser();
  if (!user) return;
  // no-op; if you want to clear when logged out, implement here
}

function simulatePayment(payload) {
  // Simulate payment processing delay
  console.log('Simulating payment with payload:', payload);
  // Show success message
  alert('✅ Thanh toán thành công! Cảm ơn bạn đã đặt hàng.');
}

function readFormPayload() {
  const payload = {};
  payload.fullName = document.getElementById('fullName')?.value?.trim() || '';
  payload.phone = document.getElementById('phone')?.value?.trim() || '';
  payload.email = document.getElementById('email')?.value?.trim() || '';
  payload.address = document.getElementById('address')?.value?.trim() || '';
  payload.note = document.getElementById('note')?.value?.trim() || '';

  // Add current user id/email if available
  const user = getCurrentUser();
  if (user) payload.user = { id: user.id, email: user.email, username: user.username || user.name };

  // Add cart items and totals
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    payload.cartItems = cart;
    payload.total = cart.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity || 1)), 0);
  } catch (e) {
    payload.cartItems = [];
    payload.total = 0;
  }

  // Timestamp
  payload.timestamp = new Date().toISOString();

  return payload;
}

function wireHandlers() {
  const placeBtn = document.getElementById('placeOrderBtn');
  if (placeBtn) {
    placeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Validate required fields (basic)
      const fullName = document.getElementById('fullName')?.value?.trim();
      const phone = document.getElementById('phone')?.value?.trim();
      const email = document.getElementById('email')?.value?.trim();
      const address = document.getElementById('address')?.value?.trim();

      if (!fullName || !phone || !email || !address) {
        alert('⚠️ Vui lòng điền đầy đủ: Họ tên, SĐT, Email, Địa chỉ giao hàng.');
        return;
      }

      const payload = readFormPayload();
      simulatePayment(payload);
      console.log('Checkout payload:', payload);

      // Optionally clear cart or redirect
      // window.location.href = '/HTML/index.html';
    });
  }

  // Listen for storage events (login in other tab)
  window.addEventListener('storage', (e) => {
    if (e.key === 'currentUser') {
      // Re-populate form when user logs in/out in another tab
      setTimeout(populateFormFromUser, 50);
      setTimeout(updateLoginButtonVisibility, 50);
    }
    if (e.key === 'cart') {
      setTimeout(renderCart, 50);
    }
  });

  // Also handle focus (user may have logged in on another tab)
  window.addEventListener('focus', () => {
    setTimeout(populateFormFromUser, 50);
    setTimeout(updateLoginButtonVisibility, 50);
    setTimeout(renderCart, 50);
  });
}

// Render cart items and totals in the right column
function renderCart() {
  const container = document.getElementById('checkout-cart-items');
  const totalEl = document.getElementById('checkout-total');
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!container) return;
    container.innerHTML = '';

    if (!cart.length) {
      container.innerHTML = '<p>Giỏ hàng trống.</p>';
      if (totalEl) totalEl.textContent = '0 ₫';
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'checkout-item';
      const qty = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      const subtotal = qty * price;
      total += subtotal;

      itemDiv.innerHTML = `\n        <div class="item-row">\n          <div class="item-name">${item.name}</div>\n          <div class="item-qty">x${qty}</div>\n          <div class="item-sub">${subtotal.toLocaleString('vi-VN')} ₫</div>\n        </div>\n      `;
      container.appendChild(itemDiv);
    });

    if (totalEl) totalEl.textContent = total.toLocaleString('vi-VN') + ' ₫';
  } catch (err) {
    console.error('renderCart error', err);
  }
}

function updateLoginButtonVisibility() {
  const user = getCurrentUser();
  // Hide any login-to-autofill anchors/buttons
  const loginAnchors = document.querySelectorAll('a[href*="account.html"]');
  loginAnchors.forEach(a => {
    if (a.querySelector('.nut-dang-nhap')) {
      a.style.display = user ? 'none' : '';
    }
  });
  // Also hide standalone buttons if present
  const loginBtns = document.querySelectorAll('.nut-dang-nhap');
  loginBtns.forEach(btn => {
    const parentA = btn.closest('a');
    if (!parentA) btn.style.display = user ? 'none' : '';
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateFormFromUser();
  wireHandlers();
  renderCart();
  updateLoginButtonVisibility();

  // If there is a login button on the page, set its href to account.html?redirect=current
  const loginBtns = document.querySelectorAll('.nut-dang-nhap');
  loginBtns.forEach(btn => {
    // If button is inside an anchor already, skip
    const parentA = btn.closest('a');
    if (!parentA) {
      btn.addEventListener('click', () => {
        window.location.href = '/HTML/account.html?redirect=' + encodeURIComponent(window.location.pathname);
      });
    }
  });
});
