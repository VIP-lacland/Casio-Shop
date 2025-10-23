// ============================
// login.js – Đăng nhập / Đăng ký bằng JSON Server (db.json)
// ============================

const form = document.getElementById('authForm');
const toggleBtn = document.getElementById('toggleBtn');
const nameField = document.getElementById('nameField');
const phoneField = document.getElementById('phoneField');
const confirmField = document.getElementById('confirmField');
const submitBtn = document.querySelector('.submit');

let isLoginMode = true; // Mặc định là đăng nhập
const API_URL = "http://localhost:3001/Account";

// ============================
// Chuyển đổi giữa login / register
// ============================
toggleBtn.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  nameField.classList.toggle('hidden', isLoginMode);
  phoneField.classList.toggle('hidden', isLoginMode);
  confirmField.classList.toggle('hidden', isLoginMode);
  submitBtn.textContent = isLoginMode ? 'Đăng Nhập' : 'Đăng Ký';
  toggleBtn.textContent = isLoginMode
    ? 'Chưa có tài khoản? Đăng ký ngay'
    : 'Đã có tài khoản? Đăng nhập ngay';
});

// ============================
// Xử lý khi submit form
// ============================
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword')?.value.trim();
  const name = document.getElementById('name')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();

  if (isLoginMode) {
    // ----- ĐĂNG NHẬP -----
    try {
      const res = await fetch(API_URL);
      const users = await res.json();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("❌ Sai email hoặc mật khẩu!");
        return;
      }

      alert("✅ Đăng nhập thành công!");
      sessionStorage.setItem('currentUser', JSON.stringify(user));

      // Điều hướng theo quyền
      window.location.href = user.role === "admin"
        ? "/admin.html"
        : "/home.html";

    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("⚠️ Không thể kết nối tới server!");
    }

  } else {
    // ----- ĐĂNG KÝ -----
    if (!name || !phone || !email || !password || !confirmPassword) {
      alert("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      if (users.some(u => u.email === email)) {
        alert("⚠️ Email này đã được đăng ký!");
        return;
      }

      const newUser = {
        username: name,
        phone,
        email,
        password,
        role: email.includes("admin") ? "admin" : "user",
        createdAt: new Date().toISOString()
      };

      const addRes = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!addRes.ok) throw new Error("Không thể lưu tài khoản!");

      alert("✅ Đăng ký thành công! Hãy đăng nhập.");
      toggleBtn.click();

    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("❌ Có lỗi xảy ra khi đăng ký!");
    }
  }
});

// ============================
// Kiểm tra đăng nhập tự động
// ============================
window.addEventListener('load', () => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (currentUser) {
    window.location.href = currentUser.role === 'admin'
      ? '/admin.html'
      : '/home.html';
  }
});
