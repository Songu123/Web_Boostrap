
// Gọi hàm loadProducts khi trang web tải
loadProducts();

// Hiện thị số lượng giỏ hàng và thông tin giỏ hàng trên MENU
displaySubCart();


// // Display the cart items
// function displaySubCart() {
//   const carts = JSON.parse(localStorage.getItem('carts')) || [];
//   const products = JSON.parse(localStorage.getItem('products')) || [];

//   var cart_list = document.querySelector(".cart-list");
//   cart_list.innerHTML = ""; // Clear existing content

//   // Iterate through each cart item
//   carts.forEach(cart => {
//     const product = products.find(product => product.id === cart.id);
//     if (product) { // Check if the product exists
//       cart_list.innerHTML += `
//         <div class="d-flex border-bottom">
//           <div class="col-5 p-2">
//             <img src="${product.img1}" class="w-75" alt="${product.name}">
//           </div>
//           <div class="col-5" style="font-size: .9rem;">
//             <p class="fw-light mb-1 fs-5">${product.name}</p>
//             <p class="text-color mb-1"><b>Màu sắc: </b>Xanh đen</p>
//             <p class="text-color mb-1"><b>Size: </b>${cart.size}</p>
//             <p class="text-color mb-1">${cart.quantity} x <b>${product.price.toLocaleString()} đ</b></p>
//           </div>
//           <div class="">
//             <button type="button" class="btn-close border border-1 p-2" onclick="deleteCart('${cart.id}', '${cart.size}')" aria-label="Close"></button>
//           </div>
//         </div>
//       `;
//     }
//   });
//   getQuantityCart();
// }

// Lấy danh sách các phần tử nav-item
const navItems = document.querySelectorAll('.nav-item');

// Lấy lớp phủ
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Thêm sự kiện hover cho mỗi nav-item
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        overlay.classList.add('active'); // Thêm class active khi hover
    });

    item.addEventListener('mouseleave', () => {
        overlay.classList.remove('active'); // Xóa class active khi ngừng hover
    });
});


(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// Chỉnh hiệu ứng cuộn navbar
var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  if (prevScrollpos > currentScrollPos) {
    // Hiện navbar ngay lập tức khi cuộn lên
    document.querySelector('.navbar').style.top = "0";
  } else if (Math.abs(currentScrollPos - prevScrollpos) > 10) {
    // Ẩn navbar chỉ khi cuộn xuống ít nhất 50px
    document.querySelector('.navbar').style.top = "-100px";
  }

  prevScrollpos = currentScrollPos;
}



// Chỉnh hiệu ứng chuyển ảnh trong product card
document.addEventListener("DOMContentLoaded", function() {
  var product_cards = document.querySelectorAll(".product-card");

  product_cards.forEach(function(product_card) {
    var img_card1 = product_card.querySelector(".product-card-img");

    if (img_card1) {
      // Thêm sự kiện hover khi tìm thấy img_card1
      product_card.addEventListener("mouseover", function() {
        img_card1.classList.remove("d-none");
      });

      product_card.addEventListener("mouseout", function() {
        img_card1.classList.add("d-none");
      });
    } else {
      console.log("Không tìm thấy .product-card-img trong một .product-card");
    }
  });
});

// Hàm lấy dữ liệu từ localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Hàm lấy danh sách sản phẩm theo category
function getProductsByCategory(category) {
  const products = getLocalStorage('products'); // Lấy danh sách sản phẩm từ localStorage
  return products.filter(product => product.category === category); // Lọc theo category
}


// Hàm load sản phẩm từ localStorage và hiển thị
function loadProducts() {

  const poloProducts = getProductsByCategory('polo');
  const aothunProducts = getProductsByCategory('aothun');
  const quanthunProducts = getProductsByCategory('quanthun');
  const quanlotProducts = getProductsByCategory('brief');
  const mixProducts = getLocalStorage('products');


  const newProductContainer = document.querySelector("#new-product");
  const poloProductContainer = document.querySelector("#aopolo-product");
  const aothunProductContainer = document.querySelector("#aothun-product");
  const quanthunProductContainer = document.querySelector("#quanthun-product");
  const quantlotProductContainer = document.querySelector("#quanlot-product");

  newProductContainer.innerHTML = '';
  poloProductContainer.innerHTML = '';
  aothunProductContainer.innerHTML = '';
  quanthunProductContainer.innerHTML = '';
  quantlotProductContainer.innerHTML = '';

  const renderProduct = (product, container) => {
    const price = Number(product.price.replace(/\./g, ""));
    const productHTML = `
      <div class="col-sm-6 col-md-4 col-lg-3 px-3 mt-4">
        <a href="./product_detail.html?id=${product.id}" class="text-decoration-none">
          <div class="card product-card shadow-sm">
            <div class="overflow-hidden">
              <div class="position-relative img-container w-100">
                <img src="${product.img1}" class="card-img-top"
                  alt="Product Image">
                <img src="${product.img2}"
                  class="position-absolute card-img-bottom start-0 top-0"
                  alt="Product Image">
                <div
                  class="position-absolute bottom-0 start-0 text-center w-100 bg-dark text-white p-2 quick-view">
                  QUICK VIEW
                </div>
                <button class="loving-product position-absolute top-0 end-0 rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                    fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="">
                <span class="card-title">${product.name}</span>
                <p class="price fw-bold">${price.toLocaleString('de-DE')} ₫</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
    container.appendChild(document.createElement('div')).outerHTML = productHTML;
  };

  mixProducts.forEach((product) => renderProduct(product, newProductContainer))
  poloProducts.forEach((product) => renderProduct(product, poloProductContainer));
  aothunProducts.forEach((product) => renderProduct(product, aothunProductContainer));
  quanthunProducts.forEach((product) => renderProduct(product, quanthunProductContainer));
  quanlotProducts.forEach((product) => renderProduct(product, quantlotProductContainer));
}
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
    document.querySelector("#product-detail").innerHTML = `
      <!-- Product Image -->
      <div class="col-lg-6 col-md-12">
          <img src="${product.img1}" class="img-fluid rounded" alt="${product.name}">
      </div>

      <!-- Product Details -->
      <div class="col-lg-6 col-md-12">
          <h3 class="fw-bold">${product.name}</h3>
          <h4 class="text-danger">${product.price} đ</h4>

          <!-- Product Info -->
          <ul class="">
              <li><strong>Chất liệu: </strong>Thun cá sấu cotton lục giác, mềm mát, thấm mồ hôi tốt, co giãn 4 chiều.</li>
              <li><strong>Size: </strong>M (45-55) – L (55-65) – XL (65-75) – XXL (75-85) – XXXL (85-95)</li>
          </ul>

          <!-- Add to Cart Button -->
          <div class="d-flex justify-content-center mt-4">
              <button type="button" class="btn btn-warning px-4 py-2">Thêm vào giỏ hàng</button>
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

// Hàm gọi subnavbar
const toggleBtns = document.querySelectorAll('.toggleBtn'); // Select all toggle buttons

toggleBtns.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
        const menu = toggleBtn.closest('.nav-dropdown').querySelector('.menudrop'); // Find the closest '.nav-dropdown' and then get the '.menudrop'
        if (menu) {
            menu.classList.toggle('hienthi'); // Toggle 'hienthi' class to show/hide the menu
            toggleBtn.querySelector('i').classList.toggle('fa-angle-down');
            toggleBtn.querySelector('i').classList.toggle('fa-angle-up'); // Change the icon on toggle
        }
    });
});



// Xoay nút
// const rotateBtns = document.querySelectorAll('.toggleBtn');

// toggleBtns.forEach(rotateBtn => {
//   rotateBtn.addEventListener('click', () => {
//     rotateBtn.classList.add('rotated'); // Thêm hoặc bỏ class 'rotated' khi click
//   });
// });
