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


// Hàm load sản phẩm từ localStorage và hiển thị
function loadProducts() {
  var jsonString = localStorage.getItem('products');
  var products = JSON.parse(jsonString) || [];

  var productContainer = document.querySelector("#aopolo-product");
    productContainer.innerHTML = ''; // Xóa

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 px-3 mt-4">
                    <a href="./product_detail.html?id=${product.id}" class="text-decoration-none">
                        <div class="card product-card shadow-sm">
                            <div class="position-relative overflow-hidden">
                                <img src="${product.img1}" class="card-img-top" alt="Product Image">
                                <img src="${product.img2}" class="product-card-img position-absolute card-img-top top-0 d-none" alt="Product Image">
                                <div
                                    class="position-absolute top-50 start-50 translate-middle bg-dark text-white p-2 rounded quick-view d-none">
                                    QUICK VIEW
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="price fw-bold">₫ ${product.price}</p>
                                </div>
                                <div class="">
                                    <div class="d-flex">
                                        <p class="text-muted">Màu sắc</p>
                                        <div class="d-flex ps-2">
                                            <img src="./assets/images/products/image.jpg" alt="color1"
                                            class="rounded-circle me-2" width="30" height="30">
                                            <img src="./assets/images/products/z5018069269739-aa5c5764d2d4602bb8b55ec50edad312-600x600.jpg"
                                            alt="color2" class="rounded-circle me-2" width="30" height="30">
                                            <img src="./assets/images/products/image.jpg" alt="color3" class="rounded-circle"
                                            width="30" height="30">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
      `;
  });
}

// Gọi hàm loadProducts khi trang web tải
loadProducts();
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