// Load header và footer
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Thêm event listeners sau khi load header
        if (elementId === 'header') {
            addNavigationListeners();
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
        document.getElementById(elementId).innerHTML = `<p>Lỗi tải ${elementId}</p>`;
    }
}

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
<<<<<<< HEAD
=======
        // 👉 Gắn sự kiện cho nút tài khoản sau khi shop đã load xong
        if (pageName === 'shop') {
    console.log("🛒 Shop page loaded. Running initializeShopPage...");
    if (typeof initializeShopPage === 'function') {
        initializeShopPage();
    } else {
        console.warn("⚠️ initializeShopPage() chưa sẵn sàng, kiểm tra shop.js import trong index.html");
    }
}
        
>>>>>>> origin/shop_page
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

<<<<<<< HEAD

// Load header và footer
=======
// Load header và footer
// Khởi chạy khi trang load
>>>>>>> origin/shop_page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting app...'); // Debug
    
    // ❗ Dùng đường dẫn tương đối, KHÔNG có dấu "/"
    // loadHTML('header', './HTML/partials/header.html');
    // loadHTML('footer', './HTML/partials/footer.html');
    loadHTML('header', './partials/header.html');
    loadHTML('footer', './partials/footer.html');
    
    // Hiển thị nội dung mặc định
    document.getElementById('main-content').innerHTML = createDefaultHome();
});

<<<<<<< HEAD

// lưu dữ liệu form vào local
 document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    // Lấy dữ liệu người dùng nhập
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Tạo đối tượng chứa dữ liệu
    const contactData = {
      name: name,
      email: email,
      message: message,
      time: new Date().toLocaleString()
    };

    // Lấy danh sách đã lưu (nếu có)
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Thêm dữ liệu mới
    contacts.push(contactData);

    // Lưu lại vào localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Thông báo thành công
    alert("Đã lưu thông tin liên hệ của bạn!");

    // Xóa nội dung form
    document.getElementById("contactForm").reset();
  });
=======
>>>>>>> origin/shop_page
