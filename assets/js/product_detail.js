// getQuantityCart();

displaySubCart();

// Hàm lấy tham số query từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy ID sản phẩm từ URL
const product_Id = getQueryParam('id');

// Lấy dữ liệu giỏ hàng từ localStorage

// Lấy dữ liệu sản phẩm từ localStorage

// Hàm lấy số lượng sản phẩm trong giỏ hàng
function getQuantityCart() {
  var carts = JSON.parse(localStorage.getItem('carts')) || [];
  var tongtien = 0;
  var cart_quantity = document.querySelector(".cart-item-quantity");

  carts.forEach(cart => {
    tongtien += cart.quantity;
  });

  console.log("Tổng sản phẩm giỏ hàng: " + tongtien);

  // Check if cart_quantity exists before updating its innerHTML
  if (cart_quantity) {
    cart_quantity.innerHTML = `${tongtien}`;
  }
}


// Hàm xoá sản phẩm trong giỏ hàng
function deleteCart(id, size) {

  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  const filtered = carts.filter(cart => !(cart.id === id && cart.size === size));

  localStorage.setItem('carts', JSON.stringify(filtered));

  displaySubCart();
  displayCart();
  getQuantityCart();

  alertUpdateCart();
}

// Display the cart items
function displaySubCart() {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];

  var cart_list = document.querySelector(".cart-list");
  cart_list.innerHTML = ""; // Clear existing content

  // Iterate through each cart item
  carts.forEach(cart => {
    const product = products.find(product => product.id === cart.id);
    if (product) { // Check if the product exists
      var price = Number(product.price.replace(/\./g, "")); 
      cart_list.innerHTML += `
        <div class="d-flex border-bottom">
          <div class="col-5 p-2">
            <img src="${product.img1}" class="w-75" alt="${product.name}">
          </div>
          <div class="col-5 py-2" style="font-size: .9rem;">
            <p class="fw-light mb-1 fs-5">${product.name}</p>
            <p class="text-color mb-1"><b>Màu sắc: </b>Xanh đen</p>
            <p class="text-color mb-1"><b>Size: </b>${cart.size}</p>
            <p class="text-color mb-1">${cart.quantity} x <b>${price.toLocaleString('de-DE')} đ</b></p>
          </div>
          <div class="py-2">
            <button type="button" class="btn-close border border-1 p-2" onclick="deleteCart('${cart.id}', '${cart.size}')" aria-label="Close"></button>
          </div>
        </div>
      `;
    }
  });
  getQuantityCart();
}


function check() {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng nếu không có
  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  // Lấy kích thước sản phẩm từ input
  var cart_size = document.querySelector(".cart-size").value;

  // Tìm sản phẩm trong giỏ hàng dựa trên ID và kích thước
  const index = carts.findIndex(cart => cart.id === product_Id && cart.size === cart_size);

  if (index !== -1) {
    // Lấy số lượng hiện tại từ input và chuyển sang kiểu số nguyên
    var currentQuantity = parseInt(document.querySelector("#quantity_product").value);

    // Cộng dồn số lượng sản phẩm hiện tại với số lượng đã có trong giỏ hàng
    carts[index].quantity = parseInt(carts[index].quantity) + currentQuantity;

    // Lưu giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem('carts', JSON.stringify(carts));

    console.log(`Đã cập nhật số lượng sản phẩm: ${product_Id}, số lượng mới là: ${carts[index].quantity}`);

    alertAddCart()
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
    saveCart();
  }
  displaySubCart()
}

function saveCart() {
  // Lấy số lượng từ input và kích thước sản phẩm
  var quantity_cart = parseInt(document.querySelector("#quantity_product").value);
  var cart_size = document.querySelector(".cart-size").value;

  // Tạo đối tượng sản phẩm để thêm vào giỏ hàng
  var cart = {
    'id': product_Id,  // Sử dụng ID sản phẩm từ URL
    'size': cart_size,
    'quantity': quantity_cart
  };

  // Lấy giỏ hàng hiện tại từ localStorage hoặc khởi tạo mảng rỗng nếu chưa có
  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  // Thêm sản phẩm mới vào giỏ hàng
  carts.push(cart);

  // Lưu giỏ hàng đã cập nhật vào localStorage
  localStorage.setItem('carts', JSON.stringify(carts));

  console.log("Bạn đã thêm sản phẩm vào giỏ hàng!");

  // Hiển thị thông báo thành công
  alertAddCart()

  getQuantityCart();

}

// Hàm thông báo sản phẩm đã thêm vào giỏ hàng
function alertAddCart() {
  var toastEl = document.querySelector('.toast');
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}


// Hiển thị chi tiết sản phẩm dựa trên ID
function loadProductDetail(id) {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  const container_detail = document.getElementById("detail_container");

  // Tìm sản phẩm theo ID
  const product = products.find(product => product.id === id);

  container_detail.innerHTML = '';

  if (product) {
    var price = Number(product.price); 
    container_detail.innerHTML = `
        <div class="row gx-5">
        <aside class="col-lg-6">
          <div class="mb-3 d-flex justify-content-center">
            <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp">
              <img style="max-width: 100%; max-height: 100vh; margin: auto;" class="rounded-4 fit"
                src="${product.img1}" />
            </a>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big1.webp" class="item-thumb">
              <img width="60" height="60" class="rounded-2"
                src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big1.webp" />
            </a>
            <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp" class="item-thumb">
              <img width="60" height="60" class="rounded-2"
                src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp" />
            </a>
            <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp" class="item-thumb">
              <img width="60" height="60" class="rounded-2"
                src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp" />
            </a>
            <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp" class="item-thumb">
              <img width="60" height="60" class="rounded-2"
                src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp" />
            </a>
            <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image"
              href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp" class="item-thumb">
              <img width="60" height="60" class="rounded-2"
                src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp" />
            </a>
          </div>
          <!-- thumbs-wrap.// -->
          <!-- gallery-wrap .end// -->
        </aside>
        <main class="col-lg-6">
          <div class="ps-lg-3">
            <h4 class="title text-dark">
              ${product.name} <br />
              Casual Hoodie
            </h4>
            <div class="d-flex flex-row my-3">
              <div class="text-warning mb-1 me-2">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="ms-1">
                  4.5
                </span>
              </div>
              <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 đơn hàng</span>
              <span class="text-success ms-2">Còn hàng</span>
            </div>

            <div class="mb-3">
            <span class="h5">${price.toLocaleString('de-DE')} đ</span>
              <span class="text-muted">/sản phẩm</span>
            </div>

            <p>
              ${product.describe}
            </p>

            <div class="row">
              <dt class="col-3">Kiểu: </dt>
              <dd class="col-9">Regular</dd>

              <dt class="col-3">Màu sắc: </dt>
              <dd class="col-9">Brown</dd>

              <dt class="col-3">Vật liệu: </dt>
              <dd class="col-9">Cotton, Jeans</dd>

              <dt class="col-3">Brand: </dt>
              <dd class="col-9">Reebook</dd>
            </div>

            <hr />

            <div class="row d-md-flex mb-4">
              <div class="col-md-4 col-6 me-md-5">
                <label class="mb-2">Size</label>
                <select class="cart-size form-select border border-secondary" style="height: 35px;">
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </select>
              </div>
              <!-- col.// -->
              <div class="col-md-4 col-6 mb-3">
                <label class="mb-2 d-block">Số lượng</label>
                <div class="input-group mb-3" style="width: 170px;">
                  <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon1"
                    data-mdb-ripple-color="dark">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="text" id="quantity_product" class="form-control text-center border border-secondary"
                    value="1" aria-label="Example text with button addon" />
                  <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon2"
                    data-mdb-ripple-color="dark">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <a href="#" class="btn bg-main-detail shadow-0"> Mua ngay </a>
            <button type="button" class="btn bg-button" id="toastbtn" onclick="check()">Thêm vào giỏ hàng</button>
            <div class="thongbao toast-container position-fixed top-0 end-0 p-3">
              <div class="toast bg-main text-white" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <strong class="me-auto">Success</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                  Đã thêm sản phẩm vào giỏ hàng.
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-light border border-secondary py-2 icon-hover px-3"> <i
                class="me-1 fa fa-heart fa-lg"></i> Lưu </a>
          </div>
        </main>
      </div>`;
  } else {
    alert('Sản phẩm không tồn tại');
  }
}

// Gọi hàm để hiển thị chi tiết sản phẩm
if (product_Id) {
  loadProductDetail(product_Id);
}

// Đảm bảo rằng DOM đã tải hoàn toàn trước khi truy cập các phần tử
window.onload = function () {
  const giam = document.getElementById('button-addon1');
  const tang = document.getElementById('button-addon2');
  const quantity_product = document.getElementById('quantity_product');

  if (giam && tang && quantity_product) {
    // Chuyển giá trị hiện tại trong input thành số nguyên
    let giatrihientai = parseInt(quantity_product.value);

    // Xử lý khi nhấn nút tăng
    tang.addEventListener('click', function () {
      giatrihientai += 1;
      quantity_product.value = giatrihientai;
    });

    // Xử lý khi nhấn nút giảm
    giam.addEventListener('click', function () {
      if (giatrihientai > 1) {
        giatrihientai -= 1;
      }
      quantity_product.value = giatrihientai;
    });
  }
};


// Xử lý ẩn hiện mô tả sản phẩm

// Select all describe main sections and toggle buttons
const describe_main = document.querySelectorAll(".product-describe_main");
const toggle_Btns = document.querySelectorAll(".toggleBtn");

// Loop through each section and attach click events
describe_main.forEach((main, index) => {
  const content = main.nextElementSibling;  // Select the next sibling (product-describe_content)
  const toggle_Btn = toggle_Btns[index];  // Get the corresponding toggle button

  main.addEventListener('click', () => {
    console.log("Bạn đã click!");

    // Toggle the visibility of the content and rotate the button
    content.classList.toggle("xuathien");
    toggle_Btn.classList.toggle("xoay");
  });
});


// End Xử lý ẩn hiện mô tả sản phẩm


// Lưu vào giỏ hàng

// function saveCart() {
//   var quantity_cart = document.querySelector("#quantity_product").value;

//   // Create cart object with product ID from URL and selected quantity
//   var cart = {
//     'id': product_Id,  // Use the product ID from the URL
//     'quantity': quantity_cart
//   };

//   // Retrieve existing carts from localStorage or initialize an empty array
//   var carts = JSON.parse(localStorage.getItem('carts')) || [];

//   // Add new cart object to the carts array
//   carts.push(cart);

//   // Save the updated carts array back to localStorage
//   localStorage.setItem('carts', JSON.stringify(carts));

//   console.log("Bạn đã thêm sản phẩm vào giỏ hàng!");
// }