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
  const products = getLocalStorage('products');
  const tableBody = document.getElementById('myElement');
  const dashboardStats = document.querySelector('.row.mb-4');
  const cardHeaderTitle = document.querySelector('.card-header h5');

  // Hiển thị hoặc ẩn dashboard stats
  dashboardStats.style.display = isDashboard ? 'flex' : 'none';

  // Xóa nội dung bảng trước khi hiển thị mới
  tableBody.innerHTML = '';

  if (isDashboard) {
    // Hiển thị tất cả sản phẩm khi vào Dashboard
    cardHeaderTitle.textContent = 'Quản Lý Sản Phẩm (Tất cả)';
    products.forEach((product) => {
      tableBody.innerHTML += createProductRow(product);
    });
  } else if (type === 'account') {
    // Xử lý hiển thị tài khoản (chưa triển khai)
    cardHeaderTitle.textContent = 'Quản Lý Tài Khoản';
    tableBody.innerHTML = '<tr><td colspan="8">Chưa có dữ liệu tài khoản</td></tr>';
  } else {
    // Lọc sản phẩm theo danh mục
    const filteredProducts = products.filter((product) => product.category === type);
    cardHeaderTitle.textContent = `Quản Lý Sản Phẩm (${getCategoryName(type)})`;

    if (filteredProducts.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8">Chưa có sản phẩm trong danh mục này</td></tr>';
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
                    <button type="button" onclick="saveUpdate('${
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
      bootstrap.Modal.getInstance(document.getElementById(`staticUpdate${id}`)).hide();
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

// Hàm tải và hiển thị thống kê trên Dashboard
function loadDashboardStats() {
  // Lấy danh sách sản phẩm từ localStorage
  const products = getLocalStorage('products') || []; // Nếu không có sản phẩm, trả về mảng rỗng
  const orders = getLocalStorage('orders') || []; // Nếu không có đơn hàng, trả về mảng rỗng

  // Tính toán các thống kê
  const totalProducts = products.length; // Tổng số sản phẩm
  const totalOrders = orders.length; // Tổng số đơn hàng
  const totalUsers = Math.floor(totalOrders * 0.3); // Giả lập số lượng người dùng
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString(); // Tổng doanh thu từ đơn hàng

  // Hiển thị các giá trị thống kê lên giao diện
  document.getElementById('totalProducts').innerText = totalProducts;
  document.getElementById('totalOrders').innerText = totalOrders;
  document.getElementById('totalUsers').innerText = totalUsers;
  document.getElementById('totalRevenue').innerText = `${totalRevenue} đ`;
}

// Giả lập danh sách đơn hàng (có thể thay bằng API từ backend)
let orders = [
  { id: 101, customer: 'Nguyễn Văn A', total: 500000, date: '2025-03-25', status: 'Chờ Xác Nhận' },
  { id: 102, customer: 'Trần Thị B', total: 750000, date: '2025-03-24', status: 'Đã Giao' },
  { id: 103, customer: 'Lê Văn C', total: 1200000, date: '2025-03-23', status: 'Đã Hủy' },
];

// Hàm tải danh sách đơn hàng lên bảng
function loadOrders() {
  let table = document.getElementById('orderTable');
  table.innerHTML = ''; // Xóa nội dung cũ

  orders.forEach((order, index) => {
    let row = `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.total.toLocaleString()} đ</td>
          <td>${order.date}</td>
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
function viewOrder(index) {
  alert(
    `Chi tiết đơn hàng ID: ${orders[index].id}\nKhách hàng: ${orders[index].customer}\nTổng tiền: ${orders[
      index
    ].total.toLocaleString()} đ`
  );
}

document.addEventListener('DOMContentLoaded', function () {
  loadOrders(); // Tải danh sách đơn hàng
  loadDashboardStats(); // Tải và hiển thị thống kê
  displayData('dashboard', true);
});



// Ẩn hiện thanh bar
function showHideMenu(){
  const sidebar = document.querySelector('#sidebar');
  const content = document.querySelector('#content');
  content.classList.toggle('active');
  sidebar.classList.toggle('active');
}


