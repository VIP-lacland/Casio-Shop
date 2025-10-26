// --- Hàm load file HTML vào phần tử có id tương ứng ---
function loadHTML(id, filePath) {
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Không tìm thấy file: ${filePath}`);
      return res.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;

        // Nếu là header, sau khi load xong thì xử lý menu active và khởi tạo menu user
        if (id === 'header') {
          highlightActiveMenu();
          // setupUserMenu may be defined below; call if available
          try { if (typeof setupUserMenu === 'function') setupUserMenu(); } catch (e) { /* ignore */ }
        }
    })
    .catch(err => console.error('Lỗi khi load file:', err));
}

// --- Tô sáng menu đang được chọn ---
function highlightActiveMenu() {
  const path = window.location.pathname.split('/').pop(); // lấy tên file hiện tại
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(path)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// --- Thiết lập menu/user actions (username + logout) ---
function setupUserMenu() {
  try {
    // Prefer sessionStorage (current session). Fallback to localStorage for persistent login.
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));
    const userActions = document.getElementById('user-actions');
    if (!userActions) return;

    if (currentUser) {
      const name = currentUser.username || currentUser.name || currentUser.email || 'Người dùng';
      // show username and logout button
      userActions.innerHTML = ` <span class="user-name">${name}</span> <button id="logout-header-btn" class="btn-logout">Đăng xuất</button>`;
      const btn = document.getElementById('logout-header-btn');
      if (btn) btn.addEventListener('click', logout);
    } else {
      userActions.innerHTML = '';
    }
  } catch (err) {
    console.error('setupUserMenu error:', err);
  }
}

// --- Đăng xuất ---
function logout() {
  try {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
  } catch (e) { /* ignore */ }
  // Redirect to homepage after logout
  window.location.href = '/HTML/index.html';
}

// --- Khi trang load lần đầu ---
window.addEventListener('DOMContentLoaded', () => {
  // Load header và footer vào các trang
  loadHTML('header', '/HTML/header.html');
  loadHTML('footer', '/HTML/footer.html');
});


  

