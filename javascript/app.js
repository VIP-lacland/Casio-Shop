// --- Hàm load file HTML vào phần tử có id tương ứng ---
function loadHTML(id, filePath) {
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Không tìm thấy file: ${filePath}`);
      return res.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;

      // Nếu là header, sau khi load xong thì xử lý menu active
      if (id === 'header') highlightActiveMenu();
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

<<<<<<< HEAD
// Xử lý navigation
function addNavigationListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('Loading page:', page); // Debug
            loadPage(page);
            
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Load trang
async function loadPage(pageName) {
    try {
        const response = await fetch(`/HTML/partials/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById('main-content').innerHTML = content;
        console.log('Page loaded successfully:', pageName); // Debug
        
        // 👉 Gắn sự kiện form sau khi contact.html đã load xong
        if (pageName === 'contact') {
            initContactForm();
        }
        // 👉 Gắn sự kiện cho nút tài khoản sau khi shop đã load xong
        if (pageName === 'shop') {
    console.log("🛒 Shop page loaded. Running initializeShopPage...");
    if (typeof initializeShopPage === 'function') {
        initializeShopPage();
    } else {
        console.warn("⚠️ initializeShopPage() chưa sẵn sàng, kiểm tra shop.js import trong index.html");
    }
}
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('main-content').innerHTML = `
            <div style="padding: 100px 20px; text-align: center; color: white;">
                <h2>Trang đang được cập nhật</h2>
                <p>Không thể tải trang: ${pageName}.html</p>
                <p>Lỗi: ${error.message}</p>
                <button onclick="loadPage('home')" style="padding: 10px 20px; background: #00ff99; color: black; border: none; border-radius: 5px; cursor: pointer;">Về trang chủ</button>
            </div>
        `;
    }
}
 // load button acction 
 function loadbuttonaccount(){
    const accountButton = document.getElementById('account-button');
    if (accountButton) {
        accountButton.addEventListener('click', function() {
            loadPage('account');
        });
    }   }

// Load header và footer
// Khởi chạy khi trang load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting app...'); // Debug
    
    // Load header và footer
    loadHTML('header', '/HTML/partials/header.html');
    loadHTML('footer', '/HTML/partials/footer.html');
    
    // Hiển thị nội dung mặc định ngay lập tức
    document.getElementById('main-content').innerHTML = createDefaultHome();
});

=======
// --- Khi trang load lần đầu ---
window.addEventListener('DOMContentLoaded', () => {
  // Load header và footer vào các trang
  loadHTML('header', '/HTML/header.html');
  loadHTML('footer', '/HTML/footer.html');
});
>>>>>>> login_manh
