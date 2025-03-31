// Hàm tạo ID ngẫu nhiên
const randomString = (length = 8) => {
  const chars = '0123456789abcdefghiklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Hàm lưu trữ localStorage
const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(`Lỗi khi đọc dữ liệu từ localStorage với key "${key}":`, error);
    return [];
  }
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Lỗi khi lưu dữ liệu vào localStorage với key "${key}":`, error);
  }
};
// Hàm thêm sản phẩm
const saveProduct = () => {
  console.log('hello');
  const name = document.querySelector('.product-name').value;
  const describe = document.querySelector('.product-describe').value;
  const price = document.querySelector('.product-price').value;
  const img1Input = document.querySelector('.product-img1');
  const img2Input = document.querySelector('.product-img2');
  const category = document.querySelector('.category-select').value;

  const img1File = img1Input.files[0];
  const img2File = img2Input.files[0];

  if (!name || !describe || !price || !img1File || !img2File || !category) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  const reader1 = new FileReader();
  const reader2 = new FileReader();

  reader1.onload = function (e) {
    const img1 = e.target.result;
    reader2.onload = function (e) {
      const img2 = e.target.result;

      const product = {
        id: randomString(),
        name,
        describe,
        price,
        img1,
        img2,
        category,
      };

      const products = getLocalStorage('products');
      products.push(product);
      setLocalStorage('products', products);
      displayData(category, false); // Hiển thị danh sách theo danh mục vừa thêm
      updateDashboardStats();
      clearForm();
      bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
    };
    reader2.readAsDataURL(img2File);
  };
  reader1.readAsDataURL(img1File);
};

// Hàm hiển thị dữ liệu
const displayData = (type, isDashboard) => {
  // Lấy các phần tử giao diện
  const dashboardStats = document.querySelector('.row.mb-4'); // Thống kê Dashboard
  const productSection = document.querySelector('.card'); // Bảng sản phẩm
  const accountSection = document.getElementById('account-section'); // Phần tài khoản
  const ordersSection = document.getElementById('orders-section'); // Phần đơn hàng
  const tableBody = document.getElementById('myElement'); // Bảng sản phẩm
  const cardHeaderTitle = document.querySelector('.card-header h5'); // Tiêu đề bảng sản phẩm

  // Ẩn tất cả các section trước
  dashboardStats.style.display = 'none';
  productSection.style.display = 'none';
  accountSection.style.display = 'none';
  ordersSection.style.display = 'none';
  tableBody.innerHTML = ''; // Xóa nội dung bảng sản phẩm

  // Lấy dữ liệu từ localStorage
  const products = getLocalStorage('products');
  const users = getLocalStorage('users');
  const orders = getLocalStorage('orders'); // Lấy danh sách đơn hàng từ localStorage

  if (type === 'dashboard' && isDashboard) {
    // Hiển thị Dashboard
    dashboardStats.style.display = 'flex';
    productSection.style.display = 'block';
    cardHeaderTitle.textContent = 'Quản Lý Sản Phẩm (Tất cả)';
    if (products.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8" class="text-center">Chưa có sản phẩm nào</td></tr>';
    } else {
      products.forEach((product) => {
        tableBody.innerHTML += createProductRow(product);
      });
    }
    loadDashboardStats(); // Cập nhật thống kê
  } else if (type === 'orders') {
    // Hiển thị Đơn Hàng
    ordersSection.style.display = 'block';
    loadOrders(); // Tải danh sách đơn hàng
  } else if (type === 'account') {
    // Hiển thị Tài Khoản
    accountSection.style.display = 'block';
    loadUsers(); // Tải danh sách tài khoản
  } else {
    // Hiển thị sản phẩm theo danh mục
    productSection.style.display = 'block';
    const filteredProducts = products.filter((product) => product.category === type);
    cardHeaderTitle.textContent = `Quản Lý Sản Phẩm (${getCategoryName(type)})`;
    if (filteredProducts.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8" class="text-center">Chưa có sản phẩm trong danh mục này</td></tr>';
    } else {
      filteredProducts.forEach((product) => {
        tableBody.innerHTML += createProductRow(product);
      });
    }
  }
};

// Hàm tạo hàng sản phẩm cho bảng
const createProductRow = (product) => `
    <tr>
        <th scope="row">${product.id}</th>
        <td>${product.name}</td>
        <td>${product.describe}</td>
        <td>${product.price}</td>
        <td>${getCategoryName(product.category)}</td>
        <td><img src="${product.img1}" alt="${product.name}" class="w-img" style="max-width: 100px;"></td>
        <td><img src="${product.img2}" alt="${product.name}" class="w-img" style="max-width: 100px;"></td>
        <td>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUpdate${
              product.id
            }">
                Update
            </button>
            <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
            ${createUpdateModal(product)}
        </td>
    </tr>
`;

// Hàm lấy tên danh mục
const getCategoryName = (category) => {
  const categoryMap = {
    polo: 'Áo Polo',
    aothun: 'Áo Thun',
    kaki: 'Quần Kaki',
    quanthun: 'Quần Thun',
    brief: 'Brief',
    boxer: 'Boxer',
  };
  return categoryMap[category] || 'Không xác định';
};

// Hàm tạo modal cập nhật
const createUpdateModal = (product) => `
    <div class="modal fade" id="staticUpdate${
      product.id
    }" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tên Sản Phẩm</label>
                        <input type="text" class="form-control" id="name-product-${product.id}" value="${
  product.name
}" required>
                    </div>
                    <div class="form-group">
                        <label>Mô Tả</label>
                        <input type="text" class="form-control" id="describe-product-${product.id}" value="${
  product.describe
}" required>
                    </div>
                    <div class="form-group">
                        <label>Giá</label>
                        <input type="number" class="form-control" id="price-product-${product.id}" value="${
  product.price
}" required>
                    </div>
                    <div class="form-group">
                        <label>Hình Ảnh 1</label>
                        <input type="file" class="form-control" id="img1-product-${product.id}" accept="image/*">
                        <small class="form-text text-muted">Hiện tại: <img src="${
                          product.img1
                        }" style="max-width: 50px;"></small>
                    </div>
                    <div class="form-group">
                        <label>Hình Ảnh 2</label>
                        <input type="file" class="form-control" id="img2-product-${product.id}" accept="image/*">
                        <small class="form-text text-muted">Hiện tại: <img src="${
                          product.img2
                        }" style="max-width: 50px;"></small>
                    </div>
                    <div class="form-group">
                        <label>Danh Mục</label>
                        <select class="form-control" id="category-product-${product.id}" required>
                            <option value="polo" ${product.category === 'polo' ? 'selected' : ''}>Áo Polo</option>
                            <option value="aothun" ${product.category === 'aothun' ? 'selected' : ''}>Áo Thun</option>
                            <option value="kaki" ${product.category === 'kaki' ? 'selected' : ''}>Quần Kaki</option>
                            <option value="quanthun" ${
                              product.category === 'quanthun' ? 'selected' : ''
                            }>Quần Thun</option>
                            <option value="brief" ${product.category === 'brief' ? 'selected' : ''}>Brief</option>
                            <option value="boxer" ${product.category === 'boxer' ? 'selected' : ''}>Boxer</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" data-bs-dismiss="modal" onclick="saveUpdate('${
                      product.id
                    }')" class="btn btn-primary">Lưu Thay Đổi</button>
                </div>
            </div>
        </div>
    </div>
`;

// Hàm cập nhật sản phẩm
const saveUpdate = (id) => {
  const products = getLocalStorage('products');
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    const name = document.getElementById(`name-product-${id}`).value;
    const describe = document.getElementById(`describe-product-${id}`).value;
    const price = document.getElementById(`price-product-${id}`).value;
    const img1Input = document.getElementById(`img1-product-${id}`);
    const img2Input = document.getElementById(`img2-product-${id}`);
    const category = document.getElementById(`category-product-${id}`).value;

    if (!name || !describe || !price || !category) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const updateProduct = () => {
      products[index] = { id, name, describe, price, img1: products[index].img1, img2: products[index].img2, category };
      setLocalStorage('products', products);
      displayData(category, false); // Hiển thị danh sách theo danh mục vừa cập nhật
      updateDashboardStats();

      // Kiểm tra và đóng modal nếu tồn tại
      const modalElement = document.getElementById(`staticUpdate${id}`);
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        } else {
          console.warn(`Modal instance for ID staticUpdate${id} not found.`);
        }
      } else {
        console.warn(`Modal element with ID staticUpdate${id} not found in DOM.`);
      }
    };

    const handleImageUpdate = (imgInput, imgIndex, callback) => {
      if (imgInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (imgIndex === 1) products[index].img1 = e.target.result;
          if (imgIndex === 2) products[index].img2 = e.target.result;
          callback();
        };
        reader.readAsDataURL(imgInput.files[0]);
      } else {
        callback();
      }
    };

    handleImageUpdate(img1Input, 1, () => {
      handleImageUpdate(img2Input, 2, updateProduct);
    });
  }
};

// Hàm xóa sản phẩm
const deleteProduct = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
    const products = getLocalStorage('products');
    const product = products.find((p) => p.id === id);
    const filteredProducts = products.filter((p) => p.id !== id);
    setLocalStorage('products', filteredProducts);
    displayData(product.category, false); // Hiển thị lại danh sách theo danh mục của sản phẩm vừa xóa
    updateDashboardStats();
  }
};

// Hàm xóa form sau khi thêm sản phẩm
const clearForm = () => {
  document.querySelector('.product-name').value = '';
  document.querySelector('.product-describe').value = '';
  document.querySelector('.product-price').value = '';
  document.querySelector('.product-img1').value = '';
  document.querySelector('.product-img2').value = '';
  document.querySelector('.category-select').value = 'polo';
};

// Hàm tính toán và hiển thị thống kê
const updateDashboardStats = () => {
  const products = getLocalStorage('products');
  const totalProducts = products.length;
  const totalOrders = Math.floor(totalProducts * 0.5);
  const totalUsers = Math.floor(totalProducts * 0.3);
  const totalRevenue = products.reduce((sum, product) => sum + parseFloat(product.price || 0), 0).toFixed(2);

  document.getElementById('totalProducts').innerText = totalProducts;
  document.getElementById('totalOrders').innerText = totalOrders;
  document.getElementById('totalUsers').innerText = totalUsers;
  document.getElementById('totalRevenue').innerText = `$${totalRevenue}`;
};

// Hàm tìm kiếm sản phẩm
const searchProducts = (e) => {
  e.preventDefault();
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const products = getLocalStorage('products');
  const tableBody = document.getElementById('myElement');
  tableBody.innerHTML = '';

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.describe.toLowerCase().includes(searchTerm) ||
      product.id.toLowerCase().includes(searchTerm)
  );

  if (filteredProducts.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="8">Không tìm thấy sản phẩm</td></tr>';
  } else {
    filteredProducts.forEach((product) => {
      tableBody.innerHTML += createProductRow(product);
    });
  }
};

// Hàm hiển thị danh sách đơn hàng
fetch('http://localhost:3000/api/orders')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('total-orders').textContent = data.totalOrders;
    document.getElementById('json-output').textContent = JSON.stringify(data.orders, null, 2);
  })
  .catch((error) => console.error('Lỗi:', error));

// Hàm tải và hiển thị thống kê trên Dashboard
function loadDashboardStats() {
  // Lấy danh sách sản phẩm từ localStorage
  const products = getLocalStorage('products') || []; // Nếu không có sản phẩm, trả về mảng rỗng
  // const orders = getLocalStorage('orders') || []; // Nếu không có đơn hàng, trả về mảng rỗng
  const users = getLocalStorage('account') || []; // Nếu không có người dùng, trả về mảng rỗng

  // Tính toán các thống kê
  const totalProducts = products.length; // Tổng số sản phẩm
  // const totalOrders = orders.length; // Tổng số đơn hàng
  const totalUsers = users.length; // Giả lập số lượng người dùng
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString(); // Tổng doanh thu từ đơn hàng

  // Hiển thị các giá trị thống kê lên giao diện
  document.getElementById('totalProducts').innerText = totalProducts;

  // Hiển thị các giá trị thống kê lên giao diện
  document.getElementById('totalProducts').innerText = totalProducts;

  fetch('http://localhost:3000/api/orders')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Kiểm tra dữ liệu trả về từ API
        if (data && data.totalOrders !== undefined && data.totalRevenue !== undefined) {
            document.getElementById('totalOrders').textContent = data.totalOrders;
            document.getElementById('totalRevenue').textContent = `${data.totalRevenue.toLocaleString()} đ`;
        } else {
            console.warn('Dữ liệu trả về từ API không hợp lệ:', data);
            document.getElementById('totalOrders').textContent = '0';
            document.getElementById('totalRevenue').textContent = '0 đ';
        }
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        document.getElementById('totalOrders').textContent = 'Lỗi';
        document.getElementById('totalRevenue').textContent = 'Lỗi';
    });

  document.getElementById('totalUsers').innerText = totalUsers;
  // document.getElementById('totalRevenue').innerText = `${totalRevenue} đ`;
}

// Begin Quản lý đơn hàng
// Giả lập danh sách đơn hàng (có thể thay bằng API từ backend)
let orders = []
// Gọi API để lấy danh sách đơn hàng
fetch('http://localhost:3000/api/orders')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Gán dữ liệu đơn hàng vào biến orders
        orders = data.orders;

        // Hiển thị danh sách đơn hàng lên bảng
        loadOrders();
    })
    .catch(error => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    });

// Hàm tải danh sách đơn hàng lên bảng
function loadOrders() {
  let table = document.getElementById('orderTable');
  table.innerHTML = ''; // Xóa nội dung cũ

  orders.forEach((order, index) => {
    let row = `
        <tr>
          <td>${order._id}</td>
          <td>${order.name}</td>
          <td>${order.orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} đ</td>
          <td>${new Date(order.createdAt).toLocaleString()}</td>
          <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
          <td>
            ${
              order.status === 'Chờ Xác Nhận'
                ? `<button class="btn btn-success btn-sm" onclick="confirmOrder(${index})">Xác Nhận</button>
                 <button class="btn btn-danger btn-sm" onclick="cancelOrder(${index})">Hủy</button>`
                : `<button class="btn btn-info btn-sm" onclick="viewOrder(${index})">Xem</button>`
            }
          </td>
        </tr>
      `;
    table.innerHTML += row;
  });
}

// Trả về màu badge tương ứng với trạng thái đơn hàng
function getStatusColor(status) {
  switch (status) {
    case 'Chờ Xác Nhận':
      return 'warning';
    case 'Đã Giao':
      return 'success';
    case 'Đã Hủy':
      return 'danger';
    default:
      return 'secondary';
  }
}

// Xác nhận đơn hàng
function confirmOrder(index) {
  orders[index].status = 'Đã Giao';
  loadOrders(); // Cập nhật lại danh sách đơn hàng
}

// Hủy đơn hàng
function cancelOrder(index) {
  orders[index].status = 'Đã Hủy';
  loadOrders(); // Cập nhật lại danh sách đơn hàng
}

// Xem chi tiết đơn hàng
// function viewOrder(index) {
//   alert(
//     `Chi tiết đơn hàng ID: ${orders[index].id}\nKhách hàng: ${orders[index].customer}\nTổng tiền: ${orders[
//       index
//     ].total.toLocaleString()} đ`
//   );
// }

function viewOrder(index) {
  const order = orders[index];

  // Gán dữ liệu vào các phần tử trong modal
  document.getElementById('orderId').textContent = order._id;
  document.getElementById('orderCustomer').textContent = order.name;
  document.getElementById('orderPhone').textContent = order.phone;
  document.getElementById('orderAddress').textContent = `${order.address}, ${order.ward}, ${order.district}, ${order.city}`;
  document.getElementById('orderDate').textContent = new Date(order.createdAt).toLocaleString();
  document.getElementById('orderTotal').textContent = order.orderDetails
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString();

  // Hiển thị danh sách sản phẩm trong bảng
  const productTableBody = document.getElementById('orderProducts');
  productTableBody.innerHTML = ''; // Xóa nội dung cũ

  order.orderDetails.forEach((item, idx) => {
    const row = `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toLocaleString()} đ</td>
        <td>${(item.price * item.quantity).toLocaleString()} đ</td>
      </tr>
    `;
    productTableBody.innerHTML += row;
  });

  // Hiển thị modal
  const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
  orderModal.show();
}

// document.addEventListener('DOMContentLoaded', function () {
//   loadOrders(); // Tải danh sách đơn hàng
//   loadDashboardStats(); // Tải và hiển thị thống kê
//   displayData('dashboard', true);
// });

// Ẩn hiện thanh bar
function showHideMenu() {
  const sidebar = document.querySelector('#sidebar');
  const content = document.querySelector('#content');
  content.classList.toggle('active');
  sidebar.classList.toggle('active');
}

// Begin Quản lý tài khoản

// Hàm hiển thị danh sách tài khoản
function loadUsers() {
  const users = getLocalStorage('account');
  const userTable = document.getElementById('userTable');
  userTable.innerHTML = '';

  if (users.length === 0) {
    userTable.innerHTML = '<tr><td colspan="6">Chưa có tài khoản nào</td></tr>';
  } else {
    users.forEach((user, index) => {
      const row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>********</td> <!-- Hiển thị mật khẩu ẩn -->
          <td>${user.role}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="showEditUserModal(${index})">Sửa</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Xóa</button>
          </td>
        </tr>
      `;
      userTable.innerHTML += row;
    });
  }
}

// Hàm thêm tài khoản
document.getElementById('addUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if (!username || !email || !password || !role) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  const users = getLocalStorage('account');
  const newUser = {
    id: randomString(),
    username,
    email,
    password,
    role,
  };

  users.push(newUser);
  setLocalStorage('account', users);
  loadUsers();
  alert('Thêm tài khoản thành công!');
  bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
});

// Hàm hiển thị modal chỉnh sửa tài khoản
function showEditUserModal(index) {
  const users = getLocalStorage('account');
  const user = users[index];

  document.getElementById('editUserId').value = index;
  document.getElementById('editUsername').value = user.username;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editPassword').value = user.password;
  document.getElementById('editRole').value = user.role;

  const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
  editUserModal.show();
}

// Hàm lưu thay đổi tài khoản
document.getElementById('editUserForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const index = document.getElementById('editUserId').value;
  const username = document.getElementById('editUsername').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const password = document.getElementById('editPassword').value.trim();
  const role = document.getElementById('editRole').value;

  if (!username || !email || !password || !role) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  const users = getLocalStorage('account');
  users[index] = { ...users[index], username, email, password, role };
  setLocalStorage('account', users);
  loadUsers();
  alert('Cập nhật tài khoản thành công!');
  bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
});

// Hàm xóa tài khoản
function deleteUser(index) {
  if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
    const users = getLocalStorage('account');
    users.splice(index, 1);
    setLocalStorage('account', users);
    loadUsers();
    alert('Xóa tài khoản thành công!');
  }
}

// Tải danh sách tài khoản khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
  loadUsers();
});
// End Quản lý tài khoản

document.addEventListener('DOMContentLoaded', function () {
  loadOrders(); // Tải danh sách đơn hàng
  loadUsers(); // Tải danh sách tài khoản
  loadDashboardStats(); // Tải và hiển thị thống kê
  displayData('dashboard', true); // Mặc định hiển thị Dashboard
});
