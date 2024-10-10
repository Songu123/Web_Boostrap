// Hàm lấy tham số query từ URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Lấy ID sản phẩm từ URL
const product_Id = getQueryParam('id');

// Hiển thị chi tiết sản phẩm dựa trên ID
function loadProductDetail(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container_detail = document.getElementById("detail_container");

    // Tìm sản phẩm theo ID
    const product = products.find(product => product.id === id);

    container_detail.innerHTML = '';

    if (product) {
        container_detail.innerHTML = `
        <div class="row gx-5">
        <aside class="col-lg-6">
          <div class="border rounded-4 mb-3 d-flex justify-content-center">
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
              <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
              <span class="text-success ms-2">In stock</span>
            </div>

            <div class="mb-3">
            <span class="h5">${product.price} đ</span>
              <span class="text-muted">/per box</span>
            </div>

            <p>
              ${product.describe}
            </p>

            <div class="row">
              <dt class="col-3">Type:</dt>
              <dd class="col-9">Regular</dd>

              <dt class="col-3">Color</dt>
              <dd class="col-9">Brown</dd>

              <dt class="col-3">Material</dt>
              <dd class="col-9">Cotton, Jeans</dd>

              <dt class="col-3">Brand</dt>
              <dd class="col-9">Reebook</dd>
            </div>

            <hr />

            <div class="row d-md-flex mb-4">
              <div class="col-md-4 col-6 me-md-5">
                <label class="mb-2">Size</label>
                <select class="form-select border border-secondary" style="height: 35px;">
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
            <a href="#" class="btn btn-warning shadow-0"> Mua ngày </a>
            <button type="button" class="btn btn-primary" id="toastbtn">Thêm vào giỏ hàng</button>
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
                class="me-1 fa fa-heart fa-lg"></i> Save </a>
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
