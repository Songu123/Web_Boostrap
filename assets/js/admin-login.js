$(document).ready(function () {
    // console.log('hello')
    const loginForm = $('#loginForm');

    if (loginForm.length) {
        loginForm.on('submit', function (e) {
            e.preventDefault();
            const username = $('#username').val();
            const password = $('#password').val();

            $.getJSON('./data/admin-account.json', function (data) {
                const accounts = data.accounts;
                console.log(accounts);
                const isValid = accounts.some(acc => acc.username === username && acc.password === password);

                if (isValid) {
                    let accountCurrent = {
                        username: username
                    }
                    localStorage.setItem('accountCurrent', JSON.stringify(accountCurrent));
                    localStorage.setItem('adminLoggedIn', 'true');
                    window.location.href = 'admin.html';
                } else {
                    alert('Invalid username or password');
                }
            }).fail(function () {
                alert('Không thể tải dữ liệu tài khoản!');
            });
        });
    } else {
        const logined = JSON.parse(localStorage.getItem('adminLoggedIn'));
        if (!logined) {
            window.location.href = 'admin-login.html';
        }
    }
});

// Đăng xuất tài khoản admin
function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('accountCurrent');
    window.location.href = 'admin-login.html';
}

// Hiển thị tên admin đã đăng nhập
$(document).ready(function () {
    let adminData = localStorage.getItem("accountCurrent");

    if (adminData) {
        adminData = JSON.parse(adminData);
        $("#adminName").text(adminData.username); // Cập nhật nội dung của #adminName
    }
});