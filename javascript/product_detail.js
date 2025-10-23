const detailContainer = document.querySelector('.product_detail')

const getDataProduct = async () => {
    const path = new URLSearchParams(window.location.search);


    const productId = path.get('id');
    
    const response = await fetch('http://localhost:3000/Product');
    
    const data = await response.json();

    const findProductId = data.find(item => item.id.toString() === productId.toString())

    detailContainer.innerHTML = `
        <div class="product_detail">
        <a href="/HTML/shop.html" class="back_button">
            <i class="fa-solid fa-arrow-left"></i> Quay lại cửa hàng
        </a>
        <div class="product">
            <div class="product_image">
                <img src="${findProductId.img}"
                    alt="">
            </div>
            <div class="product_infor">
                <div class="product_header">
                    <div class="product_brand">
                        <p>${findProductId.brand}</p>
                    </div>
                    <div class="product_name">
                        <h1>${findProductId.name}</h1>
                    </div>
                    <div class="product_icons">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <span>4.8 (128 đánh giá)</span>
                    </div>
                    <div class="product_price">
                        <span class="official_price">${findProductId.price}</span>
                        <span class="reduced_price">2000.000</span>
                    </div>
                </div>
                <div class="product_body">
                    <h3>Mô tả sản phẩm</h3>
                    <div class="product_desc">
                        <p>Biểu tượng của G-SHOCK với thiết kế vuông cổ điển, bền bỉ vượt thời gian.</p>
                    </div>
                    <h4>Tính năng nổi bật</h4>
                    <ul class="product_features">
                        <li>
                            <i class="fa-solid fa-check"></i>
                            <p>Chống sốc</p>
                        </li>
                        <li>
                            <i class="fa-solid fa-check"></i>
                            <p>Chống sốc</p>
                        </li>
                        <li>
                            <i class="fa-solid fa-check"></i>
                            <p>Chống sốc</p>
                        </li>
                    </ul>
                    <div class="product_technical_specs">
                        <h3>Thông số kỹ thuật</h3>
                        <ul class="color">
                            <li class="spec_item color">
                                <span class="spec_lable color">Bộ máy:</span>
                                <span class="spec_value color">Quartz</span>
                            </li>
                            <li class="spec_item color">
                                <span class="spec_lable color">Bộ máy:</span>
                                <span class="spec_value color">Quartz</span>
                            </li>
                            <li class="spec_item color">
                                <span class="spec_lable color">Bộ máy:</span>
                                <span class="spec_value color">Quartz</span>
                            </li>
                            <li class="spec_item color">
                                <span class="spec_lable color">Bộ máy:</span>
                                <span class="spec_value color">Quartz</span>
                            </li>
                        </ul>
                    </div>
                    <div class="cart-quantity">
                        <label for="">Số lượng</label>
                        <button class="qty-btn minus">-</button>
                        <span class="qty-btn quantity">1</span>
                        <button class="qty-btn plus">+</button>
                    </div>
                    <div class="btn_buy">
                        <button><i class="fa-solid fa-cart-shopping"></i>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

}

getDataProduct();