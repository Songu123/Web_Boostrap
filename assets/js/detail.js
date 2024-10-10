// Hàm lấy tham số query từ URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Lấy ID sản phẩm từ URL
  const productId = getQueryParam('id');
  
  // Hiển thị chi tiết sản phẩm dựa trên ID
  function loadProductDetail(id) {
    var products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Tìm sản phẩm theo ID
    const product = products.find(product => product.id === id);
  
    if (product) {
      document.getElementById("product-detail").innerHTML = `
       <div class="col-lg-6 col-md-12">
                <img src="${product.img1}" class="img-fluid rounded" alt="Áo Polo Nam Bird">
            </div>

            <!-- Product Details -->
            <div class="col-lg-6 col-md-12 mt-4">
                <h3 class="fw-bold">${product.name}</h3>
                <h4 class="text-danger" itemprop="price">${product.price} đ</h4>

                <!-- Product Info -->
                <ul class="">
                    <li><strong>Chất liệu: </strong>Thun cá sấu cotton lục giác, mềm mát, thấm mồ hôi tốt, co giãn 4 chiều.</li>
                    <li><strong>Size: </strong>M (45-55) – L (55-65) – XL (65-75)</li>
                    <li><strong>Màu sắc: </strong>Đen, trắng, xám, xanh, đỏ</li>
                    <li><strong>Thương hiệu: </strong>Bird</li>
                </ul>

                <div class="mt-4">
                    <div class="d-flex flex-column">
                        <label for="size" class="fw-semibold">Size</label>
                        <select id="size" class="form-select">
                            <option selected value="">Chọn kích cỡ</option>
                            <option value="1">M</option>
                            <option value="2">L</option>
                            <option value="3">XL</option>
                        </select>
                                                                            
                    </div>
                    <div class="d-flex align-items-center mt-4">
                        <label for="" class="me-3 fw-bold">Số lượng</label>
                        <div class="quantity d-flex border">
                            <button class="px-3" id="decreaseBtn">-</button>
                            <input class="border border-dark px-3 py-2 text-center" style="width: 50px;" id="quantityValue" value="1" min="1">
                            <button class="px-3" id="increaseBtn">+</button>
                        </div>       
                    </div>
                    
                </div>
                <div class="d-flex justify-content-between w-lg-75 mt-4">
                    <button class="btn btn-danger fw-semibold border-dark w-50 me-4 py-2" type="button">THÊM VÀO GIỎ HÀNG</button>
                    <button type="button" class="btn btn-dark w-50 border border-light">MUA NGAY</button>
                </div>
            </div>`;
    } else {
      alert('Sản phẩm không tồn tại');
    }
  }
  
  // Gọi hàm để hiển thị chi tiết sản phẩm
  if (productId) {
    loadProductDetail(productId);
  }
  
// Điểu chỉnh chỉnh số lượng mua hàng
// Lấy các phần tử từ DOM
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const quantityValue = document.getElementById('quantityValue');

// Chuyển giá trị hiện tại trong input thành số nguyên
let currentQuantity = parseInt(quantityValue.value);

// Xử lý khi nhấn nút tăng
increaseBtn.addEventListener('click', function() {
    currentQuantity += 1;
    quantityValue.value = currentQuantity;
});

// Xử lý khi nhấn nút giảm
decreaseBtn.addEventListener('click', function() {
    if (currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantityValue.value = currentQuantity;
});


const giam = document.getElementById('button-addon1');
const tang = document.getElementById('button-addon2');
const quantity_product = document.getElementById('quantity_product');

// Chuyển giá trị hiện tại trong input thành số nguyên
// let giatrihientai = parseInt(quantity_product.value);

// Xử lý khi nhấn nút tăng
tang.addEventListener('click', function() {
    currentQuantity += 1;
    quantity_product.value = currentQuantity;
});

// Xử lý khi nhấn nút giảm
giam.addEventListener('click', function() {
    if (currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantity_product.value = currentQuantity;
});
