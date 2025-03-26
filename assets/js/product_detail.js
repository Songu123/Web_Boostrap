getQuantityCart();

displaySubCart();

// Hàm lấy tham số query từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy ID sản phẩm từ URL
const product_Id = getQueryParam('id');
renderProducts(product_Id);

// Lấy dữ liệu sản phẩm từ localStorage

// Hàm lấy số lượng sản phẩm trong giỏ hàng

function getQuantityCart() {
  console.log('Getting quantity of cart items');
  var carts = JSON.parse(localStorage.getItem('carts')) || [];
  var tongtien = 0;
  var cart_quantity = document.querySelector('.cart-item-quantity');

  carts.forEach((cart) => {
    tongtien += cart.quantity;
  });

  console.log('Tổng sản phẩm giỏ hàng: ' + tongtien);

  // Check if cart_quantity exists before updating its innerHTML
  if (cart_quantity) {
    cart_quantity.innerHTML = `${tongtien}`;
  }
}

// Hàm xoá sản phẩm trong giỏ hàng
function deleteCart(id, size) {
  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  const filtered = carts.filter((cart) => !(cart.id === id && cart.size === size));

  localStorage.setItem('carts', JSON.stringify(filtered));

  displaySubCart();
  displayCart();
  getQuantityCart();
  displayThanhToan();
  alertUpdateCart();
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

// Display the cart items
function displaySubCart() {
  console.log('Displaying sub cart');
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const poloProducts = getProductsByCategory('polo');
  const aothunProducts = getProductsByCategory('aothun');
  const quanthunProducts = getProductsByCategory('quanthun');
  const quankakiProducts = getProductsByCategory('kaki');
  const quanlotProducts = getProductsByCategory('brief');
  const boxerProducts = getProductsByCategory('boxer');

  const allProducts = poloProducts.concat(
    poloProducts,
    boxerProducts,
    aothunProducts,
    quanthunProducts,
    quankakiProducts,
    quanlotProducts
  );
  let tongtien = 0; // Changed from const to let

  const cart_list = document.querySelector('.cart-list');
  cart_list.innerHTML = ''; // Clear existing content

  // Iterate through each cart item
  carts.forEach((cart) => {
    const product = allProducts.find((product) => product.id === cart.id);
    if (product) {
      // Check if the product exists
      const price = Number(product.price.replace(/\./g, ''));
      const quantity = parseInt(cart.quantity); // Validate quantity
      if (!isNaN(quantity)) {
        tongtien += price * quantity; // Add to tongtien
        cart_list.innerHTML += `
          <div class="d-flex border-bottom">
            <div class="col-5 p-2">
              <img src="${product.img1}" class="w-75" alt="${product.name}">
            </div>
            <div class="col-5 py-2" style="font-size: .9rem;">
              <p class="fw-light mb-1 fs-5">${product.name}</p>
              <p class="text-color mb-1"><b>Màu sắc: </b>Xanh đen</p>
              <p class="text-color mb-1"><b>Size: </b>${cart.size}</p>
              <p class="text-color mb-1">${quantity} x <b>${price.toLocaleString('de-DE')} đ</b></p>
            </div>
            <div class="py-2">
              <button type="button" class="btn-close border border-1 p-2" onclick="deleteCart('${cart.id}', '${
          cart.size
        }')" aria-label="Close"></button>
            </div>
          </div>
        `;
      } else {
        console.error(`Invalid quantity for product ${product.name}`);
      }
    } else {
      console.error(`Product not found for cart item ${cart.id}`);
    }
  });

  getQuantityCart();
  insertTongTien(tongtien); // Insert tongtien after calculation
}

function insertTongTien(tongtien) {
  document.querySelector('.tongsophu').innerHTML = `${tongtien.toLocaleString('de-DE')} đ`;
}

function check() {
  // Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng rỗng nếu không có
  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  // Lấy kích thước sản phẩm từ input
  var cart_size = document.querySelector('.cart-size').value;

  // Tìm sản phẩm trong giỏ hàng dựa trên ID và kích thước
  const index = carts.findIndex((cart) => cart.id === product_Id && cart.size === cart_size);

  if (index !== -1) {
    // Lấy số lượng hiện tại từ input và chuyển sang kiểu số nguyên
    var currentQuantity = parseInt(document.querySelector('#quantity_product').value);

    // Cộng dồn số lượng sản phẩm hiện tại với số lượng đã có trong giỏ hàng
    carts[index].quantity = parseInt(carts[index].quantity) + currentQuantity;

    // Lưu giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem('carts', JSON.stringify(carts));

    console.log(`Đã cập nhật số lượng sản phẩm: ${product_Id}, số lượng mới là: ${carts[index].quantity}`);

    alertAddCart();
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
    saveCart();
  }
  displaySubCart();
}

function saveCart() {
  // Lấy số lượng từ input và kích thước sản phẩm
  var quantity_cart = parseInt(document.querySelector('#quantity_product').value);
  var cart_size = document.querySelector('.cart-size').value;

  // Tạo đối tượng sản phẩm để thêm vào giỏ hàng
  var cart = {
    id: product_Id, // Sử dụng ID sản phẩm từ URL
    size: cart_size,
    quantity: quantity_cart,
  };

  // Lấy giỏ hàng hiện tại từ localStorage hoặc khởi tạo mảng rỗng nếu chưa có
  var carts = JSON.parse(localStorage.getItem('carts')) || [];

  // Thêm sản phẩm mới vào giỏ hàng
  carts.push(cart);

  // Lưu giỏ hàng đã cập nhật vào localStorage
  localStorage.setItem('carts', JSON.stringify(carts));

  console.log('Bạn đã thêm sản phẩm vào giỏ hàng!');

  // Hiển thị thông báo thành công
  alertAddCart();

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
  console.log('Loading product detail for ID: ' + id);

  const poloProducts = getProductsByCategory('polo');
  const aothunProducts = getProductsByCategory('aothun');
  const quanthunProducts = getProductsByCategory('quanthun');
  const quankakiProducts = getProductsByCategory('kaki');
  const quanlotProducts = getProductsByCategory('brief');
  const boxerProducts = getProductsByCategory('boxer');

  const allProducts = poloProducts.concat(
    poloProducts,
    boxerProducts,
    aothunProducts,
    quankakiProducts,
    quanthunProducts,
    quanlotProducts
  );

  const container_detail = document.getElementById('detail_container');

  // Tìm sản phẩm theo ID
  const product = allProducts.find((product) => product.id === id);

  container_detail.innerHTML = '';

  if (product) {
    var price = Number(product.price.replace(/\./g, ''));
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
            <button type="button" class="btn bg-button w-75" id="toastbtn" onclick="check()">Thêm vào giỏ hàng</button>
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
const describe_main = document.querySelectorAll('.product-describe_main');
const toggle_Btns = document.querySelectorAll('.toggleBtn');

// Loop through each section and attach click events
describe_main.forEach((main, index) => {
  const content = main.nextElementSibling; // Select the next sibling (product-describe_content)
  const toggle_Btn = toggle_Btns[index]; // Get the corresponding toggle button

  main.addEventListener('click', () => {
    console.log('Bạn đã click!');

    // Toggle the visibility of the content and rotate the button
    content.classList.toggle('xuathien');
    toggle_Btn.classList.toggle('xoay');
  });
});

// End Xử lý ẩn hiện mô tả sản phẩm

// Render sản phẩm liên quan

function renderProducts(id) {
  const products = findProductCategory(id);
  const productContainer = document.querySelector('#product-related');
  productContainer.innerHTML = '';
  products.forEach((product) => {
    productContainer.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 px-3 mt-4 slick-slide slick-active" data-slick-index="3" aria-hidden="false" tabindex="-1" style="width: 332px;">
        <a href="./product_detail.html?id=${product.id}" class="text-decoration-none" tabindex="0">
          <div class="card product-card shadow-sm">
            <div class="position-relative overflow-hidden">
              <div class="img-container w-100">
                <img src="${product.img1}" class="h-100 card-img-top" alt="Product Image">
                <img src="${product.img2}" class="position-absolute h-100 card-img-bottom start-0 top-0" alt="Product Image">
                <div class="position-absolute bottom-0 start-0 text-center w-100 bg-dark text-white p-2 quick-view">
                  QUICK VIEW
                </div>
                <button class="loving-product position-absolute top-0 end-0 rounded-circle" tabindex="0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-body">
              
    
              <div class="">
                <span class="card-title">${product.name}</span>
                <p class="price fw-bold">${product.price} ₫</p>
              </div>
            </div>
          </div>
        </a>
      </div>`;
  });
}

function findProductCategory(productId) {
  const poloProducts = getProductsByCategory('polo');
  const aothunProducts = getProductsByCategory('aothun');
  const quanthunProducts = getProductsByCategory('quanthun');
  const quankakiProducts = getProductsByCategory('kaki');
  const briefProducts = getProductsByCategory('brief');
  const boxerProducts = getProductsByCategory('boxer');

  if (poloProducts.some((product) => product.id === productId)) {
    return poloProducts;
  } else if (aothunProducts.some((product) => product.id === productId)) {
    return aothunProducts;
  } else if (quankakiProducts.some((product) => product.id === productId)) {
    return quankakiProducts;
  } else if (quanthunProducts.some((product) => product.id === productId)) {
    return quanthunProducts;
  } else if (boxerProducts.some((product) => product.id === productId)) {
    return boxerProducts;
  } else if (briefProducts.some((product) => product.id === productId)) {
    return briefProducts;
  } else {
    return 'Product not found in any category';
  }
}

// Ví dụ sử dụng:
const category = findProductCategory(3);
console.log(category); // Kết quả sẽ là 'T-Shirt Products'

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

// Lấy dữ liệu giỏ hàng từ localStorage
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded triggered');

  try {
    console.log('Calling loadProductDetail');
    loadProductDetail(product_Id);
  } catch (error) {
    console.error('Error in loadProductDetail:', error);
  }

  try {
    console.log('Calling displaySubCart');
    displaySubCart();
  } catch (error) {
    console.error('Error in displaySubCart:', error);
  }

  try {
    console.log('Calling displayCart');
    displayCart();
  } catch (error) {
    console.error('Error in displayCart:', error);
  }

  try {
    console.log('Calling displayThanhToan');
    displayThanhToan();
  } catch (error) {
    console.error('Error in displayThanhToan:', error);
  }

  try {
    console.log('Calling getQuantityCart');
    getQuantityCart();
  } catch (error) {
    console.error('Error in getQuantityCart:', error);
  }
});