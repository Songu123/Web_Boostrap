// const giam = document.getElementById('button-addon1');
// const tang = document.getElementById('button-addon2');
// const quantity_product = document.getElementById('quantity_product');

// // Chuyển giá trị hiện tại trong input thành số nguyên
// let currentQuantity = parseInt(quantity_product.value);

// // Xử lý khi nhấn nút tăng
// tang.addEventListener('click', function () {
//     currentQuantity += 1;
//     quantity_product.value = currentQuantity;
// });

// // Xử lý khi nhấn nút giảm
// giam.addEventListener('click', function () {
//     if (currentQuantity > 1) {
//         currentQuantity -= 1;
//     }
//     quantity_product.value = currentQuantity;
// });

const object = {
  name: 'Nguyen Van Son',
  tuoi: 18,
  gioitinh: 'Nam',
};

localStorage.setItem('object', JSON.stringify(object));

let getObject = localStorage.getItem('object');
console.log(getObject);

const listObject = [];

listObject.push(object);
localStorage.setItem('listObject', JSON.stringify(listObject));

function calcTotal(productId, size) {
  var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
  var productPriceElement = document.querySelector(`.product-price[data-id="${productId}_${size}"]`);

  if (quantityInput && productPriceElement) {
    var price = Number(productPriceElement.innerHTML.replace(/\./g, ''));
    var product_quantity = Number(quantityInput.value);
    var price_value = price * product_quantity;
    // format lại định dạng của money
    var price_tamtinh = document.querySelector(`.tamtinh[data-id="${productId}_${size}"]`);
    if (price_tamtinh) {
      price_tamtinh.innerHTML = price_value.toLocaleString('de-DE');
    }
  }
  updateCart(productId, size, Number(quantityInput.value));

  displayThanhToan();

  alertUpdateCart();
}

function increaseQuantity(productId, size) {
  var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
  var currentQuantity = Number(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
  calcTotal(productId, size); // Update total for this specific product
}

function decreaseQuantity(productId, size) {
  var quantityInput = document.querySelector(`#quantity_product_${productId}_${size}`);
  var currentQuantity = Number(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
    calcTotal(productId, size); // Update total for this specific product
  }
}

// Hàm lấy dữ liệu từ localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Hàm lấy danh sách sản phẩm theo category
function getProductsByCategory(category) {
  const products = getLocalStorage('products'); // Lấy danh sách sản phẩm từ localStorage
  return products.filter((product) => product.category === category); // Lọc theo category
}

function displayCart() {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const poloProducts = getProductsByCategory('polo');
  const aothunProducts = getProductsByCategory('aothun');
  const quanthunProducts = getProductsByCategory('quanthun');
  const quankakiProducts = getProductsByCategory('kaki');
  const quanlotProducts = getProductsByCategory('brief');
  const boxerProducts = getProductsByCategory('boxer');

  const allProducts = poloProducts.concat(aothunProducts, quanthunProducts, quanlotProducts);
  var table_cart = document.querySelector('.table-cart-content');
  var tongtien = 0;
  table_cart.innerHTML = ''; // Clear existing content

  // Iterate through each cart item
  carts.forEach((cart) => {
    const product = allProducts.find((product) => product.id === cart.id);

    if (product) {
      // Check if the product exists
      var price = Number(product.price.replace(/\./g, ''));
      var product_quantity = Number(cart.quantity);
      var tamtinh_value = price * product_quantity;
      // format lại định dạng của money
      // const value_money = tamtinh_value.toLocaleString('de-DE');
      table_cart.innerHTML += `
                <tr>
                    <td class="col-5">
                        <div class="d-flex align-items-center">
                            <button type="button" id="toastbtn" class="btn-close border border-1 px-3 py-2" aria-label="Close" onclick="deleteCart('${
                              cart.id
                            }', '${cart.size}')"></button>
                            <div class="thongbao toast-container position-fixed top-0 end-0 p-3">
                                <div class="toast bg-main text-white" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div class="toast-header">
                                    <strong class="me-auto">Thông báo</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                    </div>
                                    <div class="toast-body">
                                        Giỏ hàng đã được cập nhật.
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 p-2 me-1">
                                <img src="${product.img1}" class="w-100" alt="">
                            </div>
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <p class="fw-light d-inline mb-1">${product.name}</p>
                                <p class="text-color mb-1 text-cart"><b>Màu sắc: </b>Xanh đen</p>
                                <p class="text-color mb-1 text-cart"><b>Size: </b>${cart.size}</p>
                            </div>
                        </div>
                    </td>
                    <td class="fw-bold align-middle"><span class="product-price" data-id="${cart.id}_${
        cart.size
      }">${price.toLocaleString('de-DE')}</span> đ</td>
                    <td class="align-middle">
                        <div class="input-group" style="width: 120px;">
                            <button class="btn btn-white border border-secondary" type="button"
                                    onclick="decreaseQuantity('${cart.id}','${cart.size}')">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input id="quantity_product_${cart.id}_${cart.size}" 
                                   class="quantity_product form-control text-center border border-secondary"
                                   value="${cart.quantity}" oninput="calcTotal('${cart.id}','${cart.size}')" />
                            <button class="btn btn-white border border-secondary" type="button"
                                    onclick="increaseQuantity('${cart.id}','${cart.size}')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td class="fw-bold align-middle"><span class="tamtinh" data-id="${cart.id}_${
        cart.size
      }">${tamtinh_value.toLocaleString('de-DE')}</span> đ</td>
                </tr>
            `;
    }
  });
}

function getSumPrice() {
  const valuePrice = document.querySelectorAll('.tamtinh');
  var tongTien = 0;

  valuePrice.forEach((item) => {
    // Lấy giá trị văn bản của phần tử hiện tại
    const value = item.textContent;

    // Loại bỏ các ký tự không phải số và chuyển thành số nguyên
    const numericValue = parseInt(value.replace(/[^\d]/g, ''), 10);
    // const formattedValue = numericValue.toLocaleString('de-DE');

    // Kiểm tra nếu numericValue là số và không phải NaN
    if (!isNaN(numericValue)) {
      tongTien += numericValue; // Cộng giá trị vào tổng
    }

    console.log(numericValue); // In giá trị số của từng phần tử
  });

  console.log('Tong tien: ' + tongTien); // In tổng số tiền
  return tongTien; // Trả về tổng số tiền nếu cần sử dụng
}

function displayThanhToan() {
  const tongtien_cart = document.querySelector('.tongtien_cart');
  const totalCart = getSumPrice();
  tongtien_cart.innerHTML = '';
  tongtien_cart.innerHTML = `
    <div class="d-flex justify-content-between border-bottom">
                            <p>Tạm tính</p>
                            <b>${totalCart.toLocaleString('de-DE')} đ</b>
                        </div>
                        <div class="d-flex justify-content-between align-items-center py-2">
                            <p class="m-0">Tổng</p>
                            <b>${totalCart.toLocaleString('de-DE')} đ</b>
                        </div>`;
}

function updateCart(id, size, quantity) {
  const carts = JSON.parse(localStorage.getItem('carts'));

  const index = carts.findIndex((cart) => cart.id === id && cart.size === size);

  if (index !== null) {
    carts[index] = { id, size, quantity };
    localStorage.setItem('carts', JSON.stringify(carts));
    console.log('Update thanh cong!');
    displaySubCart();
  }
}

// Hàm thông báo sản phẩm đã được cập nhật trong giỏ hàng
function alertUpdateCart() {
  var toastEl = document.querySelector('.toast');
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// Hàm kiểm tra đăng nhập trước khi thanh toán
function checkLoginBeforeCheckout() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Lấy thông tin người dùng từ localStorage

  if (currentUser) {
      // Người dùng đã đăng nhập, chuyển đến trang thanh toán
      window.location.href = './checkout.html';
  } else {
      // Người dùng chưa đăng nhập, chuyển đến trang đăng nhập
      alert('Bạn cần đăng nhập để tiếp tục thanh toán.');
      window.location.href = './login.html';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Render giá trị vào bảng giỏ hàng
  displayCart();
  displayThanhToan();
});
