displayData();
function randomString(length) {
  var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = '';
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

function saveData() {
  var randomId = randomString(8);
  // Check for LocalStorage support.
  var name = document.getElementsByClassName("product-name")[0].value;
  var describe = document.getElementsByClassName("product-describe")[0].value;
  var price = document.getElementsByClassName("product-price")[0].value;
  var img1 = document.getElementsByClassName("product-img1")[0].value;
  var img2 = document.getElementsByClassName("product-img2")[0].value;

  // Create a product object
  var product = {
    'id': randomId,
    'name': name,
    'describe': describe,
    'price': price,
    'img1': img1,
    'img2': img2
  };

  // Save the product in localStorage
  // Save the product in localStorage
  var products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  displayData()
}

function displayData() {
  const jsonString = localStorage.getItem('products');
  const myObject = JSON.parse(jsonString) || [];

  document.getElementById("myElement").innerHTML = '';

  Object.values(myObject).forEach((value) => {
    document.getElementById("myElement").innerHTML += `
          <tr>
              <th scope="row">${value.id}</th>
              <td>${value.name}</td>
              <td>${value.describe}</td>
              <td>${value.price}</td>
              <td><img src="${value.img1}" alt="" class="w-img"></td>
              <td><img src="${value.img2}" alt="" class="w-img"></td>
              <td>
                  <div class="">
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${value.id}">
                          Update
                      </button>
                      <button type="button" class="btn btn-danger" onclick="deleteProduct('${value.id}')">Delete</button>

                      <!-- Modal Update Product -->
                      <div class="modal fade" id="staticUpdate${value.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật sản phẩm</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                  <div class="modal-body">
                                      <div class="form-group">
                                          <label class="d-flex justify-content-start">Name Product</label>
                                          <input type="text" class="w-100" id="name-product-${value.id}" placeholder="Enter your Name Product" value="${value.name}">
                                      </div>
                                      <div class="form-group">
                                          <label class="d-flex justify-content-start">Describe</label>
                                          <input type="text" class="w-100" id="describe-product-${value.id}" placeholder="Enter your Describe" value="${value.describe}">
                                      </div>
                                      <div class="form-group">
                                          <label class="d-flex justify-content-start">Price</label>
                                          <input type="text" class="w-100" id="price-product-${value.id}" placeholder="Enter your Price" value="${value.price}">
                                      </div>
                                      <div class="form-group">
                                          <label class="d-flex justify-content-start">Image 1</label>
                                          <input type="text" class="w-100" id="img1-product-${value.id}" placeholder="Enter your Image" value="${value.img1}">
                                      </div>
                                      <div class="form-group">
                                          <label class="d-flex justify-content-start">Image 2</label>
                                          <input type="text" class="w-100" id="img2-product-${value.id}" placeholder="Enter your Image" value="${value.img2}">
                                      </div>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" onclick="saveUpdate('${value.id}')" class="btn btn-primary">Save Changes</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- End Modal Update Product -->
                  </div>
              </td>
          </tr>`;
  });
}


function saveUpdate(id) {
  var products = JSON.parse(localStorage.getItem('products')) || [];
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    // Lấy dữ liệu từ các trường trong modal
    var name = document.getElementById(`name-product-${id}`).value;
    var describe = document.getElementById(`describe-product-${id}`).value;
    var price = document.getElementById(`price-product-${id}`).value;
    var img1 = document.getElementById(`img1-product-${id}`).value;
    var img2 = document.getElementById(`img2-product-${id}`).value;

    // Cập nhật thông tin sản phẩm
    products[index] = { id, name, describe, price, img1, img2 };
    localStorage.setItem('products', JSON.stringify(products));

    // Đóng modal và hiển thị lại dữ liệu
    $(`#staticUpdate${id}`).modal('hide');
    displayData();
  }
}


function deleteProduct(id) {
  // Lấy danh sách sản phẩm từ localStorage
  var products = JSON.parse(localStorage.getItem('products')) || [];

  // Lọc ra các sản phẩm không có id khớp với id được truyền vào
  const filtered = products.filter(item => item.id !== id);

  var text = "Bạn có chắc chắn xoá sản phẩm có id =  " + id + " không?"
  if (confirm(text) == true) {
    // Cập nhật lại localStorage với danh sách đã được lọc
    localStorage.setItem('products', JSON.stringify(filtered));
    // Hiển thị lại dữ liệu sau khi xoá
    displayData();
    console.log("Bạn đã xoá thành công!")
    alert("Bạn đã xoá thành công!");
  } else {
    console.log("Bạn đã không xoá!")
  }
}

function saveUpdate(id) {
  var products = JSON.parse(localStorage.getItem('products')) || [];
  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
    // Lấy dữ liệu từ các trường trong modal
    var name = document.getElementById(`name-product-${id}`).value;
    var describe = document.getElementById(`describe-product-${id}`).value;
    var price = document.getElementById(`price-product-${id}`).value;
    var img1 = document.getElementById(`img1-product-${id}`).value;
    var img2 = document.getElementById(`img2-product-${id}`).value;

    // Cập nhật thông tin sản phẩm
    products[index] = { id, name, describe, price, img1, img2 };
    localStorage.setItem('products', JSON.stringify(products));

    // Đóng modal và hiển thị lại dữ liệu
    const modalElement = document.getElementById(`staticUpdate${id}`);
    const modal = bootstrap.Modal.getInstance(modalElement); // Lấy instance của modal
    modal.hide(); // Đóng modal 

    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }, 100); // Thời gian đợi một chút trước khi xóa

    displayData();
  }
}