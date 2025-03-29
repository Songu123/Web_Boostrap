// Đăng xuất tài khoản
function logout() {
    localStorage.removeItem('currentUser');
    alert('Đăng xuất thành công!');
    window.location.href = 'login.html';
}