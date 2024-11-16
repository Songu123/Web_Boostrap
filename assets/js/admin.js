// ÁO POLO NAM

// displayData();
// function randomString(length) {
//   var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');

//   if (!length) {
//     length = Math.floor(Math.random() * chars.length);
//   }

//   var str = '';
//   for (var i = 0; i < length; i++) {
//     str += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return str;
// }

// function saveData() {
//   var randomId = randomString(8);
//   // Check for LocalStorage support.
//   var name = document.getElementsByClassName("product-name")[0].value;
//   var describe = document.getElementsByClassName("product-describe")[0].value;
//   var price = document.getElementsByClassName("product-price")[0].value;
//   var img1 = document.getElementsByClassName("product-img1")[0].value;
//   var img2 = document.getElementsByClassName("product-img2")[0].value;

//   // Create a product object
//   var product = {
//     'id': randomId,
//     'name': name,
//     'describe': describe,
//     'price': price,
//     'img1': img1,
//     'img2': img2
//   };

//   // Save the product in localStorage
//   // Save the product in localStorage
//   var products = JSON.parse(localStorage.getItem('products')) || [];
//   products.push(product);
//   localStorage.setItem('products', JSON.stringify(products));
//   displayData()
// }

// function displayData() {
//   const jsonString = localStorage.getItem('products');
//   const myObject = JSON.parse(jsonString) || [];
//   const name_title = document.querySelector(".name-title")

//   name_title.innerHTML = '';
//   name_title.innerHTML = 'Áo Polo Nam'

//   document.getElementById("myElement").innerHTML = '';

//   Object.values(myObject).forEach((value) => {
//     document.getElementById("myElement").innerHTML += `
//           <tr>
//               <th scope="row">${value.id}</th>
//               <td>${value.name}</td>
//               <td>${value.describe}</td>
//               <td>${value.price}</td>
//               <td><img src="${value.img1}" alt="" class="w-img"></td>
//               <td><img src="${value.img2}" alt="" class="w-img"></td>
//               <td>
//                   <div class="">
//                       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${value.id}">
//                           Update
//                       </button>
//                       <button type="button" class="btn btn-danger" onclick="deleteProduct('${value.id}')">Delete</button>

//                       <!-- Modal Update Product -->
//                       <div class="modal fade" id="staticUpdate${value.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
//                           <div class="modal-dialog modal-dialog-centered">
//                                 <div class="modal-content">
//                                     <div class="modal-header">
//                                         <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật sản phẩm</h1>
//                                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                     </div>
//                                   <div class="modal-body">
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Name Product</label>
//                                           <input type="text" class="w-100" id="name-product-${value.id}" placeholder="Enter your Name Product" value="${value.name}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Describe</label>
//                                           <input type="text" class="w-100" id="describe-product-${value.id}" placeholder="Enter your Describe" value="${value.describe}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Price</label>
//                                           <input type="text" class="w-100" id="price-product-${value.id}" placeholder="Enter your Price" value="${value.price}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Image 1</label>
//                                           <input type="text" class="w-100" id="img1-product-${value.id}" placeholder="Enter your Image" value="${value.img1}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Image 2</label>
//                                           <input type="text" class="w-100" id="img2-product-${value.id}" placeholder="Enter your Image" value="${value.img2}">
//                                       </div>
//                                   </div>
//                                   <div class="modal-footer">
//                                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                       <button type="button" onclick="saveUpdate('${value.id}')" class="btn btn-primary">Save Changes</button>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                       <!-- End Modal Update Product -->
//                   </div>
//               </td>
//           </tr>`;
//   });
// }


// function saveUpdate(id) {
//   var products = JSON.parse(localStorage.getItem('products')) || [];
//   const index = products.findIndex(product => product.id === id);
//   if (index !== -1) {
//     // Lấy dữ liệu từ các trường trong modal
//     var name = document.getElementById(`name-product-${id}`).value;
//     var describe = document.getElementById(`describe-product-${id}`).value;
//     var price = document.getElementById(`price-product-${id}`).value;
//     var img1 = document.getElementById(`img1-product-${id}`).value;
//     var img2 = document.getElementById(`img2-product-${id}`).value;

//     // Cập nhật thông tin sản phẩm
//     products[index] = { id, name, describe, price, img1, img2 };
//     localStorage.setItem('products', JSON.stringify(products));

//     // Đóng modal và hiển thị lại dữ liệu
//     $(`#staticUpdate${id}`).modal('hide');
//     displayData();
//   }
// }


// function deleteProduct(id) {
//   // Lấy danh sách sản phẩm từ localStorage
//   var products = JSON.parse(localStorage.getItem('products')) || [];

//   // Lọc ra các sản phẩm không có id khớp với id được truyền vào
//   const filtered = products.filter(item => item.id !== id);

//   var text = "Bạn có chắc chắn xoá sản phẩm có id =  " + id + " không?"
//   if (confirm(text) == true) {
//     // Cập nhật lại localStorage với danh sách đã được lọc
//     localStorage.setItem('products', JSON.stringify(filtered));
//     // Hiển thị lại dữ liệu sau khi xoá
//     displayData();
//     console.log("Bạn đã xoá thành công!")
//     alert("Bạn đã xoá thành công!");
//   } else {
//     console.log("Bạn đã không xoá!")
//   }
// }

// function saveUpdate(id) {
//   var products = JSON.parse(localStorage.getItem('products')) || [];
//   const index = products.findIndex(product => product.id === id);

//   if (index !== -1) {
//     // Lấy dữ liệu từ các trường trong modal
//     var name = document.getElementById(`name-product-${id}`).value;
//     var describe = document.getElementById(`describe-product-${id}`).value;
//     var price = document.getElementById(`price-product-${id}`).value;
//     var img1 = document.getElementById(`img1-product-${id}`).value;
//     var img2 = document.getElementById(`img2-product-${id}`).value;

//     // Cập nhật thông tin sản phẩm
//     products[index] = { id, name, describe, price, img1, img2 };
//     localStorage.setItem('products', JSON.stringify(products));

//     // Đóng modal và hiển thị lại dữ liệu
//     const modalElement = document.getElementById(`staticUpdate${id}`);
//     const modal = bootstrap.Modal.getInstance(modalElement); // Lấy instance của modal
//     modal.hide(); // Đóng modal 

//     setTimeout(() => {
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         backdrop.remove();
//       }
//     }, 100); // Thời gian đợi một chút trước khi xóa

//     displayData();
//   }
// }

// // KẾT THÚC ÁO POLO NAM


// // ÁO THUN NAM


// // displayDataAoThun();

// function saveDataAoThun() {
//   var randomId = randomString(8);
//   // Check for LocalStorage support.
//   var name = document.getElementsByClassName("product-name")[0].value;
//   var describe = document.getElementsByClassName("product-describe")[0].value;
//   var price = document.getElementsByClassName("product-price")[0].value;
//   var img1 = document.getElementsByClassName("product-img1")[0].value;
//   var img2 = document.getElementsByClassName("product-img2")[0].value;

//   // Create a product object
//   var product = {
//     'id': randomId,
//     'name': name,
//     'describe': describe,
//     'price': price,
//     'img1': img1,
//     'img2': img2
//   };

//   // Save the product in localStorage
//   // Save the product in localStorage
//   var aothuns = JSON.parse(localStorage.getItem('aothuns')) || [];
//   aothuns.push(product);
//   localStorage.setItem('aothuns', JSON.stringify(aothuns));
//   displayDataAoThun()
// }

// function displayDataAoThun() {
//   const aothuns = localStorage.getItem('aothuns');
//   const myObject = JSON.parse(aothuns) || [];
//   const name_title = document.querySelector(".name-title");
//   const add_product = document.querySelector(".modal-footer");

//   add_product.innerHTML = '';
//   add_product.innerHTML = `
//   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                 <button type="submit" onclick="saveDataAoThun()" id="add-product" class="add-product btn btn-primary"
//                   data-bs-dismiss="modal">Add</button>`;

//   name_title.innerHTML = '';
//   name_title.innerHTML = 'Áo thun nam'

//   document.getElementById("myElement").innerHTML = '';

//   Object.values(myObject).forEach((value) => {
//     document.getElementById("myElement").innerHTML += `
//           <tr>
//               <th scope="row">${value.id}</th>
//               <td>${value.name}</td>
//               <td>${value.describe}</td>
//               <td>${value.price}</td>
//               <td><img src="${value.img1}" alt="" class="w-img"></td>
//               <td><img src="${value.img2}" alt="" class="w-img"></td>
//               <td>
//                   <div class="">
//                       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${value.id}">
//                           Update
//                       </button>
//                       <button type="button" class="btn btn-danger" onclick="deleteProduct('${value.id}')">Delete</button>

//                       <!-- Modal Update Product -->
//                       <div class="modal fade" id="staticUpdate${value.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
//                           <div class="modal-dialog modal-dialog-centered">
//                                 <div class="modal-content">
//                                     <div class="modal-header">
//                                         <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật sản phẩm</h1>
//                                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                     </div>
//                                   <div class="modal-body">
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Name Product</label>
//                                           <input type="text" class="w-100" id="name-product-${value.id}" placeholder="Enter your Name Product" value="${value.name}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Describe</label>
//                                           <input type="text" class="w-100" id="describe-product-${value.id}" placeholder="Enter your Describe" value="${value.describe}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Price</label>
//                                           <input type="text" class="w-100" id="price-product-${value.id}" placeholder="Enter your Price" value="${value.price}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Image 1</label>
//                                           <input type="text" class="w-100" id="img1-product-${value.id}" placeholder="Enter your Image" value="${value.img1}">
//                                       </div>
//                                       <div class="form-group">
//                                           <label class="d-flex justify-content-start">Image 2</label>
//                                           <input type="text" class="w-100" id="img2-product-${value.id}" placeholder="Enter your Image" value="${value.img2}">
//                                       </div>
//                                   </div>
//                                   <div class="modal-footer">
//                                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                       <button type="button" onclick="saveDataAoThun('${value.id}')" class="btn btn-primary">Save Changes</button>
//                                   </div>
//                               </div>
//                           </div>
//                       </div>
//                       <!-- End Modal Update Product -->
//                   </div>
//               </td>
//           </tr>`;
//   });
// }


// function saveUpdateAoThun(id) {
//   var aothuns = JSON.parse(localStorage.getItem('aothuns')) || [];
//   const index = aothuns.findIndex(product => product.id === id);
//   if (index !== -1) {
//     // Lấy dữ liệu từ các trường trong modal
//     var name = document.getElementById(`name-product-${id}`).value;
//     var describe = document.getElementById(`describe-product-${id}`).value;
//     var price = document.getElementById(`price-product-${id}`).value;
//     var img1 = document.getElementById(`img1-product-${id}`).value;
//     var img2 = document.getElementById(`img2-product-${id}`).value;

//     // Cập nhật thông tin sản phẩm
//     aothuns[index] = { id, name, describe, price, img1, img2 };
//     localStorage.setItem('aothuns', JSON.stringify(aothuns));

//     // Đóng modal và hiển thị lại dữ liệu
//     $(`#staticUpdate${id}`).modal('hide');
//     displayDataAoThun();
//   }
// }


// function deleteProductAoThun(id) {
//   // Lấy danh sách sản phẩm từ localStorage
//   var aothuns = JSON.parse(localStorage.getItem('aothuns')) || [];

//   // Lọc ra các sản phẩm không có id khớp với id được truyền vào
//   const filtered = aothuns.filter(item => item.id !== id);

//   var text = "Bạn có chắc chắn xoá sản phẩm có id =  " + id + " không?"
//   if (confirm(text) == true) {
//     // Cập nhật lại localStorage với danh sách đã được lọc
//     localStorage.setItem('aothuns', JSON.stringify(filtered));
//     // Hiển thị lại dữ liệu sau khi xoá
//     displayDataAoThun();
//     console.log("Bạn đã xoá thành công!")
//     alert("Bạn đã xoá thành công!");
//   } else {
//     console.log("Bạn đã không xoá!")
//   }
// }

// function saveUpdateAoThun(id) {
//   var aothuns = JSON.parse(localStorage.getItem('aothuns')) || [];
//   const index = aothuns.findIndex(product => product.id === id);

//   if (index !== -1) {
//     // Lấy dữ liệu từ các trường trong modal
//     var name = document.getElementById(`name-product-${id}`).value;
//     var describe = document.getElementById(`describe-product-${id}`).value;
//     var price = document.getElementById(`price-product-${id}`).value;
//     var img1 = document.getElementById(`img1-product-${id}`).value;
//     var img2 = document.getElementById(`img2-product-${id}`).value;

//     // Cập nhật thông tin sản phẩm
//     aothuns[index] = { id, name, describe, price, img1, img2 };
//     localStorage.setItem('aothuns', JSON.stringify(products));

//     // Đóng modal và hiển thị lại dữ liệu
//     const modalElement = document.getElementById(`staticUpdate${id}`);
//     const modal = bootstrap.Modal.getInstance(modalElement); // Lấy instance của modal
//     modal.hide(); // Đóng modal 

//     setTimeout(() => {
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         backdrop.remove();
//       }
//     }, 100); // Thời gian đợi một chút trước khi xóa

//     displayDataAoThun();
//   }
// }

// KẾT THÚC ÁO THUN NAM


// Hàm tạo ID ngẫu nhiên
// Hàm tạo chuỗi ngẫu nhiên
// Hàm tạo chuỗi ngẫu nhiên
// Utility functions
// Utility functions
const randomString = (length = Math.floor(Math.random() * 36)) =>
  Array.from({ length }, () => '0123456789abcdefghiklmnopqrstuvwxyz'[Math.floor(Math.random() * 36)]).join('');

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Generic functions for both products and accounts
const saveData = (type, isAccount = false) => {
  const randomId = randomString(8);
  const item = isAccount ? getAccountData(randomId) : getProductData(randomId);

  const items = getLocalStorage(type);
  items.push(item);
  setLocalStorage(type, items);
  displayData(type, isAccount);
};

const displayData = (type, isAccount) => {
  const items = getLocalStorage(type);
  const element = document.getElementById("myElement");
  const nameMapping = {
    polo: "Áo Polo Nam",
    aothun: "Áo Thun Nam",
    kaki: "Quần Kaki Nam",
    quanthun: "Quần Thun Nam",
    brief: "Đồ Lót Brief",
    boxer: "Đồ lót Boxer",
    account: "Tài khoản người dùng"
  };

  changeTableHead(isAccount);
  
  

  document.querySelector(".modal-footer").innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" onclick="saveData('${type}', ${isAccount})" id="add-item" class="add-item btn btn-primary" data-bs-dismiss="modal">Add</button>
  `;

  document.querySelector(".name-title").innerHTML = nameMapping[type] || '';

  element.innerHTML = items.map(value => `
    <tr>
      <th scope="row">${value.id}</th>
      ${isAccount ? getAccountTableCells(value) : getProductTableCells(value)}
      <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${value.id}">Update</button>
        <button type="button" class="btn btn-danger" onclick="deleteItem('${value.id}', '${type}', ${isAccount})">Delete</button>
        ${createUpdateModal(value, type, isAccount)}
      </td>
    </tr>
  `).join('');
};

const createUpdateModal = (value, type, isAccount) => `
  <div class="modal fade" id="staticUpdate${value.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật ${isAccount ? 'tài khoản' : 'sản phẩm'}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
      ${isAccount ? getAccountModalInputs(value) : getProductModalInputs(value)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" onclick="saveUpdate('${value.id}','${type}', ${isAccount})" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
`;

const saveUpdate = (id, type, isAccount) => {
  const items = getLocalStorage(type);
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items[index] = isAccount ? getUpdatedAccountData(id) : getUpdatedProductData(id);
    setLocalStorage(type, items);
    closeAndCleanupModal(`staticUpdate${id}`);
    displayData(type, isAccount);
  }
};

const deleteItem = (id, type, isAccount) => {
  const items = getLocalStorage(type);
  if (confirm(`Bạn có chắc chắn xoá ${isAccount ? 'tài khoản' : 'sản phẩm'} có id = ${id} không?`)) {
    setLocalStorage(type, items.filter(item => item.id !== id));
    console.log(`Xoá ${isAccount ? 'tài khoản' : 'sản phẩm'} thành công!`);
  }
  displayData(type, isAccount);
};

const closeAndCleanupModal = (modalId) => {
  const modalElement = document.getElementById(modalId);
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  setTimeout(() => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
  }, 100);
};

// Product-specific functions
const getProductData = (id) => ({
  id,
  name: document.querySelector(".product-name").value,
  describe: document.querySelector(".product-describe").value,
  price: document.querySelector(".product-price").value,
  img1: document.querySelector(".product-img1").value,
  img2: document.querySelector(".product-img2").value
});

const getProductTableCells = (value) => `
  <td>${value.name}</td>
  <td>${value.describe}</td>
  <td>${value.price}</td>
  <td><img src="${value.img1}" alt="" class="w-img"></td>
  <td><img src="${value.img2}" alt="" class="w-img"></td>
`;

const getProductModalInputs = (value) =>
  ['name', 'describe', 'price', 'img1', 'img2'].map(field => `
    <div class="form-group">
      <label class="d-flex justify-content-start">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
      <input type="text" class="border p-2 w-100 product-describe" id="${field}-product-${value.id}" placeholder="Enter your ${field}" value="${value[field]}">
    </div>
  `).join('');

const getUpdatedProductData = (id) => ({
  id,
  name: document.getElementById(`name-product-${id}`).value,
  describe: document.getElementById(`describe-product-${id}`).value,
  price: document.getElementById(`price-product-${id}`).value,
  img1: document.getElementById(`img1-product-${id}`).value,
  img2: document.getElementById(`img2-product-${id}`).value
});

// Account-specific functions
const getAccountData = (id) => ({
  id,
  username: document.querySelector(".username-type").value,
  name: document.querySelector(".name-type").value,
  email: document.querySelector(".email-type").value,
  password: document.querySelector(".password-type").value,
  role: document.querySelector(".role-type").value
});

const getAccountTableCells = (value) => `
  <td>${value.username}</td>
  <td>${value.name}</td>
  <td>${value.email}</td>
  <td>${value.password}</td>
  <td>${value.role}</td>
`;

const getAccountModalInputs = (value) =>
  ['username', 'name', 'email', 'password', 'role'].map(field => `
    <div class="form-group">
      <label class="d-flex justify-content-start">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
      <input type="text" class="w-100" id="${field}-account-${value.id}" placeholder="Enter your ${field}" value="${value[field]}">
    </div>
  `).join('');

const getUpdatedAccountData = (id) => ({
  id,
  username: document.getElementById(`username-account-${id}`).value,
  name: document.getElementById(`name-account-${id}`).value,
  email: document.getElementById(`email-account-${id}`).value,
  address: document.getElementById(`email-account-${id}`).value,
  password: document.getElementById(`password-account-${id}`).value,
  role: document.getElementById(`role-account-${id}`).value
});

const changeAccountModal = () => {
  const formModal = document.querySelector(".modal-body");
  formModal.innerHTML = ['username', 'name', 'email', 'password', 'role'].map(field => `
    <div class="form-group">
      <label class="d-flex justify-content-start">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
      <input type="text" class="border p-2 w-100 ${field}-type" placeholder="Enter your ${field}" data-has-listeners="true">
    </div>
  `).join('');
};

const changeProductModal = () => {
  const formModal = document.querySelector(".modal-body");
  formModal.innerHTML = ['name', 'describe', 'price', 'img1', 'img2'].map(field => `
    <div class="form-group">
      <label class="d-flex justify-content-start">${field === 'name' ? 'Name Product' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
      <input type="text" class="border p-2 w-100 product-${field}" id="${field}-product" placeholder="Enter your ${field === 'name' ? 'Name Product' : field}" data-has-listeners="true">
    </div>
  `).join('');
};

const changeTableHead = (isAccount) => {
  const thead = document.querySelector('table thead');

  // Define different sets of headers
  const productHeaders = `
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Describe</th>
      <th scope="col">Price</th>
      <th scope="col">Image 1</th>
      <th scope="col">Image 2</th>
      <th scope="col" class="col-3">Actions</th>
    </tr>
  `;

  const accountHeaders = `
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Username</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Role</th>
      <th scope="col" class="col-3">Actions</th>
    </tr>
  `;

  // Clear the thead content
  thead.innerHTML = '';

  // Change the table head and modal based on whether it's account or product data
  if (isAccount) {
    thead.innerHTML = accountHeaders;
    changeAccountModal(); // Modify the modal for account
  } else {
    thead.innerHTML = productHeaders;
    changeProductModal(); // Modify the modal for product
  }
};


f