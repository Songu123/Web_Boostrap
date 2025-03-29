// Hàm lấy danh sách tài khoản từ localStorage
function getAccountList() {
  try {
    const account = localStorage.getItem('account');
    return account ? JSON.parse(account) : [];
  } catch (error) {
    console.error('Lỗi khi parse dữ liệu từ localStorage:', error);
    return [];
  }
}

// Hàm lưu tài khoản hiện tại vào localStorage
function saveCurrentUser(user) {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Lỗi khi lưu currentUser vào localStorage:', error);
  }
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Khởi tạo danh sách tài khoản
const listAccount = getAccountList();

// Kiểm tra tài khoản đăng nhập 
function checkLogin() {
  const emailInput = document.querySelector('#emailInput').value
  const passwordInput = document.querySelector('#passwordInput').value

  const user = listAccount.find((account) => account.email === emailInput && account.password === passwordInput);
    if (user) {
      saveCurrentUser(user);
      alert('Đăng nhập thành công!');
      window.location.href = './index.html';
    }
    else {
      alert('Email hoặc mật khẩu không đúng!');
    }
}
console.log('Danh sách tài khoản:', listAccount);

// Đăng ký tài khoản
function saveAccount() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const account = {
    username: username,
    email: email,
    password: password,
  };
  listAccount.push(account);
  localStorage.setItem('account', JSON.stringify(listAccount));
  alert('Đăng ký thành công!');
  window.location.href = './login.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    window.location.href = './my-account.html';
  }
});

// document.addEventListener('DOMContentLoaded', function () {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//   if (currentUser) {
//     // Hiển thị thông tin người dùng
//     const userMenu = document.querySelector('.login-cart-item');
//     userMenu.innerHTML = `
//       <a href="#" class="nav-link fw-semibold active">
//         <i class="bi bi-person-fill"></i> ${currentUser.username}
//       </a>
//       <ul class="list-unstyled py-2">
//         <li class="px-3 py-1">
//           <a href="#" class="text-decoration-none">Trang tài khoản</a>
//         </li>
//         <li class="px-3 py-1">
//           <a href="#" class="text-decoration-none">Đơn hàng</a>
//         </li>
//         <li class="px-3 py-1">
//           <a href="#" class="text-decoration-none">Địa chỉ</a>
//         </li>
//         <li class="px-3 py-1">
//           <a href="#" class="text-decoration-none">Yêu thích</a>
//         </li>
//         <li class="px-3 py-1">
//           <a href="#" class="text-decoration-none" id="logout">Thoát</a>
//         </li>
//       </ul>
//     `;

//     // Xử lý đăng xuất
//     document.getElementById('logout').addEventListener('click', function () {
//       localStorage.removeItem('currentUser');
//       alert('Bạn đã đăng xuất!');
//       window.location.href = './login.html';
//     });
//   } else {
//     const userMenu = document.querySelector('.login-cart-item');
//     userMenu.innerHTML = `
//       <div class="login-cart-item d-flex cart-item justify-content-center align-items-center px-3 nav-item p-2 mx-1 dropdown">
//         <a href="./login.html" class="nav-link fw-semibold active">
//           <i class="bi bi-person-fill"></i> Đăng nhập
//         </a>
//       </div>
//     `;
//   }
// });
