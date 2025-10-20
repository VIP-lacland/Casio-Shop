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


// Khởi chạy khi trang load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting app...'); // Debug
    
    // Load header và footer
    loadHTML('header', '/HTML/partials/header.html');
    loadHTML('footer', '/HTML/partials/footer.html');
    loadHTML('main-content', '/HTML/partials/home.html');
    loadbuttonaccount();
    // Hiển thị nội dung mặc định ngay lập tức
    document.getElementById('main-content').innerHTML = createDefaultHome();
});

// Hàm để khi mở trang sẽ hiện trang chủ
function homepage() {
    loadPage('home');
}
// Hàm qua trang shop mà không cần load lại trang thay đổi header
function shoppage() {
    loadPage('shop');
}
// Hàm qua trang contact
function contactpage() {
    loadPage('contact');
}